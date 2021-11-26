# @datastructures-js/trie

[![build:?](https://travis-ci.org/datastructures-js/trie.svg?branch=master)](https://travis-ci.org/datastructures-js/trie) 
[![npm](https://img.shields.io/npm/v/@datastructures-js/trie.svg)](https://www.npmjs.com/package/@datastructures-js/trie)
[![npm](https://img.shields.io/npm/dm/@datastructures-js/trie.svg)](https://www.npmjs.com/package/@datastructures-js/trie) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/@datastructures-js/trie)

Trie implementation in javascript. Each Trie node holds one character of a word.

<table>
<tr><th>Trie</th></tr>
<tr><td><img width="500" alt="Trie" src="https://user-images.githubusercontent.com/6517308/42425010-dc9f20ca-82db-11e8-8f78-1efe6959df5f.png">
</td></tr>
</table>

# Table of Contents
- [@datastructures-js/trie](#datastructures-jstrie)
- [Table of Contents](#table-of-contents)
      - [Example](#example)
    - [.has(word)](#hasword)
      - [Example](#example-1)
    - [.find(word)](#findword)
      - [Example](#example-2)
    - [.remove(word)](#removeword)
      - [Example](#example-3)
    - [.forEach(cb)](#foreachcb)
    - [.toArray()](#toarray)
      - [Example](#example-4)
    - [.wordsCount()](#wordscount)
      - [Example](#example-5)
    - [.nodesCount()](#nodescount)
      - [Example](#example-6)
    - [.clear()](#clear)
      - [Example](#example-7)
    - [TrieNode](#trienode)
      - [.getChar()](#getchar)
      - [.getParent()](#getparent)
      - [.isEndOfWord()](#isendofword)
      - [.getChild(char)](#getchildchar)
      - [.hasChild(char)](#haschildchar)
      - [.childrenCount()](#childrencount)


<table>
 <tr><th align="center" colspan="2">params</th></tr>
 <tr><td><b>name</b></td><td><b>type</b></td></tr>
  <tr><td>word</td><td>string</td></tr>
</table>

<table>
 <tr><th>return</th></tr>
 <tr><td><a href="#trienode">TrieNode</a></td></tr>
</table>

<table>
 <tr><th>runtime</th></tr>
 <tr><td>O(k) : k = length of the word</td></tr>
</table>

#### Example

```js
englishLang.insert('hi');
englishLang.insert('hit');
englishLang.insert('hide');
englishLang.insert('hello');
englishLang.insert('sand');
englishLang.insert('safe');
englishLang.insert('noun');
englishLang.insert('name');
```

*Note: the empty string is not a default word in the trie. You can add the empty word explicitly using `.insert('')`*

### .has(word)
checks if a word exists in the trie.

<table>
 <tr><th align="center" colspan="2">params</th></tr>
 <tr><td><b>name</b></td><td><b>type</b></td></tr>
  <tr><td>word</td><td>string</td></tr>
</table>

<table>
 <tr><th>return</th></tr>
 <tr><td>boolean</td></tr>
</table>

<table>
 <tr><th>runtime</th></tr>
 <tr><td>O(k) : k = length of the word</td></tr>
</table>

#### Example

```js
englishLang.has('hi'); // true
englishLang.has('sky'); // false
```

### .find(word)
finds a word in the trie and returns the node of its last character.

<table>
 <tr><th align="center" colspan="2">params</th></tr>
 <tr><td><b>name</b></td><td><b>type</b></td></tr>
  <tr><td>word</td><td>string</td></tr>
</table>

<table>
 <tr><th>return</th></tr>
 <tr><td><a href="#trienode">TrieNode</a></td></tr>
</table>

<table>
 <tr><th>runtime</th></tr>
 <tr><td>O(k) : k = length of the word</td></tr>
</table>

#### Example

```js
const hi = englishLang.find('hi');
// hi.getChar() = 'i'
// hi.getParent().getChar() = 'h'

const safe = englishLang.find('safe');
// safe.getChar() = 'e'
// safe.getParent().getChar() = 'f'
// safe.getParent().getParent().getChar() = 'a'
```

### .remove(word)
removes a word from the trie.

<table>
 <tr><th align="center" colspan="2">params</th></tr>
 <tr><td><b>name</b></td><td><b>type</b></td></tr>
  <tr><td>word</td><td>string</td></tr>
</table>

<table>
 <tr><th>return</th></tr>
 <tr><td>boolean</td></tr>
</table>

<table>
 <tr><th>runtime</th></tr>
 <tr><td>O(k) : k = length of the word</td></tr>
</table>

#### Example

```js
englishLang.remove('hi'); // true - hi removed
englishLang.remove('sky'); // false - nothing is removed
```

### .forEach(cb)
traverses all words in the trie.

<table>
 <tr><th align="center" colspan="2">params</th></tr>
 <tr><td><b>name</b></td><td><b>type</b></td><td><b>description</b></td></tr>
  <tr><td>cb</td><td>function</td><td>called with each word in the trie</td></tr>
</table>

<table>
 <tr><th>runtime</th></tr>
 <tr><td>O(n) : n = number of nodes in the trie</td></tr>
</table>

```js
englishLang.forEach((word) => console.log(word));

/*
hit
hide
hello
sand
safe
noun
name
*/
```

### .toArray()
converts the trie into an array of words.

<table>
 <tr><th>return</th><th>description</th></tr>
 <tr><td>array</td><td>a list of all the words in the trie</td></tr>
</table>

<table>
 <tr><th>runtime</th></tr>
 <tr><td>O(n) : n = number of nodes in the trie</td></tr>
</table>

#### Example

```js
console.log(englishLang.toArray());

// ['hit', 'hide', 'hello', 'sand', 'safe', 'noun', 'name']
```

### .wordsCount()
gets the count of words in the trie.

<table>
 <tr><th>return</th></tr>
 <tr><td>number</td></tr>
</table>

<table>
 <tr><th>runtime</th></tr>
 <tr><td>O(1)</td></tr>
</table>

#### Example

```js
console.log(englishLang.wordsCount()); // 7
```

### .nodesCount()
gets the count of nodes in the trie.

<table>
 <tr><th>return</th></tr>
 <tr><td>number</td></tr>
</table>

<table>
 <tr><th>runtime</th></tr>
 <tr><td>O(1)</td></tr>
</table>

#### Example

```js
console.log(englishLang.nodesCount()); // 23
```

### .clear()
clears the trie.

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(1)</td>
 </tr>
</table>

#### Example

```js
englishLang.clear();
console.log(englishLang.wordsCount()); // 0
console.log(englishLang.nodesCount()); // 1
```

### TrieNode

#### .getChar()
returns the node's char.

<table>
 <tr><th>return</th></tr>
 <tr><td>string</td></tr>
</table>

#### .getParent()
returns the parent node.

<table>
 <tr><th>return</th></tr>
 <tr><td>TrieNode</td></tr>
</table>

#### .isEndOfWord()
check if a node is an end of a word.

<table>
 <tr><th>return</th></tr>
 <tr><td>boolean</td></tr>
</table>

#### .getChild(char)
returns the child node of a char.

<table>
 <tr><th>return</th></tr>
 <tr><td>TrieNode</td></tr>
</table>

#### .hasChild(char)
check the node has a child char.

<table>
 <tr><th>return</th></tr>
 <tr><td>boolean</td></tr>
</table>

#### .childrenCount()
returns the number of children nodes.

<table>
 <tr><th>return</th></tr>
 <tr><td>number</td></tr>
</table>

