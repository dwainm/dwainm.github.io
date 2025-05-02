---
title: "Software Complexity"
date: 2020-06-17
---

It is easy to define software complexity, but not so easy to define how complex a specific piece of software is. There have been lots of work in academia to find ways to describe it, but these approaches are not generally applied. Complex software directly [refers to its effects on the human](https://www.johndcook.com/blog/2008/08/26/different-kinds-of-software-complexity/) mind.

The software industry has a few methods for evaluating complexity. A well-known method is [Cyclomatic Complexity,](https://en.wikipedia.org/wiki/Cyclomatic_complexity) by Thomas J. McCabe, Sr. Cyclomatic complexity plots the number of linearly independent possible paths through a program. The reason why more possible paths introduce complexity is this; when changing a program, the maintainer needs to understand and keep those paths in mind to avoid introducing new bugs. Our human [brains have limited capacity](https://www.livescience.com/2493-mind-limit-4.html) for the number of options we can consider at the same time.

Along with looking at the actual program, you must also consider the context. One must weigh in the problem it attempts to solve, the domain it targets, and a few other factors. In some cases, you can simply glance and call it complex, but for others, complexity is revealed as you dig deeper.

All software starts as a set of requirements, and this initial phase is often where we sow seeds of complexity. Software Requirements are usually initiated by people who know what they want, but not necessarily how to build it. This may result in oversimplification of the efforts required, which may lead to shortcuts resulting in unwanted complexity. The requirements phase is the first place to root out complexity.

One can't always blame those who create these requirements, as they are often at the mercy of a complex problem domain. Think about aerospace or naval technology as examples. Certain fields are by nature complex and thus making the systems they produce have a higher level of necessary complexity.

There are two complexity flavours, according to academia. The first one, obviously named, is [Essential complexity](https://en.wikipedia.org/wiki/Essential_complexity). It is a level of complexity that is absolutely required for the system to function. The next one, also accurately named, is [avoidable complexity](https://resources.sei.cmu.edu/library/asset-view.cfm?assetid=453466). Though these names are clear, figuring out which parts are avoidable takes a lot of time. Software needs to be taken on the road and through all its paces. We've seen people use software in ways the designers haven't thought about forcing one to rethink avoidable and essential. Essential to whom? Avoidable for whom?

Simple processes can produce complex outcomes. Only the user experiences complexity. Why are we writing software? Is it for Business, business systems, end-users, or the next maintainer?

Attributing levels of complexity is a very subjective act. You should take into account all dimensions involved in a systems life cycle.

It is easy to think that complexity is a problem, but as long as a piece of software addresses a set purpose, the complexity is secondary. If the goal is for it to be simple, complexity is primary.
