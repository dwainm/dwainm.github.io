# A lesson on the true cost of AI

**Published:** March 26, 2026  
**Cost to write this post:** ~$65 in API credits  
**Lesson learned:** Priceless

---

I run my own coding harness ([pi](https://github.com/badlogic/pi-mono)) for AI-assisted development. Unlike Claude Code or other managed tools, I control everything: the extensions, the models, the token counting, the cost tracking. I thought this gave me an edge. I was right, but not in the way I expected.

Today, I learned that **AI being cheap is a dangerous illusion.**

## What Happened

I was working on some code, iterating with an AI model. My harness has a footer that shows token usage. It displayed numbers like:

```
$0.0023 329k/19k [$0.00 -> $0.00]
```

Translation: "You've spent $0.0023 using 329k input tokens and 19k output tokens. Balance is $0.00."

I had $2.17 in prepaid credits. Plenty, right?

**Wrong.**

## The Bug That Revealed the Truth

My cost tool had a critical bug: it only counted `input` and `output` tokens. It completely ignored `cacheRead` tokens. I didn't know this. The model I was using—`kimi-k2-thinking`, a deep reasoning model—was doing something behind the scenes:

On every request, it re-read the entire conversation context. Thousands of cached tokens, every single turn.

Here's one actual request from my logs:

```
"usage": {
  "input": 46,
  "output": 85,
  "cacheRead": 4810,
  "totalTokens": 4941
}
```

My tool showed: **"46/85 tokens"** (131 total)  
**Actual billing:** **4,941 tokens** (38x more!)

Another request later in the session:

```
"cacheRead": 12162
```

The tool showed 147 input + 149 output = 296 tokens.  
**Reality:** 12,458 tokens (42x more!)

## The Damage

I checked my session logs for today. The numbers:

| Session | Tool Showed | **Actual** | **Hidden Cache** |
|---------|-------------|------------|------------------|
| 19:41 | 565 | 10,194 | 9,629 |
| 19:56 | 52,776 | 123,293 | 70,517 |
| 20:18 | 80,873 | 480,534 | 399,661 |
| 20:28 | 587 | 10,218 | 9,631 |
| 20:29 | 254 | 5,075 | 4,821 |
| 20:30 | **330,562** | **3,360,014** | **3,029,452** |
| **TOTAL** | **~464,000** | **~3,990,000** | **~3,526,000** |

**4 million tokens** billed. **464,000 shown.**

At ~$1-3 per million tokens, that's not $0.50. That's **$65**.

I burned through my entire credit balance in one evening of casual coding.

## The Realization

Here's what I understand now that I didn't this morning:

### 1. Thinking Models Are Context Monsters

Deep reasoning models (`kimi-k2-thinking`, `o1`, `o3`, etc.) generate massive internal monologues. They show their work. "Let me think about this... Step 1... Step 2..." 

That thinking gets cached. On the next request, they re-read ALL of it, plus all previous conversation turns.

**Non-thinking model, 50 turns:** 50 × 200 tokens = 10,000 tokens  
**Thinking model, 50 turns:** 50 × (200 + 5,000 cacheRead) = 260,000 tokens  

**26x more expensive** for the same workflow.

### 2. Cache Read Is 50% Cheaper—But Still Real Money

Fireworks (and other providers) discount cached tokens by 50%. That's fair. But 50% of "a lot" is still "a lot."

At 4 million tokens with 3.5M cacheRead:  
- 500k regular @ $2/M = $1  
- 3.5M cacheRead @ $1/M = $3.50  
- **Total: ~$4.50 in compute**

But that's just the tokens. The hardware to serve them—the A100/H100 clusters, the power, the cooling, the ML engineers maintaining it all—that's what you're really paying for.

### 3. Running My Own Harness Saved Me (Eventually)

If I was using Claude Code or ChatGPT, I would have hit a rate limit or credit cap. But running my own harness with prepaid credits meant I could burn through everything without anyone stopping me.

That seems bad, right? But here's the thing: **I found the bug.**

Because I control the harness, I could:
- See the raw API responses
- Debug the token counting
- Realize cacheRead was missing
- Fix the tool
- Actually understand what was happening

Managed tools hide this from you. They show "$0.60 per million tokens" and let you run up bills you don't understand until the invoice arrives.

### 4. Why AI Isn't Cheap (And Why That's Okay)

Let's talk hardware:

- **A100 GPU:** $10,000-15,000 each
- **H100 GPU:** $25,000-40,000 each
- **To serve a thinking model:** 8-16 GPUs per instance
- **Your 4M tokens today:** Probably 50-100 GPU-hours across the cluster
- **Plus:** Power, cooling, data center rent, network, engineers

When I pay $65 for an evening of AI-assisted coding, I'm renting slices of a $500,000 server rack for milliseconds at a time. I'm paying ML engineers $300k/year salaries indirectly through API pricing.

**The AI isn't expensive. The illusion that it's cheap is what's expensive.**

## What I'll Do Differently

### Immediate Changes

1. **Watch the footer obsessively.** My tool now shows: `3.3M(329k/19k|2.9M)` — total (input/output|cacheRead). If cacheRead is >10x input+output, I'm bleeding.

2. **Use `/compact` every 10-15 turns.** This resets the context window. CacheRead drops to near zero. Cost per request drops 90%.

3. **Model-hop based on task.** Simple bash command? Non-thinking model (Ctrl+L to switch). Complex architecture review? Thinking model. Don't use a Ferrari to buy groceries.

4. **Start fresh sessions.** A new session has zero cache. A 3-hour session has 50,000 tokens of context being re-read every turn.

5. **Do more offline thinking.** I spent $65 to have an AI think for me. I could have thought for 30 minutes and spent $0.50.

### Strategic Shifts

- **Offline first:** Sketch architecture on paper. Write pseudocode. Use AI only for implementation details.
- **Batch mode:** Collect 10 tasks, do them in one focused AI session, then stop.
- **Human-in-the-loop validation:** Every AI suggestion costs tokens. Don't blindly accept; think first.

## The Broader Lesson

This isn't just about token costs. It's about **efficiency in the age of AI abundance.**

Everyone thinks AI makes you faster. It doesn't. It makes you *able to do more*, which means you *do more*, which means you *spend more*.

The winners won't be people who "use AI for everything." They'll be people who:
- Know when NOT to use AI
- Understand the real costs
- Build efficient workflows
- Think before prompting

Running my own harness forced me to confront this. Most people won't. They'll use managed tools, see "$0.60 per million tokens," and wonder why their monthly bill is $500.

## The Fixed Tool

If you run pi, here's what my token counter shows now:

```typescript
// Before: Only input + output
const tokensDisplay = `${fmt(totalInput)}/${fmt(totalOutput)}`;

// After: Total with cacheRead broken out  
const tokensDisplay = `${fmt(totalTokens)}(${fmt(totalInput)}/${fmt(totalOutput)}|${fmt(totalCacheRead)})`;
```

The display went from `$0.05 329k/19k` to `$0.05 3.3M(329k/19k|2.9M)`.

You can't optimize what you can't see.

## Final Thoughts

Claude Code has rate limits. Fireworks has monthly caps. OpenAI has usage tiers. They're not being stingy. They're trying to prevent exactly what happened to me today.

The hardware literally cannot scale infinitely at current prices. Every prompt you send spins up GPU compute that costs real money, burns real electricity, requires real infrastructure.

**AI is a Ferrari.** It's fast, it's powerful, and it's expensive to run. Use it when you need to win the race. Don't use it to drive to the grocery store.

My $65 bought me:
- A working cost tool that actually shows real usage
- Deep understanding of thinking model economics
- A framework for efficient AI-assisted development
- This blog post that might save someone else $650

**Not cheap. But worth it.**

---

**Running total for this post:** ~$0.40 (written with non-thinking model, compacted twice, checked footer obsessively)

*Lessons: $65. Learning to use AI efficiently: ongoing.*
