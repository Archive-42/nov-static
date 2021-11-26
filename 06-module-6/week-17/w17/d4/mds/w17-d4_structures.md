# WEEK-17 DAY-4<br>*Structures* {ignore=true}
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=2 orderedList=false} -->
________________________________________________________________________________
________________________________________________________________________________
# Classes In Python

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

________________________________________________________________________________
# Inheritance

One of the most important goals of the object-oriented approach to programming
is the creation of stable, reliable, reusable code. If you had to create a new
class for every kind of object you wanted to model, you would hardly have any
reusable code. Like in JavaScript, Python can have one class inherit from
another class. This means you can base a new class on an existing class. The new
class inherits all of the attributes and behavior of the class it is based on. A
new class can override any undesirable attributes or behavior of the class it
inherits from, and it can add any new attributes or behavior that are
appropriate. The original class is called the **parent class**, and the new
class is a **child class** of the parent class. The parent class is also called
a **superclass**, and the child class is also called a **subclass**.

The child class inherits all attributes and behavior from the parent class, but
any attributes that are defined in the child class are not available to the
parent class. This may be obvious to many people, but it is worth stating. This
also means a child class can override behavior of the parent class. If a child
class defines a method that also appears in the parent class, objects of the
child class will use the new method rather than the parent class method.

In this article, you will learn how to use inheritance in Python.

To inherit one class from another, you specify the parent class in parentheses
after the child class' name, kind of like an argument list to the class.

```python
class Employee:
    def __init__(self, id):
        self.id = id


class Manager(Employee):
    def __init__(self, id):
        super().__init__(id)
        self.employees = []

    def add_direct_report(self, employee):
        self.employees.append(employee)
```

In these classes, objects from `Employee` would have an `id` instance variable.
Object from `Manager` would have an `id` instance variable (since it inherits
from `Employee`) and an `employees` instance variable that contains the
employee objects that the manager manages.

The comparable JavaScript classes would look like this.

```js
class Employee {
  constructor(id) {
    this.id = id;
  }
}


class Manager extends Employee {
  constructor(id) {
    super(id);
    this.employees = [];
  }

  add_direct_report(employee) {
    this.employees.push(employee);
  }
}
```

The real weird part of the Python version is the way you call the initializer
of the parent class with the `super().__init__()` call. That's just the way it
works in Python.

Everything else, hopefully, is not that alien.

That weird `super().method()` syntax applies to all methods in Python, if you
want to specifically call the method on the parent class. Have a look at this
weird nonsense.

```python
class Parent:
    def boop(self):
        print("I am Parent#boop")


class Child(Parent):
    def boop(self):
        print("I am Child#boop")
        super().boop()


Child().boop()
# Prints
# "I am Child#boop"
# "I am Parent#boop"
```

And, that's pretty much inheritance in Python:

* Use parentheses after the class name to specify the parent class
* Use the `super()` method to access methods on the parent class

________________________________________________________________________________
# Properties

When you create a class, sometimes you would like to have methods that allow you
to set variable values, and methods to return variable values. Python provides
an idiomatic way to do this called _properties_ which takes special methods and
makes them look just like a property on an object.

In this article, you'll learn how to use them.

## Getters

Remember this class?

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

One of the problems with this is that there is a fairly non-idiomatic way of
interacting with the values of `x` and `y` in the `AngryBird` class. To print
the coordinates of the particular object, you would have to write this.

```python
bird = AngryBird()

print(bird.get_x(), bird.get_y())
```

Those "get_" methods are bothersome. It would be nice if Python had a way for
you to write `bird.x` and get the value from `bird._x` in a controlled fashion.
Luckily, there is a way.

Python has a special thing called a _decorator_ that allows us to change the way
methods get invoked. Decorators always start with the `@` symbol. Decorators can
be applied to methods, classes, and parameters.

There's a built-in decorator named `property` that you can apply to a method to
make it seem like a readable property. Here's the `AngryBird` class with two
"getter" properties, that is, two readable properties, one for `x` and one for
`y`.

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

    @property
    def x(self):
        return self._x

    @property
    def y(self):
        return self._y
```

That `@property` decorator changes the way that you can "call" the methods. You
don't have to supply parentheses anymore. Now, you can write this code.

```python
bird = AngryBird()

print(bird.x, bird.y)
```

That's called a "getter" because it's a method that is getting a value but looks
like just a normal property.

## Setters

A "setter" is the opposite of a "getter". It is a method that gets invoked with
the assignment operator. Here's `AngryBird` with setters for the `x` and `y`
properties.

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

    @property
    def x(self):
        return self._x

    @x.setter
    def x(self, value):
        if value < 0:
            value = 0
        self._x = value

    @property
    def y(self):
        return self._y

    @y.setter
    def y(self, value):
        if value < 0:
            value = 0
        self._y = value
```

