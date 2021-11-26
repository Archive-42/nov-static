# WEEK-17 DAY-3<br>*Modules* {ignore=true}
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=2 orderedList=false} -->
________________________________________________________________________________
________________________________________________________________________________
# Formatted Strings

Often a simple print statement will be enough to track a script's progress.
However, sometimes you want a more elaborate output for debugging. Or maybe
you need a formatted string for the user interface.

When you complete this lesson, you should be able to
- Generate formatted output using `join` and `format`

## Join

A common request is to take a list and `join` them together into
a single string. Often a separator is needed to make the data look pretty.
Often this is a space, comma, line break; or perhaps a dash in the case of
zip codes and phone numbers.

In Javascript the `join` function was available on arrays. In Python, however,
this is flipped around. The `join` function is actually on strings.

This means that `''.join(sequence)` connects the elements in the sequence using
the character inside the single quotes is between each element.

```python
shopping_list = ['bread','milk','eggs']
print(','.join(shopping_list))
```

```plaintext
bread, milk, eggs
```

## Formatting printing

Python has a very powerful formatting engine for making exactly the strings
you need. The `format` function is one way to apply these options. Like `join`,
`format` is applied to strings.

### Comma as thousands separator

```python
print('{:,}'.format(1234567890))
```

```plaintext
'1,234,567,890'
```

### Date and Time

```python
d = datetime.datetime(2020, 7, 4, 12, 15, 58)
print('{:%Y-%m-%d %H:%M:%S}'.format(d))
```

```plaintext
'2020-07-04 12:15:58'
```

### Percentage

```python
points = 190
total = 220
print('Correct answers: {:.2%}'.format(points/total))
```

```plaintext
Correct answers: 86.36%
```

### Data Table

```python
width=8
print(' decimal      hex   binary')
print('-'*27)
for num in range(1,16):
    for base in 'dXb':
        print('{0:{width}{base}}'.format(num, base=base, width=width), end=' ')
    print()
```

```plaintext
 decimal      hex   binary
---------------------------
       1        1        1
       2        2       10
       3        3       11
       4        4      100
       5        5      101
       6        6      110
       7        7      111
       8        8     1000
       9        9     1001
      10        A     1010
      11        B     1011
      12        C     1100
      13        D     1101
      14        E     1110
      15        F     1111
```

## Reference

Here is a [PDF version of this lesson] if you'd like to print it for future use.

There are many more examples of [formatted output] in the
official Python documentation. That is a good resource to bookmark.

## What you've learned

- Generate formatted output using `join` and `format`


[PDF version of this lesson]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/python/topics/structures/assets/python-format-reference.pdf
[formatted output]: https://docs.python.org/3/library/string.html#formatspec

________________________________________________________________________________
# Formatted Strings

Often a simple print statement will be enough to track a script's progress.
However, sometimes you want a more elaborate output for debugging. Or maybe
you need a formatted string for the user interface.

When you complete this lesson, you should be able to
- Generate formatted output using `join` and `format`

## Join

A common request is to take a list and `join` them together into
a single string. Often a separator is needed to make the data look pretty.
Often this is a space, comma, line break; or perhaps a dash in the case of
zip codes and phone numbers.

In Javascript the `join` function was available on arrays. In Python, however,
this is flipped around. The `join` function is actually on strings.

This means that `''.join(sequence)` connects the elements in the sequence using
the character inside the single quotes is between each element.

```python
shopping_list = ['bread','milk','eggs']
print(','.join(shopping_list))
```

```plaintext
bread, milk, eggs
```

## Formatting printing

Python has a very powerful formatting engine for making exactly the strings
you need. The `format` function is one way to apply these options. Like `join`,
`format` is applied to strings.

### Comma as thousands separator

```python
print('{:,}'.format(1234567890))
```

```plaintext
'1,234,567,890'
```

### Date and Time

```python
d = datetime.datetime(2020, 7, 4, 12, 15, 58)
print('{:%Y-%m-%d %H:%M:%S}'.format(d))
```

```plaintext
'2020-07-04 12:15:58'
```

### Percentage

```python
points = 190
total = 220
print('Correct answers: {:.2%}'.format(points/total))
```

```plaintext
Correct answers: 86.36%
```

### Data Table

```python
width=8
print(' decimal      hex   binary')
print('-'*27)
for num in range(1,16):
    for base in 'dXb':
        print('{0:{width}{base}}'.format(num, base=base, width=width), end=' ')
    print()
```

```plaintext
 decimal      hex   binary
---------------------------
       1        1        1
       2        2       10
       3        3       11
       4        4      100
       5        5      101
       6        6      110
       7        7      111
       8        8     1000
       9        9     1001
      10        A     1010
      11        B     1011
      12        C     1100
      13        D     1101
      14        E     1110
      15        F     1111
```

## Reference

Here is a [PDF version of this lesson] if you'd like to print it for future use.

There are many more examples of [formatted output] in the
official Python documentation. That is a good resource to bookmark.

## What you've learned

