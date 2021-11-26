# Number Data Types
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

There are several types of numbers in Python. They are the foundation for
mathematics and calculations.

The arithmetic expressions, order of operations and grouping operators you
learned in JavaScript are all applicable in Python.

Python adds a few key features to make arithmetic faster and more powerful.

When you finish this article, you should be able to:

- Explain the most common types of numbers in Python
- Evaluate arithmetic expressions that include familiar operators and `**`, `//`
  and `%`
- Predict when an arithmetic expression will throw an error

## Types of numbers

In JavaScript there was just one numeric type, `Number`. However, Python
distinguishes between three numeric types.

### Integer

Counting numbers, both positive and negative, are called _integers_. They have
no decimal point.

Unlike JavaScript, integers are a different type of number than decimals, they
are fundamentally a different kind of in-memory representation.

Integers are created by a literal number with no decimal point or through
the use of the `int()` constructor.

```python
print(3)         # => 3
print(int(19))   # => 19
print(int())     # => 0
```

> Interesting fact: Boolean is a subtype of integer in Python.

### Floating point number

The decimal numbers in Python are called _floating point numbers_. The precision
(number of decimal places) and internal representation (how they are stored)
can change slightly depending on the machine on which your program is running.
Very rarely does this have any effect unless you are doing extremely precise
work (as in certain scientific fields).

"Floating point number"... that's a weird term. That's because the decimal point
"floats" based on how many digits come before the decimal point, it floats
around the number, sometimes at position 1 for some numbers (.123), and sometime
at position 7 for some numbers (123456.38).

While you may not have experienced it yet, floating point numbers are known to
have the occasional rounding error. Open up Node.js and try evaluating the
expression "4.1 - 3". Open up Python and try the same thing. That's because of
the way "floating point numbers" are stored in memory, they are prone to this
type of rounding error.

Floating point numbers are created using numbers with a decimal point, with the
`float()` constructor, or using scientific notation.

```python
print(2.24)      # => 2.24
print(2.)        # => 2.0
print(float())   # => 0.0
print(27e-5)     # => 0.00027
```

### Complex numbers

**Note**: You will not be assessed on complex numbers. This is here for
informational benefit, only.

Complex numbers consist of a real part and an imaginary part. In mathematics
this is often written as `5 + 7i` where 5 is the real part and 7 is the
imaginary part. In programming the `i` is often switched to a `j`. Python
follows this pattern also.

The imaginary part of a complex number can be specified by appending `j` or `J`
to a number (which makes an imaginary part with zero real part). Complex numbers
are created by adding a real part to an imaginary part or using the `complex()`
constructor. If omitted, the imaginary part defaults to zero.

```python
print(7j)              # => 7j
print(5.1+7.7j))     # => 5.1+7.7j
print(complex(3, 5))    # => 3+5j
print(complex(17))     # => 17+0j
print(complex())       # => 0j
```

> Fun fact: Both the real part and the imaginary part of a *complex number* are
> stored as floating point numbers.

While it is unlikely you will use complex numbers in the remainder of this
course, the seamless integration of complex numbers in Python is one of many
reasons a development team with math on their minds would choose to use this
language.

## Type casting

When once type of number is converted to another, the process used is called
*type casting*. It is performed using built-in functions for each type.

Example 1: Type-cast float to integer using `float`
```python
print(17)               # => 17
print(float(17))        # => 17.0
```

Example 2: Type-cast float to integer using `int`
```python
print(17.0)             # => 17.0
print(int(17.0))        # => 17
```

Example 3: Type-cast float or integer to string using `str`
```python
print(str(17.0) + ' and ' + str(17))        # => 17.0 and 17
```

The output from print sometimes looks the same for strings and numbers. However,
without type casting you would receive an error when trying to do this
concatenation with the string ` and `.

For example
```python
print(17.0 + ' and ' + 17)
```
results in
```plaintext
TypeError: unsupported operand type(s) for +: 'float' and 'str'
```

## Arithmetic operators

These operators are the same in JavaScript and Python

- `+` (addition)
- `-` (subtraction)
- `*` (multiplication)
- `/` (division)
- `%` (modulo)

Python includes two other useful operators for common arithmetic expressions

- `**` (exponent)
- `//` (integer division)

One of the interesting idiomatic quirks of reading Python is that a lot of code
does _not_ put spaces around arithmetic operators and their operators. You will
often see code in Python like this

```python
print(num+1)
```

whereas in JavaScript, the style is

```javascript
print(num + 1)
```

This really only applies to arithmetic operators.

### Exponentiation

Multiplying a number, `a`, by itself a certain number of times, `b`, is written
in Python as `a**b`. In mathematics, this is known as *exponentiation*.
Sometimes, you will hear this expression referred to as "a to the power of b"
or "a to the b power".

Some examples include
```python
print(2**3)        # => 8
print(5.5**15)     # => 127479497357.65536
print(10**30)      # => 1000000000000000000000000000000
print(10.0**30)    # => 1e+30
```

Notice that when integer numbers get large, they stay integer numbers. However,
a floating point number switches to scientific notation.

Even very large integers are not a problem for Python. The
[official documentation] says "Integers have unlimited precision."

For example, the output of `print(10**100)` is

```plaintext
1000000000000000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000000000000000
0000000000000
```

On the other hand, floating point numbers eventually run out of memory and
throw an error. For example, just by adding a `.0`, you'll find
`print(10.0**100)` outputs `OverflowError: (34, 'Result too large')`.

#### Naming large numbers

Speaking of really large numbers...

Here's a bit of trivia you might find interesting to share at the next dinner
party you attend with your developer buddies. You will not be quizzed on this.
It's just a fun and short read for those who are interested.

Origin of [googol and googolplex]

### Integer division with remainders

Remember *modulo* (`%`) gives the remainder that results from a division.

The `//` operator gives the other part of that division. This is the equivalent
to the floor of the answer.

For example

```python
print(47 // 8)         # => 5
print(47 % 8)          # => 7
```

Means that in long division 47 divided by 8 is 5 with remainder 7.

In programming terms, the `//` operator provides a quick way to divide numbers
and round down.

When floating point numbers are used with integer division or modulo, the
result will also be a floating point number

```python
print(47.0 // 8.0)     # => 5.0
print(47.0 % 8.0)      # => 7.0
```

Complex numbers cannot be used with integer division or modulo; rather, they
throw errors.

```python
print(complex(47) // 8)     # => TypeError: can't take floor of complex number.
print(complex(47) % 8)      # => TypeError: can't mod complex numbers.
```

## Assignment shorthand

Like Javascript, Python supports shorthand operators for modifying a variable's
value. As you probably guessed, all arithmetic operators have corresponding
shorthand equivalents.

- `+=` (addition)
- `-=` (subtraction)
- `*=` (multiplication)
- `/=` (division)
- `%=` (modulo)
- `**=` (exponentiation)
- `//=` (integer division)

> Notice: The ++ and -- operators don't exist in Python because they wouldn't
> be operators. Instead, Python uses += and -= only. This was a design decision
> by the Python team for simplicity and consistency.

## What you've learned

- Explain the most common types of numbers in Python
- Evaluate arithmetic expressions including `**`, `//` and `%`
- Predict when an arithmetic expression will throw an error


[official documentation]: https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex
[googol and googolplex]: https://whatis.techtarget.com/definition/googol-and-googolplex
