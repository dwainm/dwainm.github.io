---
title: "Your guide to local remote git repositories."
date: 2014-08-06
---

Did you know that that **git** allows you to connect to a **remote** repository that is not so, remote ? I mean, you can actually connect to a repo in another folder and push and pull directly to and from it. I was recently faced a scenario where I had two working versions of the same repo in separate directories. I needed to make the changes in one place but then confirm the changes in a different context.

### A Few Lines of Command Line

I'm not sure how this will work on a git GUI client but for those who love the command line follow my simple instructions below.

#### Understanding remotes

A **remote** in simple terms is simply just a copy of the same repository, somewhere else( GitHub, Bitbucket, private git server ). Git hub allows you add multiple remotes via this command:

```
 git remote add <name> <URI>
 git remote add companyrepo git@github.com:company/repo.git
```

After adding this remote you can fetch all the branches from it so you can compare it locally. To do this simply run:

```
git fetch
```

Now to see all the branches that's been added  after the fetch request run :

```
git branch -a
```

If you need to read up more about remotes checkout [working with remote.](http://git-scm.com/book/en/Git-Basics-Working-with-Remotes "Working with remotes")

#### The Remote Repo Next Door

So I thought, if I can do that with a url to a git repo surely git must allow directories on my local machine as well? So it was, git doesn't distinguish between my **local** directory and a repository on a distant planet. So to get this working the first thing you'll need to do is: ensure that you have 2 (or more) of the same repositories. What I mean by the same is that they are both cloned from the same origin. Now open the command line and proceed to the directory where the main repo is. This is the place where you'll be working on your feature branch and committing code changes. Type \`pwd\` and copy the full path to the current repo's directory. In my case:

```
/Users/dwain/dev_repo_main/
```

Change directories and move to the other directory where you want to add the remote. In my case:

```
cd /Users/dwain/dev_repo_other/
```

Once you're in the second repo simply run this git command:

```
git remote add repo_main /Users/dwain/dev_repo_main/.git
```

After doing this you can check if it was added by running the following command.

```
git remote -v
```

You should see this:

```
origin git@github.com:company/repo.git (fetch) 
origin git@github.com:company/repo.git (push)
repo_main /Users/dwain/repo_main/.git (fetch)
repo_main /Users/dwain/repo_main/.git (push)

```

From this point forward you can make change in the main branch and pull them into your local branch.

```
git pull repo_main
```

Please note that when pushing to the

```
main_repo
```

it is advised that you create a feature branch before making your changes

```
 git checkout -b new-feature-branch
```

After making and committing your changes you can push this branch to the main repo and then change to the main directory to merge the new changes:

```
git push repo_main new-feature-branch
cd /Users/dwain/dev_repo_main/ 
git merge new-feature-branch
```
