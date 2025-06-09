---
title: "Remove Disqus comments from WordPress pages"
date: 2013-09-18
tags:
  - wordpress
  - disqus
  - tutorial
---

You have just installed the [Disqus](http://wordpress.org/plugins/disqus-comment-system/‎) comment system on your WordPress blog and now you see it appearing all over the show, on both pages and posts alike. I ran into the same issue and for obvious reasons only wanted to show it on single blog posts and would love to share how I fixed this with you.

There are only two simple steps so be sure to do exactly as I explain.

### Step 1

Disqus is added to your posts and page alike through the WorPress 'comments\_template' filter. In order to override this we  will have to disable this filter from being called by the plugin. To do this add the following code to your theme's functions.php:

https://gist.github.com/6607344.git

This will only disable Disqus, but will still show the default comment system, which we'll remove in the next step.

### Step 2

The final step will simply be to remove the default comment system from pages as well. To save you some time there is already a plugin that does this: [http://wordpress.org/plugins/disable-comments/](http://wordpress.org/plugins/disable-comments/)

After installing and activating this plugin. Go over to the settings and make sure you select by post type option ensure that only blog posts are unchecked ( meaning comments will be hidden for the checked post types).
