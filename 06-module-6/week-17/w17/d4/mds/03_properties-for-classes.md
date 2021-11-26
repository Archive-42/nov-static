# Properties
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

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
