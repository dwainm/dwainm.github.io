---
title: "So I tried an editor called VIM"
pubDate: 2017-05-26
tags:
  - vim
  - tools
  - learning
---

## But Why?

I've tried many editors, but with each of them, I found a few things I didn't like. I always knew about VIM and I knew how to exit vim ( [link for the pun](http://sdtimes.com/stack-overflow-trouble-exiting-zim/) ), but never thought it serious enough to work in until I saw how magically other people were using it.  That's when I started thinking about trying it out. I've been using it for little over a month now and this week marks the end fo the first week of using it at work.

## First steps

I started googling around for the best guides on where to start. This led me to the book called [Practical Vim](https://pragprog.com/book/dnvim2/practical-vim-second-edition). This is the only book a beginner needs. It covers all the most important things you need to know. It also gives you a great foundation from which to grow your very own .vimrc.

## The IDE rabbit hole

On making the switch I realised that I'm seriously going to miss PhpStorm if I don't figure out how to use VIM effectively.

Enter plugins, the magical stuff you drop in to give VIM super powers. Then enter plugin managers. The first one I tried was one called [**Pathogen**](https://github.com/tpope/vim-pathogen). It worked like a charm, but then I realised I needed to add git submodules for each new plugin. The thing with vim is that you want to version control all the things so you can easily take your environment with you when switching machines. So I've got a plugin manager and I have that under version control, but adding so many submodules was not working out especially after the 5th plugin. I eventually switch to something that only keeps a few strings in your config called [Plug](https://github.com/junegunn/vim-plug).

Side note, if you want the best way to keep your dotfiles on GH see this: https://news.ycombinator.com/iterThem?id=11070797

Now that you have all the vim niceness you'll soon realise you need a better way to manage the terminal. You need tabs, panes or some sort of split window system. There are many, many options. I looked at a few and decided on [Tmux](https://tmux.github.io/), the main reason for doing so is that it is terminal based and works on many platforms. I'm totally happy with this.

## Mastery

I hear that people use this editor for years and still learn new things. I've seen from using it for a month that you're alway tweaking your workflow. There's always something new that you can add or change in your **.vimrc.**  The best thing about VIM is that no two people use it in the same way. It should become an extension of your thoughts so that the editor gets out of your way. I'm not there yet, but I can see how my muscle memory is forming day by day.

## Portability

I can now freely move between machines and take my editor with me.  **I** has **dot files**: [https://github.com/dwainm/dotfiles](https://github.com/dwainm/dotfiles)

## My Struggles

In PhpStorm, Cmd + L gives you this magic wand that fixes code indentation a common coding standard issues. I miss it so much. I need to figure out how to do this in VIM.

Another struggle I have now is that I'm constantly pressing the wrong keys. This will probably get better with time. I found that I can use the numbers keys at the top fo the keyboard because I don't know where keys 4-7 is in the dark. I'll have to learn this.

Lastly I the struggle is just to adjust to a new workflow. One where I'm constantly tweaking things to better my productivity. I believe this will pay off over time and I'm excited about my new vim adventure.
