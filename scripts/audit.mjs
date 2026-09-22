import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const all = await walk(dist);
const pages = all.filter((f) => f.endsWith('.html'));
const assets = new Set(
  all.map((f) => '/' + path.relative(dist, f).replace(/\\/g, '/'))
);
const routes = new Set(
  pages.map((f) => {
    const r = '/' + path.relative(dist, f).replace(/\\/g, '/').replace(/index\.html$/, '');
    return r === '/' ? '/' : r.replace(/\/$/, '') + '/';
  })
);

const problems = [];
const stats = { pages: pages.length, links: 0, imgs: 0 };

for (const f of pages) {
  const html = await readFile(f, 'utf8');
  const route = '/' + path.relative(dist, f).replace(/index\.html$/, '');

  // internal links
  for (const m of html.matchAll(/href="(\/[^"#?]*)(?:[#?][^"]*)?"/g)) {
    const href = m[1];
    stats.links++;
    if (href.startsWith('//')) continue;
    const norm = href.endsWith('/') ? href : href + '/';
    const ok = routes.has(norm) || assets.has(href) || href === '/';
    if (!ok) problems.push(`${route}  BROKEN LINK  ${href}`);
  }

  // images: existence + alt + dimensions
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    stats.imgs++;
    const src = tag.match(/src="([^"]+)"/)?.[1];
    if (src?.startsWith('/') && !assets.has(src)) problems.push(`${route}  MISSING IMG  ${src}`);
    if (!/\balt=/.test(tag)) problems.push(`${route}  IMG NO ALT  ${src}`);
    if (!/\bwidth=/.test(tag) || !/\bheight=/.test(tag)) problems.push(`${route}  IMG NO DIMS  ${src}`);
  }

  // srcset targets
  for (const m of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const part of m[1].split(',')) {
      const u = part.trim().split(/\s+/)[0];
      if (u.startsWith('/') && !assets.has(u)) problems.push(`${route}  MISSING SRCSET  ${u}`);
    }
  }

  // one h1 per page
  const h1s = [...html.matchAll(/<h1[\s>]/g)].length;
  if (h1s !== 1) problems.push(`${route}  H1 COUNT ${h1s}`);

  // title + meta description present and sane length
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  if (!title) problems.push(`${route}  NO TITLE`);
  else if (title.length > 65) problems.push(`${route}  TITLE ${title.length} chars`);
  if (!desc) problems.push(`${route}  NO META DESC`);
  else if (desc.length > 165) problems.push(`${route}  META DESC ${desc.length} chars`);

  // canonical
  if (!/rel="canonical"/.test(html)) problems.push(`${route}  NO CANONICAL`);

  // JSON-LD parses
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { problems.push(`${route}  BAD JSON-LD`); }
  }

  // em dashes in rendered output
  if (html.includes('—')) problems.push(`${route}  EM DASH IN OUTPUT`);

  // generic link text
  for (const m of html.matchAll(/<a\b[^>]*>([^<]{1,20})<\/a>/g)) {
    const t = m[1].trim().toLowerCase().replace(/[^a-z ]/g, '');
    if (['click here', 'here', 'read more', 'learn more'].includes(t)) {
      problems.push(`${route}  VAGUE LINK TEXT "${m[1].trim()}"`);
    }
  }
}

console.log(`Scanned ${stats.pages} pages, ${stats.links} internal links, ${stats.imgs} images.\n`);
if (problems.length === 0) console.log('No problems found.');
else {
  const grouped = {};
  for (const p of problems) {
    const kind = p.split('  ')[1];
    (grouped[kind] ??= []).push(p);
  }
  for (const [kind, list] of Object.entries(grouped)) {
    console.log(`\n## ${kind} (${list.length})`);
    list.slice(0, 12).forEach((l) => console.log('  ' + l));
    if (list.length > 12) console.log(`  ...and ${list.length - 12} more`);
  }
}
