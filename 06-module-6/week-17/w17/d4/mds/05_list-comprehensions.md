# List Comprehensions
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

Python is famous for allowing you to write code that’s elegant, easy to write,
and almost as easy to read as plain English. One of the language’s most
distinctive features is the _list comprehension_, which you can use to create
powerful functionality within a single line of code. It is basically the
equivalent of wrapping up the array methods `filter` and `map` while also
allowing for nested loops!

In this article, you’ll learn how to:

* Rewrite loops and `map()` calls as a list comprehension in Python
* Choose between comprehensions, loops, and `map()` calls
* Supercharge your comprehensions with conditional logic
* Use comprehensions to replace `filter()`

## Populating lists in Python

There are a few different ways you can create lists in Python. To better
understand the trade-offs of using a list comprehension in Python, here are some
other ways to create lists.

### Using for loops

The most common type of loop is the `for` loop. You can use a `for` loop to
create a list of elements in three steps:

* Instantiate an empty list.
* Loop over an iterable or range of elements.
* Append each element to the end of the list.

If you want to create a list containing the first ten perfect squares, then you
can complete these steps in three lines of code:

```python
squares = []
for i in range(10):
    squares.append(i**2)

print(squares)
# Prints [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

Here, the code instantiates an empty list named `squares`. Then, it uses a `for`
loop to iterate over `range(10)`. Finally, it calculates the square of the
number and append the result to the end of the list.

### Using `map()`

The built-in `map()` function provides an alternative approach that’s based in
functional programming. You pass in a function and an iterable, and `map()` will
create a "map object" that contains the values of the iterable passed through
the function. You have to convert the "map object" to a list before you can
do things like print it. (You can use the `list()` function to do that.)

Here's an example of the previous code that uses the `map()` function, instead,
to generate a list of the first ten perfect squares.

```python
squares = map(lambda x: x**2, range(10))

print(list(squares))
# Prints [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

This is a lot like the `Array.map` function from JavaScript.

## Using list comprehensions

List comprehensions are a third way of making lists. With this elegant approach,
you could rewrite the for loop from the first example in just a single line of
code:

```python
squares = [i**2 for i in range(10)]

print(list(squares))
# Prints [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

Rather than creating an empty list and adding each element to the end, you
simply define the list and its contents at the same time by following this
format:

```
new_list = [expression for member in iterable]
```

Every list comprehension in Python includes those three elements:

* _expression_ is the member itself, a call to a method, or any other valid
  expression that returns a value. In the example above, the expression `i**2`
  is the square of the member value.
* _member_ is the object or value in the list or iterable. In the example
  above, the member value is `i`.
* _iterable_ is a list, set, sequence, generator, or any other object that can
  return its elements one at a time. In the example above, the iterable is
  `range(10)`.

Because the _expression_ requirement is so flexible, a list comprehension in
Python works well in many places where you would use `map()` or a `for` loop.

### Benefits of using list comprehensions

List comprehensions are often described as being more idiomatic Python than
loops or `map()`. But rather than blindly accepting that assessment, it’s worth
it to understand the benefits of using a list comprehension in Python when
compared to the alternatives. Later on, you’ll learn about a few scenarios where
the alternatives are a better choice.

One main benefit of using a list comprehension in Python is that it’s a single
tool that you can use in many different situations. In addition to standard list
creation, list comprehensions can also be used for mapping and filtering. You
don’t have to use a different approach for each scenario.

This is the main reason why list comprehensions are considered idiomatic Python.
Python embraces simple, powerful tools that you can use in a wide variety of
situations, like the built-in `len()` method that gives you the length of
strings, lists, sets, tuples, and lots of other things.

List comprehensions are also more _declarative_ than loops, which means many
people find them easier to read and understand. Loops require you to focus on
how the list is created. You have to manually create an empty list, loop over
the elements, and add each of them to the end of the list. With a list
comprehension in Python, you can instead focus on what you want to go in the
list and trust that Python will take care of how the list construction takes
place.

## Build your comprehension comprehension

In order to understand the full value that list comprehensions can provide, it’s
helpful to understand their range of possible functionality. You’ll also want to
understand the changes that arrived in Python 3.8.

### Using conditional logic

This is how you can _filter_ values when creating the list with a comprehension.

Earlier, you saw this formula for how to create list comprehensions:

```
new_list = [expression for member in iterable]
```

While this description is accurate, it’s also a bit incomplete. A more complete
description of the comprehension adds support for conditionals. The most common
way to add conditional logic to a list comprehension is to add a conditional to
the end of the expression:

```
new_list = [expression for member in iterable (if conditional)]
```

Here, the conditional statement comes just before the closing bracket.

Conditionals are important because they allow list comprehensions to filter out
unwanted values.

```python
sentence = 'the rocket came back from mars'
vowels = [c for c in sentence if c in 'aeiou']

