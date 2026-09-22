# Exhibit Automation website

Astro static site for joinexhibit.com.

## Local

```bash
npm install
npm run dev      # http://localhost:4321
npm run check    # build + link/SEO audit
```

`npm run check` must pass before merging. It verifies internal links, image alt text and
dimensions, title and meta-description length, canonical tags, JSON-LD validity and heading
structure across every page.

## Deploy

Pushing to `main` builds the site and publishes it to GitHub Pages. The custom domain is set by
`public/CNAME`; do not delete that file.

## Before this site is finished

- `src/pages/book.astro` hands enquiries to the visitor's mail client. Wire a real form endpoint
  and keep the mailto as a fallback.
- Replace the calendar link with a Cal.com embed.
- Add a real founder photo at `public/founder.jpg` and reference it in `src/pages/about.astro`.
- `src/pages/legal/privacy.astro` and `terms.astro` are drafts and say so. Have them reviewed.
