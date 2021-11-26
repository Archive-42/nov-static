# Python If Statements
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

Almost every programming language has the ability to conditionally evaluate a
block of code, and normally, that's called an `if` statement. In this article,
you will learn how to write conditional statements in Python.

## The if statement

The most common type of flow control statement is the if statement. An if
statement’s clause (that is, the block following the if statement) will execute
if the statement’s condition is `True`. The clause is skipped if the condition
is `False`.

In plain English, an `if` statement could be read as, “If this condition is
true, execute the code in the clause.” In Python, an `if` statement consists of
the following:

* The if keyword
* A condition (that is, an expression that evaluates to `True` or `False`)
* A colon
* Starting on the next line, an indented block of code (called the `if` clause)

For example, say you have some code that checks to see whether someone’s name is
Monica. (Pretend name was assigned some value earlier.)

```python
if name == 'Monica':
    print('Hi, Monica.')
```

All flow control statements end with a colon and are followed by a new block of
code (the clause). This `if` statement’s clause is the block with `print('Hi,
Monica.')`.

Please note, _no parentheses_ around the conditional for the `if` statement.
This vastly differs from JavaScript. In Python, you just don't need them, unless
you want to have some special order of operations.

It doesn't _hurt_ to write them. This, too, is valid Python.

```python
if (name == 'Monica'):
  print('Hi, Monica.');
```

It's just, nobody writes it like that, so you probably shouldn't, either.

## The else statement

An `if` clause can optionally be followed by an `else` statement. The `else`
clause is executed only when the `if` statement’s condition is `False`. In plain
English, an `else` statement could be read as, “If this condition is true,
execute this code. Or else, execute that code.” An `else` statement doesn’t have
a condition, and in code, an `else` statement always consists of the following:

* The `else` keyword
* A colon
* Starting on the next line, an indented block of code (called the `else`
  clause)

Returning to the Monica example, have a look at some code that uses an `else`
statement to offer a different greeting if the person’s name isn’t Monica.

```python
if name == 'Monica':
    print('Hi, Monica.')
else:
    print('Hello, stranger.')
```

## The elif statement

While only one of the `if` or `else` clauses will execute, you may have a case
where you want one of many possible clauses to execute. The `elif` statement is
an “else if” statement that always follows an `if` or another `elif` statement.
It provides another condition that is checked only `if` any of the previous
conditions were `False`. In code, an `elif` statement always consists of the
following:

* The `elif` keyword
* A condition (that is, an expression that evaluates to `True` or `False`)
* A colon
* Starting on the next line, an indented block of code (called the `elif`
  clause)

The following code adds an `elif` to the name checker to see this statement in
action.

```python
if name == 'Monica':
    print('Hi, Monica.')
elif age < 12:
    print('You are not Monica, kiddo.')
```

This time, the code checks the person’s age, and will tell them something
different if they’re younger than 12. The `elif` clause executes if `age < 12`
is `True` and `name == 'Monica'` is `False`. However, if both of the conditions
are `False`, then both of the clauses are skipped. It is not guaranteed that at
least one of the clauses will be executed. When there is a chain of `elif`
statements, only one or none of the clauses will be executed. Once one of the
statements’ conditions is found to be `True`, the rest of the `elif` clauses are
automatically skipped. For example, have a look at the following code:

```python
if name == 'Monica':
    print('Hi, Monica.')
elif age < 12:
    print('You are not Monica, kiddo.')
elif age > 2000:
   print('Unlike you, Monica is not an undead, immortal vampire.')
elif age > 100:
   print('You are not Monica, grannie.')
```

The order of the `elif` statements does matter, however. The following
discussion rearranges them to introduce a bug. Remember that the rest of the
`elif` clauses are automatically skipped once a `True` condition has been found,
so if you swap around some of the clauses, you run into a problem.

```python
if name == 'Monica':
    print('Hi, Monica.')
elif age < 12:
    print('You are not Monica, kiddo.')
elif age > 100:
    print('You are not Monica, grannie.')
elif age > 2000:
    print('Unlike you, Monica is not an undead, immortal vampire.')
```

Say the `age` variable contains the value 3000 before this code is executed. You
might expect the code to print the string `'Unlike you, Monica is not an undead,
immortal vampire.'`. However, because the `age > 100` condition is `True` (after
all, 3000 is greater than 100), the string `'You are not Monica, grannie.'` is
printed, and the rest of the `elif` statements are automatically skipped.
Remember, at most only one of the clauses will be executed, and for `elif`
statements, the order matters!

Optionally, you can have an `else` statement after the last `elif` statement. In
that case, it is guaranteed that at least one (and only one) of the clauses will
be executed. If the conditions in every `if` and `elif` statement are `False`,
then the `else` clause is executed. For example, here's the Monica program that
uses `if`, `elif`, and `else` clauses.

```python
if name == 'Monica':
    print('Hi, Monica.')
elif age < 12:
    print('You are not Monica, kiddo.')
else:
    print('You are neither Monica nor a little kid.')
```

In plain English, this type of flow control structure would be, “If the first
condition is true, do this. Else, if the second condition is true, do that.
Otherwise, do something else.” When you use all three of these statements
together, remember these rules about how to order them to avoid bugs like the
one from earlier.

First, there is always exactly one `if` statement. Any `elif` statements you
need should follow the `if` statement. Second, if you want to be sure that at
least one clause is executed, close the structure with an `else` statement.

## What you learned

In this article, you learned that Python has an `if` and an `else`, just like
JavaScript. Instead of `else if`, Python has the shorter (and admittedly
weirder) `elif`. Finally, no parentheses needed! Wow!