- Generate formatted output using `join` and `format`


[PDF version of this lesson]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/python/topics/structures/assets/python-format-reference.pdf
[formatted output]: https://docs.python.org/3/library/string.html#formatspec

________________________________________________________________________________
# User Input

Scripts and programs in Python often need to interact with the user 
running them.

When you finish this article, you should be able to
- Gather user `input` through the terminal

## User input

The most basic approach is to show an `input` prompt where the user types 
their answer and hits enter to send it back into the program.

Python runs synchronously. This means the program execution stops and waits for
user input when it is requested. There are not events, listeners and promises
to manage like in JavaScript. This simplicity is one of many reasons development
teams may choose Python instead of NodeJS for a particular project.

The `input` function shows a **prompt** to the user and waits for them to type
ENTER. Whatever characters the user types before ENTER are returned so you can
store them in a variable and use them later.

Upgrade your first program to interact with the user.
```python
print("hello world")
answer = input("how are you?")
print("I am fine")
```

Executing the program would print out the following
```plaintext
hello world
how are you?
```

After typing "super fantastic" and pressing ENTER on the keyboard, the output
would look like this
```plaintext
hello world
how are you?super fantastic
I am fine
```

That worked great!

You may notice, however, that there's no space after the "?". Sometimes that's
fine. Sometimes you may way to include a space or linebreak at the end of
your prompt to help users feel more comfortable.

```python
print("hello world")
answer = input("how are you? ")  # <== notice space before closing quote
print("I am fine")
```

Which produces this output when the program is run.
```plaintext
hello world
how are you? super fantastic
I am fine
```

## What you've learned

- Gather user `input` through the terminal

________________________________________________________________________________
# Scripts vs. Programs

When you finish this article you will be able to
- Explain the difference between scripts and programs
- Recall common use cases for Python

## Scripts

Python can be used for many development tasks. The simplest is a script.
Scripts accomplish a straightforward (although probably complex) task from
start to finish.

A programming script can be thought of as a set of code that runs in a linear 
order. Some scripts have no structure; although many scripts will use functions 
so they are easier to write and maintain. The most complex scripts will use 
split the code into multiple files. While Python calls these files modules, 
they are really just for convenience and don't include much structure.

Most scripts will either run without user interaction or with simple parameters 
passed in through the invocation or prompts to the user during execution. This
is one way to identify a script as different from a program.

You will begin your Python journey writing scripts.

## Programs

The biggest difference between scripts and programs is level of complexity and
purpose. Programs are often significantly more complex than scripts. Often 
programs include multiple user interfaces (UIs). Programs will likely
use design patterns such as Object Oriented Programming (OOP), model-view
architectures and much more.

Many programs will include multiple modules and packages -
both from third-parties and custom-built. Python programs very often include
unit testing, package management and environment configuration for easier 
deployments.

Programs and scripts are on a spectrum. There's no clear line between them, but
it's helpful to think of a few examples of programs you are likely to work on 
in your career.

### Web applications

You are already familiar with web applications in JavaScript. Python can produce
HTML, JavaScript and CSS to display in web browsers as web pages. These are web 
applications.

### APIs

Additionally, Python can perform as an interpreter between your front end, for
example React, and a database (or collection of databases) or other services.
The name for this interpreter is an **Application Programming Interface** 
(or API).

You already used JavaScript (NodeJS) as an API. Later in this course you will
also use Python. Each language has it's own advantages which you'll learn
more about as this course continues. 

## What you've learned

- Explain the difference between scripts and programs
- Recall common use cases for Python

________________________________________________________________________________
# Structured Data Explained

When you complete this lesson, you should be able to
- Define *sequence*, *collection* and *iterable*
- Explain *immutable*

## Sequences

The most basic data structure in Python is a **sequence**. Each item in a 
sequence is assigned an **index** and this index determines the *order* of
the sequence. The first index is zero.

You are already familiar with the text sequence type `str`, a.k.a. strings. 
The three basic sequence types you'll study in this lesson are *list*, *tuple* 
and *range*.

## Collections

Collections are unordered data structures. Instead of indexes, collections
use hashable values. In simple terms, a *hashable* value never changes during 
its lifetime. Since hashable values may be compared to determine equality, they
are usable as a key in a dictionary or as the member of a set. You'll study
*dictionaries* and *sets* in this lesson.

## Iterable

An *iterable* can be thought of as the generic name for a sequence or 
collection. Specifically, an iterable is any object on which a loop 
can run (a.k.a. iterate over) to access the elements in the item.

## Immutable

Iterables come in two forms: **mutable** and **immutable**. In short, *mutable* 
iterators can be modified or changed and *immutable* ones are frozen (similar 
to constants) so cannot be changed.

Common actions for sequences include
* Checking for the presence of an item: `if x in mylist`
* Looping: `for x in mylist`
* Adding: `[1,2,3] + [4,5,6]`
* Multiplying `('am','pm') * 3`

