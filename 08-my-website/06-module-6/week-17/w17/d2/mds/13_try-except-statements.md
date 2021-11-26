# Error Handling
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

When you complete this lesson, you should be able to
- Write a try statement to catch and handle exceptions in Python
- Handle different types of errors
- Use `hasattr` to prevent an error from occurring

## The problem

Imagine...

Your program is running along fine. Everyone is raving about how useful it is.
Then, a user enters weird and unexpected data and - bam! - the code crashes
and all the fun grinds to a halt.

Or someone deleted a file they thought wasn't in use. Bam! Minutes, hours or
weeks later your program tries to load that file and - kaboom! - it stops again.
Your phone is ringing off the hook with angry users or your boss.

All this can be prevented with proper planning and catching errors as they
occur. Then your code can handle them gracefully, recover from the issue and 
continue providing the value the users expect.

## Catch any error

> WARNING: Use this with extreme caution, since it is easy to mask a real 
> programming error in this way!

An error that occurs while a program is executing is called an **exception**. The
process of detecting these execution errors is often referred to as **catching 
exceptions**. Developers often say, "Your code threw an error," or "an exception
was raised," when they are talking about exceptions that need to be caught.

The `try...except` blocks in Python work in a similar way to `if...else`.
However there is nothing to check at the start. Instead `try` is like asking
Python to listen for an error and do something with it other than crashing.

The flow enters the `try` block and runs each line of code in order. If there 
are no issues, then it skips the `except` block entirely. However, if one line
in the try-block fails then the flow immediately skips to the start of the 
`except` block without running any more code in the try-block, including 
anything remaining on the line that failed.

Here's an example. Let's say you want to know how many digits are in the
variable `a`. That variable should be a string which just happens to have
numeric characters (0 through 9) in it, such as `321`. As you've learned
previously, you can use `len(a)` to obtain the number of characters in the 
string.

For the purpose of this experiment, set `a` to an integer so you can see the 
error.
```python
a = 321
print(len(a))
```

Causes this output
```plaintext
TypeError: object of type 'int' has no len()
```

Then catch the exception by placing the `try` statement before the line with 
the error and the `except` statement after with at least one line of code to 
run as a result of the error occurring. After updating, your code may look 
something like this.
```python
a = 321
try:
    print(len(a))
except:
    print('Silently handle error here')

    # Optionally include a correction to the issue
    a = str(a)
    print(len(a))
```

Which outputs
```plaintext
Silently handle error here
3
```

If you add quotes to change `a` to a string, then you will see the length
value WITHOUT the error.

```python
a = '321'
try:
    print(len(a))
except:
    print('Silently handle error here')

    # Optionally include a correction to the issue
    a = str(a)
    print(len(a))
```

Output
```plaintext
3
```

> WARNING: Use this with extreme caution, since it is easy to mask a real 
> programming error in this way!

## Naming errors

The best way to handle errors is to specify them by name. That way if 
something unexpected happens you will find out about it.

Consider this example.
```python
a = 100
b = 20
c = a / b
print(c)
```

Division works perfectly fine as long as b is not zero.

```python
a = 100
b = 0
c = a / b
print(c)
```

Causes
```plaintext
ZeroDivisionError: division by zero
```

To solve the problem, introduce `try` before the division and specify the
error with the `except` statement, which is `ZeroDivisionError` in this example.
```python
a = 100
b = 0
try:
    c = a / b
except ZeroDivisionError:
    c = None
print(c)
```

Works without crashing to show whatever value you give to `c` under `except`.
```plaintext
None
```

Now suppose you don't actually need `c` for anything; rather, all you 
want to do was print out `a/b` and not crash if `b` is zero (0). Python 
allows you to use the keyword `pass` as a way of doing nothing in a block of 
code.

```python
a = 100
b = 0
try:
    print(a / b)
except ZeroDivisionError:
    pass
```

In this case, nothing will be output when you run the program. That's ok 
because this is really a small part of something much larger. :)

## Different handling for different errors

This also has the advantage of allowing you to take a different action 
depending on the error thrown. For example, change `b` to a string.

```python
a = 100
b = "5"
try:
    print(a / b)
except ZeroDivisionError:
    pass
```

Which throws this error
```plaintext
TypeError: unsupported operand type(s) for /: 'int' and 'str'
```

Likewise, you can pretend `b` never existed by deleting it or commenting it out.

```python
a = 100
# b = "5"
try:
    print(a / b)
except ZeroDivisionError:
    pass
```

Which throws this error
```plaintext
NameError: name 'b' is not defined
```

Perhaps you want to handle both of these cases the same way. Python allows this
using a series of errors in parentheses.

```python
a = 100
# b = "5"
try:
    print(a / b)
except ZeroDivisionError:
    pass
except (TypeError, NameError):
    print("ERROR!")
```

Output
```plaintext
ERROR!
```

You can even name the error so you can record it. Notice the `as` statement
and variable name `e` introduced here and added to the print statement.

```python
a = 100
# b = "5"
try:
    print(a / b)
except ZeroDivisionError:
    pass
except (TypeError, NameError) as e:
    print("ERROR!", e)
```

Output
```plaintext
ERROR! name 'b' is not defined
```

## Going deeper

