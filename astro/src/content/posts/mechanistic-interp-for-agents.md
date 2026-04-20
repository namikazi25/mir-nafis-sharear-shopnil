---
title: 'What would mechanistic interpretability for agents even look like?'
description: 'Circuits gave us a vocabulary for forward passes. Agents run loops, call tools, and talk to themselves. We need new units of analysis.'
pubDate: 2026-03-18
tags: ['interpretability', 'agents', 'llm-reasoning']
---

When I tell people I'm interested in mechanistic interpretability for *agents*, the usual response is a polite pause. The word "agent" has been so thoroughly laundered by product copy that it's hard to treat as a research object. But there's a real thing under the marketing — and it's the thing I keep running into in my own work at Fatima Fellowship.

An LLM agent, in the sense I mean, is a forward pass wrapped in a loop with memory and tools. The loop decides when to stop, the tools are mostly opaque to the model, and the memory is whatever context we stuff back in on the next step. It is, in other words, a **computational system composed of forward passes** — and the unit of interpretability we have (the circuit inside one forward pass) is not obviously the unit of analysis we need.

> The interesting behavior of an agent is rarely in a single forward pass. It's in the sequence.

## What circuits buy us

The circuits agenda — induction heads, indirect-object identification, the SAE work on superposition — gave us something genuinely new: a way to say *what* part of a model is doing *what*, in terms of the model's own internal variables.

But every sentence like that is scoped to a single forward pass. The implicit picture is: input goes in, computation happens, output comes out; we study the computation.

## What agents do differently

Three things change when we move from model to agent.

### 1. State lives outside the weights
In a vanilla forward pass, all the state is in the residual stream. In an agent, the state is in the *context window*, which is a text buffer that the model itself wrote.

### 2. Tools are an oracle
When the agent calls a web-search tool, a chunk of external information is injected into the context. From an interpretability point of view it's a giant hole in our story: the model's next-step behavior depends on content we didn't cause.

### 3. Loops compose
A single-step behavior can be faithful to a circuit-level story. A ten-step behavior is the composition of ten circuit-level stories, mediated by the text the model writes between steps.

## Candidate units of analysis

If the circuit isn't the right unit, what is? Here are four candidates I find myself using in practice on MERIT.

**The plan.** The decomposition the model writes down before it starts calling tools.

**The step type.** Is this step a retrieval, a synthesis, or a commitment? These categories aren't in the prompt; the model falls into them.

**The tool trace.** The sequence of tool calls and what came back. The most *auditable* artifact in the whole system.

**The self-talk.** What the model writes to itself between tool calls. This is where faithfulness questions live.

## What I want to try

1. **Patch across steps.** Activation patching works inside one forward pass. The agent analogue is *context patching*: swap one step's self-talk for another's and see how downstream tool calls change.
2. **SAEs on plan embeddings.** If step types are real, they should show up as directions in the residual stream.
3. **Evidence-graph ablations.** Drop individual nodes from the evidence graph MERIT builds and watch the verdict.
4. **Tool-use dictionaries.** Train an SAE on the activations right before a tool call.

---

None of this is a research program yet — it's a list of things I'd like someone to yell at me about. If you're working on any of this and I'm missing the literature, [please write](/#contact).
