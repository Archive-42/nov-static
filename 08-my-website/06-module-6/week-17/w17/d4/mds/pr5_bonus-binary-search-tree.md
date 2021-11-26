# Binary Search Tree Project
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

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