Mutable sequences have additional actions like
* Adding items: `append`
* Removing items: `remove`
* Ordering: `sort`, `reverse`
* Splicing (a.k.a. partial replacements): `splice`

Any function which modifies an iterable (that is, from the second list) will 
throw an error if you try to run it on an immutable object.

## What you've learned

In this article, you learned that Python has two types of *iterable* data 
structures: *sequence* and *collection*. You also learned that *immutable* 
iterables, like constants, cannot be changed.

________________________________________________________________________________
# Built-in Data Types

When you complete this lesson, you should be able to
- Declare a `list`, `tuple`, `range`, `dict`ionary and `set` in Python

## Lists

Lists in Python are very similar to arrays in JavaScript. They are typically
used to store a sequences of items that are all the same type (homogeneous).

Lists are mutable, meaning they can be changed. Primarily this means sorting,
as well as adding and removing items.

Lists can be instantiated with square brackets.
```python
empty_list = []
departments = ['HR','Development','Sales','Finance','IT','Customer Support']
```

Often you will see an empty list instantiated using the _list_ built-in.
```python
specials = list()
```

You can test if a value is in a list by using the `in` operator.

```python
print(1 in [1, 2, 3]) #> True
print(4 in [1, 2, 3]) #> False
```

## Tuples

Tuples are very similar to lists in Python. The primary difference is that they
are _immutable_, which means the tuple cannot be changed after creation.

Tuples are instantiated using parentheses.
```python
time_blocks = ('AM','PM')
```

Although sometimes you may see tuples instantiated without parentheses.
```python
colors = 'red','blue','green'
numbers = 1, 2, 3
```

The _tuple_ built-in may be used to convert another iterable (like string or
list) to a tuple.
```python
tuple('abc')        # returns ('a', 'b', 'c')
tuple([1,2,3])      # returns (1, 2, 3)
```

Common use cases for _tuples_ may remind you of constants.
```python
weekdays = ('M','T','W','Th','F')
contactMethods = ('Email', 'SMS (Text)', 'Both')
```

You can test if a value is in a tuple by using the `in` operator.

```python
print(1 in (1, 2, 3)) #> True
print(4 in (1, 2, 3)) #> False
```

## Ranges

A _range_ is simply a list of numbers in order which can't be changed
(immutable). Ranges are often used with `for` loops.

A `range` is declared using one to three parameters
* start - optional (`0` if not supplied) - first number in the sequence
* stop - required - next number past the last number in the sequence
* step - optional (`1` if not supplied) - the difference between each number in
  the sequence

For example
```python
range(5)            # [0, 1, 2, 3, 4]
range(1,5)          # [1, 2, 3, 4]
range(0, 25, 5)     # [0, 5, 10, 15, 20]
range(0)            # [ ]
```

Notice that the _stop_ number is NOT in the range. This sometimes trips up
developers when they first start working in Python, so it may be worth
adding to your notes.

Python is very friendly to negative numbers, and that also applies to ranges.

```python
range(0, -5, -1)    # [0, -1, -2, -3, -4]
range(5, 0, -1)     # [5, 4, 3, 2, 1]
```

## Dictionaries

A _dictionary_ is a mappable collection where a hashable value (a.k.a. **hash**)
is used as a key to reference an object stored in the dictionary. Dictionaries
often hold arbitrary objects which are quite different (heterogenous).
Dictionaries are mutable and may be changed at any time.

Often a dictionary is declared with curly braces or the `dict` built-in.
```python
a = {'one':1, 'two':2, 'three':3}
b = dict(one=1, two=2, three=3)
```

Notice in the example above how the `dict` built-in can is using named
parameters as the keys.

Sometimes you will have tuples you want to put into a dictionary. That is also
done with the `dict` built-in. Here's an example using a list of tuples.
```python
c = dict([('two', 2), ('one', 1), ('three', 3)])
```

A useful benefit of dictionaries in Python is that it doesn't matter how the
dictionary is defined, if the keys and values are the same, the dictionaries
are considered equal. Using a, b and c from above...
```python
print(a == b)        # => True
print(a == c)        # => True
print(b == c)        # => True
print(a == b == c)   # => True
```

Remember dictionaries can store any kind of data.
```python
complex = {
   'name': 'Bob Smith',                                  # string
   'age': 57,                                            # integer
   'weight': 215.4,                                      # float
   'height': (5, 9.5),                                   # tuple (feet, inches)
   'hobbies': {'biking', 'reading', 'playing guitar'},   # set
   'exercise_routine': [                                 # list of tuples
        ('Monday','Riding','1 hour'),
        ('Tuesday','Weightlifting','45 minutes'),
        ('Wednesday','Riding','1 hour 30 minutes'),
        ('Thursday','Walking','30 minutes'),
        ('Friday','Weightlifting','45 minutes'),
        ('Saturday','Riding','3 hours'),
        ('Sunday','',''),
    ]
}
```

You can test if a key exists in a dictionary by using the `in` operator.

