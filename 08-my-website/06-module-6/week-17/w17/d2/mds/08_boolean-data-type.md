# The Boolean Type
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

The **Boolean** data type is perhaps the simplest because it has only two 
possible values, `True` and `False`.

When you finish this article, you should be able to:
- Predict the evaluation of expressions that use the boolean operations of 
`and`, `or` and `not`
- Explain how Python handles non-Boolean objects in conditional statements

## Logical operators

One of the simplicities that developers like about Python is that it reads more
like English than JavaScript - especially with the logical operators.

For reference, here's a comparison table.

| Python | JavaScript |
|:------:|:----------:|
| `and`  |    `&&`    |
|  `or`  |    `||`    |
| `not`  |    `!`     |

Here is an example of how Python reads like English.

```python
# Logical AND
print(True and True)    # => True
print(True and False)   # => False
print(False and False)  # => False

# Logical OR
print(True or True)     # => True
print(True or False)    # => True
print(False or False)   # => False

# Logical NOT
print(not True)             # => False
print(not False and True)   # => True
print(not True or False)    # => False
```

The rules of logic apply in Python as in every other language, including 
DeMorgan's Law.

- `not (A or B)` is equivalent to `not A and not B`
- `not (A and B)` is equivalent to `not A or not B`

## Truth Value Testing

**ANY** object can be tested for a truth value in an `if` statement or 
`while` loop even it is not a **Boolean** type. 

Python considers an object to be **true** (notice the lower case 't') 
UNLESS it is one of the following
- constant: `None` or `False`
- zero of any numeric type: 0, 0.0
- empty sequence or collection
  - string: `''`
  - list: `[]`
  - tuple: `()`
  - dictionary: `{}`
  - `set()`
  - `range(0)`

In other words, all items in this list are `False` and everything else is true.

## Solving common mistakes

Capitalization is crucial to Python. The items `true` and `false` are 
considered to be variables with those names, not the special values you'd expect 
from JavaScript. If you accidentally make this typo you'll probably see an 
error like this:
```plaintext
NameError: name 'true' is not defined
```

Simply change `true` to `True` and your problem will be solved.

Likewise, `&&`, `||` and `!` by itself have no meaning. If you accidentally
use one like this:
```python
print (True && False)
```

Then you'll receive this error:
```plaintext
SyntaxError: invalid syntax
```

Again, it's an easy fix to change `&&` to `and`.

In short, don't let errors get you down! They are a natural and common part 
of the coding process - especially when learning the habits of a new-to-you
language!

As a wise and well-respected senior developer once said:
> Change little, test often. That way you can find your mistakes quickly and 
> no one will know!

## What you learned

- Predict the evaluation of expressions that use the boolean operations of 
`and`, `or` and `not`
- Explain how Python handles non-Boolean objects in conditional statements

In the next lesson, you'll get to see how comparison operators are similar
between JavaScript and Python as well as some pitfalls to avoid and tricks to 
employ to get extra value from them in Python.