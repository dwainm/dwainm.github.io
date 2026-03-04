---
title: "Docker Compose Volumes Empty?"
date: 2019-08-13
tags: [docker, programming, troubleshooting]
---

> The problem is that **you're expecting files from the Container to be mounted on your host**.  
> This is not the way it works: it's the other way around:  
> **Docker mounts your host folder in the container folder you specify**. If you go inside the container, you will see that where there were supposed to be the init files, there will be nothing (or whatever was in your host folder(s)), and you can write a file in the folder and it will show up on your host.
> 
> Answer from: [https://stackoverflow.com/questions/42395748/docker-compose-volume-is-empty-even-from-initialize](https://stackoverflow.com/questions/42395748/docker-compose-volume-is-empty-even-from-initialize)
