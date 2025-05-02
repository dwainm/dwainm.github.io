---
title: "Golang Channels: explained simply"
date: 2018-11-23
---

I see go channels as a pipe connecting two air tight vacuum cleaners. One vacuum cleaner can not push anything into the pipe, if the other vacuum is not pulling from the pipe. Both need to do the opposite action. If one sends the "package" will be stuck until the other turns on it's receiving action.

Channels can contain multiple slots for "holding" the "packages".

Pushing more into the pipe than wha the pipe can handle results in a broken pipe.

I also think of it as a queue, first in, first out ( last in last out ). The only difference is this one is ultra sensitive and very particular.
