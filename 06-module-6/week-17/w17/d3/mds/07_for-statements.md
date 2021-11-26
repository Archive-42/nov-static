# The For Loop
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

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
