# Personal site — Astro

Mir Nafis Sharear Shopnil's personal site, migrated from static HTML to [Astro](https://astro.build/). Posts are Markdown, RSS + sitemap are generated at build time, and the design language is identical to the HTML version.

---

## Quick start

```bash
cd astro
npm install
npm run dev
```

Open http://localhost:4321 — the site is live, and any edit to a `.astro`, `.md`, or `.css` file hot-reloads.

## Build for production

```bash
npm run build
npm run preview    # optional: serve the build locally
```

The production site is written to `dist/`. Deploy the contents of that folder to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages — all work with zero config).

---

## Project layout

```
astro/
├── astro.config.mjs          ← site URL + sitemap config
├── src/
│   ├── config.ts             ← site metadata, nav links (EDIT ME)
│   ├── content/
│   │   ├── config.ts         ← schema for blog posts
│   │   └── posts/*.md        ← your blog posts (EDIT/ADD HERE)
│   ├── layouts/
│   │   ├── BaseLayout.astro  ← nav + footer + fonts + theme toggle
│   │   └── PostLayout.astro  ← post page shell (TOC, prev/next, share)
│   ├── components/
│   │   └── FormattedDate.astro
│   ├── pages/
│   │   ├── index.astro       ← homepage
│   │   ├── cv.astro          ← CV page
│   │   ├── blog/
│   │   │   ├── index.astro   ← blog index with tag filter
│   │   │   └── [...slug].astro ← dynamic post page (auto-generated)
│   │   └── rss.xml.js        ← RSS feed (auto-generated)
│   └── styles/
│       ├── global.css        ← tokens, base, nav, footer
│       ├── home.css          ← homepage-specific styles
│       └── blog.css          ← blog index + post page
└── public/                   ← static assets (favicons, PDFs, images)
```

---

## How to add a new blog post

1. **Create a new markdown file** in `src/content/posts/`:

   ```bash
   touch src/content/posts/my-new-post.md
   ```

2. **Add frontmatter + body**:

   ```markdown
   ---
   title: 'My post title'
   description: 'One-line dek for listings and SEO.'
   pubDate: 2026-04-15
   tags: ['interpretability', 'agents']
   # draft: true      ← uncomment to hide from production build
   # updatedDate: 2026-04-20
   # cover: /blog/my-post-cover.jpg
   # coverAlt: 'Alt text'
   ---

   Your post body, in **Markdown**. Use `##` and `###` for sections — the
   TOC in the sidebar is built automatically.

   > Block quotes render as pull quotes.

   ```python
   # code blocks get Shiki highlighting
   def hello(): return 'world'
   ```
   ```

3. **That's it.** The post will:
   - Appear in the blog index at `/blog`
   - Get a permalink at `/blog/my-new-post/`
   - Be added to `/rss.xml` automatically
   - Be filterable by its tags

**Drafts:** set `draft: true` in frontmatter. Drafts are visible in `npm run dev` but excluded from the production build.

---

## Editing the homepage

Most homepage content is **structured data** at the top of `src/pages/index.astro` — the `NOW`, `THREADS`, and `PROJECTS` arrays. Edit those and the page rebuilds.

Prose sections (hero lede, research narrative) and paper entries are inline in the same file.

Site-wide info (name, email, nav) is in `src/config.ts`.

---

## Deploying

### Vercel / Netlify (easiest)

1. Push this folder to a GitHub repo.
2. Import into Vercel or Netlify.
3. Build command: `npm run build` · Output: `dist`
4. Push to main → automatic redeploys.

### GitHub Pages

1. In `astro.config.mjs`, set `site` to `https://<username>.github.io` and add `base: '/<repo-name>'` if you're not using a custom domain.
2. Add a GitHub Actions workflow — Astro publishes an official one at https://docs.astro.build/en/guides/deploy/github/

### Before you deploy

Edit `astro.config.mjs` and set `site` to your real domain. This URL is used for:
- RSS feed `<link>` tags
- Sitemap canonical URLs
- Open Graph URLs

---

## Migrating from the old HTML site

The old site is still at the project root (`index.html`, `blog.html`, `posts/`). Nothing was deleted. Once you're happy with the Astro version, you can delete those files — or keep them around as a backup.

The design language (tokens, type, spacing, colors) was ported identically, so the two versions look the same.

---

## What you gave up vs. the old site

- **The Tweaks panel is gone.** The old HTML had a live customisation panel (accent swatches, font pairings, density toggles). Astro is a static site — those "live" tweaks don't make sense in the same way. If you want to change accent color, edit the `--accent` value in `src/styles/global.css` and rebuild. It's a one-character edit.

- **A single theme toggle (light/dark) survives** in the nav bar and persists in `localStorage`.

- Everything else — the homepage, the blog, the posts, the RSS feed — is the same or better.

---

## Questions

- Astro docs: https://docs.astro.build
- Content collections (how posts work): https://docs.astro.build/en/guides/content-collections/
- Markdown features (math, syntax highlighting, mdx): https://docs.astro.build/en/guides/markdown-content/
