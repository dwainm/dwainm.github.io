---
title: "gap, my most loved git command"
date: 2019-05-30
tags: [git, programming, tools]
---

`gap` the alias I created, mapping to `git add -p` has been one of my most typed commands ever since I changed my workflow.

**What this does :**

It breaks up your diff into smaller chunks that help you avoid committing things you really don't want to and helps you know exactly what code is going into the next command. For each chunk, you can choose to stage it or not. All staged changes are those that will be included in your next commit.

![](/images/b267e-screenshot-2019-05-27-at-06.20.40.png)

To add this command it opens your `.bashrc` in any editor and add this to it: `` alias gap="git add `-p` ``

It doesn't matter if you use Git CLI or the app as you get the same things done, but if you really want to get comfortable with it, start using the terminal. It will be painful in the beginning, but you'll learn more about Git this way.
