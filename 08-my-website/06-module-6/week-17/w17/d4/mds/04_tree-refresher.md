# Tree Refresher
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

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