The decorator for the setter is constructed like this:

* The "@" symbol
* The name of the method that has the `@property` applied to it
* The "." symbol
* The "setter" property

Now, with the setter in place, you can do this amazing code!

```python
bird = AngryBird()
bird.x = 12
bird.y = -20 # Won't get set because of the setter method

print(bird.x, bird.y)  #> 12 0
```

## What you've learned

In Python, the idea of a "property" is a combination of two methods, one that
provides "getter" functionality, and another that provides "setter"
functionality. Together, they create ways for you to treat two methods as a
single property.

* You create the getter property by decorating a method with `@property`.
* You create the setter property by decorating a corresponding method with the
  decorator `@«getter_method_name».setter`.

________________________________________________________________________________
# Tree Refresher

(From _Intro to Algorithms and Data Structures_ in the in-person curriculum.)

[Trees][1] store data in a hierarchy of layers. An element, or node at each
layer can have links to lower level nodes. One simple example is a file system:

```
* /
    * Users
        * markov
            * Desktop
            * Documents
            * Downloads
        * oppenheimer
            * Desktop
            * Downloads
    * System
        * Library
```

The top-level node is called the _root_. Each node can hold a value: here the
root holds "/". The _children_ of a node are the nodes one level deeper. The
children of the "Users" node hold "markov" and "oppenheimer". The lowest level
nodes (the ones with no children) are called _leaves_.

In general, nodes can have any number of children.

## Depth first search ([DFS][2])

Given a tree, you may wish to enumerate all the values held by nodes in the tree.
For instance, you may wish to go through the files/folders of the tree and print
each one.

One common way to traverse (i.e., visit all the nodes) a tree is depth first
search. The nodes are numbered in the order that we visit them:

```
          1
         / \
        2   5
       /   / \
      3   6   9
     /   / \
    4   7   8
```

Each time, you try to visit the left child, if it exists and hasn't been visited
yet. If it has, you try to visit the right child, if it exists and hasn't been
visited yet. If all the children have been visited, then you move up one level
and repeat.

## Breadth first search ([BFS][3])

Breadth first search is an alternative to depth-first search.

```
          1
         / \
        2   3
       /   / \
      4   5   6
     /   / \
    7   8   9
```

Here you visit a node, then each of its children, then each of their children,
etc. Watch [this animation][4] to see the order that you want to visit nodes in the
tree.

An advantage of breadth-first search is that it considers shallower nodes before
deeper ones.

## Algorithm

DFS and BFS are _algorithms_. What's the difference between an algorithm and a
method? An algorithm is an idea, an unambiguous but unrealized process that
solves a problem and which potentially could be written in any language. A
method is the _implementation_, a conversion of an algorithm into code which can
then be run.

An algorithm can be coded up in any language.

## References

* Wikipedia: [Data structure][5]
* Wikipedia: [Algorithm][6]

[1]: http://en.wikipedia.org/wiki/Tree_data_structure
[2]: http://en.wikipedia.org/wiki/Depth-first_search
[3]: http://en.wikipedia.org/wiki/Breadth-first_search
[4]: http://www.how2examples.com/artificial-intelligence/images/Breadth-First-Search.gif
[5]: http://en.wikipedia.org/wiki/Data_structure
[6]: http://en.wikipedia.org/wiki/Algorithm

________________________________________________________________________________
# List Comprehensions

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

________________________________________________________________________________
# Knight's Travails Project Part 1

Even though there are four discrete parts to this project, read through all of
them, first, before starting this phase.

In this project we will create a class that will find the shortest path for a
Chess Knight from a starting position to an end position. Both the start and end
positions should be on a standard eight-by-eight chess board.

At the end of this project, you should be able to bring together lots that
you've learned, this week, as well as bringing back information you learned
earlier in the course, such as:

* declaring classes in Python
* creating and using lists in Python
* using list comprehensions in Python
* using loops in Python
* using conditionals in Python
* using the tree data structure
* using tree searches to find nodes

You'll also use unit tests for part of it to guide your development like you did
in Node.js-land.

## Getting started