print(vowels)
# Prints ['e', 'o', 'e', 'a', 'e', 'a', 'o', 'a']
```

Remember that strings are iterable. When you use them in a list comprehension
like this (the `in sentence` part), the list comprehension loops through each
character in the value `sentence` and sets `c` to each one. Then, the
conditional statement filters out any characters in sentence that aren’t a
vowel.

The conditional can test any valid expression. If you need a more complex
filter, then you can even move the conditional logic to a separate function:

```python
sentence = 'Mary, Mary, quite contrary, how does your garden grow?'
def is_consonant(letter):
    vowels = "aeiou"
    return letter.isalpha() and letter.lower() not in vowels

consonants = [i for i in sentence if is_consonant(i)]

print(consonants)
# Prints ['M', 'r', 'y', 'M', 'r', 'y', 'q', 't', 'c',
# 'n', 't', 'r', 'r', 'y', 'h', 'w', 'd', 's', 'y',
# 'r', 'g', 'r', 'd', 'n', 'g', 'r', 'w']
```

Here, the programmer created a complex filter `is_consonant()` and passes this
function as the conditional statement for the list comprehension. Note that the
member value `i` is also passed as an argument to the function.

You can place the conditional at the end of the statement for simple filtering,
but what if you want to change a member value instead of filtering it out? In
this case, it’s useful to place the conditional near the beginning of the
expression:

```python
new_list = [expression (if conditional) for member in iterable]
```

With this formation, you can use conditional logic to select from multiple
possible output options. For example, if you have a list of prices, then you may
want to replace negative prices with 0 and leave the positive values unchanged:

```python
original_prices = [1.25, -9.45, 10.22, 3.78, -5.92, 1.16]
prices = [i if i > 0 else 0 for i in original_prices]

print(prices)
# Prints [1.25, 0, 10.22, 3.78, 0, 1.16]
```

Here, the expression `i` contains a conditional statement, `i if i > 0 else 0`
which is similar to JavaScript's ternary operator, `i > 0 ? i : 0`. This tells
Python to output the value of `i` if the number is positive, but to change `i`
to 0 if the number is negative. If this seems overwhelming, then it may be
helpful to view the conditional logic as its own function:

```python
def get_price(price):
    return price if price > 0 else 0
prices = [get_price(i) for i in original_prices]

print(prices)
# Prints [1.25, 0, 10.22, 3.78, 0, 1.16]
```

Now, the conditional statement is contained within `get_price()`. You can use
functions like that as part of your list comprehension expression.

## When not to use list comprehensions

List comprehensions are useful and can help you write elegant code that’s easy
to read and debug, but they’re not the right choice for all circumstances. They
might make your code run more slowly or use more memory. If your code is less
performant or harder to understand, then it’s probably better to choose an
alternative.

Comprehensions can be nested to create combinations of lists, dictionaries, and
sets within a collection. Nested lists are a common way to create _matrices_,
which are often used for mathematical purposes. Take a look at the code block
below:

```python
matrix = [[i for i in range(5)] for _ in range(6)]

print(matrix)
# Prints
# [
#     [0, 1, 2, 3, 4],
#     [0, 1, 2, 3, 4],
#     [0, 1, 2, 3, 4],
#     [0, 1, 2, 3, 4],
#     [0, 1, 2, 3, 4],
#     [0, 1, 2, 3, 4]
# ]
```

The **outer** list comprehension `[... for _ in range(6)]` creates six rows,
while the **inner** list comprehension `[i for i in range(5)]` fills each of
these rows with values.

So far, the purpose of each nested comprehension is pretty intuitive. However,
there are other situations, such as flattening nested lists, where the logic
arguably makes your code more confusing. Take this example, which uses a nested
list comprehension to flatten a matrix:

```python
matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [2, 2, 2],
]
flat = [num for row in matrix for num in row]

print(flat)
# Prints [0, 0, 0, 1, 1, 1, 2, 2, 2]
```

The code to flatten the matrix is concise, but it may not be so intuitive to
understand how it works.

While the single-line nested list comprehension might seem more idiomatic
Python, what’s most important is to write code that your team can easily
understand and modify. When you choose your approach, you’ll have to make a
judgment call based on whether you think the comprehension helps or hurts
readability.
