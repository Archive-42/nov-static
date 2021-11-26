# Learning a Second Coding Language
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

One of the most critical skills for advancing you career as a software developer
in the ability to learn and master additional languages.

When you complete this lesson, you should be able to

* Identify key principles for learning a second programming language
* List some similarities between Python and Javascript
* Point out differences in core constructs between Python and Javascript

## Principles

Many senior developers and software architects "speak" a dozen or more different
coding languages. Many agree the second language is the most challenging. These
experts recommend focusing on the core functionality and looking for the
similarities and differences from language to language.

Primary principles for learning a second programming language

* Start with foundations learning what's the same and what's different
* Leverage your non-coding skills
* Practice reading before writing

## Javascript-Python similarities

Principles of development carry over from language to language. Often there are
technical details that are the same as well.

### Strings

Single quotes (apostrophes) and double quotes can be used for strings
in both Python and Javascript.

```python
myString = "some string"
anotherString = 'this too'
```

### Mathematical Expressions

You will likely not be surprised to find out that Python uses the same math
operators that you've come to know (and love?).

* Addition with `+`
* Subtraction with `-`
* Multiplication with `*`
* Division with `/`
* Mod (remainder) with `%`

Also, comparison operators are the same, less than, greater than, and that
family.

* Less than `<`
* Less than or equal `<=`
* Greater than `>`
* Greater than or equal `>=`
* Equals `==`
* Not equals `!=`

### Scripting

Both Python and JavaScript (Node.js) can be written as "scripts", or in
"scripting flow". This means simple code that reads "top to bottom" is written
to solve technical challenges. You can write a JavaScript file for Node.js to
read a file and print its contents like this.

```js
const { readFileSync } = require('fs');
const content = readFileSync('./file.txt', 'utf-8');
console.log(content);
```

That is just a "script", evaluating from top to bottom, with no callbacks or
special server stuff going on. Python is _very_ good at this type of
programming and was one of the reasons it was created, to write scripts to do
_stuff_ on your computer.

### Object-oriented, if you want

Object-oriented programming principle and approaches are supported in Python,
including inheritance and encapsulation. Don't worry if you don't remember what
these terms mean. You'll dig into them again in a future lesson.

### Popular and free

JavaScript (both in the browser and with Node.js) is free to use. Python is also
free to use. Each one has a set of passionate followers who keep the movement
alive and thriving. This means there are many libraries (called modules or
packages in Python) to choose for solving common - and not-so-common - coding
challenges.

## Javascript-Python differences

Now, for some first-step differences, one of the most obvious is whitespace.

### Whitespace-aware

Whitespace _matters_ in Python. This is going to be a huge pain for you as you
start writing it. In JavaScript, you could just not care what your code looked
like.

```js
if (something) {
  const a = 1;
  const b = 2;return a + b;
}
```

Python will _scream_ at you for badly indented code because Python uses
whitespace to indicate a _code block_. That means that there is nearly a
complete lack of curly braces in Python. In JavaScript, if you want a code block
for an `if` statement, for example, you would write

```js
if (condition) {
  console.log('Condition met.');
}
```

In Python, you use a colon and indentation.

```python
if (condition):
  print('Condition met.')
```

If you're not consistent with your indentation, then you get this nasty thing:

```
IndentationError: unexpected indent
```

Python forces you to be a neat programmer.

### Declaring functions

In JavaScript, you will see a function declaration like this.

```js
function doAThing(arg1, arg2) {
  console.log(arg1, arg2);
}
```

Remember, Python is whitespace-aware, so there are no curly braces, just
indentation. Python uses the `def` keyword to "define" a function.

```python
def doAThing(arg1, arg2):
  print(arg1, arg2)
```

### No semicolons?

Correct. You may have noticed that Python does not normally use semicolons.
Instead, idiomatic Python puts one statement per line. If the line ends with a
colon, then it starts a block, like an `if` block or a new function. If it
doesn't end in a colon, then it just assumes that's the statement.

Python won't get mad at you for putting semicolons in the code. As a matter of
fact, if you want to put more than one statement on a line, you have to use
semicolons.

```python
print('First'); print('Second');
```

Practical Python programmers _rarely_ do this. It is considered, in most cases,
bad form.

### Logical operators

JavaScript inherited the `&&`, `||`, and `!` operators from Java to make Java
programmers feel like they were comfortable with the language when it was
created.

Python had no such baggage. The designer of the language wanted to _read_ the
code, so the logical operators in Python are `and`, `or`, and `not`.

```js
if ((condition1 && condition2) || !condition3) {
  console.log('Condition met.');
}
```

```python
if ((condition1 and condition2) or not condition3):
  print('Condition met')
```

### Some other notable differences

| Feature              | Javascript             | Python                   |
|----------------------|------------------------|--------------------------|
| Print to Terminal    | `console.log()`        | `print()`                |
| Comment (one-line)   | `// This is a comment` | `# This is a comment`    |
| Comments (multiline) | `/* Comment */`        | `""" Comment """`        |
| Package Manager      | npm                    | pipenv, poetry, or hatch |

Python adds some more math operators because lots of mathy people use Python.

* `**` for exponents: `2 ** 3` is 8
* `//` for integer division: `10 // 3` is 3

Unlike JavaScript, Python does _not_ have the weird triple-equal sign for
strict equality. The symbols `===` and `!==` just don't exist in Python. You'll
study more about equality in a future lesson.

## Translate!

Armed with this information, can you predict how to write messages to the
terminal?

If you said `print('here is my message')` you would be correct.

What about comments... How would you write comment line in Python?

In looking at the differences table, you’ll see that you need to use
`#` instead of `//`. Therefore, a comment would look like this:
```python
# Here is a comment
```

In fact, you may find that you can already read some basic Python, even
before you fully understand how to write in the language from scratch.

For example, take a look at this code block. If you'd like, you can challenge
yourself to try to decipher it before you scroll down to see the explanation.
(Some comments have been omitted and print statements modified to make
it a little more challenging.)

```python
# To take input from the user
num = int(input("Enter a number: "))

if num > 1:
  # check for factors
  for i in range(2, num):
    if (num % i) == 0:
      print(num, "is not a _____ number")
      print(i, "times", num//i , "is", num)
      break
    else:
      print(num,"is ______")

else:
  print(num,"is not a _____ number")
```

### So what does this do?

Scroll down when you're ready to find out.

...

...

...

...

...

...

...

...

...

...

...

Here's what that same code looks like with comments restored.

```python
# To take input from the user
num = int(input("Enter a number: "))

# By definition, prime numbers are greater than 1
if num > 1:
  # check for factors
  for i in range(2,num):
    # check for remainder in division (mod), if none it's not prime
    if (num % i) == 0:
      print(num,"is not a prime number")
      # find it's corresponding factor using integer division
      print(i,"times",num//i,"is",num)
      break
  else:
    print(num,"is prime")

else:
  print(num,"is not a prime number")
```

Can you figure out the program now?

That's right! It identifies prime numbers.

Hopefully this reinforces why commenting is so important to superior software
development practices!

## What you've learned

* Principles for learning a second programming language
* Similarities between Python and Javascript
* Key differences between Python and Javascript

Hopefully you're feeling a little more comfortable with the idea of expanding
your skills into a new language. After all, each one is a variation on the theme
of telling computers what to do. That means much of your planning, design
and logic skills will transfer with minimal translation.