Make sure that you're running a 3.8 version of Python by typing `python
--version` in your terminal.

Clone the starter project from
https://github.com/appacademy-starters/python-knights-travail.

Change directory into the cloned repository.

Run the tests with the following command line. Note that you'll need to create a
`tree.py` file before being able to view the test errors. Run the following
command from the root directory of your project, not from within the `test`
directory.

```shell
python -m unittest
```

At the top of your test response, you'll see "EEEEEEEEEEEEEEEEE". This indicates 
that you have seventeen test errors. As you write code and pass tests, you'll 
see each `E` change to a `.` for a passed test or an `F` for a failed test. At 
the bottom, you can also see how many failed tests you have 
"FAILED (errors=17)".

## Write the tree node class

Create a file named `tree.py`. In there, declare a class named `Node`. Create
an initializer for `Node` that does the following things.

* Accepts a parameter named "value" and sets an instance variable named "_value"
  to that value
* Sets the "_parent" instance variable to `None`
* Sets the "_children" instance variable to a new empty list

Then, add the following to the class

* A getter property method named "value" that returns the value in "_value"
* A getter property method named "children" that returns the value of
  "_children"
* A method named "add_child" that takes a node to append it to the list in
  "_children" and update the node's "_parent", if the node is not already in 
  "_children"
* A method named "remove_child" that takes a node to remove it from the list
  in "_children" and reset its "_parent" to `None`
* A getter property method named "parent" that returns the value of "_parent"
* A setter property method named "parent" that sets the parent property _and_
  calls the "add_child" method of the parent node passing itself as the node to
  add to the list of children

Once you do that, you should be able to run the tests and see that all of the
tests for `__init__()` works and most of the ones for `parent()` should pass.
You'll finish the other tests for that method soon.

## Reassign parents

Currently, the `parent()` setter does not update a node's children when it is reassigned or removed as a parent. Add the following code to the bottom of 
your `tree.py` file and run `python3 tree.py` to manually test and examine the 
children.

```python
node1 = Node("root1")
node2 = Node("root2")
node3 = Node("root3")

node3.parent = node1
node3.parent = node2

