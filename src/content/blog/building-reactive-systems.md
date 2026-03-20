---
title: "Building Reactive Systems: Conference Talk."
pubDate: 2020-01-30
tags: [programming, architecture, book-review]
---

I watched an interesting talk about building high availability systems and thought the simplicity was quite fascinating.

Simple systems are those where the focus is business logic and not compute complexity. Complex business logic should not imply a complex system.

Reactive systems scale very well as they are:

- Responsive
- Resilient
- Elastic
- Message Driven

In this talk Dave Farley explains how to design these reactive systems. It's all based around the premise of passing messages and progressing the state of domain models. With this approach components/sub systems can be decoupled, which makes it easier to reason about the system.

Note that this is not about asynchronous processes, as in call backs , but rather asynchronous design where the domain model caries the weight of process state.

https://youtu.be/tKRa0O7aepo?list=WL

Video URL: [https://youtu.be/tKRa0O7aepo](https://youtu.be/tKRa0O7aepo)
