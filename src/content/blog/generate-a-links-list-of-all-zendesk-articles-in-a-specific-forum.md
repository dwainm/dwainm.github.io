---
title: "Generate a link list of all Zendesk articles in a specific forum"
date: 2013-06-10
tags:
  - zendesk
  - automation
  - scripting
---

I needed to print out a list of links for all articles in a specific forum, for use in our Project management system. I had to go through all the items to ensure that they are compatible with the latest version of our Canvas Theme.

I've used chrome for this and suggest you do the same as I don't know how to replicate this other browsers.

1) Navigate to the specific forum on the Zendesk agent panel. In this case canvas.

![alt](/images/blog/zendesk_forum_link_lists_1.png)

2) Scroll down to the bottom of the page and click more until all the items are displayed on the page:

![alt](/images/blog/zendesk_forum_link_lists_click_more.png)

3) Then Open the chrome developers console and click on console:

![alt](/images/blog/zendesk_forum_link_lists_developer_console.png)

4) Past the code below inside the console and press enter _( be sure to change **line:4**  from  support.woothemes.com support your own domain)_:

\[code language="javascript"\] var count = 0; jQuery("#content\_entries .frame .item").each(function(index){ count++; console.log("http://support.woothemes.com"+jQuery(".item-info h1 span a", this).attr("href") ); }); console.log(count); \[/code\]

5) You will now see a nice list of  items which you can copy as a todo list on your project management software. [Trello](http://trello.com) allows you to paste this whole list and creates individual to do list items .

![alt](/images/blog/zendesk_forum_link_lists_nice_list.png)
