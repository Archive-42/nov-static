# Functions
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

Functions are the fundamental building blocks of Python and mastering them is a
big step on the road to Python mastery.

When you finish this article, you should be able to
- Describe how to define a function in Python
- Demonstrate how to invoke a function
- Write a function which accepts parameters and returns a value

## Writing functions

As in JavaScript, a *function* is a set procedure that will run when called
by name. Functions are **defined** once and **invoked** as many times as needed.

A **function definition** consists of
- The `def` keyword
- The *name* of the function
- A list of **parameters** to the function enclosed in parentheses, `()`
- A colon, `:`,  at the end of the line
- One tab indentation for the block of code to run (one or more lines)

```python
def printCopyright():
    print("Copyright 2020. Me, myself and I. All rights reserved.")
```

In other words JavaScript developers can remember this as follows:
- `function` is replaced by `def`, the `{ }` are replaced with `:`
- indentation is critical to the program running properly

## Passing parameters and returning a value

As in JavaScript, parameters can be passed in and a value returned. Invoking
a function is as simple as calling it with the proper number of arguments.

```python
def average(num1, num2):
    return (num1/num2)

print(average(6, 2))        # => 3.0
```

The invocation `average(6, 2)` is known as _positional arguments_ usage because
you rely on the position of the argument to specify which parameter it is, 6 is
for `num1` and 2 is for `num2`.

## Default parameter values

Like JavaScript, Python can have default values for the parameters of its
methods. The following function has a default parameter for the "saying"
parameter of the `greeting` function.

```python
def greeting(name, saying="Hello"):
    print(saying, name)

greeting("Monica")
# Hello Monica

greeting("Barry", "Hey")
# Hey Barry
```

Parameters with default values must _always_ come after parameters that do not
have default values. The following code results in a `SyntaxError`.

```python
# THIS IS BAD CODE AND WILL NOT RUN
def increment(delta=1, value):
    return delta + value
```

## Keyword arguments (named parameters)

Unlike JavaScript, Python has the built-in ability to specify arguments _by
name_ without resorting to destructuring. You can just write the name of the
parameter and an equal sign before the value you pass as a parameter. By
specifying the names of the arguments, you can provide them in any order.

```python
def greeting(name, saying="Hello"):
    print(saying, name)

greeting(name="Monica")
# Hello Monica

greeting(name="Barry", saying="Hey")
# Hey Barry

greeting(saying="Hey", name="Barry")
# Hey Barry
```

**Pro-tip:** Idiomatic Python will see developers use positional arguments for
the values of parameters with no default values, and keyword arguments for
parameters that do have default values. For example, the above `greeting`
function would normally be seen used like this.

```python
def greeting(name, saying="Hello"):
    print(saying, name)

# name has no default value, so just provide the value
# saying has a default value, so use a keyword argument
greeting("Monica", saying="Hi")
```

## Anonymous functions

In JavaScript, you could just create functions and assign them to variables.
Python has a special keyword, `lambda`, to allow you to create anonymous
functions that you can assign to variables.

The so-called `lambda` functions in Python act like arrow functions in
JavaScript.

In JavaScript, to create a function that uppercases a string, you could do
something like this:

```js
const toUpper = s => s.toUpperCase();
```

In Python, you would do something similar, but with the `lambda` keyword.

```python
toUpper = lambda s: s.upper()
```

Lambda functions are _meant to be one-line functions_. The only way to spread
them across lines is to wrap them in parentheses. However, it is greatly
discouraged to do so.

```python
toUpper = (
    lambda s:
        s.upper())
```

## Errors

Like elsewhere in Python, if you make a mistake, then an error will be thrown.

For example, if the number of arguments sent in doesn't match the number of
parameters in the definition, then a `TypeError` occurs.

Not enough arguments:
```plaintext
TypeError: average() missing 1 required positional argument: 'num2'
```

Too many arguments:
```plaintext
TypeError: average() takes 2 positional arguments but 3 were given
```

## What you learned

- Describe how to define a function in Python
- Demonstrate how to invoke a function
- Write a function which accepts parameters and returns a value
