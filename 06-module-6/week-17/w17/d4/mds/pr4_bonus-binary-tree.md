# Binary Tree Project
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

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
