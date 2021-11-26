# The NoneType Data Type
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

Where JavaScript has both the `null` and `undefined` values that can imply the
lack of existence of a value, Python only has one.

In Python there is a value called `None`, which represents the absence of a
value. `None` is the only value of the `NoneType` data type. Just like the
Boolean `True` and `False` values, `None` must be typed with a capital N.

This value-without-a-value can be helpful when you need to store something
that won’t be confused for a real value in a variable. One place where `None` is
used is as the return value of functions that do not explicitly return a value,
much in the same way that JavaScript will return `undefined` for functions that
do not return a value.

Behind the scenes, Python adds `return None` to the end of any function
definition with no return statement. Also, if you use a `return` statement
without a value (that is, just the `return` keyword by itself), then `None` is
returned.
