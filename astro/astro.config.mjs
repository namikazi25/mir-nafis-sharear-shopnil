import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project site. Swap both values if you move to a custom domain.
  site: 'https://namikazi25.github.io',
  base: '/mir-nafis-sharear-shopnil',

  integrations: [sitemap()],

  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
