# The While Statement
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

Getting a block of code to execute over and over again based on some condition
is also an important construct in programming. In JavaScript, you could use the
`while` loop to do that. You can do that in Python, too!

## While things are good

You can make a block of code execute over and over again with a `while`
statement. The code in a `while` clause will be executed as long as the `while`
statement’s condition is `True`. In code, a `while` statement always consists of
the following:

* The `while` keyword
* A condition (that is, an expression that evaluates to `True` or `False`)
* A colon
* Starting on the next line, an indented block of code (called the `while`
  clause)

You can see that a `while` statement looks similar to an `if` statement. The
difference is in how they behave. At the end of an `if` clause, the program
execution continues after the `if` statement. But at the end of a `while`
clause, the program execution jumps back to the start of the `while` statement.
The `while` clause is often called the _while loop_ or just _the loop_.

Here is the code with a `while` statement:

```python
spam = 0
while spam < 5:
  print('Hello, world.')
  spam = spam + 1
```

The code with the `while` loop prints "Hello, world." five times. It stops after
five prints because the integer in `spam` is incremented by one at the end of
each loop iteration, which means that the loop will execute five times before
`spam < 5` is `False`.

In the `while` loop, the condition is always checked at the start of each
iteration (that is, each time the loop is executed). If the condition is `True`,
then the clause is executed, and afterward, the condition is checked again. The
first time the condition is found to be `False`, the `while` clause is skipped.

## Breaking out early

There is a shortcut to getting the program execution to break out of a while
loop’s clause early. If the execution reaches a `break` statement, it
immediately exits the while loop’s clause. In code, a `break` statement simply
contains the `break` keyword. This is just like the `break` statement in
JavaScript.

```python
spam = 0
while True:
  print('Hello, world.')
  spam = spam + 1
  if spam >= 5:
    break
```

The `while` in this case is an _infinite loop_ because `while True` will never
have a `False` condition, which means it will loop forever... unless some line
lets it `break` out of the loop. In this code, that happens at the end of the
`while` clause where an `if` checks that `spam` is greater than or equal to 5.
If it is, then the `break` statement runs and exits the `while` clause.

## Continue statements

Like `break` statements, `continue` statements are used inside loops. When the
program execution reaches a `continue` statement, the program execution
immediately jumps back to the start of the loop and reevaluates the loop’s
condition. (This is also what happens when the execution reaches the end of the
loop.) Here's an alternative implementation of the loop from above that uses
a `continue` statement, as well.

```python
spam = 0
while True:
  print('Hello, world.')
  spam = spam + 1
  if spam < 5:
    continue
  break
```

Here, you can see that the `if` statement now checks that the `spam` value is
less than 5. If it is, then the `continue` statement gets executed which causes
the current program statement to go back up to the `while True` and start the
loop all over, again. When `spam` gets large enough to not trigger that `if`
condition, then the `break` statement runs and the `while` loop is over.

## In the REPL

If you ever run a program that has a bug causing it to get stuck in an infinite
loop, press Control+C. This will send a `KeyboardInterrupt` error to your
program and cause it to stop immediately. The following code, if contained in a
Python program, would cause that infinite loop.

```python
while True:
    print('Hello world!')
```

If you ran that program, it will print "Hello world!" to the screen forever,
because the `while` statement’s condition is always `True`.

## What you've learned

You learned that, just like JavaScript, Python has a `while` loop that you can
use `break` and `continue` statements in. Other than the indentation, lack of
parentheses, and colons, it's kind of the same.