print(node1.children)
print(node2.children)
```

You should see two lists containing `node3` with the same identifier:

```sh
[<__main__.Node object at 0x10ee02640>]
[<__main__.Node object at 0x10ee02640>]
```

When you assign `node1` as the parent of `node3`, `node3` adds itself to the 
children of `node1`. When you then assign the parent of `node3` to `node2`,
`node3` adds itself to the children of `node2`, but _is still in the children
of `node1`_! That doesn't make sense.

Modify the `parent()` setter to _remove_ the child from the existing parent (if
one exists) _before_ adding itself to the new parent's children list. You should
have already implemented the "remove_child" method. Use it.

After adding the condition to remove the child node from the parent if the child 
has a parent, you'll receive a new error:

```sh
AttributeError: 'NoneType' object has no attribute 'add_child'
```

Add a condition to make sure that the input parent `node` is not `None` before 
adding the child node to the parent. Now if you run `python3 tree.py` again, 
you'll notice that your script is running in an endless recursive loop with the 
following error:

```sh
RecursionError: maximum recursion depth exceeded
```

Think of how the `add_child` and `remove_child` methods are both invoking the
`parent()` setter. What would be the base case to prevent an endless recursive
call of the `parent()` setter?

Add the base case. Manually test your `parent()` setter. Once you are no longer
receiving errors, comment out the test cases and run the test suite with `python
-m unittest`. Now all of the `parent()` setter tests should pass. You should
have four remaining tests to pass.

## Searching

Write a method named `depth_search(value)` that takes a value to search for,
performs a depth-first search, and returns the node that contains the value,
if it exists. Otherwise, it should return `None`.

Write a method named `breadth_search(value)` that takes a value to search for,
performs a breadth-first search, and returns the node that contains the value,
if it exists. Otherwise, it should return `None`.

All of the tests should now pass.

________________________________________________________________________________
# Knight's Travails Project Part 2

Now, you're going to build some methods that allow you to get valid moves for a
Knight from a given position.

Create a new file named **path_finders.py**. In it, import the `Node` class you
just created. Then, declare a class named `KnightPathFinder`. The initializer of
the `KnightPathFinder` should take a tuple that is the x and y coordinates on
the standard chess board.

```python
finder = KnightPathFinder((0, 0))
```

## End goal

Ultimately, you will want to be able to find paths to another position from the
start position you initialized the `KnightPathFinder` with.

```python
finder.find_path((2, 1)) # => [(0, 0), (2, 1)]
finder.find_path((3, 3)) # => [(0, 0), (2, 1), (3, 3)]
```

To help you find the paths, you will build a **move tree**. The values in the
tree will be positions. A node is a child of another node if a Knight can move
from the position stored in the parent node _directly_ to the position in the
child node.

For example, if the root node contains the value `(0, 0)`, then the direct
children of that node would nodes that contained the values `(2, 1)` and `(1,
2)`, the two moves that can be made from `(0, 0)`.

## Write the KnightPathFinder class

The root node of the tree should be the knight's starting position, the one
passed in through the initializer. You will use your `Node` class from the last
part to represent each position.

Start by creating an instance variable, `self._root` that stores the knight's
initial position in an instance of your `Node` class.

You'll want to keep track of all of the positions that the tree has already
seen, since you don't want to end up in an infinite loop of bouncing back and
forth between the same two positions. Add a new instance variable to the
initializer named `_considered_positions` and initialize it to a new `set` with
the knight's root start position.

## Valid and new move positions

Write a method named `get_valid_moves(pos)`. Remember that in Python, instance
methods need to take in `self` as the first parameter. From the value in `pos`,
there could be up to eight possible moves. The `get_valid_moves(pos)` method returns
all valid moves from the position passed to it.

Now, write a method named `new_move_positions(pos)`. From the value in
`pos`, use it to call `get_valid_moves(pos)`. Filter out the values returned
from `get_valid_moves(pos)` with the values in `_considered_positions`. Think
of what built-in `set` method you could use. Whatever is left over, add those
values to `_considered_positions`, then return them.

When you have completed both methods, take a moment to test your
`new_move_positions(pos)` method. Initialize an instance of the
`KnightPathFinder` class and invoke the `new_move_positions` method with a
position. You should receive a set of possible moves (valid positions that are
not already in the instance's "_considered_positions".)

```python
finder = KnightPathFinder((0, 0))
print(finder.new_move_positions((0, 0)))   # Expected outcome: {(1, 2), (2, 1)}
```

You're nearly there! Think of some edge cases to test your code with. Once your
methods are working, get a code review from an instructor. Next up, you can
build the move tree.

________________________________________________________________________________
# Knight's Travails Part 3

Now, you're going to use the tree nodes that you created in the last section to
build a "move tree" that allows you to search for the shortest path that a Chess
Knight can take from a start position to an end position.

Create a method named `build_move_tree()`. The root node, right now, has the
value of the starting position. Starting with that value, use the
`new_move_positions(pos)` method to give you the moves that can occur from the
position in the root node. Add each of those positions as children. Continue
building the tree in a **breadth-first** manner. Take inspiration from your
`breadth_search` method in the `Node` class.

When you have completed and take a moment to manually test your
`build_move_tree()` method. Initialize an instance of the `KnightPathFinder`
class and call the `build_move_tree()` method. Then print the collection of
children nodes associated with the instance's "_root" node.

```python
finder = KnightPathFinder((0, 0))
finder.build_move_tree()
print(finder._root.children)
```

You should see a collection of child nodes. For example:

```sh
[<tree.Node object at 0x108fc6520>, <tree.Node object at 0x108fc6850>]
```

Think of some edge cases and test your code. After testing your code, get a
review from an instructor. Then, you can complete the project!

________________________________________________________________________________
# Knight's Travails Part 4

Now that you have created your internal data structure (the move tree stored in
`self._root`), you can traverse it to find the shortest path to any position on
the board from the original position.

Create an instance method named `find_path(end_position)` to search for the
`end_position` in the move tree. You can use either the `depth_search(value)` or
`breadth_search(value)` method on the `Node` object stored in `self._root`. This
should return the tree node containing the value passed in through
`end_position`.

Now that you have a node, you can build a path from it. Add an instance method
named `trace_to_root(end_node)` to the `KnightPathFinder` class. This method
should take an instance of the `Node` class and create a list of the values from
that node back to the root node using the `parent` property on each `Node`
instance. The `trace_to_root(end_node)` should return the values in order from
the start position to the end position.

Use `trace_to_root(end_node)` to finish the `find_path(end_position)` method.

Here are some example paths that you can use for testing purposes. Your paths
might not be exactly the same, but should be the same number of steps.

```python
finder = KnightPathFinder((0, 0))
finder.build_move_tree()
print(finder.find_path((2, 1))) # => [(0, 0), (2, 1)]
print(finder.find_path((3, 3))) # => [(0, 0), (2, 1), (3, 3)]
print(finder.find_path((6, 2))) # => [(0, 0), (1, 2), (2, 4), (4, 3), (6, 2)]
print(finder.find_path((7, 6))) # => [(0, 0), (1, 2), (2, 4), (4, 3), (5, 5), (7, 6)]
```

________________________________________________________________________________
# Command Line Tic-Tac-Toe

In this project, you will write an interactive Python program that plays
Tic-Tac-Toe. You will use the following ideas that you have learned so far:

* using variables
* using lists
* using tuples
* using functions to organize your code
* using `print` to print information to the terminal
* using `input()` to get input from the player
* using loops
* converting strings to integers
* using `if` statements

## The game

In case you have forgotten how Tic-Tac-Toe is played, here's the [Wikipedia
article on Tic-Tac-Toe][1].

## Set Up

Make sure that you're running a variation of Python 3.8 in your terminal. Type
`python --version` and make sure the version begins with "3.8".

Clone the starter repository from
https://github.com/appacademy-starters/python-tic-tac-toe.

Change the working directory into your cloned repository. Open it with Visual
Studio Code and do your work in the **tic_tac_toe.py** file.

To run the file, type `python tic_tac_toe.py` in your terminal.

## The starter file

The file **tic_tac_toe.py** already has some fully-written functions in there
for you, so that you don't have to do things like print the board. The rest of
the file contains stubbed-out functions for you to complete so that the game
will work.

Make sure you do good validation of player input so that they can't enter
something meaningless or wrong.

Your job is to complete the functions based on the comments in the functions to
get the game play to work. The comments in the functions comply with the
specifications in [PEP 257 - Docstring Conventions][2]. You'll see lots of that
type of documentation in your Python career, so it's good to start, now!

## Functions to complete

Below is the recommended order to finish the stubbed-out functions. As you
finish writing each function, think about how you could test that the function
is working as expected.

### Grid space value

Begin by rendering numbers in the Tic-Tac-Toe grid. Complete the  `space_value`
function and take a moment to figure out its expected behavior by observing how
it is used in the `draw_board` function.

### Get game move

Then go through and complete the `get_player_move`, `get_random_move`, and
`is_board_full` functions. To generate random moves, think about how to use the
[`shuffle`][3] method from the `random` module.

Note that you can make use of the `is_space_free` function to verify whether a
user's move in `get_player_move` or the computer's move in `get_random_move` is
valid. You can also use the `is_space_free` function to check whether the game
board is full in the `is_board_full` function.

### End of game

Go through and finish the `is_winner` function to determine whether the the
specified letter is a winner. Lastly, finish the `play_again` function to take
in user input and determine if the player wants to play again.

Congratulations! You have written an interactive Python program to play
Tic-Tac-Toe with a simple AI in the command line!


[1]: https://en.wikipedia.org/wiki/Tic-tac-toe#Game_play
[2]: https://www.python.org/dev/peps/pep-0257/
[3]: https://docs.python.org/3/library/random.html?highlight=shuffle#random.shuffle

________________________________________________________________________________
# Linked List Project

This project contains a skeleton for you to implement a singly linked list. You
have done this in JavaScript and now it's time to practice implementing the data
structure in Python. It is important to get comfortable and confident in data
structures as you begin to ramp up for interviews. As with everything you have
learned at App Academy, you know that practice makes perfect!

## Phase 1

Following the instructions below, you'll implement a `Node` class and a
`LinkedList` class with methods to append, remove, and access the linked nodes
within the list. Begin by cloning the project from
https://github.com/appacademy-starters/python-linked-list.

### Node and LinkedList initialization

You'll begin by completing the Node `__init__` method so that each Node instance
has "_value" and "_next" properties. Remember that Python errors out if there
are empty method definitions, so you'll replace the `pass` in each block with
the code you write to complete the method. Next, you'll complete the LinkedList
`__init__` method so that each LinkedList instance has "_head", "_tail", and
"_length" properties. The "_length" property will be used to keep track of the
size of the list.

Take a moment to test the initialization of your `Node` and `LinkedList` class
instances by running `python3 linked_list.py`. There are commented out
statements to test each `LinkedList` method. As you finish writing each method,
comment in more statements to test your code. Note that you should not comment
out statements under "Phase 1 Manual Testing" until your have finished testing
all of your Phase 1 methods (`get_node`, `add_to_tail`, `add_to_head`,
`remove_head`, `remove_tail`, and `__len__`).

### get_node(position)

The `get_node` method will take care of getting a node by its position. It
should return `None` if the position is out of bounds. Note that although it is
_Pythonic_ to have explicit code, it is convention to implicitly return `None`
rather than explicitly.

Take a moment to notice how this method takes in a `position` instead of an
index. The parameter is intentionally named to create an explicit distinction
from arrays (or lists in Python). As you might remember, you are unable to _key_
into the middle of a linked list by its index to access an element. The method
will iterate through the list's nodes to return the node of the specified
position when get is called. Think of how you can make use of the node's "_next"
attribute. Comment in the following statement to test your code:

```python
# 2. Test getting a node by its position
print(linked_list.get_node(0))    # None
```

### add_to_tail(value)

The `add_to_tail` method should reassign the tail pointer when new nodes are
added to the tail. Begin by initializing a new node with the `value` to add. It
should then reassign both the "_head" and "_tail" pointers when a new node is
added.

If the head node is `None`, set the head to be the new node you just
initialized. Otherwise, set the "_next" node of the list's tail to be the new
node. Take a moment to visualize how you now are now either setting the root
"_head" node of your list or simply chaining onto the tail of the list.

You'll need to update the list's "_tail" to be the new node as well as increment
its "_length" after new nodes are added to the tail. The method should return
the updated list (`self`) after new nodes are added to the tail. Comment in the
following statements to test your code:

```python
# 3. Test adding a node to the list's tail
linked_list.add_to_tail('new tail node')
print(linked_list.get_node(0))          # <__main__.Node object at ...>
print(linked_list.get_node(0)._value)   # `new tail node`
```

### add_to_head(value)

The `add_to_head` method should take care of adding a node as the list's
"_head". It should reassign the head pointer when new nodes are added to the
head. Like in your `add_to_tail` method, the `add_to_head` method should
initialize a new node with the input `value` and reassign both the "_head" and
"_tail" pointers to the new node. When the list is empty, the head and tail
pointers should both be reassigned to the new node.

If the linked list has no head, set both the head and tail as the new node.
Otherwise, set the new node as the head and update the list to follow. The
method should also update the "_length" attribute and return the updated list
after new nodes are added to the head. Comment in the following statements to
test your code:

```python
# 4. Test adding a node to list's head
linked_list.add_to_head('new head node')
print(linked_list.get_node(0))          # <__main__.Node object at ...>
print(linked_list.get_node(0)._value)   # `new head node`
```

### remove_head()

The `remove_head` method will take care of removing the head node. should return
`None` if the list is empty. Otherwise, it should remove the head node from the
list by reassigning the head pointer to the next node in the list. It should
also decrement the list "_length" after removing the head node. If length of the
list is zero after decrementing, the tail pointer should be reassigned to `None`
when the head. The method should return the removed node when called. Comment in
the following statements to test your code:

```python
# 5. Test removing the head node
linked_list_node_head()
print(linked_list.get_node(0)._value)   # `new tail node`
print(linked_list.get_node(1))          # None
```

### remove_tail()

The `remove_tail` method  will take care of removing the tail node. It should
implicitly return `None` if the list head is `None`. Now, what if the `_tail`
node is the same as the `_head` node? What would you do to completely remove all
of the list's nodes and how might you test that?

If the list head is not `None`, set the current node as the removed node's head
and set the new tail as the current node. While the current node has a following
neighbor ("_next"), update the new tail and current nodes. Remember to update
the "_length" attribute and reassign the list's tail pointer to the new tail.
Make sure the list's tail doesn't have a neighbor ("_next"), otherwise it
wouldn't be a tail! The method should return the removed tail node when it is
called. Comment in the following statements to test your code:

```python
# 6. Test removing the tail node
print(linked_list.get_node(0)._value)   # `new tail node`
linked_list_node_tail()
print(linked_list.get_node(0))          # None
```

### __len__()

The `__len__` method will take care of returning the list length. You are
familiar with invoking the `len()` function for strings and lists. These
functions don't magically "work" for strings or lists as an inherent part of the
language, but are functions that have been implemented by developers just like
us, just like you will do for your `LinkedList` class! The method should act as
a getter to return the "_length" attribute of the list. Comment in the following
statements to test your code:

```python
# 7. Test returning the list length
print(len(linked_list))   # 2
```

Before moving on to Phase 2, make sure to test your code with the provided test
statements at the bottom of the `linked_list.py` file under "Phase 1 Manual
Testing". This is also a good point to commit your code. Once you have finished
manually testing the `get_node`, `add_to_tail`, `remove_tail`, `add_to_head`,
`remove_head`, and `__len__` methods, comment out all the Phase 1 test cases.

## Phase 2

In this phase, you'll be writing the code to complete your LinkedList's
`contains_value`, `insert_value`, `update_value`, `remove_node`, and `__str__`
methods. Take a moment to review the expected output of the test cases under
"Phase 2 Manual Testing". As you become a vetted software engineer, your mind
will automatically gravitate towards testing.

In your later projects, you'll take more ownership of testing your code, either
through manual testing like today's project or with actual test suites and
test-driven development. For now, focus on improving your manual testing and
debugging skills.

### contains_value(target)

The `contains_value` method will check whether the list contains a value and
return a boolean. It will check each linked node, starting from the head node,
and compare its "_value" to the `target` value. Make sure your Phase 1 cases are
commented out, then comment in the following statements to test your code:

```python
# 1. Test whether the list contains a value
linked_list = LinkedList()
linked_list.add_to_head('new head node')
print(linked_list.contains_value('new head node'))      # True
print(linked_list.contains_value('App Academy node'))   # False
```

### insert_value(position, value)

The `insert_value` method will take care of inserting a node value into the list
at a specific position. It should return `False` if the position is out of
bounds. If the position is zero, the method will use the `add_to_head` method to
insert the value. If the position is the same list's length, use the
`add_to_tail` method. 

If you are not simply returning `False` due to an invalid position, inserting a
head node, or inserting a tail node, you'll need to shift some nodes in your
insertion. Initialize a `new_node` with the given value. Use the given position
to reference a `previous_node`. Now you'll want to save the previous node's
"_next" node as a `node_to_move`. Your `new_node` will be inserted after the
`previous_node` and before the `node_to_move`. Think of how you need to change
the pointer references to achieve this.

The method should return `True` whenever the node is successfully inserted at a
specified position. The method should also update the list's "_length"
attribute. Comment in the following statements to test your code:

```python
# 2. Test inserting a node value into the list at a specific position
linked_list.insert_value(0, 'hello!')
print(linked_list.get_node(0)._value)   # `hello!`
```

### update_value(position, value)

The `update_value` method will take care of updating a list's node at a specific
position. You can use the `get_node` method you wrote in Phase 1 to reference
the `node_to_update`. If the `node_to_update` is successfully found, update its
value and return `True. Otherwise, return `False` when a node is not found at
the provided position. Comment in the following statements to test your code:

