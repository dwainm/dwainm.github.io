---
title: "AI credits and a little inconvenience"
pubDate: 2025-07-25
tags:
  - tmux
  - productivity
  - learning
---
# The Afternoon I Learned to Love `tmux list-sessions`

This afternoon I had too many tmux sessions cluttering my workspace - mostly abandoned shells from quick tasks I'd forgotten about. It was Friday, I had time, and I had Claude credits. Why not build a plugin to auto-clean idle sessions?

Wrong. It's now 00:45. After hours of fighting tmux's primitives, I gave up and tried something simple: `tmux list-sessions`.

## The Overengineering Begins

I designed a smart plugin with dual criteria: old unnamed sessions (0, 1, 2...) older than an hour, and never-used sessions with no activity since creation. Simple, right?

## Hours of Prompting and Testing

TPM plugin. Command aliases. Interactive choosers. Clean output showing session names, window counts, inactivity reasons:

```tmux
set -g @plugin 'dwainm/tmux-inactive-sessions'
```

```
13:        1 windows (no process running)
14:        1 windows (no process running) 
27:        1 windows (no process running)
```

Perfect, right? But putting it all inside a plugin didn't end up working as well as I thought.

## The Complexity Spiral

Command aliases. Shell arithmetic comparing timestamps. Process checking with `ps -o pid= --ppid`. A 10-second tolerance window for tmux initialization. The simple filter was easy to implement, but getting it to work with choose-tree was a nightmare. Even AI can bump its head into a rock multiple times and not question the approach.

```bash
activity_diff=$((latest_activity - created))
```

I wanted choose-tree behavior but couldn't extend it. Tried fzf, display-menu - nothing felt native. 

## The Realization

`tmux list-sessions` was all I needed. No automation, no smart tooling. Just look at the list of sessions and zap the ones you don't want. I didn't need complexity to figure out which ones I no longer needed. It was all there, and choose-tree provided all the functionality to save me dollars and hours. But the best plugin is often no plugin at all.

Next time you catch yourself building a tool, ask: "What if I just did the thing?" Sometimes the best tool is your eyes, 60 seconds, and a little inconvenience. 
