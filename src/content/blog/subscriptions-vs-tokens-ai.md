---
title: "Subscriptions vs Tokens"
pubDate: 2026-03-25
description: "Why paying for tokens beats paying for subscriptions"
tags: ["ai", "pricing", "workflow"]
---

I got access to a new program. I'm omitting the name because I want to focus on the idea more than the provider. The deal is, you pay $20/week for access to a specific model. This works out to about $80/month for one model. It's quite expensive but not unreasonable if you compare it with Claude Pro max plan.

Here's what I didn't realize : I'm not getting Kimi K2.5. I'm not even getting a model. I'm getting a **router** — and I have no idea what model it actually routes to.

I started getting degraded performance during a new feature building session. The model was making mistakes and I was producing results that I myself would not. I expect the models to have at least my level of coding awareness and more. During this session I gave the model a few times to fix the issue but for some reason it couldn't. That we I realised that I don't actually know what kimi turbo was. I also realised that paying a flat rate means I'm giving up control. 

## Investigation.

The model ID in my session logs showed: ``` .../kimi-k2p5-turbo ```. Notice that path: `routers/` — not `models/`. I tried to look up the model page. It returned **404 Not Found**.  According to the provider's site, they list routers as infrastructure to help you control the flow of requests to help you use he appropriate model for he job.  This was not an elaborate research process, so my findings might be incorrect, however. I realised  that I have no visibility. No control. No idea what I'm actually paying for. And this led to the idea looking back at my data for the last few weeks.

Here's my data across all my sessions.

| Metric | Tokens |
|--------|--------|
| Input | 18.6M |
| Output | 1.5M |
| (about half benefits from caching) | |

Now let's compare what I'm paying vs. what I'd pay with token-based pricing:

| Model | Monthly | Yearly | Savings vs Subscription |
|-------|---------|--------|------------------------|
| **Your Subscription** | $80 | $960 | — |
| Kimi K2.5 (full) | $11 | $133 | **$827/year** |
| DeepSeek V3.2 | $10 | $125 | $835/year |
| Qwen3 Coder 480B | $10 | $124 | $836/year |
| Claude Sonnet 4 | $54 | $643 | $317/year |

**I'm paying 7x more than I need to.**

For $11/month token-based, I'd get:
- Kimi K2.5 (full 1T parameters, not behind a router)
- Transparent specs, published benchmarks
- The ability to switch to any other model

For $80/month subscription, I get:
- A router I don't control
- No visibility into what model I'm actually using
- No way to compare alternatives

After processing this I knew what I had to do, but I still wanted to explore the idea of what subscriptions incentivize.

## What Token-Based Pricing Does Differently

When you pay per token:

1. **Direct model access** — Nomiddleman
2. **Transparent specs** — Published parameters, context, benchmarks
3. **Easy switching** — Try out models, keep the one that works
4. **Cost visibility** — You see exactly what you use
5. **Tool Control**  -  you get to choose which tools you use.


## The Problem

When you pay a flat subscription, the provider's incentives are obvious. Use the premium as efficiently as possible. This might not always mean degrading performance, but it could mean optimizations that do not benefit the user.

My session revealed the router model missed a critical bug:
- Wrote code that silently fell back instead of failing explicitly
- Didn't verify the fix.
- Claimed "done" without testing.
- Argued instead of fixing when I pointed out the error

Was this the router routing to a smaller model? A quantized version? I don't know. And that's the problem.

When you don't know what model you're using, you can't debug its behavior. You can't say "this model is bad at verification, let me try another." You're locked into whatever the router gives you.

## The Lesson

This isn't about money. It's about alignment. When providers optimize for subscription revenue, they optimize for lock-in and margin — not for your success. A router they control is a lever they can pull to reduce their costs without you knowing. When they optimize for token usage, they optimize for quality. The model that works best for you is the one you'll keep using. Transparent access makes both sides honest.

We are also chasing better and better models that are more expensive without us really understanding how they will improve the work we already do. Paying per token keeps us focused on results. Paying more for slightly better results will have us thinking twice. Using raw pricing will also help us hone in our efficiency.

Unlike many of the AI experts online, I'm very new to all of this. I'm open to being corrected. 
