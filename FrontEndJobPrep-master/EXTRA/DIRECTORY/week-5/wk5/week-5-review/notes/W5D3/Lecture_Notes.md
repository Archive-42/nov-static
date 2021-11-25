# SOLID OOP - Lecture Notes

---

## Object-Oriented Programming Explained

### Encapsulation

Developers should not need to know how processes are implemented within the classes they reference. The constructor and instance methods provide the only interface any user should need to know about.

### Inheritance

Instances of prototypes (classes) exhibit the attributes and behavior of those classes and their ancestors.

> JavaScript, in particular, supports a type of inheritance known as **implementation inheritance** through a mechanism known as **prototypal inheritance**. _Implementation inheritance_ means that the data and methods defined on a parent class are available on objects created from classes that inherit from those parent classes. _Prototypal inheritance_ means that JavaScript uses prototype objects to make its _implementation inheritance_ actually work.

#### Inheritance Terminology

- **Parent [Class]** - also **prototype** (JavaScript), or _super class_ - the _immediate_ ancestor of this object's class or prototype.

- **Base [Class]** - an _ancestor_ class - immediate, ultimate, or somewhere between.

NOTE: Often people will use the term _base class_ to mean 'the ultimate ancestor class _from the point of view of the part of the project I care about_ - which is to say, a _widget_ class might be the base class to all of the controls in my library, but it still might be derived from a _window_ class in the framework I'm using to implement my controls.

- **Child [Class]** - a _descendent_ class - immediate, final, or somewhere between.

- **Subtype** - as **classes** are often called _"user defined types"_, the process of creating a derived class is often called "subtyping". Similarly, _base classes_ are also sometimes called **supertypes**.

Classes higher in a class heirarchy are said to be more _general_; the process of identifying common features across one's code and producing these more basic classes is called _generalization_. Classes lower in a heirarchy are conversely more _derived_ or _specialized_, and the process of producing them is called _specialization_ (or _derivation_, or _subtyping_)

### Polymorphism

Polymorphism relates to the ability of different objects or classes to implement a common behavior in instance-specific ways. For instance, a collection of _Shape_ classes might each implement a `draw` method, each in a shape-appropriate way. Or a collection of _Animal_ classes might each implement a `sound(adjective)` method. In strongly typed languages, these classes would all be derived from a common _Shape_ or _Animal_ base class; Python and JavaScript, on the other hand, implement _"duck typing"_ (_"if it looks like a duck..."_) which means that any class that implements a method called `draw` or `sound(adjective)` can be called without need for a common ancestor.

**_Monkey Patching_** is a term related to _polymorphism_, where a class, prototype or object is given new behavior at run time by adding methods that override default behavior.

---

## Video: The Single Responsibility Principle

The _Single-Responsibility Principle_ (SRP) - this is the first of a series on **Object Oriented** **_Design_** **Principles**.

This approach does not apply _only_ to classes - do one thing and do it well - the "UNIX" philosophy.

### Alternative Statements of the SRP

- Have only one reason to change a class
- Put like behavior together

Curtis provides an example in the form of an _invoice_. Two kinds of line items, _expenses_ and _fees_, are then attached as _line items_.

NOTE: the behavior of the _expense_ class and the _fee_ class could be further generalized to a common _lineItem_ class.

---

## Video: The Liskov Subsitution Principle

The _Liskov Substitution Principle_ (LSP) - this is another of a series on **Object Oriented** **_Design_** **Principles**.

Named for Barbara Liskov - can be summarized as, "don't write dumb methods on your child classes".

### What must be true, in order to comply with this principle:

Generally, _objects should be replaceable with their subtypes_.

**Preconditions** are conditions that must be true before you invoke a method

**Postconditions** are conditions that must be true after you invoke a method

**Invariants** are things that must always be true about the class

- Preconditions cannot be strengthened in a subtype
- Postconditions cannot be weakened in a subtype
- Invariants of the supertype must be preserved in a subtype

Curtis shares an example of a _Square_ class that is derived (incorrectly, per the Liskov Substitution Principle) from a _Rectangle_ class, as the _Square_ class sets the parent _Rectangle_ width and heigth to the same value. The _square_ class is theN refactored as an independent class, so that it can have a `setSide` method that reflects its squareness without altering two dimensions on the _Rectangle_ class.

Curtis closes with:

- **classes** are about _behavior_
- **inheritance** is about sharing _behavior_
- **LSP** is about _good_ behavior

---

## Video: The Law of Demeter

The _Law of Demeter_ (LoD) - this is yet another of a series on **Object Oriented** **_Design_** **Principles**.

The **Law of Demeter** promotes loose **_coupling_** _between classes_.

_Coupling_ is when one class knows about another class in order to call its methods and properties.

### The LoD Defined:

_A method of an object can only invoke the methods (or use the properties) of the following kinds of objects:_

- methods on the object itself
- any of the objects passed in as parameters to the method
- any object created in the method
- any values stored in the instance variables of the object
- any values stored in global variables

NOTE: The LoD is also refered to as the "one-dot" rule, as one is allowed to invoke `obj.property` but not `obj.relatedObj.property`.

Curtis mentions that the LoD is in particular protecting JavaScript developers from some of the complexities of tracing references in JS code.

---

## Adendum : Homework Commentary

### Using Classes in ES6

Curtis demonstrates how to use compiler errors to write a _stub_ for a hypothetical quiz program.

He distinguishes between a _simple_ instance variable, and an instance variable that is a container for other objects - the example he gives is an array. This container-as-instance-variable pattern he refers to as _aggregation_.

He suggests an approach to design that starts with coding possibly related classes separately, and then refactoring them as derived from a common base class, based on any duplicated behavior.

He gives a check list of the terms introduced (in this lecture / ES6)

- Class
- Constructor
- Instance Variables
- Instance Methods
- Aggregation
- Inheritance
