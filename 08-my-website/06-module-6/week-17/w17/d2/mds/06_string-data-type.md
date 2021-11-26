# The String Data Type
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

Strings in Python are very similar to strings in JavaScript.

When you finish this article, you should be able to:
- Write strings using the correct syntax
- Use `len()` to obtain a count of the number of characters in a string
- Refer to one or more characters in a string
- Concatenate strings together

## Writing a valid string

Strings are wrapped with single quotation marks (`'`) or double quotation marks
(`"`). In between you can put any characters except that same quotation mark
or line break (ENTER key).

Valid strings
```python
"This is cool!"
'a1b2c3'
```

Invalid string
```python
"Tom shouted, "Go outside!""
```

To use a double quote as a character of a string, simply
enclose the string in single quotes, and vice versa.

### Escaping characters

Sometimes you need both single and double quotes within a string. In that case
you can indicate that a quote is not the end of a string by using a backslash
(\\) immediately before it.
```python
'Jodi asked, "What\'s up, Sam?"'
```

### Multiline strings

Python allows strings to span multiple lines using what's called
**triple quotes** (`'''`). That is three apostrophes (or single quotation marks)
in a row to start the string and another three to end the string.

For example
```python
print('''My instructions are very long so to make them
more readable in the code I am putting them on
more than one line. I can even include "quotes"
of any kind because they won't get confused with
the end of the string!''')
```

Produces this output
```plaintext
My instructions are very long so to make them
more readable in the code I am putting them on
more than one line. I can even include "quotes"
of any kind because they won't get confused with
the end of the string!
```

> Warning: Don't get this confused with three double quotes used for comments!

## Calculating length

A single string can contain many characters. It may be useful to know how long
a string is, so Python offers the `len()` function.

```python
print(len("Spaghetti"))    # => 9
```

## Indexing a string

Like JavaScript, Python starts counting at zero. This is called
*zero-based indexing*. A character in a string can be accessed with square
brackets.

```python
print("Spaghetti"[0])    # => S
print("Spaghetti"[4])    # => h
```

Python allows negative indexes to access a character from the end of the string.
The last character is at index -1.

```python
print("Spaghetti"[-1])    # => i
print("Spaghetti"[-4])    # => e
```

Additionally, Python gives shortcuts to get a series of characters by using
a *range*. A range consists of a start value followed by a colon then an end
value.

> Important: The series returned does not include the end value.

```python
print("Spaghetti"[1:4])  # => pag
print("Spaghetti"[4:-1])    # => hett
print("Spaghetti"[4:4])  # => (empty string)
```

A shortcut for the beginning of the string is to omit the first number.

```python
print("Spaghetti"[:4])  # => Spag
print("Spaghetti"[:-1])    # => Spaghett
```

A shortcut for the end of the string is to omit the second number.

```python
print("Spaghetti"[1:])  # => paghetti
print("Spaghetti"[-4:])    # => etti
```

If a single index is requested which is not in the string, then an error occurs.
```python
print("Spaghetti"[15])    # => IndexError: string index out of range
print("Spaghetti"[-15])    # => IndexError: string index out of range
```

However, ranges do not error.
```python
print("Spaghetti"[:15])    # => Spaghetti
print("Spaghetti"[15:])    # => (empty string)
print("Spaghetti"[-15:])    # => Spaghetti
print("Spaghetti"[:-15])    # => (empty string)
print("Spaghetti"[15:20])    # => (empty string)
```

## Using string functions

### Function: index

The `index` function in Python is similar to the `indexOf` function in
Javascript.

Calculate the first position of a character within a string using `index`.

```python
print("Spaghetti".index("h"))    # => 4
print("Spaghetti".index("t"))    # => 6
```

If the character is not found an error occurs.
(In JavaScript. a -1 was returned.)

```python
print("Spaghetti".index("s"))    # => ValueError: substring not found
```

### Function: count

Find out how many times a substring appears in the primary string using `count`.
It returns zero if the substring is not there.

```python
print("Spaghetti".count("h"))    # => 1
print("Spaghetti".count("t"))    # => 2
print("Spaghetti".count("s"))    # => 0
print('''We choose to go to the moon in this decade and do the other things,
not because they are easy, but because they are hard, because that goal will
serve to organize and measure the best of our energies and skills, because that
challenge is one that we are willing to accept, one we are unwilling to
postpone, and one which we intend to win, and the others, too.
'''.count('the '))                # => 4
```

## Concatenation

Like Javascript, Python uses the addition operator (`+`) to stitch strings
together.

```python
print("gold" + "fish")    # => goldfish
```

Unlike Javascript, Python also uses the multiplication operator (`*`) to
repeat a string a given number of times.

```python
print("s"*5)              # => sssss
```

This can be very helpful when you want to quickly create a billion dollars. ;)

```python
print("$1" + ",000"*3)     # => $1,000,000,000
```

## Formatting

When debugging in Python it can be very helpful to put together strings and
data to figure out what's going on.

One way to do this is with the `format` function. You will find this in many
examples and Q&A sites online. First, use placeholders in the string where you
want the data to go. A placeholder is a number inside braces like this `{0}`.
Start at zero and each placeholder gets the next number. The use the `format`
function on your string and pass in the data to substitute.

```python
first_name = "Billy"
last_name = "Bob"
print('Your name is {0} {1}'.format(first_name, last_name))  # => Your name is Billy Bob
```

The format function is very powerful and can do much more with strings. These
topics will be introduced as needed.

For simple uses, a fast way to apply formatting is using the 'f' flag on the
string. This means putting using single quotes with an `f` at the start.

```python
print(f'Your name is {first_name} {last_name}')
```

## Useful string methods

The following table shows some very useful string methods on the string object.

| Value               | Method               | Result                    |
|---------------------|----------------------|---------------------------|
| `s = "Hello"`       | `s.upper()`          | `"HELLO"`                 |
| `s = "Hello"`       | `s.lower()`          | `"hello"`                 |
| `s = "Hello"`       | `s.islower()`        | `False`                   |
| `s = "hello"`       | `s.islower()`        | `True`                    |
| `s = "Hello"`       | `s.isupper()`        | `False`                   |
| `s = "HELLO"`       | `s.isupper()`        | `True`                    |
| `s = "Hello"`       | `s.startswith("He")` | `True`                    |
| `s = "Hello"`       | `s.endswith("lo")`   | `True`                    |
| `s = "Hello World"` | `s.split()`          | `["Hello", "World"]`      |
| `s = "i-am-a-dog"`  | `s.split("-")`       | `["i", "am", "a", "dog"]` |

In JavaScript, the `join` method was on the `Array` object. In Python, the
`join` method is on the String object.

```python
s = "--".join(["it", "is", "kind"])
print(s)

# Prints it--is--kind
```

Python also has some handy testing methods for the contents of a string. The
following table lists some of those.

| Method        | Purpose                                                                                                                     |
|---------------|-----------------------------------------------------------------------------------------------------------------------------|
| `isalpha()`   | returns `True` if the string consists only of letters and is not blank.                                                     |
| `isalnum()`   | returns `True` if the string consists only of letters and numbers and is not blank.                                         |
| `isdecimal()` | returns `True` if the string consists only of numeric characters and is not blank.                                          |
| `isspace()`   | returns `True` if the string consists only of spaces, tabs, and newlines and is not blank.                                  |
| `istitle()`   | returns `True` if the string consists only of words that begin with an uppercase letter followed by only lowercase letters. |

## What you've learned

- Write strings using the correct syntax
- Use `len()` to obtain a count of the number of characters in a string
- Refer to one or more characters in a string
- Concatenate strings together
