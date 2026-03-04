---
title: "Mountain Lion, Git “Command Not Found” (2 min fix)"
date: 2012-12-19
tags:
  - git
  - mac
  - troubleshooting
---

I found this while trying to figure out why I'm getting the error.

1\. open your ~/.bash\_profile,

if you use textmate it would be : $ sudo mate ~/.bash\_profile

2\. add this line to the file: export PATH=$PATH:/usr/local/git/bin/

3\. Save & close the file and type on the terminal: $ source ~/.bash\_profile

\*All\* the credits go to these guys:

[http://www.hongkiat.com/blog/mountain-lion-git-fix/](http://www.hongkiat.com/blog/mountain-lion-git-fix/) [http://stackoverflow.com/questions/6810059/git-on-mac-os-x-lion](http://stackoverflow.com/questions/6810059/git-on-mac-os-x-lion)