```python
# 3. Test updating a list node's value at a specific position
linked_list.update_value(0, 'goodbye!')
print(linked_list.get_node(0)._value)   # `goodbye!`
```

### remove_node(position)

The `remove_node` method will take care of removing a node from the list at a
specific position. It should implicitly return `None` if the position is out of
bounds. Otherwise, it will remove the node at the specified position from the
list. If the position is referencing the first node of the list, use the
`remove_head` method. If the position is referencing the last node of the list,
use the `remove_tail` method.

Similarly to the `insert_value` method, you'll need to shift some nodes if you
are not simply returning `None` due to an invalid position, removing the head
node, or removing the tail node. Use the given position to reference a
`previous_node`. Now you'll want to save the previous node's "_next" node as a
`node_to_remove`. The "_next" node your the `node_to_remove` will be set as
"_next" node of the `previous_node`.

This way, any pointers to the `node_to_remove` are unlinked and your
`node_to_remove` is removed from the list. Update the list's "_length" and
return the removed node when a node is removed. Comment in the following
statements to test your code:

```python
# 4. Test removing a node value from the list at a specific position
print(linked_list.get_node(1)._value)   # `new head node`
linked_list.remove_node(1)
print(linked_list.get_node(1))          # None
```

### __str__()

Congratulations! You've now implemented a fully functional linked list. The next
step is to make it easier for you to test and view the link list. Notice how you
needed to explicitly print each node's "_value" attribute in order to identify
it. You can overwrite the `__str__` method so that your linked list will be
automatically formatted as a string whenever `print()` is invoked. Start at the
"_head" node and check if it exists. If the list has no head node, simply return
`'Empty List'`. Otherwise, generate a `values_string` for which you will append
each node's "_value" string. Think of how you might add spacing or a comma
between each additional node value. After iterating through each node, return
the accumulated string of node values.

