# Inheritance
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

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
