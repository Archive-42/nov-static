# Handling Extra Function Arguments
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

In JavaScript, you can define a function with the rest operator to collect up
all arguments without a specific parameter. JavaScript will take the extra
values and put them into an array for you.

```js
function add(a, b, ...args) {
  let total = a + b;
  for (let n of args) {
    total += n;
  }
  return total;
}

add(1, 2)  // Returns 3

add(2, 3, 4, 5) // Returns 14
```

Python has this idea, too, but in two different ways. In this article, you will
learn about the `*` and `**` special forms.

## Variable-length positional arguments

In Python, you can get the extra positional arguments (those without names)
using the `*` operator in the function declaration. By convention, you should
name the parameter "args". Python will collect all of the "extra" arguments,
create a _tuple_ for you, and put it in the parameter with the single asterisk
in front of it.

Here's the code from above, but in Python.

```python
def add(a, b, *args):
    total = a + b;
    for n in args:
        total += n
    return total

add(1, 2)  # Returns 3

add(2, 3, 4, 5) # Returns 14
```

In the first invocation of `add`, the value in `*args` is an empty tuple.

In the second invocation of `add`, the value in `*args` is a tuple that contains
the values 4 and 5, `(4, 5)`.

## Variable-length keyword arguments

Because Python has keyword arguments, it's not really possible to nicely put a
key and a value into a tuple. It would not be the right data structure. Instead,
for any extra keyword arguments, you can collect them with the `**` operator in
the function declaration. By convention, you should name the parameter `kwargs`
for "keyword arguments". Python will collect all of the "extra" keyword
arguments, put them into a _dictionary_ for you, and put it in the parameter
with the double asterisk in front of it.

```python
def print_names_and_countries(greeting, **kwargs):
    for k, v in kwargs.items():
        print(greeting, k, "from", v)

print_names_and_countries("Hi",
                          Monica="Sweden",
                          Charles="British Virgin Islands",
                          Carlo="Portugal")
# Prints
# Hi Monica from Sweden
# Hi Charles from British Virgin Islands
# Hi Carlo from Portugal
```


## Functions as a whole

When ordering arguments within a function or function call, arguments need to
occur in a particular order:

1. formal positional arguments
2. `*args`
3. Keyword arguments with default values
4. `**kwargs`

In practice, when working with explicit positional parameters along with `*args`
and `**kwargs`, your function would look like this:

```python
def example(arg_1, arg_2, *args, **kwargs):
  pass
```

And, when working with positional parameters along with named keyword parameters
in addition to `*args` and `**kwargs`, your function would look like this:

```python
def example2(arg_1, arg_2, *args, kw_1="shark", kw_2="blowfish", **kwargs):
  pass
```

It is important to keep the order of arguments in mind when creating functions
so that you do not receive a syntax error in your Python code.

## What you've learned

You have discovered that Python keeps track of extra arguments and will provide
them to your function.

* The parameter that starts with `*` will receive a tuple of values that are the
  extra positional parameters
* The parameter that starts with `**` will receive a dictionary of values that
  are the extra keyword parameters
