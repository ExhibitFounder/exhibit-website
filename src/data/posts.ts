export interface Post {
  slug: string;
  title: string;
  /** Short form for the <title> tag; the long `title` stays as the h1. Keeps titles under ~60 chars once the brand suffix is added. */
  seoTitle: string;
  description: string;
  date: string;
  readingTime: string;
  industry: 'Property management' | 'Home services' | 'Law firms' | 'All industries';
}

export const posts: Post[] = [
  {
    slug: 'missed-calls-cost-200-unit-property-manager',
    seoTitle: 'What Missed Calls Cost a 200-Unit PM',
    title: 'What missed calls actually cost a 200-unit property manager',
    description:
      'The arithmetic behind unanswered leasing calls: how 30 inquiries a month becomes three lost leases, with every benchmark sourced.',
    date: '2026-09-22',
    readingTime: '6 min',
    industry: 'Property management',
  },
  {
    slug: 'ai-receptionist-vs-ai-operations-agency',
    seoTitle: 'AI Receptionist or Operations Agency?',
    title: 'AI receptionist or AI operations agency: which does a small property manager need?',
    description:
      'A $49 app and a $750 service solve different problems. Four questions that tell you which one you actually have.',
    date: '2026-09-22',
    readingTime: '7 min',
    industry: 'Property management',
  },
  {
    slug: 'after-hours-problem-hvac',
    seoTitle: 'The After-Hours Problem in HVAC',
    title: 'The after-hours problem in HVAC: 35 to 45% of your calls, under 18% answered',
    description:
      'Where the money leaks in a one-to-three truck shop, why voicemail stopped working, and what a realistic fix looks like.',
    date: '2026-09-22',
    readingTime: '6 min',
    industry: 'Home services',
  },
  {
    slug: 'avoca-alternatives-under-3m',
    seoTitle: 'Avoca Alternatives Under $3M',
    title: 'Avoca alternatives for home service shops under $3M',
    description:
      'Avoca is excellent and built around ServiceTitan. Here is what to look at if you are smaller than its target customer.',
    date: '2026-09-22',
    readingTime: '7 min',
    industry: 'Home services',
  },
  {
    slug: 'law-firm-intake-62-percent',
    seoTitle: 'Why Missed Callers Never Call Back',
    title: 'Why 62% of missed callers never call your firm back',
    description:
      'Legal intake leaks in four specific places. What the data says about each, and which ones are worth fixing first.',
    date: '2026-09-22',
    readingTime: '6 min',
    industry: 'Law firms',
  },
  {
    slug: 'approval-gates',
    seoTitle: 'What Approval Gates Are',
    title: 'What approval gates are, and why your AI should not be allowed to issue a refund',
    description:
      'The design pattern that separates an automation you can trust overnight from one that will eventually cost you a customer.',
    date: '2026-09-22',
    readingTime: '8 min',
    industry: 'All industries',
  },
  {
    slug: 'what-ai-operations-actually-costs',
    seoTitle: 'What AI Operations Actually Costs',
    title: 'What running an AI operations system actually costs, line by line',
    description:
      'Voice minutes, tokens, telephony, storage and the lines vendors leave off the pricing page. Real ranges, and why 24/7 is not the expensive part.',
    date: '2026-10-06',
    readingTime: '7 min',
    industry: 'All industries',
  },
  {
    slug: 'questions-before-automating',
    seoTitle: 'Seven Questions Before You Automate',
    title: 'Seven questions to answer before you automate anything',
    description:
      'A pre-flight checklist for owner-operators. Most failed automation projects fail on one of these, and all seven are answerable in an afternoon.',
    date: '2026-10-20',
    readingTime: '8 min',
    industry: 'All industries',
  },
];

export const bySlug = (slug: string) => posts.find((p) => p.slug === slug)!;
