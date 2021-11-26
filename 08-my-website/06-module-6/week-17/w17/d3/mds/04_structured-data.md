# Structured Data Explained
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

When you complete this lesson, you should be able to
- Define *sequence*, *collection* and *iterable*
- Explain *immutable*

## Sequences

The most basic data structure in Python is a **sequence**. Each item in a 
sequence is assigned an **index** and this index determines the *order* of
the sequence. The first index is zero.

You are already familiar with the text sequence type `str`, a.k.a. strings. 
The three basic sequence types you'll study in this lesson are *list*, *tuple* 
and *range*.

## Collections

Collections are unordered data structures. Instead of indexes, collections
use hashable values. In simple terms, a *hashable* value never changes during 
its lifetime. Since hashable values may be compared to determine equality, they
are usable as a key in a dictionary or as the member of a set. You'll study
*dictionaries* and *sets* in this lesson.

## Iterable

An *iterable* can be thought of as the generic name for a sequence or 
collection. Specifically, an iterable is any object on which a loop 
can run (a.k.a. iterate over) to access the elements in the item.

## Immutable

Iterables come in two forms: **mutable** and **immutable**. In short, *mutable* 
iterators can be modified or changed and *immutable* ones are frozen (similar 
to constants) so cannot be changed.

Common actions for sequences include
* Checking for the presence of an item: `if x in mylist`
* Looping: `for x in mylist`
* Adding: `[1,2,3] + [4,5,6]`
* Multiplying `('am','pm') * 3`

Mutable sequences have additional actions like
* Adding items: `append`
* Removing items: `remove`
* Ordering: `sort`, `reverse`
* Splicing (a.k.a. partial replacements): `splice`

Any function which modifies an iterable (that is, from the second list) will 
throw an error if you try to run it on an immutable object.

## What you've learned

In this article, you learned that Python has two types of *iterable* data 
structures: *sequence* and *collection*. You also learned that *immutable* 
iterables, like constants, cannot be changed.
