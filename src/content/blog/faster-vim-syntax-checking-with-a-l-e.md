---
title: "Faster VIM syntax checking with A.L.E"
date: 2017-06-20
tags:
  - vim
  - programming
  - tools
---

Is syntactic still slowing down your workflow, try A.L.E. It's a drop in replacement for syntastic ( make sure your language is supported ): https://github.com/w0rp/ale

It works with instantly with [vim-airline.](https://github.com/vim-airline/vim-airline)

This is the only line I've added to my vimrc is"

\[code\]

let g:ale\_open\_list = 1

\[/code\]
