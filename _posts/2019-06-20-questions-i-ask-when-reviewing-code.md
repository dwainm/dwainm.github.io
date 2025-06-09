---
title: "Questions I ask when reviewing code"
date: 2019-06-20
tags: [programming, code-review, process]
---

The work of building software in a team context is not quite the same as when you're working on a hobby project. On an existing project, you must consider paying customers, product quality, engineering excellence, and many other variables that make shipping production code much more challenging. We expect others to review our code to ensure it meets the highest standards before it is sent out into the world and the same is excpected from us.

In the last 10 years, I have done about [700 reviews](https://github.com/pulls?page=29&q=is%3Apr+-author%3Adwainm+reviewed-by%3Adwainm+created%3A2012-01-01..2023-02-01+is%3Aclosed). I've learned a lot and have made a lot of mistakes. I wanted to note my process to ensure I can reference it occasionally and improve it as I learn more. And what better way to do this than to share it on this blog?

Before getting to the questions, I want to note one thing. Always state feedback in the context of the team or group, using phrases like "Can we name this differently?", "Could we have approached this from a different angle? "Never say: I don't like what you've done here or your work is not great".

These are some of the things I go through and questions I ask when reviewing code:

1. Does do what it says. Testing how it works. Run the tests etc.

3. Does it make sense? Even though it works, does it really make sense for the new changes to be added in this way? Is it hacky in that it adds bloat or doesn't follow conventions already in the codebase?

5. Is it done in the best way? Are there any quick wins for changes?

7. Does it introduce unwanted side effects?

9. Is anything missing? Did the developer overlook something?

11. Run the tests and see if the testing approach is good for the given change.

13. Before submitting: Is my review accurate? Will my response add unesescarry work for the person, and if so, is that warranted?

15. Before submitting: Is my review worded respectfully? I'm I referring to the solution and not the person?

I could have expanded each item out a bit more, but for now I wanted to get this post out. It has been a draft post since 2019. I hope this helps you add more structure to your reviews.
