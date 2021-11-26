# Introduction to Import
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

When you complete this lesson, you should be able to
* Define *module* in Python
* Use `import` to load a built-in module
* Understand the relationship between *packages*, *modules* and *submodules*
* Follow common best practices for importing modules

## Overview

Modules in Python are similar to packages in Node.js and JavaScript. In short,
they are a way to split code into multiple files.

Modules come in different "flavors" depending on their source
1. *Built-in* - already in Python
2. *Third-party* - downloaded via command line
3. *Custom* - what you make

Regardless of flavor, all modules are loaded using `import` statements.

### Terms

1. A **module** is simply Python code in a separate file.
2. A **package** is the path to a directory that contains modules which is also
   a special type of module.
3. **`__init__.py`** is the default file for a package.
4. A **submodule** is another file in a module’s folder.
5. A **function** is (obviously!) a function in a module.

### Visualization

```
project
│   README.md
│   __init__.py
|   shopping_cart.py         <== module
│
└───pet                      <== package
│   │
│   └───mammal               <== module (and package)
|   |   |   __init__.py
│   |   │   dog.py           <== submodule
│   |   │   cat.py           <== submodule
│   |   │   ...
│   │
│   └───fish                 <== module (and package)
|   |   |   __init__.py
│   │
│   └───bird                 <== module (and package)
|       |   __init__.py
│
└───housing                  <== module (and package)
    │   __init__.py
    │   aquarium.py          <== submodule
    │   cage.py              <== submodule
    │   kennel.py            <== submodule
    |   ...
```

## Import Statements

Here are some common examples of importing modules
* `import <module>` - most basic
* `import <package>.<subpackage>.<module>` - dot syntax
* `from <package> import <module>` - one module in a package
* `from <package> import <module>, <module>` - multiple modules or submodules in
  a package
* `from . import <submodule> `- special case for module's `__init__.py` to get
  submodules in the same folder
* `from <module> import <function>, <function>` - down to the function level
* `from <package> import <module> as <altName>` - renaming to avoid confusion or
  conflict

For more information you can see the Official Documentation on the [Import
Statement].

### Going Deeper

While a module can be any file, it is usually created by placing a special file
(`__init__.py`) in a folder. This folder then becomes the module’s name and is
treated as a module/package that may be imported.

When you have large modules, it is good practice to break up functionality into
submodules - that is, separate files - and have `__init__.py` import them. This
means the module can be imported as a whole, or each part imported as it's
required. These submodules can even be placed into subfolders (and given their
own `__init__.py` file).

Packages represent the path to modules. Remember in Python they are also modules
themselves. Packages are usually made up of one or more folders. In rare
occasions, a package path can be set within a module file using a special
attribute `__path__`.

All packages are modules (that is, a special kind of module). However, a module
is only a package if it is in a folder or if it’s given a path through code.

The [documentation] spells it out this way

> It’s important to keep in mind that all packages are modules, but not all
> modules are packages. Or put another way, packages are just a special kind of
> module. Specifically, any module that contains a `__path__` attribute is
> considered a package.

### Image - Tree representation of Python module structure

Modules can import submodules, but not the other way around. Packages don't do
any importing; rather, they wrap modules together into a collection that can be
treated as a single unit.

Think of a tree...

![Module
tree](images/module-tree.svg)

The path to any item (in Python that's `__path__`) is created by following the
trunk down each branch to the desired destination.

## Recommendations

### Avoid wildcards

A proper principle to follow is importing only what you are using.

Wildcard statements include an asterisk like `from math import *` or reference
only a package name like `import requests`. This is important to notice because
many examples online use generic imports.

While is seems like a quick way to get work done, you will likely regret it
later because it makes your Python code more difficult to understand, especially
at a later time when you're trying to figure out where a specific piece of
functionality was used. Additionally it can put a lot of code into memory when a
large module is imported (like `math`).

### Use multiple lines for clarity

This is especially helpful when you have many elements and/or when using “as”.
Also when looking back at your commit history in  GitHub, you will appreciate
having multiple lines so you can clearly pick out the changes!

Best practices recommended ordering the items in alphabetically or in another
logical way. Some development teams like to do class first, then functions where
each section is alphabetical (as shown in this example).

```python
from urllib.request import (
  HTTPDefaultErrorHandler as ErrorHandler,
  HTTPRedirectHandler as RedirectHandler,
  Request,
  pathname2url,
  url2pathname,
  urlopen,
)
```

## What you've learned

* Define *module* in Python
* Use `import` to load a built-in module
* Understand the relationship between *packages*, *modules* and *submodules*
* Follow common best practices for importing modules


[Import Statement]: https://docs.python.org/3/reference/simple_stmts.html#import
[documentation]: https://docs.python.org/3/reference/import.html
