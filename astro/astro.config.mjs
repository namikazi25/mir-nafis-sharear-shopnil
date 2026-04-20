import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // CHANGE THIS to your deployed URL before building for production.
  // Used for RSS feed + sitemap canonical URLs.
  site: 'https://mirnafissharearshopnil.com',

  integrations: [sitemap()],

  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