```python
print(1 in {1: "one", 2: "two"})    #> True
print("1" in {1: "one", 2: "two"})  #> False
print(4 in {1: "one", 2: "two"})    #> False
```

## Sets

A set is an unordered collection of distinct objects. Specifically, the
objects need to hashable. And they will always be unique, meaning duplicate
items are automatically dropped from the set.

Because of their special properties, sets have three common uses in Python
* removing duplicates
* membership testing (that is, finding out if an object is included)
* mathematical operators: intersection, union, difference, symmetric difference

(You'll learn more about how to use sets in the next lesson.)

A standard _set_ is mutable. Python has an immutable variation called _frozenset_.

Sets can be created by putting comma-separated values inside braces.
```python
school_bag = {'book','paper','pencil','pencil','book','book','book','eraser'}
print(school_bag)           # => {'book','pencil','eraser','paper'}
```

Notice how there's no `:` like dictionaries use.

When using the `set` constructor on a string, the letters are automatically
put into the set.

```python
letters = set('abracadabra')
print(letters)              # {'a', 'r', 'b', 'c', 'd'}
```

**Note:** You are not guaranteed the order of the values in the set.

You can test if a value is in a set by using the `in` operator.

```python
print(1 in {1, 1, 2, 3})  #> True
print(4 in {1, 1, 2, 3})  #> False
```

## What you've learned

- Declare a `list`, `tuple`, `range`, `dict`ionary and `set` in Python
- How to use the `in` operator to test if something exists in a list or set
- How to use the `in` operator to test if something exists as a key in a
  dictionary

________________________________________________________________________________
# Built-in Data Types

When you complete this lesson, you should be able to
- Declare a `list`, `tuple`, `range`, `dict`ionary and `set` in Python

## Lists

Lists in Python are very similar to arrays in JavaScript. They are typically
used to store a sequences of items that are all the same type (homogeneous).

Lists are mutable, meaning they can be changed. Primarily this means sorting,
as well as adding and removing items.

Lists can be instantiated with square brackets.
```python
empty_list = []
departments = ['HR','Development','Sales','Finance','IT','Customer Support']
```

Often you will see an empty list instantiated using the _list_ built-in.
```python
specials = list()
```

You can test if a value is in a list by using the `in` operator.

```python
print(1 in [1, 2, 3]) #> True
print(4 in [1, 2, 3]) #> False
```

## Tuples

Tuples are very similar to lists in Python. The primary difference is that they
are _immutable_, which means the tuple cannot be changed after creation.

Tuples are instantiated using parentheses.
```python
time_blocks = ('AM','PM')
```

Although sometimes you may see tuples instantiated without parentheses.
```python
colors = 'red','blue','green'
numbers = 1, 2, 3
```

The _tuple_ built-in may be used to convert another iterable (like string or
list) to a tuple.
```python
tuple('abc')        # returns ('a', 'b', 'c')
tuple([1,2,3])      # returns (1, 2, 3)
```

Common use cases for _tuples_ may remind you of constants.
```python
weekdays = ('M','T','W','Th','F')
contactMethods = ('Email', 'SMS (Text)', 'Both')
```

You can test if a value is in a tuple by using the `in` operator.

```python
print(1 in (1, 2, 3)) #> True
print(4 in (1, 2, 3)) #> False
```

## Ranges

A _range_ is simply a list of numbers in order which can't be changed
(immutable). Ranges are often used with `for` loops.

A `range` is declared using one to three parameters
* start - optional (`0` if not supplied) - first number in the sequence
* stop - required - next number past the last number in the sequence
* step - optional (`1` if not supplied) - the difference between each number in
  the sequence

For example
```python
range(5)            # [0, 1, 2, 3, 4]
range(1,5)          # [1, 2, 3, 4]
range(0, 25, 5)     # [0, 5, 10, 15, 20]
range(0)            # [ ]
```

Notice that the _stop_ number is NOT in the range. This sometimes trips up
developers when they first start working in Python, so it may be worth
adding to your notes.

Python is very friendly to negative numbers, and that also applies to ranges.

```python
range(0, -5, -1)    # [0, -1, -2, -3, -4]
range(5, 0, -1)     # [5, 4, 3, 2, 1]
```

## Dictionaries

A _dictionary_ is a mappable collection where a hashable value (a.k.a. **hash**)
is used as a key to reference an object stored in the dictionary. Dictionaries
often hold arbitrary objects which are quite different (heterogenous).
Dictionaries are mutable and may be changed at any time.

Often a dictionary is declared with curly braces or the `dict` built-in.
```python
a = {'one':1, 'two':2, 'three':3}
b = dict(one=1, two=2, three=3)
```

Notice in the example above how the `dict` built-in can is using named
parameters as the keys.

Sometimes you will have tuples you want to put into a dictionary. That is also
done with the `dict` built-in. Here's an example using a list of tuples.
```python
c = dict([('two', 2), ('one', 1), ('three', 3)])
```

A useful benefit of dictionaries in Python is that it doesn't matter how the
dictionary is defined, if the keys and values are the same, the dictionaries
are considered equal. Using a, b and c from above...
```python
print(a == b)        # => True
print(a == c)        # => True
print(b == c)        # => True
print(a == b == c)   # => True
```

Remember dictionaries can store any kind of data.
```python
complex = {
   'name': 'Bob Smith',                                  # string
   'age': 57,                                            # integer
   'weight': 215.4,                                      # float
   'height': (5, 9.5),                                   # tuple (feet, inches)
   'hobbies': {'biking', 'reading', 'playing guitar'},   # set
   'exercise_routine': [                                 # list of tuples
        ('Monday','Riding','1 hour'),
        ('Tuesday','Weightlifting','45 minutes'),
        ('Wednesday','Riding','1 hour 30 minutes'),
        ('Thursday','Walking','30 minutes'),
        ('Friday','Weightlifting','45 minutes'),
        ('Saturday','Riding','3 hours'),
        ('Sunday','',''),
    ]
}
```

You can test if a key exists in a dictionary by using the `in` operator.

```python
print(1 in {1: "one", 2: "two"})    #> True
print("1" in {1: "one", 2: "two"})  #> False
print(4 in {1: "one", 2: "two"})    #> False
```

## Sets

A set is an unordered collection of distinct objects. Specifically, the
objects need to hashable. And they will always be unique, meaning duplicate
items are automatically dropped from the set.

Because of their special properties, sets have three common uses in Python
* removing duplicates
* membership testing (that is, finding out if an object is included)
* mathematical operators: intersection, union, difference, symmetric difference

(You'll learn more about how to use sets in the next lesson.)

A standard _set_ is mutable. Python has an immutable variation called _frozenset_.

Sets can be created by putting comma-separated values inside braces.
```python
school_bag = {'book','paper','pencil','pencil','book','book','book','eraser'}
print(school_bag)           # => {'book','pencil','eraser','paper'}
```

Notice how there's no `:` like dictionaries use.

When using the `set` constructor on a string, the letters are automatically
put into the set.

```python
letters = set('abracadabra')
print(letters)              # {'a', 'r', 'b', 'c', 'd'}
```

**Note:** You are not guaranteed the order of the values in the set.

You can test if a value is in a set by using the `in` operator.

```python
print(1 in {1, 1, 2, 3})  #> True
print(4 in {1, 1, 2, 3})  #> False
```

## What you've learned

- Declare a `list`, `tuple`, `range`, `dict`ionary and `set` in Python
- How to use the `in` operator to test if something exists in a list or set
- How to use the `in` operator to test if something exists as a key in a
  dictionary

________________________________________________________________________________
# Built-in Functions

When you complete this lesson, you should be able to
- Use functions with iterables `filter`, `map`, `sorted`, `enumerate`, `zip`
- Analyze iterables using `len`, `max`, `min`, `sum`, `any`, `all`
- Work with dictionaries using `dir`
- Work with sets using operators `&`, `|`, `-`, `^`

## Functions using iterables

Python has a number of built-in functions to make it easy for developers to
work with iterables such as sequences and collections.

### filter

`filter(function, iterable)` creates a new iterable of the same type which 
includes each item for which **function** returns `True`.

Parameters
* function: takes an item (from the iterable) and returns a Boolean
* iterable: e.g. list, tuple, range, dictionary, set, or str

### map

`map(function, iterable)` creates a new iterable of the same type which
includes the result of calling the function on every item in the iterable.

Parameters
* function: takes an item (from the iterable) and returns another item
(of same or different type)
* iterable: e.g. list, tuple, range, dictionary, set, or str

### sorted

`sorted(iterable, key=None, reverse=False)` creates a new sorted list from the
items in iterable

> Notice that the output is always a `list`.

Parameters
* iterable: e.g. list, tuple, range, dictionary, or set
* key: optional function which converts an item to a value to be compared 
(e.g. `key=str.lower` for case-insensitive sorting on a list of strings)
* reverse: optional boolean

The parameters *key* and *reverse* must be set using the name and an equal sign.

### enumerate

`enumerate(iterable, start=0)` starts with a sequence and converts it to a 
series of tuples. Each tuple is made up of two elements: index and value.

The parameter *start* must be set using its name and an equal sign.

The best way to understand `enumerate` is to consider an example.
```python
quarters = ['First', 'Second', 'Third', 'Fourth']
print(enumerate(quarters))
print(enumerate(quarters, start=1))
```

```plaintext
(0, 'First'), (1, 'Second'), (2, 'Third'), (3, 'Fourth')
(1, 'First'), (2, 'Second'), (3, 'Third'), (4, 'Fourth')
```

### zip

`zip(*iterables)` creates a zip object filled with tuples that combine 
1-to-1 the items in each provided iterable. If the iterables have uneven length
then `zip` stops when the shortest one runs out of items.

Parameters
* two or more iterables: usually lists, tuples or dictionaries

## Functions that analyze iterables

Another set of built-in functions can be used to discover more about
the data within an iterable.

### len

`len(iterable)` returns the count of the number of items. Works on collections
(dictionary and set) as well as sequences (list, tuple, range or string).

### max

`max(*args, key=None)` returns the largest of two or more arguments

`max(iterable, key=None)` returns the largest item in the iterable

Parameters
* args: a series of items separated by commas
* iterable: e.g. list, tuple, dictionary or set
* key: optional function which converts an item to a value to be compared 
  (e.g. `key=str.lower` for case-insensitive string comparison)

The parameter *key* must be set using its name and an equal sign.

### min

(Same as max returning the item with the smallest value.)

`min(*args, key=None)` returns the largest of two or more arguments

`min(iterable, key=None)` returns the largest item in the iterable

Parameters
* args: a series of items separated by commas
* iterable: e.g. list, tuple, dictionary or set
* key: optional function which converts an item to a value to be compared 
  (e.g. `key=str.lower` for case-insensitive string comparison)

The parameter *key* must be set using its name and an equal sign.

### sum

`sum(iterable)` is usually used with a list of numbers to generate the total.

> IMPORTANT: There is a faster way to concatenate an array of strings into 
> one string so sum should not be used for that.

Optional challenge: Think about how you could calculate the average of a list
of numbers in one line of Python code.

### any

`any(iterable)` returns True if any items in the iterable are *true*.

If the iterable is empty, then `any` returns `False` because it cannot
find any *true* items.

This depends on the expanded definition of truth in Python where
numbers are *true* when not zero, strings are *true* when not empty, 
and other kinds of objects are *true* when not `None`.

### all

This is a companion function to `any` above and also depends on the expanded
definition of truth.

`all(iterable)` returns True if all items in the iterable are *true*.

If the iterable is empty, then `all` returns `True` because it did not
find any items that were *false*.

## Working with dictionaries

Python has a special function that is very useful when working with 
dictionaries.

### dir

`dir(dictionary)` returns the list of keys in the dictionary.

It can also be used on objects or modules to return a list of their attributes.

## Working with sets

Sets are a unique data structure because they have special mathematical 
operations. Python provides each as both an operator and a function.

### Union

The `|` operator or `union(*sets)` function can be used to produce a new set 
which is a combination of all elements in the provided sets.

```python
a = {1, 2, 3}
b = {2, 4, 6}
print(a | b)        # => {1, 2, 3, 4, 6}
```

Remember, sets do not allow duplicates. That is why `2` only appears once in
the result in this example.

### Intersection

The `&` operator or `intersection(*sets)` function can be used to produce a new 
set of only the elements that appear in all sets.

```python
a = {1, 2, 3}
b = {2, 4, 6}
print(a & b)        # => {2}
```

### Difference and symmetric difference

The `-` operator or `difference(*sets)` function can be used to produce a new 
set of only the elements that appear in the first set and NOT the other(s).

The `^` operator or `symmetric_difference(*sets)` function can be used to 
produce a new set of only the elements that appear in EXACTLY ONE set and
NOT in both (or all) sets.

```python
a = {1, 2, 3}
b = {2, 4, 6}
print(a - b)        # => {1, 3}
print(b - a)        # => {4, 6}
print(a ^ b)        # => {1, 3, 4, 6}
```

## Reference

Here is a [PDF version of this lesson] if you'd like to print it for future use.

If you want to dig deeper into [data structures] or [built-in functions],
you may choose to review the Python docs. This is purely optional.

## What you've learned
- Use functions with iterables `filter`, `map`, `sorted`, `enumerate`, `zip`
- Analyze iterables using `len`, `max`, `min`, `sum`, `any`, `all`
- Work with dictionaries using `dir`
- Work with sets using operators `&`, `|`, `-`, `^`


[PDF version of this lesson]: ../assets/python-built-ins.pdf
[data structures]: https://docs.python.org/3/tutorial/datastructures.html?highlight=data%20types
[built-in functions]: https://docs.python.org/3/library/functions.html

________________________________________________________________________________
# The For Loop

JavaScript has three versions of the `for` loop for you to use. Those are

* `for (;;)` which allows you to loop while counting
* `for (..in..)` which allows you to loop over the indices of a list
* `for (..of..)` which allows you to loop over the entries of a list

Python says, "That's just too much." In this article, you learn about the
humble `for` loop that Python has.

## The for loop in general

In Python, there is only one `for` loop. In code, a `for` statement always
includes the following:

* The `for` keyword
* A variable name
* The `in` keyword
* An iterable of some kind
* A colon
* Starting on the next line, an indented block of code (called the `for` clause)

The `for` loop in Python is very much like the `for (..of..)` loop in
JavaScript. There is _no_ counting version of the `for` loop in Python like the
`for(;;)` version in JavaScript. Instead, you use the `range` function to create
an iterable "filled" with numbers. The following sections show how to use the
`for` loop with different kinds of iterables.

Just like with the `while` loop, you can use `break` and `continue` statements
inside `for` loops as well. The `continue` statement will continue to the next
value of the `for` loop’s counter, as if the program execution had reached the
end of the loop and returned to the start. In fact, you can use `continue` and
`break` statements only inside `while` and `for` loops. If you try to use these
statements elsewhere, Python will give you an error.


## The for loop and the range function

Recall that the `range` function returns something like a list of numbers. The
following code uses the `range` function as the iterable for the `for` loop. See
if you can figure out what it does.

```python
print('My name is')
for i in range(5):
   print('Carlita Cinco (' + str(i) + ')')
```

The code in the `for` loop’s clause is run five times. The first time it is run,
the variable `i` is set to 0. The `print` function in the clause will print
"Carlita Cinco (0)". After Python finishes an iteration through all the code
inside the `for` loop’s clause, the execution goes back to the top of the loop,
and the `for` statement gets the next value from the `range` and sets it to `i`.
This is why `range(5)` results in five iterations through the clause, with `i`
being set to 0, then 1, then 2, then 3, and then 4.

As another `for` loop example, consider this story about the mathematician Karl
Friedrich Gauss. When Gauss was a boy, a teacher wanted to give the class some
busywork. The teacher told them to add up all the numbers from 0 to 100. Young
Gauss came up with a clever trick to figure out the answer in a few seconds, but
you can write a Python program with a `for` loop to do this calculation for you.

```python
total = 0
for num in range(101):
    total += num
print(total)
```

The result should be 5,050. When the program first starts, the `total` variable
is set to 0. The `for` loop then executes `total = total + num` 100 times. By
the time the loop has finished all of its 100 iterations, every integer from 0
to 100 will have been added to total. At this point, `total` is printed to the
screen. Even on the slowest computers, this program takes less than a second to
complete.

## The for loop with a list

Now that you've seen lists in Python, you probably wondered how you loop over
them because, as you've come to find out in programming, looping over a list is
a really common thing. Here's how you do it, once with a list literal (which
won't happen often), and once with a variable that contains a list (which you'll
do _very_ often).

```python
for c in ['a', 'b', 'c']:
    print(c)

lst = [0, 1, 2, 3]
for i in lst:
    print(i)
```

What the previous `for` loop actually does is loop through its clause with the
variable `i` set to a successive value in the `[0, 1, 2, 3]` list in each
iteration.

A common Python technique is to use `range(len(someList))` with a `for` loop to
iterate over the indexes of a list. Here's an example of that.

```python
supplies = ['pens', 'staplers', 'flame-throwers', 'binders']
for i in range(len(supplies)):
    print('Index ' + str(i) + ' in supplies is: ' + supplies[i])
```

That will print out the following.

```
Index 0 in supplies is: pens
Index 1 in supplies is: staplers
Index 2 in supplies is: flame-throwers
Index 3 in supplies is: binders
```

Using `range(len(supplies))` in the previously shown `for` loop is handy because
the code in the loop can access the index (as the variable `i`) and the value at
that index (as `supplies[i]`). Best of all, `range(len(supplies))` will iterate
through all the indexes of supplies, no matter how many items it contains.

Sometimes you will have a list of lists. You can loop over those _and_
destructure at the same time just like you can do in JavaScript. As a matter of
fact, Python has had this feature since its inception whereas JavaScript only
recently got it.

```python
l = [[1, 2], [3, 4], [5, 6]]
for a, b in l:
    print(a, ', ', b)

# Prints 1, 2
# Prints 3, 4
# Prints 5, 6
```

## The for loop with a dictionary

There are three dictionary methods that will return list-like values of the
dictionary’s keys, values, or both keys and values: `keys()`, `values()`, and
`items()`. The values returned by these methods are not true lists, they cannot
be modified and do not have an append() method. But, like the `range`, they're
_list-like_ and can be used with a `for` loop.

Here, a `for` loop iterates over each of the values in the spam dictionary.

```python
spam = {'color': 'red', 'age': 42}
for v in spam.values():
    print(v)

# Prints red
# Prints 42
```

A `for` loop can also iterate over the keys.

```python
for k in spam.keys():
    print(k)

# Prints color
# Prints age
```

Finally, a `for` loop can iterate over both keys and values. In this next code,
the `items()` method returns a list-like object that contains _tuples_ that
contain each key and value. That means you can assign a single variable to the
tuple, or destructure it.

```python
# Getting tuples
for i in spam.items():
    print(i)

# Prints ('color', 'red')
# Prints ('age', 42)


# Destructuring to values
for k, v in spam.items():
    print('Key: ' + k + ' Value: ' + str(v))

# Prints Key: age Value: 42
# Prints Key: color Value: red
```

## The for loop with a string

Because strings are also iterable, you can easily loop over every character in
a string.

```python
for c in "abcdefg":
    print(c)

# Prints a
# Prints b
# Prints c
# Prints d
# Prints e
# Prints f
# Prints g
```

## What you've learned

Working with `for` loops in Python is easier than in JavaScript because there
is only one kind of `for` loop. It merely loops over each of the values in an
_iterable_, which is just a list-like object. You can destructure in the
assignment of the variables if the iterable contains things that can be
destructured. Overall, the `for` loop in Python is pretty handy.

________________________________________________________________________________
# Handling Extra Function Arguments

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

________________________________________________________________________________
# Introduction to Import

When you complete this lesson, you should be able to
* Define *module* in Python
* Use `import` to load a built-in module
* Understand the relationship between *packages*, *modules* and *submodules*
* Follow common best practices for importing modules

## Overview

Modules in Python are similar to packages in Node.js and JavaScript. In short,
they are a way to split code into multiple files.

Modules come in different "flavors" depending on their source
1. *Built-in* - already in Python
2. *Third-party* - downloaded via command line
3. *Custom* - what you make

Regardless of flavor, all modules are loaded using `import` statements.

### Terms

1. A **module** is simply Python code in a separate file.
2. A **package** is the path to a directory that contains modules which is also
   a special type of module.
3. **`__init__.py`** is the default file for a package.
4. A **submodule** is another file in a module’s folder.
5. A **function** is (obviously!) a function in a module.

### Visualization

```
project
│   README.md
│   __init__.py
|   shopping_cart.py         <== module
│
└───pet                      <== package
│   │
│   └───mammal               <== module (and package)
|   |   |   __init__.py
│   |   │   dog.py           <== submodule
│   |   │   cat.py           <== submodule
│   |   │   ...
│   │
│   └───fish                 <== module (and package)
|   |   |   __init__.py
│   │
│   └───bird                 <== module (and package)
|       |   __init__.py
│
└───housing                  <== module (and package)
    │   __init__.py
    │   aquarium.py          <== submodule
    │   cage.py              <== submodule
    │   kennel.py            <== submodule
    |   ...
```

## Import Statements

Here are some common examples of importing modules
* `import <module>` - most basic
* `import <package>.<subpackage>.<module>` - dot syntax
* `from <package> import <module>` - one module in a package
* `from <package> import <module>, <module>` - multiple modules or submodules in
  a package
* `from . import <submodule> `- special case for module's `__init__.py` to get
  submodules in the same folder
* `from <module> import <function>, <function>` - down to the function level
* `from <package> import <module> as <altName>` - renaming to avoid confusion or
  conflict

For more information you can see the Official Documentation on the [Import
Statement].

### Going Deeper

While a module can be any file, it is usually created by placing a special file
(`__init__.py`) in a folder. This folder then becomes the module’s name and is
treated as a module/package that may be imported.

When you have large modules, it is good practice to break up functionality into
submodules - that is, separate files - and have `__init__.py` import them. This
means the module can be imported as a whole, or each part imported as it's
required. These submodules can even be placed into subfolders (and given their
own `__init__.py` file).

Packages represent the path to modules. Remember in Python they are also modules
themselves. Packages are usually made up of one or more folders. In rare
occasions, a package path can be set within a module file using a special
attribute `__path__`.

All packages are modules (that is, a special kind of module). However, a module
is only a package if it is in a folder or if it’s given a path through code.

The [documentation] spells it out this way

> It’s important to keep in mind that all packages are modules, but not all
> modules are packages. Or put another way, packages are just a special kind of
> module. Specifically, any module that contains a `__path__` attribute is
> considered a package.

### Image - Tree representation of Python module structure

Modules can import submodules, but not the other way around. Packages don't do
any importing; rather, they wrap modules together into a collection that can be
treated as a single unit.

Think of a tree...

![Module
tree](images/module-tree.svg)

The path to any item (in Python that's `__path__`) is created by following the
trunk down each branch to the desired destination.

## Recommendations

### Avoid wildcards

A proper principle to follow is importing only what you are using.

Wildcard statements include an asterisk like `from math import *` or reference
only a package name like `import requests`. This is important to notice because
many examples online use generic imports.

While is seems like a quick way to get work done, you will likely regret it
later because it makes your Python code more difficult to understand, especially
at a later time when you're trying to figure out where a specific piece of
functionality was used. Additionally it can put a lot of code into memory when a
large module is imported (like `math`).

### Use multiple lines for clarity

This is especially helpful when you have many elements and/or when using “as”.
Also when looking back at your commit history in  GitHub, you will appreciate
having multiple lines so you can clearly pick out the changes!

Best practices recommended ordering the items in alphabetically or in another
logical way. Some development teams like to do class first, then functions where
each section is alphabetical (as shown in this example).

```python
from urllib.request import (
  HTTPDefaultErrorHandler as ErrorHandler,
  HTTPRedirectHandler as RedirectHandler,
  Request,
  pathname2url,
  url2pathname,
  urlopen,
)
```

## What you've learned

* Define *module* in Python
* Use `import` to load a built-in module
* Understand the relationship between *packages*, *modules* and *submodules*
* Follow common best practices for importing modules


[Import Statement]: https://docs.python.org/3/reference/simple_stmts.html#import
[documentation]: https://docs.python.org/3/reference/import.html

________________________________________________________________________________
# Flashback to Python 2.7

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
