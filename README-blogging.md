# Blogging with Jekyll and Decap CMS

This repository now has a minimal Jekyll blog layered on top of the existing portfolio pages. The homepage, CV, publications page, images, and existing CSS are preserved; the new blog workflow adds Markdown posts in `_posts/` and a browser editor at `/admin/`.

## Current site structure

- The root site is static HTML/CSS, now with Jekyll layouts for the blog.
- Blog posts are Markdown files in `_posts/`.
- The blog index is `blog.md` and is served at `/blog/`.
- Individual post pages use `_layouts/post.html`.
- The Decap CMS admin UI lives in `admin/index.html` and is served at `/admin/`.
- Decap CMS configuration lives in `admin/config.yml`.
- The GitHub repository configured for Decap CMS is `namikazi25/mir-nafis-sharear-shopnil`.

## How to open the browser editor

1. Visit `https://YOUR_SITE_DOMAIN/admin/`.
2. Log in with GitHub through Decap CMS.
3. Click **New Blog Post**.
4. Write in Markdown or rich text.
5. Click **Publish**.

Published posts are committed to `_posts/` as Markdown files. Jekyll then rebuilds the site and the post appears on `/blog/` automatically.

## Post format

A post created by Decap CMS will be saved in `_posts/` with a Jekyll-compatible filename such as:

```text
_posts/2026-06-12-my-post-title.md
```

Each post uses front matter like this:

```yaml
---
title: "Example Blog Post"
date: 2026-06-12
description: "Short summary of the post"
tags: [machine-learning, interviews]
published: true
---
```

The post body below the front matter is normal Markdown.

## Authentication reality check

Decap CMS can load from `/admin/` with only the files in this repository, but publishing to GitHub requires an OAuth authentication flow. If login does not work, configure one of these supported GitHub authentication options:

### Option A: Netlify Identity / Git Gateway

This is common for Decap CMS, but it requires hosting through Netlify or adding Netlify Identity to the site. If you continue using GitHub Pages only, this is usually not the simplest path.

### Option B: GitHub OAuth proxy for Decap CMS

For a GitHub Pages site, you need a small OAuth proxy service because static GitHub Pages cannot keep a GitHub OAuth client secret by itself.

High-level steps:

1. Create a GitHub OAuth App in GitHub developer settings.
2. Set the homepage URL to your live site URL.
3. Set the authorization callback URL to the callback URL required by your chosen Decap CMS GitHub OAuth proxy.
4. Deploy or use a trusted OAuth proxy that supports Decap CMS GitHub backend authentication.
5. Configure the proxy with your GitHub OAuth app client ID and client secret.
6. If your proxy requires it, add its URL to `admin/config.yml` under the `backend` block, for example:

   ```yaml
   backend:
     name: github
     repo: namikazi25/mir-nafis-sharear-shopnil
     branch: main
     base_url: https://YOUR_AUTH_PROXY_DOMAIN
   ```

7. Return to `/admin/` and log in with GitHub.

The Decap CMS backend currently points at:

```yaml
backend:
  name: github
  repo: namikazi25/mir-nafis-sharear-shopnil
  branch: main
```

If the default publishing branch changes, update `branch` in `admin/config.yml`.

## Local testing

Install the GitHub Pages/Jekyll gems:

```bash
bundle install
```

Run the site locally:

```bash
bundle exec jekyll serve
```

Then open:

- Homepage: `http://127.0.0.1:4000/`
- Blog: `http://127.0.0.1:4000/blog/`
- Sample post: `http://127.0.0.1:4000/blog/2026/06/12/example-post/`
- Admin UI: `http://127.0.0.1:4000/admin/`

Local Decap CMS can load the editor, but GitHub publishing still depends on the OAuth setup described above.
