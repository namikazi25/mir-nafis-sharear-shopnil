---
layout: default
title: Writing
description: Engineering field notes, research explorations, and personal essays by Mir Nafis Sharear Shopnil.
permalink: /blog/
---

<header class="page-head">
  <div class="shell">
    <p class="meta">Engineering · Research · Notes</p>
    <h1>Writing</h1>
    <p class="page-sub">What I learn while building AI systems, exploring research, and figuring things out.</p>
    <p>Selected posts from across my website, Hashnode, and Medium, together in one place.</p>
    <div class="page-actions">
      <a class="btn-ghost" href="https://namikazi25.hashnode.dev/" target="_blank" rel="noopener">Hashnode</a>
      <a class="btn-ghost" href="https://medium.com/@shopnil" target="_blank" rel="noopener">Medium</a>
    </div>
  </div>
</header>

<section class="block">
  <div class="shell">
    <div class="writing-filters" id="writing-filters" aria-label="Filter writing by topic" hidden>
      <button type="button" data-filter="all" aria-pressed="true">All</button>
      <button type="button" data-filter="Engineering" aria-pressed="false">Engineering</button>
      <button type="button" data-filter="Research" aria-pressed="false">Research</button>
      <button type="button" data-filter="Notes" aria-pressed="false">Notes</button>
    </div>
    <p class="meta" id="writing-count" role="status" aria-live="polite"></p>
    <div class="post-list" id="writing-list">
      {% assign entries = site.posts | concat: site.data.writing | sort: 'date' | reverse %}
      {% for post in entries %}
        <article class="post-card{% if post.featured %} post-featured{% endif %}" data-tags="{{ post.tags | join: ',' | escape }}">
          <p class="meta">{% if post.featured %}Featured · {% endif %}{% if post.date_label %}{{ post.date_label }} {% endif %}{{ post.date | date: "%B %-d, %Y" }} · {{ post.source | default: 'On this site' }}{% if post.tags.size > 0 %} · {{ post.tags | join: ', ' }}{% endif %}</p>
          <h2><a href="{% if post.external %}{{ post.url | escape }}{% else %}{{ post.url | relative_url }}{% endif %}"{% if post.external %} target="_blank" rel="noopener"{% endif %}>{{ post.title | escape }}</a></h2>
          {% if post.description %}<p>{{ post.description | escape }}</p>{% endif %}
          <p class="post-read"><a href="{% if post.external %}{{ post.url | escape }}{% else %}{{ post.url | relative_url }}{% endif %}"{% if post.external %} target="_blank" rel="noopener"{% endif %}>Read {% if post.external %}on {{ post.source }} ↗{% else %}article →{% endif %}</a></p>
        </article>
      {% else %}
        <p>No posts yet.</p>
      {% endfor %}
    </div>
  </div>
</section>

<script>
(() => {
  const filters = document.getElementById('writing-filters');
  const cards = Array.from(document.querySelectorAll('#writing-list .post-card'));
  const count = document.getElementById('writing-count');
  if (!filters || !count) return;
  filters.hidden = false;
  function select(topic) {
    let visible = 0;
    cards.forEach(card => {
      const show = topic === 'all' || (card.dataset.tags || '').split(',').includes(topic);
      card.hidden = !show;
      if (show) visible++;
    });
    filters.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === topic)));
    count.textContent = `${visible} ${visible === 1 ? 'post' : 'posts'}`;
  }
  filters.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (button && filters.contains(button)) select(button.dataset.filter);
  });
  select('all');
})();
</script>
