# yield

> The yield keyword is used to pause and resume a generator function (function* or legacy generator function).

The `yield` keyword is used to pause and resume a generator function ([`function*`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Statements/function*) or [legacy generator function](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Statements/Legacy_generator_function)).

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone [https://github.com/mdn/interactive-examples](https://github.com/mdn/interactive-examples) and send us a pull request.

Syntax
------

\[rv\] = **yield** \[expression\]

`expression` Optional

Defines the value to return from the generator function via [the iterator protocol](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol). If omitted, `undefined` is returned instead.

`rv` Optional

Retrieves the optional value passed to the generator's `next()` method to resume its execution.

Description
-----------

The `yield` keyword pauses generator function execution and the value of the expression following the `yield` keyword is returned to the generator's caller. It can be thought of as a generator-based version of the `return` keyword.

`yield` can only be called directly from the generator function that contains it. It cannot be called from nested functions or from callbacks.

The `yield` keyword causes the call to the generator's `next()` method to return an `IteratorResult` object with two properties: `value` and `done`. The `value` property is the result of evaluating the `yield` expression, and `done` is `false`, indicating that the generator function has not fully completed.

Once paused on a `yield` expression, the generator's code execution remains paused until the generator's `next()` method is called. Each time the generator's `next()` method is called, the generator resumes execution, and runs until it reaches one of the following:

*   A `yield`, which causes the generator to once again pause and return the generator's new value. The next time `next()` is called, execution resumes with the statement immediately after the `yield`.
*   [`throw`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Statements/throw) is used to throw an exception from the generator. This halts execution of the generator entirely, and execution resumes in the caller (as is normally the case when an exception is thrown).
*   The end of the generator function is reached. In this case, execution of the generator ends and an `IteratorResult` is returned to the caller in which the `value` is [`undefined`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) and `done` is `true`.
*   A [`return`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Statements/return) statement is reached. In this case, execution of the generator ends and an `IteratorResult` is returned to the caller in which the `value` is the value specified by the `return` statement and `done` is `true`.

If an optional value is passed to the generator's `next()` method, that value becomes the value returned by the generator's current `yield` operation.

Between the generator's code path, its `yield` operators, and the ability to specify a new starting value by passing it to [`Generator.prototype.next()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/next), generators offer enormous power and control.

Unfortunately, `next()` is asymmetric, but that can’t be helped: It always sends a value to the currently suspended `yield`, but returns the operand of the following `yield`.

Examples
--------

### Using yield

The following code is the declaration of an example generator function.

    function* countAppleSales () {
      let saleList = [3, 7, 5]
      for (let i = 0; i < saleList.length; i++) {
        yield saleList[i]
      }
    }

Once a generator function is defined, it can be used by constructing an iterator as shown.

    let appleStore = countAppleSales()  
    console.log(appleStore.next())      
    console.log(appleStore.next())      
    console.log(appleStore.next())      
    console.log(appleStore.next())      

You can also send a value with next(value) into the generator. 'step' evaluates as a return value in this syntax \[rv\] = **yield** \[expression\]

    function* counter(value) {
     let step;
    
     while (true) {
       step = yield ++value;
    
       if (step) {
         value += step;
       }
     }
    }
    
    const generatorFunc = counter(0);
    console.log(generatorFunc.next().value);   
    console.log(generatorFunc.next().value);   
    console.log(generatorFunc.next().value);   
    console.log(generatorFunc.next(10).value); 
    console.log(generatorFunc.next().value);   
    console.log(generatorFunc.next(10).value); 

Specifications
--------------

| Specification |
| --- |
| [ECMAScript (ECMA-262)  
The definition of 'Yield' in that specification.](https://tc39.es/ecma262/#prod-YieldExpression) |

Browser compatibility
---------------------

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out [https://github.com/mdn/browser-compat-data](https://github.com/mdn/browser-compat-data) and send us a pull request.

[Update compatibility data on GitHub](https://github.com/mdn/browser-compat-data)

|  | Desktop | Mobile | Server |
| --- | --- | --- | --- |
|  | Chrome | Edge | Firefox | Internet Explorer | Opera | Safari | Android webview | Chrome for Android | Firefox for Android | Opera for Android | Safari on iOS | Samsung Internet | Node.js |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `yield` | Chrome Full support 39 | Edge Full support 12 | Firefox Full support 26
Notes

Full support 26

Notes

Notes Starting with Firefox 33, the parsing of the `yield` expression has been updated to conform with the ES2015 specification.

Notes Starting with Firefox 29, an `IteratorResult` object returned for completed generator function.





 | IE No support No | Opera Full support 26 | Safari Full support 10 | WebView Android Full support 39 | Chrome Android Full support 39 | Firefox Android Full support 26

Notes

Full support 26

Notes

Notes Starting with Firefox 33, the parsing of the `yield` expression has been updated to conform with the ES2015 specification.

Notes Starting with Firefox 29, an `IteratorResult` object returned for completed generator function.





 | Opera Android Full support 26 | Safari iOS Full support 10 | Samsung Internet Android Full support 4.0 | nodejs Full support 4.0.0

Full support 4.0.0

Full support 0.12

Disabled

Disabled From version 0.12: this feature is behind the `--harmony` runtime flag.





 |

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

See implementation notes.

See implementation notes.

User must explicitly enable this feature.

User must explicitly enable this feature.

See also
--------

*   [The Iterator protocol](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Guide/The_Iterator_protocol)
*   [`function*`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Statements/function*)
*   [`function* expression`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Operators/function*)
*   [`yield*`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Operators/yield*)


[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield)