---
title: "One year at the helm of Vim"
date: 2019-02-21
---

One year ago [I started using an old text editor called Vim.]({% link _posts/2017-05-26-so-i-tried-an-editor-called-vim.md %}) I'm happy to say that I'm still sticking with it. I'm now very comfortable with VIM and more empowered translate Ideas into working solutions.

In this year I've become accustomed to working the terminal, embracing the VIM way while realizing that that coding is just one part of the challenge.

<!--more-->

## Not your IDE

Transitioning from [PhpStorm](https://www.jetbrains.com/phpstorm/), I desired the same IDE-like features in VIM. After multiple config changes and plugin tests, I had an epiphany: VIM is an editor and that's it. It is one of the tools in your shed. You combine it with other command line tools to empower an efficient workflow. I believe this is key to making the most of VIM.

With this also comes the realization that tabs, though it looks nice, is not the most efficient way to switch between files. A short list of buffers is the way to go. I always close the editor when I'm done with a task and re-open it for the next one. This ensures that all current buffers are closed and I can start with a low memory footprint every time.

## Who Uses Caps Lock anyways?

A common thing in the VIM community is to modifying CAPS LOCK key. As a programmer you don't really use CAPS LOCK, you will mainly use SHIFT for upper case. Some VIM users take CAPS LOCK as an extra escape and others as another CTRL. I have chosen CTRL as many commands require this button, which is awkwardly placed on my Mac Keyboard.

## Hard Times are good for you

One of the first things I embraced was Hard mode. With this activated, VIM disables the arrow keys for navigation and stops you from jumping up more than one line at a time (using `h,j,k,l`). This pushed me to use other movements. I would argue this to be a must for any VIM beginner. You simply don't understand how powerful these other movements are until you get used to them. It is excruciating in the begging but the benefits far outweigh the cost. After some time I turned this mode off and used ["Hard Time"](https://github.com/takac/vim-hardtime) instead, which works the same but is a little more forgiving.

## Undo and try again  

Practicing all the time is critical to mastering VIM. By practicing, I mean on the Job training, while you're working and editing. If you find that you did something and it took too long, or you remember a faster way to do it. Stop, undo and redo it in a more efficient way. This more effecient way becomes the default going forward and you save yourself many many seconds in future. Adding all these ups definitely increases your editing speed.

Another note on this is not to worry about the time it takes to add a shortcut to your config files. Every second you shave off your workflow gets multiplied by how many times you have to repeat the same editing tasks and this is a major win!

## Trying not to use so many plugins

The VIM plugin echosstem makes it much easier for newbies feel comfortable and for masters to craft the exact experience they desire.

I discovered that plugins can get in the way just as much as they can help. You need to make sure you really need a plugin before installing it. What I do is try to I try to get away without a plugin to see if I cant modify my VIMRC to do the same thing a plugin does. As a last resort, I'll use a plugin.

## **Onwards and Upwards?**

I would encourage everyone to learn VIM, but honestly but I understand that not every workflow will benefit from being close to the Command Line.

You are not in a mutually exclusive relationship with your editor. Use the one that's better for the task at hand. I occasionally jump into Atom ( forgive me VS Code champs ). As [Daniel Miessler puts it](https://danielmiessler.com/blog/differences-vi-vim-emacs/), the content matters more than the editor.

Let's not allow our tools to get in the way. These are our weapons of mass impact and ultimately only a means to an end.
