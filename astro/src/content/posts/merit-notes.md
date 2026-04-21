---
title: 'MERIT, in my own words'
description: "A plain-English tour of the MERIT pipeline — why we built it, what went wrong the first three times, and what I'd do differently."
pubDate: 2026-02-04
tags: ['papers', 'agents', 'misinformation']
---

MERIT is a system for flagging multimodal misinformation — the kind where an image and a caption together tell a story that doesn't hold up. A picture of a flood from 2011 captioned as last week's storm; a real politician pasted onto a fake stage.

The paper explains the method. This post is about *why the method looks the way it does*, which is a much messier story.

## The first impulse was wrong

We started where everyone starts: train a big multimodal classifier, throw lots of labeled examples at it, report an F1 score. The classifier worked fine on its evaluation set and fell over on anything it hadn't seen. Worse, when it was wrong we couldn't tell *why*. A 0.87 F1 from a black box is not useful to a journalist or a moderator; it's a confidence level with no trace.

> The whole point of this problem is auditability. If we can't show our work, we haven't solved anything.

## The second impulse was also wrong

We tried prompting a frontier LVLM: "is this claim consistent with this image?" It produced fluent, confident, often-wrong answers. When it was right it couldn't tell us why. When it was wrong it made up evidence. This is a general property of large models on open-world tasks — I don't mean it as a dig — but it made the auditability problem strictly worse.

## What we actually built

MERIT is four pieces that look simple in retrospect:

1. **A planner.** An LVLM that reads the claim-plus-image and writes down a plan: what sub-questions would need to be answered to verify this? What would count as evidence?
2. **A toolbox.** Web search, reverse image search, entity grounding, fact-check APIs. Each tool is dumb on its own.
3. **An evidence graph.** Tool outputs get parsed into nodes (claims, entities, images, dates) with typed edges between them. This is the artifact a human can read.
4. **A verdict head.** Given the graph, commit to a verdict and a short rationale that cites specific nodes.

The trick is that the *graph* is the interface. If you disagree with the verdict, you look at the graph. If a node is wrong, you patch it. If the graph doesn't support the verdict, that's a bug you can point to, not a vibe.

## What surprised us

Three things.

**The planner was the bottleneck, not the tools.** Early on we assumed our search tools were the weak link. They weren't. A good plan with mediocre tools beat a mediocre plan with great tools, every time.

**The graph caught mistakes we would have missed.** When a run failed, the graph usually had a visibly missing node — a source never consulted, an entity never grounded. That's information the F1-score approach had thrown away.

**Rationales that cite nodes are weirdly hard to game.** The model can't hallucinate a citation that doesn't exist in the graph; the graph is a finite structure we built. The rationale is forced to be faithful to something concrete.

## What I'd do differently

The pipeline as shipped has a latent bug I want to call out: the planner and the verdict head are the same LVLM with different prompts. That's convenient but it lets the model cheat — the verdict can leak information that was never in the graph, because the same weights saw the raw claim earlier. In v2 I'd make these *separate* models, or at least different LoRA adapters, and treat the graph as the only channel between them.

---

If any of this is useful, the paper is on [arXiv](https://arxiv.org/abs/2510.17590) and a reference implementation is coming to [GitHub](https://github.com/namikazi25).