```python
# 5. Format the list as a string whenever `print()` is invoked
new_linked_list = LinkedList()
print(new_linked_list)                  # Empty List
new_linked_list.add_to_tail('puppies')
print(new_linked_list)                  # puppies
new_linked_list.add_to_tail('kittens')
print(new_linked_list)                  # puppies, kittens
```

The test cases provided for you in today's project have been overly simple. As a
developer, it is up to you to think of edge cases that might break your code.
Based on the simple test cases provided, take a moment to brainstorm and write
custom statements that test edge cases before requesting a code review from an
instructor.

________________________________________________________________________________
# Binary Tree Project

This project contains a skeleton for you to implement a binary tree. You'll
begin by implementing a node class for the tree and setting the tree order.
Begin by cloning the starter project from
https://github.com/appacademy-starters/python-binary-tree.

## Instructions

You'll notice that you have three files:
  * **tree_node.py** to implement the `TreeNode` class; and
  * **tree_order.py** to implement the `in_order_traversal` and
    `post_order_traversal` functions to traverse a tree; and
  * **leet_code_105.py** as a scratch pad.

### TreeNode

Implement a `TreeNode` class in the `tree_node.py` file. The `__init__` method
should set a `value` input as an attribute. The method should also initialize
`left` and `right` attributes to `None`. Uncomment the print statements and run
your script with `python3 tree_node.py` to test whether your `__init__` method
successfully sets a node `value` and whether you can successfully set `left` and
`right` child nodes.

