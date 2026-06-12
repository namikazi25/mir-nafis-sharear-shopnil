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

## If GitHub login says `api.netlify.com/auth?... not found`

That error means Decap CMS loaded correctly, but authentication is not configured for a GitHub Pages-only site yet.

By default, Decap's GitHub backend falls back to Netlify's OAuth helper. The attempted URL looks like this:

```text
https://api.netlify.com/auth?provider=github&site_id=namikazi25.github.io&scope=repo
```

That URL returns **not found** because `namikazi25.github.io` is a GitHub Pages site, not a Netlify site registered with Netlify's OAuth provider. A static GitHub Pages site cannot safely store the GitHub OAuth client secret that Decap needs to exchange a GitHub login code for an access token.

To make `/admin/` publishing work on GitHub Pages, add one of the authentication options below.

## Recommended fix for GitHub Pages: add a Decap GitHub OAuth proxy

For a GitHub Pages site, keep the site hosted on GitHub Pages and deploy a tiny OAuth proxy somewhere that can keep secrets, such as Cloudflare Workers, Vercel, Netlify Functions, AWS Lambda, Google Apps Script, or another serverless host.

High-level steps:

1. Create a GitHub OAuth App in GitHub developer settings.
2. Set the OAuth app **Homepage URL** to your live site URL, for example `https://namikazi25.github.io/`.
3. Deploy a Decap-compatible OAuth proxy.
4. Set the OAuth app **Authorization callback URL** to the proxy callback URL, usually:

   ```text
   https://YOUR_DECAP_OAUTH_PROXY_DOMAIN/callback
   ```

5. Configure the proxy with the GitHub OAuth app client ID and client secret.
6. In `admin/config.yml`, uncomment and replace `base_url` with your proxy domain:

   ```yaml
   backend:
     name: github
     repo: namikazi25/mir-nafis-sharear-shopnil
     branch: main
     base_url: https://YOUR_DECAP_OAUTH_PROXY_DOMAIN
     auth_endpoint: auth
   ```

7. Commit and deploy that change, then return to `/admin/` and log in again.

Decap expects the proxy to provide these endpoints:

- `/auth` — starts the GitHub login flow.
- `/callback` — receives GitHub's callback and sends the access token back to the Decap CMS admin window.

## Alternative fix: host the site on Netlify instead

If you want to use Netlify's built-in Decap/Netlify CMS authentication instead of deploying your own OAuth proxy, host the site on Netlify and configure the GitHub auth provider in Netlify. In that setup, Netlify recognizes the site and the `api.netlify.com/auth?...` URL can resolve correctly.

If you continue using GitHub Pages only, the Netlify auth URL will keep failing until you either add a custom OAuth proxy with `backend.base_url` or move the site to Netlify.

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

## Current Decap backend configuration

The Decap CMS backend currently points at:

```yaml
backend:
  name: github
  repo: namikazi25/mir-nafis-sharear-shopnil
  branch: main
```

The config also includes commented OAuth proxy placeholders:

```yaml
  # base_url: https://YOUR_DECAP_OAUTH_PROXY_DOMAIN
  # auth_endpoint: auth
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
