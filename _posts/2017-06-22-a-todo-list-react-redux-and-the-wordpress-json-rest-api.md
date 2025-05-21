---
title: "A todo list, React, Redux and the WordPress JSON REST API"
date: 2017-06-22
---

I always wanted to create a very simple WordPress based Todo App. After putting it off for a very long time I finally had the time to look into it.

### The Idea

The idea was a simple todo list that takes over your WP home page and relies on a standard to do post type for persistence. The interface should be driven by React using redux for state management.  The result should be WordPress plugin that simply works without any configuration. The app works over the WordPress JSON REST API and must have a very simple UI framework.

![Screen Shot 2017-06-19 at 11.42.07 PM](/images/screen-shot-2017-06-19-at-11-42-07-pm.png)

### The Parts

1.Defining the data we need to store:

- user - name and login details. For this, I cheated and simply use the WP login interface.
- Todo item -  with the ability to save details on a todo. For this, I use simply used a new post type. The title being the todo, the content being further information and post meta to store the state( completed/not completed )

2\. Define the todo post type which we'll use to store todo items. Each todo item relates to a post. You will notice that it's not anything fancy but includes a few rest API configuration to make it easy for us to call posts at a later stage.

3\. Setting up the JS system. I used Webpack to manage all frontend modules. I used yarn for package management and also Bable to allow me to use ES6 syntax.

4\. For the UI framework, I used spectre as it is very light: https://picturepan2.github.io/spectre/

5\. For user authentication, I used the user login and then relied on the WP cookie to allow the user to create todos over the REST API.

You can find the source code to play with here, it's a wp plugin so you can install it:

[https://github.com/dwainm/wpdone](https://github.com/dwainm/wpdone)

I attempted this project mainly because wanted learn about all the new frontend tools. I mostly work in PHP and doing this was very refreshing. I'm inspired to do more of these. Even if no one ever needs it, I built it coz I wanted to.