### Tree Order

In the `tree_order.py` file, you'll implement two functions to traverse the tree
either _in-order_ or in _post-order_. As a quick reminder, tree traversal is the
process of visiting each node in a tree exactly once in some order. There are
three main ways to traverse a tree: pre-order, in-order, and post-order. Today,
you'll be implement functions to traverse a tree in-order and post-order. In the
bonus LeetCode function, you'll build a tree by taking in a pre-ordered tree as
well as an in-ordered tree.

**In-order** traversal is when the left node is visited before the root node,
and the root node is visited before the right node: left node → root node →
right node.

![in-order-diagram][in-order]

**Post-order** traversal is when the left and right nodes are visited before the
root node: left node → right node → root node.

![post-order-diagram][post-order]

**Pre-order** traversal is simply the pattern where the root node is visited
before the left and right nodes: root node → left node → right node.

![pre-order-diagram][pre-order]

The `in_order_traversal` function will return an _in-order_ list containing
values of the binary tree while the `post_order_traversal` function will return
a list containing values following _post-order_. When given an empty tree, both
functions will return an empty list.

Notice how the top of the file imports the `TreeNode` class from the
`tree_node.py` file. Your `TreeNode` class is imported to allow for manual
testing. There is one test case provided for you. Now it's time for you to
practice structuring your own testing! You can start by thinking about possible
edge cases and writing manual tests to check your code with those edge cases!

