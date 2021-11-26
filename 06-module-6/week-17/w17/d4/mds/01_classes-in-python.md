# Classes In Python
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

So far you have learned about Python's core data types: strings, numbers, lists,
tuples, and dictionaries. In the following articles you will learn about the
last major data structure: classes. As you know from JavaScript, classes allow
you to define the information and behavior that characterize anything you want
to model in your program.

There is a lot of new language that comes into play when you start learning
about classes. Since you are familiar with object-oriented programming from your
work in JavaScript, this will be a quick read about how Python approaches OOP.
You can open up a file and try out some of the code in there, if you want.

By the time you're done with this article, you should be able to declare
classes, initializers (which are what you call Python's constructors), and
instance methods and variables.

## Making a new data type

Classes are a way of combining information and behavior. They are a blueprint
created by you from which you can make objects. This defines a set of
attributes that will characterize any object that is instantiated from this
class. For example, consider what you'd need to do if you were creating a game
like Angry Birds. One of the first things you'd want to track are the x and y
coordinates of an Angry Bird. Here is what a simple `AngryBird` class looks like
in JavaScript.

```javascript
class AngryBird {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}
```

And, here's what it looks like in Python.

```python
class AngryBird:
    def __init__(self):
        """
        Construct a new AngryBird by setting its position to (0, 0).
        """
        self.x = 0
        self.y = 0
```

First off, both JavaScript and Python use the `class` keyword to declare
classes. The `class` keyword is followed by the name of the class. And, that's
pretty much where the similarities end.

Because Python doesn't have the curly brace thing going on, you end the
declaration of the class name with a colon. Then, all the methods in the class
are indented.

To declare methods for a class, you use the `def` keyword, just like you do
when you declare a function.

Constructors in JavaScript are named `constructor`. Python has the idea of
_initializers_, and that method is always named `__init__`. Now, here's the
really interesting part.

In JavaScript, there's the magical and mystical `this` object that gets added to
every instance method. It's just there. You use it to do things like set
variables, like `this.x = 0;` in the above code. In Python, **every instance
method gets a reference to the object as the first parameter**. That parameter
is, by convention (and PEP 8), always named `self`. But, _you don't pass that
value in there_! Python does.

Here's how you'd use the `AngryBird` class. Python doesn't have a `new` operator
like JavaScript. You just call the class like a function.

```python
bird = AngryBird()
print(bird.x, bird.y)  #> 0 0
```

What's important to note is that Python calls the initializer with the `self`
parameter all by itself. You don't have to do anything.

Here's an instance method named "move_up_by" which adds a "delta" value to the
`y` instance variable.

```python
class AngryBird:
    def __init__(self):
        """
        Construct a new AngryBird by setting its position to (0, 0).
        """
        self.x = 0
        self.y = 0

    def move_up_by(self, delta):
        self.y += delta
```

Again, when you call the `move_up_by` method, you _do not provide the value for
`self`_. Python does that for you. You just provide values for all of the other
parameters.

```python
bird = AngryBird()
print(bird.x, bird.y)  #> 0 0

bird.move_up_by(8)
print(bird.x, bird.y)  #> 0 8
```

Just like in JavaScript (and almost every language with object-oriented
features), each instance of a class has its own memory space, its own variables
to keep track of its state.

```python
chuck = AngryBird()
matilda = AngryBird()

chuck.move_up_by(13)
matilda.move_up_by(-4)

print(chuck.x, chuck.y)      #> 0 13
print(matilda.x, matilda.y)  #> 0 -4
```

## Style standards for classes

In Python, class names are named in _upper camel case_ (also called _Pascal
case_). This is the same way that you named classes in JavaScript.

It is good practice to write a comment at the beginning of your class,
describing the class. There is a more formal syntax for documenting your
classes, but you can wait a little bit to get that formal. For now, just write a
comment at the beginning of your class summarizing what you intend the class to
do. Writing more formal documentation for your classes will be easy later if you
start by writing simple comments now.

## Dunder methods

Function names that start and end with two underscores are special built-in
functions that Python uses in certain ways. The `__init__()` method is one of
these special functions. It is called automatically when you create an object
from your class. The `__init__()` method lets you make sure that all relevant
attributes are set to their proper values when an object is created from the
class, before the object is used. In this case, the `__init__()` method
initializes the x and y values of the AngryBird instance to 0.

There are a lot of these methods and names in Python. They're called "dunder"
because that's a short way to say "double underscore".

## That benevolent self keyword

The `self` keyword often takes people a little while to understand. The word
"self" refers to the current object that you are working with. When you are
writing a class, it lets you refer to certain attributes from any other part of
the class. Basically, all methods in a class need the `self` object as their
first argument, so they can access any attribute that is part of the class.

Again, you don't _have_ to name it "self". But, if you don't, every other
Python programmer out there is going to be like "Whaaaaa?"

## Instance methods

A method is just a function that is part of a class. Since it is just a
function, you can do anything with a method that you learned about with
functions. You can accept positional arguments, keyword arguments, an arbitrary
list of argument values, an arbitrary dictionary of arguments, or any
combination of these. Your arguments can return a value or a set of values if
you want, or they can just do some work without returning any values.

Each instance method has to accept one argument by default, the value "self".
This is a reference to the particular object that is calling the method. This
"self" argument gives you access to the calling object's attributes.

## A quick check-in

Without looking back, try creating a Python file named **angry_bird.py** and

* Define the `AngryBird` class
* Define the `__init__()` method which sets the `x` and `y` instance variables
  to 0
* Define the `move_up_by()` method which accepts a `delta` value and adds it
  to the `y` instance variable
* Create an `AngryBird` object
* Print the object
* Print the object's `y` value
* Move the `AngryBird` object by some amount
* Print the object's `y` value, again, to see that it moved

## Setting initial state

Here is an example of the `AngryBird` class with the ability to set the initial
x and y positions of the `AngryBird` with default values for them set to 0.
Then, there are some examples of using them.

```python
class AngryBird:
    def __init__(self, x=0, y=0):
        """
        Construct a new AngryBird by setting its position to (0, 0).
        """
        self.x = x
        self.y = y

    def move_up_by(self, delta):
        self.y += delta

b1 = AngryBird()
b2 = AngryBird(x=1)
b3 = AngryBird(y=18)
b4 = AngryBird(10, 10)
```

## Private variables

Python does not have private variables for its classes. That means any instance
variable that you declare can be read and set from outside the class. To
discourage programmers from doing that, PEP 8 suggests the following naming
convention.

> Use one leading underscore only for non-public methods and instance variables.

If you don't want others to interact directly with the instance variables in
your class, you should put a leading underscore on them. Since the `AngryBird`
class is in charge of its `x` and `y` instance variables, that means the names
of those variables should have a leading underscore.

```python
class AngryBird:
    def __init__(self, x=0, y=0):
        """
        Construct a new AngryBird by setting its position to (0, 0).
        """
        self._x = x
        self._y = y

    def move_up_by(self, delta):
        self._y += delta

    def get_x(self):
        return self._x

    def get_y(self):
        return self._y
```

The general rule is _all_ instance variables should be considered non-public.
That is, until you don't want them to be.

## Reserving memory for instance variables

Underneath the covers, Python uses a `dict` to store the instance variables of
a class. If you know the instance variables that you want to use, you can use
a "dunder class variable" named `__slots__` to reserve memory for the instance
variables that you know you will use. This helps speed up Python's creation of
objects when you use your class to make them. (You will learn more about
this idea of "class variables" vs "instance variables" in a later lesson.)

For the `AngryBird` class above, the code requires instance variables `_x` and
`_y`. To help Python be faster, you can declare it with `__slots__`.

```python
class AngryBird:
    __slots__ = ['_x', '_y']

    def __init__(self, x=0, y=0):
        """
        Construct a new AngryBird by setting its position to (0, 0).
        """
        self._x = x
        self._y = y

    def move_up_by(self, delta):
        self._y += delta

    def get_x(self):
        return self._x

    def get_y(self):
        return self._y
```

Again, this is completely optional. Quite often, programmers will create a class
(and its tests), make sure everything works, and then put the `__slots__` in
later.

## Making classes print prettier

If you create an instance of the `AngryBird` class and print it, you get some
Python-runtime information about it.

```python
bird = AngryBird(1, 2)
print(bird)

#> <birds.AngryBird object at 0x10a323e90>
```

That doesn't really give you much information other than the class name and the
memory address at which its stored. Not like JavaScript where you could see the
values of the properties (instance variables) on the object.

Python does give you a way to override that behavior, if you would like, using
the instance "dunder method" `__repr__()`.

```python
class AngryBird:
    __slots__ = ['_x', '_y']

    def __init__(self, x=0, y=0):
        """
        Construct a new AngryBird by setting its position to (0, 0).
        """
        self._x = x
        self._y = y

    def move_up_by(self, delta):
        self._y += delta

    def get_x(self):
        return self._x

    def get_y(self):
        return self._y

    def __repr__(self):
        return f"<AngryBird ({self._x}, {self._y})>"
```

Now, when you run the previous code, you get a different output.

```python
bird = AngryBird(1, 2)
print(bird)

#> <AngryBird (1, 2)>
```

## What you've learned

In this article you saw

* how to use the `class` keyword to define a class
* how to name classes
* how to create instances from classes
* how to initialize classes with the "dunder method" `__init__()`
* how to use the "dunder class variable" `__slots__` to reserve memory for instance
  variables
* how to make string representations of classes using the "dunder method"
  `__repr__()` for use by `print()`
* how to declare instance methods for a class
