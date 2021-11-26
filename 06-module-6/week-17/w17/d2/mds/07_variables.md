# Variables and Expressions
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

*Variables* are used to label and store data in memory to be referenced and 
used in a computer program.

When you finish this article, you should be able to
- Explain **duck-typing**
- Predict when errors will be thrown when using variables and expressions
- Explain the meaning of `None` in Python

## Duck-typing

> If it looks like a duck and quacks like a duck, then it must be a duck.

**Duck typing** is a programming style which avoids checking an object's 
"type" to figure out what it can do. In other words, duck-typing avoids tests 
for `type()` or `isinstance()`.

Instead a method or attribute is simply called or used in the code. If 
necessary a check would be for `hasattr()`. This approach is also known as 
[EAFP]: **E**asier to **a**sk for **f**orgiveness than **p**ermission

By focusing on interfaces, duck-typing makes well-designed code more flexible.

Python uses *duck-typing* as its fundamental approach.

## Assigning variables

Python has no variable declaration keyword such as `let`, `var` or `const`. 
Instead, the assignment of a value automatically declares a variable.

```python
a = 7
b = 'Marbles'
print(a)         # => 7
print(b)         # => Marbles
```

Variable assignment can be chained to give several variables the same initial
value.

```python
count = max = min = 0
print(count)           # => 0
print(max)             # => 0
print(min)             # => 0
```

Often assignment chaining makes code less readable, so use it with caution.
However, many online examples will include it so now you know how to read it.

## Manipulating variables

The value - and even the type - of a variable can be reassigned at any time.

```python
a = 17
print(a)         # => 17
a = 'seventeen'
print(a)         # => seventeen
```

Python will not throw any errors. That means it is very important to name 
variables clearly so you don't accidentally reassign one causing errors or 
confusion.

The assignment shorthand operators from JavaScript also work in Python:
- `+=`
- `-=`
- `*=`
- `/=`

In fact, all the arithmetic operators have shorthand counterparts:
- `**=` (exponent)
- `//=` (integer division)
- `%=` (modulo)

## What about NaN

Unlike JavaScript, Python will not return NaN as the result of calculations;
instead, it throws exceptions.

Here's an example
```python
a = '7'
a /= 2
print(a)
```

Where the output is

```plaintext
TypeError: unsupported operand type(s) for /=: 'str' and 'int'
```

If you absolutely have to have it, you can create "not a number" by sending the 
string `"nan"` into the float constructor.

```python
print(float("nan"))
```

## None

Python's replacement for `null` is `None`. It is used to indicate a variable has 
no value.

`None` is very special because it is actually an object (of type `NoneType`). 
That means it can be used wherever other objects are used.

Assigning a variable the value `None` is as easy as it sounds.

```python
my_var = None
```

And it is just as easy to find out if the value of a variable is `None`.

```python
print(my_var is None)     # => True
```

### Why use Python's `None` type?

There are many cases when you may use `None`.

Often you will want to perform an action that may or may not work. Using `None` 
is one way you can check what happened.

For example, maybe you are loading optional instructions from a file. 
If that file in not found, the `instructions` variable's value 
could remain `None`. Then later in your code you check 
`instructions is not None` so the program knows whether to display those 
instructions or skip that step.

## What you've learned

- Explain **duck typing**
- Predict when errors will be thrown when using variables and expressions
- Explain the meaning of `None` in Python

[EAFP]: https://docs.python.org/3/glossary.html#term-eafp