---
title: "Converting HTML entities to UTF-8 in VimScript"
pubDate: 2022-08-04
tags:
  - vim
  - programming
  - scripting
---

I wrote a small script to fetch a web page title, inserting it as amarkdown formatted link: `[title](URL)` One of of the issues I ran into was that some titles contain HTML entities and Vim has no built-in way to deal with this.

The solution I came up with wasn't that grand, but the interesting part was that I learned about a UNIX utility, that also ships with MacOS, called `textutil`.

The solution was to do a system call passing a string with HTML entities, getting back a UTF-8 formatted string that VIM understands. Here is example that you can inVim:

```bash
let oldtitle ='👋 hello &lt; world 🌐 <   &#60 It’s a great day.'
let newtitle = system( 'echo ' . shellescape(oldtitle) . ' | textutil -convert txt -format html -stdin -stdout')
echo newtitle
```

![alt](/images/blog/screenshot-2022-08-04-at-09.25.26.png)
_Example output._

The special part I want to point your attention to is `' | textutil -convert txt -format html -stdin -stdout'`. This pipes the title into the `textutil` command which does all the conversions for us.

You can find the full function below.

```jscript
function! AddLink()
	let url = input('URL to add? ')
	if empty(url)
		return
	endif
	let html = system('curl -s ' . shellescape(url))
	let regex = '\c.*head.*<title[^>]*>\_s*\zs.\{-}\ze\_s*<\/title>'
	let title = substitute(matchstr(html, regex), "\n", ' ', 'g')
	let title = system( 'echo ' . shellescape(title) . ' | textutil -convert txt -format html -stdin -stdout')
	if empty(title)
		let title = 'Unknown'
	endif
	put ='[' . title . '](' . url . ')'
endfunction

```
