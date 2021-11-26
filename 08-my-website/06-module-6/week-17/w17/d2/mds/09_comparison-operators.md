# Comparison Operators
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

Comparisons in Python are very similar to comparisons in JavaScript, as well as
many other coding languages in fact. Comparison operators will
result in boolean values: `True` or `False`.

When you finish this article, you should be able to
- Predict the result of expressions that utilize the operators `>`, `<`, `>=`
  `<=`, `==`, and `!=`
- Explain how to *short-circuit* conditional expressions

## Equality Operators

Python uses these same equality operators as JavaScript.
- `>` (greater than)
- `<` (less than)
- `>=` (greater than or equal to)
- `<=` (less than or equal to)
- `==` (equal to)
- `!=` (not equal to)

## Precedence

Logical operators (`and`, `or`, `not`) and equality operators
(`<`, `<=`, `>`, `>=`, `==`, `!`=)  are often combined to form complex and
useful logic. It is important to understand how a combination will be
understood by the Python language.

In Python, the equality operators are processed from left to right before the
logical operators.

Then the logical operators are processed in this order:
- `not`
- `and`
- `or`

It may help you to remember this order by thinking of arithmetic expressions
and their order of evaluation.
- Negative signs (`not`) are applied first (part of each number)
- Multiplication and division (`and`) happen next
- Addition and subtraction (`or`) are the last step

### Grouping

As in JavaScript, parentheses can by used to make adjustments to the order
of precedence.

### Proper combinations of `not` and `==`

Often a program will need to check if two values are equal or not.

Consider this cases where `a = 4` and `b = 5`.

```python
print(not a == b)     # => True
```

This works as expected because Python considers this to be the same as
`not (a == b)`. That is, the equality is evaluated first (to `False` in
this example) and then `not` is applied (so the result is `True`).

Consider this alternative

```python
print(a == not b)    # => SyntaxError
```

In English, it is clear what we want, but Python gets very confused. The `==`
operator is expecting numbers, strings, Booleans or some other object, but
instead we gave it a logic operator. Specifically a logic operator (`not`)
that is processed **after** the equality operator (`==`). No wonder it
reported **syntax error**!

Parentheses can resolve this confusion and remove the syntax error.
```python
print (a == (not b))    # => False
```

### Warning: the result may not be what you expect

In truth value testing, you saw
that numbers are considered to be `False` when the value is zero. In this case,
**b** is 5 which is considered to be *true**. Then evaluating the expression
in parentheses give us `not b`, or `False`. When comparing (4) to `False` the
result is what?

That's right `False`. In other words, `not a == b` is nowhere near the same as
`a == (not b)`.

It is important as a developer to check that your code not only runs without
errors, but actually does what you intended!

## Short-circuit execution

Python will stop processing conditional expressions as soon as it has a
definitive `True` or `False` answer. This is called a **short-circuit**.

Remember with 'or' statements, if either
value is `True` then the result is `True`?

Likewise with `and`, if either value is `False` then the result is `False`.

Well, Python uses this while processing a conditional from left to right
so that it can stop (**short-circuit**) as soon as it is certain of the outcome.


| Expression      | Right side evaluated? |
|-----------------|-----------------------|
| `True` and ...  | Yes                   |
| `False` and ... | No                    |
| `True` or ...   | No                    |
| `False` or ...  | Yes                   |

### Example: Skip slow function

For example, imagine a variable "skip" which is a Boolean and a function
"slowValidation" which takes a long time to run before it returns `True` or
`False`.

Now look at this conditional statement:

```python
print(skip or slowValidation())
```

If skip is `False`, then slowValidation has to run in order to determine whether
this statement is `True` or `False`.

However, if skip is `True`, then it doesn't matter what the return of
slowValidation is, the result will be `True`.

Python uses this knowledge to stop at an `or` operator whenever the calculated
result before it is `True`.

This means the order in your statements is very important for the best
and most efficient execution of your program.

What happens if we reverse the order in this example?

```python
print(slowValidation() or skip)
```

The output would be the same `True` or `False` in either order. However, placing
the least-intensive and fastest code first means this line could
finish in milliseconds (when skip is first) vs. seconds or minutes (when
slowValidation is first).

## What you've learned

- Predict the result of expressions that utilize the operators `>`, `<`, `>=`
  `<=`, `==`, and `!=`
- Explain how to *short-circuit* conditional expressions

You can read more about *booleans* and *comparison operators* in the
[Official Docs], if you so desire. Warning, it is dense reading and not
necessary to write the Python you need in this course.


[Official Docs]: https://docs.python.org/3/library/stdtypes.html