[in-order]:
https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/python/topics/structures/assets/in-order.png

[post-order]:
https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/python/topics/structures/assets/post-order.png

[pre-order]:
https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/python/topics/structures/assets/pre-order.png

________________________________________________________________________________
# Binary Search Tree Project

This project contains a skeleton for you to implement a binary search tree.
Clone the starter project from
https://github.com/appacademy-starters/python-bst.

## Instructions

Your job is to write code in:
  * **bst.py** to complete the `insert_value`, `search_iteratively`, and
    `search_recursively` methods of the `BinarySearchTree` class; and
  * **leet_code_108.py** as a scratch pad; and
  * **leet_code_110.py** as a scratch pad.

### __init__(value)

Each instance of the `BinarySearchTree` class will be initialized with a `_root`
node property that defaults to `None`. You'll also want each tree to have a
`_value` attribute as well as a way to connect to a `_left` and `_right` child
node. Test the instantiation of a `BinarySearchTree` instance by running
`python3 bst.py`.

### insert_value(value, current_node)

The `insert_value` method should insert a `TreeNode` with the given value into
the `BinarySearchTree`. If the `current_node` is `False`, check whether the
tree's root node is `None`. If it is, initialize a new `TreeNode` with the given
value. When the `BinarySearchTree` is empty, a `TreeNode` with the given value
should be correctly inserted as the root. Update the tree's root node and return
its value.

If the given value is less than the value of the `current_node`, you'll want to
continue checking the left of the tree. If the `current_node` does not have a
left child, initialize a new `TreeNode` and set it as the left child of the
`current_node`. Otherwise, invoke the `insert_value` method with the given value
and the left child of the current node as the `current_node` argument.

If the given value is greater than the current node's value, check whether the
current node's right child exists. If not, set the right child to be a new
`TreeNode` with the given value. If the current node's right child does exist,
invoke the `insert_value` method with the given value and the right child of the
current node. Comment in the following test cases and run the script file with
`python3 bst.py` to verify that your `insert_value` method is working as
expected:

```python
tree = BinarySearchTree()
print(tree._root)                         # None

# 1. Test node value insertion
tree.insert_value(10)
tree.insert_value(5)
tree.insert_value(16)
tree.insert_value(1)
tree.insert_value(7)
tree.insert_value(16)
print(tree._root._value)                  # 10
print(tree._root._left._value)            # 5
print(tree._root._right._value)           # 16
print(tree._root._left._left._value)      # 1
print(tree._root._left._right._value)     # 7
print(tree._root._right._right._value)    # 16
```

### search_iteratively(value) should

The `search_iteratively` method should return false when the `BinarySearchTree`
is empty. The method should check each node's left or right node iteratively,
not recursively. Begin by setting the current node to check to be the tree's
root node. When the value is contained in the `BinarySearchTree`, the method
should return true. Otherwise, the method should return false. Comment in the
following test cases to check your `search_iteratively` method:

```python
# 2. Test iterative search
empty_tree = BinarySearchTree()
print(empty_tree.search_iteratively(10))  # False
print(tree.search_iteratively(10))        # True
print(tree.search_iteratively(7))         # True
print(tree.search_iteratively(-1))        # False
```

### search_recursively(value, current_node)

The `search_recursively` method should return false when the `BinarySearchTree`
is empty. The method should recursively check the left and right child nodes of
the current node. If the current node is `None`, the method should return false
since there are no possible nodes to search through for the value. If the target
value is less than the current node's value, recursively search through the left
tree. If the target value is greater than the current node's value, recursively
search through the right tree. When the value is found in the
`BinarySearchTree`, the method should return true. Comment in the test cases
below to check your `search_recursively` method.

```python
# 3. Test recursive search
print(empty_tree.search_recursively(10))  # False
print(tree.search_recursively(10))        # True
print(tree.search_recursively(7))         # True
print(tree.search_recursively(-1))        # False
```
