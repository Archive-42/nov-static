# User Input
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

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