Handling exceptions with try...except includes a couple more statements which
are completely optional, but may provide value from time to time.

### else

The `else` clause allows developers to run a block of code if there are
no exceptions thrown. It is useful because if many lines of code are in a `try`
block then an error in any one of them will jump to the relevant `except`
block - even if it wasn't what the except was originally written for.

Consider the case where you want to read a series of files.
```python
# tuple of file names
files = ('one.txt', 'two.txt', 'three.txt')

# simple loop
for filename in files:
    try:
        # open the file in read mode
        f = open(filename, 'r')
    except OSError:
        # handle the case where file does not exist or permission is denied
        print('cannot open file', filename)
    else:
        # do stuff with the file object (f)
        print(filename, 'opened successfully')
        print('found', len(f.readlines()), 'lines')
        f.close()
```

In the `else` clause, the variable _f_ is available to use because it was 
successfully defined in the `try` block and no error occurred.

Without the else statement you would be required to do some additional 
"juggling" with the variable _f_ to get the same results. 

Here is one possibility.
```python
# tuple of file names
files = ('one.txt', 'two.txt', 'three.txt')

# simple loop
for filename in files:
    # CHANGE 1 or 2: Set f to none so we can check it later
    f = None
    try:
        # open the file in read mode
        f = open(filename, 'r')
    except OSError:
        # handle the case where file does not exist or permission is denied
        print('cannot open file', filename)
    
    # CHANGE 2 of 2: Check the value of f (None is equivalent to false)
    if f:
        # do stuff with the file object (f)
        print(filename, 'opened successfully')
        print('found', len(f.readlines()), 'lines')
        f.close()
```

> Important: If included, the `else` clause must be placed _after_ all 
> `except` clauses.

### finally

Finally, there is `finally`. This is a clause designed to run clean-up actions
in all circumstances. That means whether an exception happened or not, the
`finally` block will be executed. If present, `finally` will be the last task 
before the `try` statement completes.

If there is no `except` clause for a particular error, the `finally` block will 
run and then the exception will be re-raised.

For example, consider this function.
```python
def divide(x, y):
    try:
        result = x / y
    except ZeroDivisionError:
        print("Cannot divide by zero")
    else:
        print("Result is", result)
    finally:
        print("Finally...")
```

When _divide_ is called with numbers where the second number is NOT zero...
```python
divide(10, 5)
```

...then the flow enters the `try` statement, runs the calculation successfully,
goes to `else` and ends with `finally`. Therefore, the output looks like this.
```plaintext
Result is 2.0
Finally...
```

When _divide_ is called with numbers where the second one IS zero (0)...
```python
divide(7, 0)
```

...then the flow enters the `try` statement, runs the calculation causing
the _ZeroDivisionError_ which takes the flow into `except` and again ends
with `finally`. Here is the output.
```plaintext
Cannot divide by zero
Finally...
```

When something unexpected happens, like _divide_ is called with strings...
```python
divide('2', '1')
```

...then the flow enters the `try` statement, runs the calculation causing
a _TypeError_, and since this error is unhandled, the flow moves to `finally`
before re-raising the exception.
```plaintext
Finally...
Traceback (most recent call last):                                                                                     
  File "main.py", line 18, in <module>                                                                                 
    divide('2', '1')                                                                                                   
  File "main.py", line 3, in divide                                                                                    
    result = x / y                                                                                                     
TypeError: unsupported operand type(s) for /: 'str' and 'str' 
```

If `try` and/or `except` blocks include `return`, then the `finally` 
block will run before the `return`. (Likewise for `break` and `continue` if you
already know about them.)

If the `finally` block includes a return statement, 
then the returned value will come from `finally`, not `try`.

For example...
```python
def greeting():
    try:
        return "Hey, friend."
    finally:
        return "Fun times!"

print(greeting())
```

...outputs
```plaintext
Fun times!
```

## Preventing errors with duck typing

There is another approach for simple cases, such as `len()` from the beginning
of this article, that works as well or better than `try...except`. In 
particular, think back to the "if it looks like a duck" concept 
(**duck typing**), which in this case, refers to whether the object has a 
way to calculate length.

If you go "under the hood" in Python, you'd find that the `len()` function 
works by calling the `__len__` function on the object. So any object that 
has `__len__` defined will not throw an error when len() is used with it. A
number of built-in objects are already set up this way, such as _str_ (a.k.a.
string).

Checking for the existence of a property or method on an object may be performed 
with the `hasattr` function.

For example
```python
# Try a number - nothing will print out
a = 321
if hasattr(a, '__len__'):
    print(len(a))

# Try a string - the length will print out (4 in this case)
b = "5555"
if hasattr(b, '__len__'):
    print(len(b))
```

Produces no errors and one output (the length of string _b_).
```plaintext
4
```

# What you've learned
- Write a try statement to catch and handle exceptions in Python
- Handle different types of errors
- Use `hasattr` to prevent an error from occurring

Finally, this is worth repeating...

> WARNING: Use the generic 'except' clause with extreme caution, since it is 
> easy to mask a real programming error in this way!


[Handling Exceptions]: https://docs.python.org/3/tutorial/errors.html#handling-exceptions
[Defining Clean-up Actions]: https://docs.python.org/3/tutorial/errors.html#defining-clean-up-actions
