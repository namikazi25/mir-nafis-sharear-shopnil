// Central place to edit site-wide info. Imported by layouts + RSS feed.
export const SITE = {
  title: 'Mir Nafis Sharear Shopnil',
  description:
    'AI researcher working on LLM reasoning, mechanistic interpretability, and agentic systems. Applying for PhD positions (Fall 2026).',
  author: 'Mir Nafis Sharear Shopnil',
  email: 'sharears4077@gmail.com',
  location: 'Manchester, UK',
  // Used only as a fallback; astro.config.mjs `site` wins for URL generation.
  url: 'https://mirnafissharearshopnil.com',
  links: {
    scholar: 'https://scholar.google.com/citations?user=pZ70qSoAAAAJ&hl=en',
    github: 'https://github.com/namikazi25',
    linkedin: 'https://www.linkedin.com/in/mirnafissharearshopnil/',
    email: 'mailto:sharears4077@gmail.com',
  },
};

export const NAV = [
  { href: '/#research', label: 'Research' },
  { href: '/#work', label: 'Work' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#writing', label: 'Writing' },
  { href: '/blog', label: 'Blog' },
  { href: '/cv', label: 'CV' },
  { href: '/#contact', label: 'Contact' },
];
