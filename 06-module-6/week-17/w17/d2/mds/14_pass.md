# The pass keyword
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

In JavaScript, you can just declare an empty code block like this.

```js
if (true) {
}
```

There's nothing in the curly braces. This is not reasonable code, you wouldn't
normally do that. However, it is possible. Every code block defined with
curly-braces can be empty. Here's a fun little JavaScript snippet to make an
infinite loop.

```js
while (true) {}
```

Because Python is whitespace-aware and uses indentations for its blocks, the
designer of the language decided that there needs to be a special indicator to
show that the clause of a code block is empty. Hence, the `pass` keyword has
been part of the language since the beginning.

The two code blocks above look like this in Python.

```python
if True:
  pass
```

```python
while True:
  pass
```

You must use `pass` to have syntactically correct code. For example, the
following code will fail with an `IndentationError` and the message
"expected an indented block".

```python
# THIS CODE WILL RESULT IN AN IndentationError
print("Hello")

if True:

print("Good-bye")
```

For all statements that have a colon at the end of them, you _must_ signify that
they're empty by using the `pass` keyword if you do not provide a clause for
them. That includes `if`, `while`, `def`, and all the other ":" blocks that you
will encounter.
