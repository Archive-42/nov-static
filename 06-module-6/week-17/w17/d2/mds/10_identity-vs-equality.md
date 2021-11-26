# Identity vs. Equality
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

When you finish this article, you should be able to
- Explain the difference between `==` and `is`
- Explain when `not` will throw an exception

## Equality Operators

A quick refresher:
- `>` (greater than)
- `<` (less than)
- `>=` (greater than or equal to)
- `<=` (less than or equal to)
- `==` (equal to)
- `!=` (not equal to)

Coming from JavaScript you already know how to use these!

> Notice that there are only 2 equal signs for equality (**equal to**) and one 
> following the exclamation point for inequality (**not equal to**).

## Identity Operators

Python has a different way to handle strict comparisons: `is` and `is not`.

- `is` (strictly equal to)
- `is not` (not strictly equal to)

Strings and numbers are similar, but not exactly the same. Both `==` and `is` 
consider them not equal.

```python
print (2 == '2')    # => False
print (2 is '2')    # => False
```

Strings are strings. It doesn't matter if they were made with double quote (`"`)
or single quote (`'`).

```python
print ("2" == '2')    # => True
print ("2" is '2')    # => True
```

Numbers, however, come in several types; for example, with or without a 
decimal point. The equality operator (`==`) considers them equal, but the
identity operator (`is`) does not.

```python
print (2 == 2.0)    # => True
print (2 is 2.0)    # => False
```

In the Python community, `is` and `is not` are regarded as the preferred option 
over `==` and `!=`. Both for the simplicity and readability, as well as the
strict type checking.

As you can see the `is` identity operator in Python is similar to the 
`===` equality operator in JavaScript.

## What you've learned
- Explain the difference between `==` and `is`
- Explain when `not` will throw an exception
