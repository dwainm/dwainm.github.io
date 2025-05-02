---
title: "One liner for importing multiple SQL files using WP CLI DB command"
date: 2019-04-18
---

In some cases, SQL backups break exports into multiple files, usualy by table name.

I wanted to import all the files in one go and figured googled my way to this "one liner":

<!--more-->

```
for sql in `ls wp_sql`                                                     
do
Next up is $sql
time wp db import wp_sql/$sql --skip-optimization
done
```

**How to use this command - Setup:**

This assumes that you have exported the files correctly.

1. Make sure that the directory holding your SQL files are in the root WordPress directory (next to `wp-config.php` file)
2. Make sure you've changed directory to the WordPress root.
3. Rename the directory to`wp_sql` or change the name in the script to the name of your directory.
4. Add each command line by line.

I hope this helps some one.

* * *
