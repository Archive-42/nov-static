# Flashback to Python 2.7
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

When you finish this lesson you will be able to
- Identify Python 2.7 in code examples found online
- Understand how to translate `print` from Python 2.7 to Python 3.8

## What is the status of Python 2.7?

The official documentation shows "EOL" for the status of Python 2.7. This means
*End of Life*. In programmer speak, this means you can use it, but it is not
being actively worked on or updated and in the near future it will be dropped
from the list of available versions. In other words, *end of life* is a polite 
warning to choose another version for a new project or upgrade your existing 
project if you want to continue to maintain it for years to come.

## Why is Python 2 still around?

Version 3 was a radical change to some fundamental structures in Python which 
caused a variety of breaking changes. It took many months for the most popular
packages to catch up and release updates that would properly run in Python 3. 
Therefore, some teams continued to build new projects in Python 2 in 2018 and 
parts of 2019.

This means you may run into Python 2 in your work experience. Additionally, 
when you search online, many examples you will find are in Python 2. 

As of this writing, the latest version of Python is 3.8. That is what you will 
use for all your projects in this course. You will not need be asked to write
Python 2.7. However, it is helpful to understand the differences in the most 
common commands so you can use the wealth of Python 2.x information while 
coding in Python 3.x.

## Conditionals

Python 3 removed `<>` and only uses `!=` instead.

For the code interpreter, there is a radical difference in how statements are 
processed compared to functions. Statements perform an action in a single line
of code. Functions are a type of expressions and can be assigned to variables,
chained together with operators, and combined with other expressions. By making
this shift, more power and creativity has been granted to Python developers.

## Strings

First, string formatting has received a massive expansion and made less obscure.
Advanced string formatting with the `format()` function was first introduced in 
Python 2.6 and support expanded through the early version of Python 3. In the 
process, the `%` operator for string formatting was removed.

Second, in Python 3, all strings are unicode and **encoded** Unicode is stored
as binary data. That was not the case in Python 2 which used `u"..."` for 
unicode literals (the encoded text). May bugs resulted from mixing encoded
and unencoded strings. In Python 3, `b"..."` is used for binary data and, more
importantly, binary and string data cannot be mixed; rather, it must be 
explicitly converted.

The official documentation states it this way:
> Everything you thought you knew about binary data and Unicode has changed.

Therefore, when you need to go deep into unicode encoding and decoding, make 
sure you are looking at Python 3 documentation, examples, libraries and packages 
to ensure you get the right solutions.

## Modules

First, a handful of built-in modules were removed or replaced. Here are a few 
examples:
* `md5` was removed since the same functionality was available in `hashlib`
* `ConfigParser` was renamed `configparser` to meet the new standards (PEP 8)
* `sets` were killed in favor of the built-in `set()` class

Second, the folder structure within custom modules was simplified. In Python 
2.7, the `__init__.py` file was required in every folder of a module
hierarchy even if there was no other code at that level. This meant there would
be a lot of empty files hanging around a project just to make the paths work
as the developers designed them. It does not hurt to include `__init__.py` 
files every folder in Python 3.8. It is simply extra work which is no longer 
necessary.

## Print

One of the biggest differences between Python 2 and Python 3 is the nature of 
`print`. In Python 2.x, `print` was a statement whereas in Python 3 it is a
function. From a practical standpoint the difference you'll see in the code 
is the use of parentheses.

Python 2
```python
print "Hello, world"
print numbers
```

Python 3
```python
print("Hello, world")
print(numbers)
```

## Reference

If you'd like to read more, or save a bookmark for future reference, the 
Python team has provided a nice write-up on the [Common Stumbling Blocks] for 
developers shifting from Python 2 to Python 3.

## What you've learned
- Identify Python 2.7 in code examples found online
- Understand how to translate `print` from Python 2.7 to Python 3.8


[Common Stumbling Blocks]: https://docs.python.org/3.5/whatsnew/3.0.html#common-stumbling-blocks
