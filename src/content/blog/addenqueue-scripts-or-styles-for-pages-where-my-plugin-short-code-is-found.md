---
title: "Add/Enqueue Scripts or Styles for pages where my plugin short code is found"
pubDate: 2012-08-16
tags:
  - wordpress
  - programming
  - tutorial
---

So you have the neat plugin and you're really excited about getting it done, but you don't want this wonderful plugin loading un necessary scripts and styles for every page.

This tutorial assumes that your plugin contains the short code already, if not go [here](http://codex.wordpress.org/Shortcode_API).

**See the code bellow:**

\[sourcecode language="php"\]

function my\_scripts\_method() {

global $post; // get the current post

if ( !empty($post) ){ // check the post content for the short code if ( stripos($post->post\_content, '\[fbalbumsync')!==FALSE ){ // we have found a post with the short code wp\_register\_script( 'jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js'); wp\_enqueue\_script( 'jquery' ); // $url contains the path to your plugin folder $url = plugin\_dir\_url( \_\_FILE\_\_ ); wp\_enqueue\_style( 'myplugin\_style',$url.'1140.css' ); wp\_enqueue\_script('my\_plugin\_js',$url.'plugin.js' ); } } } // add scripts to wordpress front end with this hook add\_action('wp\_enqueue\_scripts', 'my\_scripts\_method');

\[/sourcecode\]

I hope this helps you better your plugin.
