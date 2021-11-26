# Symbol.iterator

> The well-known Symbol.iterator symbol specifies the default iterator for an object. Used by for...of.

The well-known `**Symbol.iterator**` symbol specifies the default iterator for an object. Used by [`for...of`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Statements/for...of).

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone [https://github.com/mdn/interactive-examples](https://github.com/mdn/interactive-examples) and send us a pull request.

Description
-----------

Whenever an object needs to be iterated (such as at the beginning of a `for..of` loop), its `@@iterator` method is called with no arguments, and the returned **iterator** is used to obtain the values to be iterated.

Some built-in types have a default iteration behavior, while other types (such as [`Object`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)) do not. The built-in types with a `@@iterator` method are:

*   [`Array.prototype[@@iterator]()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/@@iterator)
*   [`TypedArray.prototype[@@iterator]()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/@@iterator)
*   [`String.prototype[@@iterator]()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/@@iterator)
*   [`Map.prototype[@@iterator]()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/@@iterator)
*   [`Set.prototype[@@iterator]()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/@@iterator)

See also [Iteration protocols](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) for more information.

| Property attributes of `Symbol.iterator` |
| --- |
| Writable | no |
| Enumerable | no |
| Configurable | no |

Examples
--------

### User-defined iterables

We can make our own iterables like this:

    var myIterable = {}
    myIterable[Symbol.iterator] = function* () {
        yield 1;
        yield 2;
        yield 3;
    };
    [...myIterable] 
    

Or iterables can be defined directly inside a class or object using a [computed property](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names):

    class Foo {
      *[Symbol.iterator] () {
        yield 1;
        yield 2;
        yield 3;
      }
    }
    
    const someObj = {
      *[Symbol.iterator] () {
        yield 'a';
        yield 'b';
      }
    }
    
    [...new Foo] 
    [...someObj] 
    

### Non-well-formed iterables

If an iterable's `@@iterator` method does not return an iterator object, then it is a non-well-formed iterable. Using it as such is likely to result in runtime exceptions or buggy behavior:

    var nonWellFormedIterable = {}
    nonWellFormedIterable[Symbol.iterator] = () => 1
    [...nonWellFormedIterable] 
    

Specifications
--------------

| Specification |
| --- |
| [ECMAScript (ECMA-262)  
The definition of 'Symbol.iterator' in that specification.](https://tc39.es/ecma262/#sec-symbol.iterator) |

Browser compatibility
---------------------

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out [https://github.com/mdn/browser-compat-data](https://github.com/mdn/browser-compat-data) and send us a pull request.

[Update compatibility data on GitHub](https://github.com/mdn/browser-compat-data)

|  | Desktop | Mobile | Server |
| --- | --- | --- | --- |
|  | Chrome | Edge | Firefox | Internet Explorer | Opera | Safari | Android webview | Chrome for Android | Firefox for Android | Opera for Android | Safari on iOS | Samsung Internet | Node.js |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `iterator` | Chrome Full support 43 | Edge Full support 12 | Firefox Full support 36 | IE No support No | Opera Full support 30 | Safari Full support 10 | WebView Android Full support 43 | Chrome Android Full support 43 | Firefox Android Full support 36 | Opera Android Full support 30 | Safari iOS Full support 10 | Samsung Internet Android Full support 4.0 | nodejs Full support 0.12 |

#### What happens next?

Our team will review your report. Once we verify the information you have supplied we will update this browser compatability table accordingly.

#### Can I keep track of my report?

You can join the GitHub repository to see updates and commits for this table data:

[https://github.com/mdn/browser-compat-data](https://github.com/mdn/browser-compat-data)

Our goal is to provide accurate, real values for all our compatibility data tables. Notifying MDN of inaccurate data or supplying new data pushes us further towards our goal of providing 100% real values to the developer community.  
Thank you for helping.

Please select the browser or browsers which are affected.

Briefly outline the issue you are highlighting. Minimum 10 and maximum 1,000 characters.

Browser documentation and release notes are good supporting items to accompany your message. A demo hosted on services like Codepen or JSBin are perfect for providing real examples of your findings.

Connection error:Sorry, we can’t seem to reach the server. We are working to fix the problem. Please try again later.

### Legend

Full support 

Full support

No support 

No support

See also
--------

*   [Iteration protocols](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
*   [`Array.prototype[@@iterator]()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/@@iterator)
*   [`TypedArray.prototype[@@iterator]()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/@@iterator)
*   [`String.prototype[@@iterator]()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/@@iterator)
*   [`Map.prototype[@@iterator]()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/@@iterator)
*   [`Set.prototype[@@iterator]()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/@@iterator)


[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator)