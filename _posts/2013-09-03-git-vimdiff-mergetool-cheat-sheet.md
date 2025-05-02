---
title: "Git vimdiff Mergetool Cheat sheet"
date: 2013-09-03
---

Your project is progressing at an amazing pace. You're committing regularly, getting close to the release date when you suddenly hit a **merge conflict**! What do you do now?

You see something like : `file.extension : needs merge`. Frantically, you google and, see that opening the merge tool will help and now you're dumbstruck. I'll help you along here.

Vim Diff shows you 4 windows.

**The first thing** you should note about the four windows is that you can have the cursor in any one of the four and work from there. To move the cursor around you press:

`'CTRL + W'  ' CTRL + W'    (notice that you should press it twice)`

Now Let me explain each of the windows. ( not in order).

**(1)** The target branch, which is the one you're on now. This is where you would like to merge the other branch into, but this window is only used as a reference to see what the current branch looks like.

**(3)** The remote/merge branch which is the branch that you would like to merge into the local/target branch above (1).

**(2)** The most common ancestor of the target (1) and the merge(3) branch.

**(4)** The final branch into which you would like to merge the target and the merge branch. This a generated file into which the most common items are merged. This is where you need to pull items from target (1) and merge (3) into, to give you the final file.

**The second thing** you would like to do is move from one conflict area to the next.

`]c`  (right square bracket 'c') move you to the next conflicting text

`:ls` identify the windows (names and numbers) This is important so you can combine it with diffput and diffget commands below.

\`\[c\`   (left square bracket 'c') moves you to the previous conflicting text.

`:diffget  *     diff get takes a change and brings it into the current working window.` You need to use this with the identity that you find when  running :ls . You can also use 'do' as a shortened version (without the colon)

`:diffput` modify another buffer from the current focus area.

These are all of the operations you'll need to move changes from merge( window 3) and target ( window 2) into the final file.

I'll add more and change this cheat sheet as I discover this tool.
