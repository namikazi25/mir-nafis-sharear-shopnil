---
layout: default
title: Blog
description: Markdown posts by Mir Nafis Sharear Shopnil.
permalink: /blog/
---

<header class="page-head">
  <div class="shell">
    <p class="meta">Markdown Blog</p>
    <h1>Blog</h1>
    <p class="page-sub">Notes and essays on research, machine learning, interpretability, and building things.</p>
  </div>
</header>

<section class="block">
  <div class="shell">
    <div class="post-list">
      {% for post in site.posts %}
        <article class="post-card">
          <p class="meta">{{ post.date | date: "%B %-d, %Y" }}{% if post.tags and post.tags.size > 0 %} · {{ post.tags | join: ", " }}{% endif %}</p>
          <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
          {% if post.description %}<p>{{ post.description }}</p>{% endif %}
        </article>
      {% else %}
        <p>No posts yet.</p>
      {% endfor %}
    </div>
  </div>
</section>
