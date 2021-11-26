# Regular Expressions Cheat Sheet
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [The * operator](#the-operator)
    - [Example 1: `xy*z`](#example-1-xyz)
    - [Example 2: `x*yz`](#example-2-xyz)
    - [Example 3: `xyz*`](#example-3-xyz)
- [The ? operator](#the-operator-1)
    - [Example 1: `videos?`](#example-1-videos)
    - [Example 2: `videos\?`](#example-2-videos)
    - [Example 3: `videos? watched\?`](#example-3-videos-watched)
- [The + operator](#the-operator-2)
    - [Example 1: `xy+z`](#example-1-xyz-1)
    - [Example 2: `x+yz`](#example-2-xyz-1)
    - [Example 3: `xyz+`](#example-3-xyz-1)
- [The . operator](#the-operator-3)
    - [Example 1: `..a..`](#example-1-a)
    - [Example 2: `.at.`](#example-2-at)
    - [Example 3: `...\?`](#example-3)
- [The ^ operator without brackets](#the-operator-without-brackets)
    - [Example 1: `^Dog`](#example-1-dog)
    - [Example 2: `^dog`](#example-2-dog)
    - [Example 3: `^\?`](#example-3-1)
- [The $ operator](#the-operator-4)
    - [Example 1: `smell$`](#example-1-smell)
    - [Example 2: `dog.$`](#example-2-dog-1)
    - [Example 3: `^doggie smell$`](#example-3-doggie-smell)
- [The [] bracket expression](#the-bracket-expression)
    - [Example 1: `[aei]n`](#example-1-aein)
    - [Example 2: `robot [0-9]`](#example-2-robot-0-9)
    - [Example 3: `\.[dw]`](#example-3-dw)
  - [The - inside brackets](#the-inside-brackets)
    - [Example 1: `[0-5] cats`](#example-1-0-5-cats)
    - [Example 2: `[A-D][l-p][o-s]`](#example-2-a-dl-po-s)
    - [Example 3: `[a-z][0-9][A-Z]`](#example-3-a-z0-9a-z)
  - [The ^ inside brackets](#the-inside-brackets-1)
    - [Example 1: ``](#example-1-b)
    - [Example 2: `at`](#example-2-bcat)
    - [Example 3: `o`](#example-3-bcog)

<!-- /code_chunk_output -->
________________________________________________________________________________

This article lists the most commonly-used regular expressions operators. You
can use it as a handy reference for later while you write regular expressions.


## The * operator

The `*` operator is known as the **Kleene Star**, one of the [Kleene operators]. 
You use the Kleene Star operator to match any number, **zero or more**, of the 
character it follows.

For example, take the following regular expression patterns and compare them 
with the strings below:

#### Example 1: `xy*z`

Matches:
```
xxz
xyyyzzz
```

Does not match:
```
yyy
xyxz
```

#### Example 2: `x*yz`

Matches:
```
xxyz
yyyzzz
```

Does not match:
```
xxx
xyyz
```

#### Example 3: `xyz*`

Matches:
```
xy
xxyzzz
```

Does not match:
```
zzz
xyyz
```


## The ? operator

The question mark operator denotes that the character preceding `?` is an 
[optional character]. Note that when you want to use a normal question mark as a 
normal character and NOT as a regular expression operator, you need to escape 
the character with a forward slash like `\?`.

Take the following pattern and compare it with the strings below. Notice how 
the `s?` portion of the expression makes the "s" character optional, allowing 
the pattern to match both "video" and "videos".

#### Example 1: `videos?`

Matches:
```
cat video
dog videos
```

Does not match:
```
bird vids
hedgehog vides
```

#### Example 2: `videos\?`

Matches:
```
dog videos?
videos? hello?
```

Does not match:
```
cat video
videos
```

Note different effect of the regular expression with an escaped question mark 
verses a non-escaped question mark.

#### Example 3: `videos? watched\?`

Matches:
```
dog video watched?
cat videos watched?
```

Does not match:
```
bird video watched
hedgehog videos not watched
```


## The + operator

The `+` operator is known as the **Kleene Star Plus**. You use Kleene Star Plus 
to match **one or more** of the character it follows, instead of **zero or more** 
like the Kleene Star. 

For example, take the following regular expression patterns and strings below:

#### Example 1: `xy+z`

Matches:
```
xyyyzzz
xxxyzz
```

Does not match:
```
xxz
xyxz
```

Note how "xxz" is matched by `xy*z` but not by `xy+z`.

#### Example 2: `x+yz`

Matches:
```
xyzzz
xxxyzz
```

Does not match:
```
yzz
xyyz
```

#### Example 3: `xyz+`

Matches:
```
xyzzz
xxyz
```

Does not match:
```
xy
xxy
```


## The . operator

The dot operator matches any **single** character. It acts as a [wildcard] that 
can match any single number, letter, symbol, or even whitespace. Like the 
question mark operator, in order to use `.` as a normal character instead of a 
regular expression operator, you need to escape the character with a forward 
slash (`\.`).

Take the example expressions and strings below:

#### Example 1: `..a..`

Matches:
```
12aa3
brains
```

Does not match:
```
123a4
catch
``` 

#### Example 2: `.at.`

Matches:
```
?att
catch
```

Does not match:
```
1a1t
atss
``` 

Remember that using a forward slash before a question mark in a regular 
expression escapes the question mark so that `?` is not interpreted as a 
regular expression operator.

#### Example 3: `...\?`

Matches:
```
123?
????
```

Does not match:
```
123
?cat
``` 


## The ^ operator without brackets

The `^` operator is known as the hat operator. The hat operator can be used in 
two ways:
* Without square brackets to match the start of a line.
* Within square brackets to denote when you want to exclude characters.

When using `^` at the beginning of a regular expression pattern, you are 
indicating a match with statements that begin with the characters in your 
pattern. Note the case sensitivity in the examples below.

#### Example 1: `^Dog`

Matches:
```
Doggie daycare
Dog food
```

Does not match:
```
doG master
puppy Dog
``` 

#### Example 2: `^dog`

Matches:
```
doggie
dogs
```

Does not match:
```
hotdog
small dog
``` 

#### Example 3: `^\?`

Matches:
```
? hello
???
```

Does not match:
```
hi?
\?bye
``` 


## The $ operator

The dollar sign operator is used to define the end of a line. Like how the `^` 
hat operator is used to specifically match the beginning characters of a line, 
the `$` dollar sign operator is used to specifically match the end of a line. 

Take the following patterns and strings below:

#### Example 1: `smell$`

Matches:
```
doggie smell
doggie has an interesting smell
```

Does not match:
```
doggie smells
doggie is smelling
``` 

#### Example 2: `dog.$`

Matches:
```
sit, dog.
good dog!
```

Does not match:
```
sit, doggie
dogs.
``` 

In the example below, the hat and dollar sign operators are used together to 
create a pattern that matches the entire "doggie smell" string from beginning 
to end.

#### Example 3: `^doggie smell$`

Matches:
```
doggie smell
```

Does not match:
```
big doggie smell
doggie has an interesting smell
doggie smells
``` 


## The [] bracket expression

You use square brackets in regular expressions to match and include characters. 
You can do so by listing out specific characters or using an alphanumeric range. 
You can also use the square brackets in conjunction with a hat operator to 
exclude characters.

Take the following patterns that include characters in the strings below:

#### Example 1: `[aei]n`

Matches:
```
ban
hen
```

Does not match:
```
undo
on
``` 

#### Example 2: `robot [0-9]`

Matches:
```
robot 7
brobot 180
```

Does not match:
```
robots 7
robot seven
``` 

#### Example 3: `\.[dw]`

Matches:
```
.whale
.dog
```

Does not match:
```
.cat
whale
``` 


### The - inside brackets

You use the dash character to create [character ranges] within square brackets. 
Multiple ranges can be set in the same square brackets. For example, the 
expression `[A-Za-z0-9_]` is often used to match all alphanumeric characters 
in the English language.

Take the following expressions and strings below:

#### Example 1: `[0-5] cats`

Matches:
```
3 cats
33 cats
```

Does not match:
```
336 cats
3cats
``` 

#### Example 2: `[A-D][l-p][o-s]`

Matches:
```
Apple
Dose
```

Does not match:
```
apple
bone
``` 

#### Example 3: `[a-z][0-9][A-Z]`

Matches:
```
h4T
bl7XYZ
```

Does not match:
```
h44T
XYZ7bl
``` 


### The ^ inside brackets

When using `^` inside of square brackets, you are denoting that you want to 
[exclude characters]. In order to exclude characters, you need to wrap the 
operator and the characters you want to exclude within square brackets.

#### Example 1: `[^b]`

Matches:
```
hog
dog
```

Does not match:
```
bog
blog
``` 

#### Example 2: `[^bc]at`

Matches:
```
chat
rat
```

Does not match:
```
hat
cat
``` 

#### Example 3: `[^bc]o[^g]`

Matches:
```
hot
pot
```

Does not match:
```
cog
blog
``` 

[Kleene operators]: https://regexone.com/lesson/kleene_operators
[optional character]: https://regexone.com/lesson/optional_characters
[wildcard]: https://regexone.com/lesson/wildcards_dot
[exclude characters]: https://regexone.com/lesson/excluding_characters
[character ranges]: https://regexone.com/lesson/character_ranges
