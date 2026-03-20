---
title: "How many bytes are emoji characters in GO?"
pubDate: 2020-01-17
tags: [programming, go, unicode]
---

It takes 4 bytes for each emoji character and 1 byte for every ASCII character.

```
package main

import (
	"fmt"
)

func main() {
	a := []byte("😂")
	fmt.Println(len(a))
	// prints 4

	b := []byte("H")
	fmt.Println(len(b))
	// prints 1

}
```
