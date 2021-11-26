# Digging Into the Pug Template Syntax
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Setting up a sandbox application](#setting-up-a-sandbox-application)
- [Rendering elements](#rendering-elements)
- [Setting element attribute values](#setting-element-attribute-values)
  - [Setting `class` and `id` attribute values](#setting-class-and-id-attribute-values)
- [Rendering data](#rendering-data)
- [Iteration and conditionals](#iteration-and-conditionals)
- [What you learned](#what-you-learned)
- [See also…](#see-also)

<!-- /code_chunk_output -->
________________________________________________________________________________


Now that you've seen how to create and render a simple Pug template, let's
explore Pug's syntax in more depth. Learning Pug's syntax takes time and effort,
but the payoff is that writing and maintaining templates will generally take
less time overall.

When you finish this article, you should be able to use the Pug template syntax
to:

* Render elements;
* Set element attribute values;
* Set element class and ID attribute values;
* Set element content from a variable;
* Set an element attribute value from a variable;
* Inject a variable value into text using interpolation;
* Iterate the elements in an array to generate content; and
* Conditionally display content.

## Setting up a sandbox application

> **Exercise your brain!** Use the following application as a sandbox to test
> and experiment with the Pug syntax as it's introduced in this article. Doing
> this will help you to remember what you've learned.

Create a folder for your project, open a terminal or command prompt window,
browse to your project's folder, and initialize npm:

```
npm init -y
```

Then install Express 4.0 and Pug 2:

```
npm install express@^4.0.0 pug@^2.0.0
```

Add a folder named `views` to your project, then add a file named `layout.pug`
containing the following code:

```pug
html
  head
    title= title
  body
    h1= heading
```

Then add a file named `app.js` to your project folder containing the following
code:

```js
const express = require('express');

// Create the Express app.
const app = express();

// Set the pug view engine.
app.set('view engine', 'pug');

// Define a route.
app.all('*', (req, res) => {
  console.log(`Request method: ${req.method}`);
  console.log(`Request path: ${req.path}`);

  res.render('layout', { title: 'Pug Template Syntax Sandbox', heading: 'Welcome to the Sandbox!' });
});

// Define a port and start listening for connections.

const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

To test your application, open a terminal or command prompt window, browse to
your project's folder, and run the command:

```
node app.js
```

The text "Listening on port 8081…" should display in the terminal or command
prompt window. Open a web browser and browse to the address
`http://localhost:8081/` to confirm that the application sends a response that
displays an HTML `<h1>` element containing the text "Welcome to the Sandbox!".

## Rendering elements

Consider the following excerpt from a Pug template:

```pug
ul
  li Item A
  li Item B
  li Item C
```

This renders an HTML unordered list:

```html
<ul>
  <li>Item A</li>
  <li>Item B</li>
  <li>Item C</li>
</ul>
```

Text at the beginning of a line (with or without white space) represents an HTML
element. Any text included after the element name will be added as the element's
inner text. To add an element as a child element, simply indent the line for the
child element by one or more spaces (two spaces is a common convention).

> Whether you decide to use two or four spaces for indenting elements, it's
> important to keep your indentation consistent throughout the template. Not
> doing so might result in Pug throwing an error at runtime.

## Setting element attribute values

To set attribute values on an element, follow the element name with a pair of
parentheses containing one or more attribute name/value pairs:

```pug
a(href='/about' class='menu-button') About
```

Renders to:

```html
<a href="/about" class="menu-button">About</a>
```

### Setting `class` and `id` attribute values

Element class and ID attributes are very common attributes to set, so Pug
provides a shortcut syntax for each. You can set an element's `class` attribute
using the syntax `.classname` and an element's `id` attribute using `#idname`:

```pug
div#container
  a.button Cancel
```

Renders to:

```html
<div id="container">
  <a class="button">Cancel</a>
</div>
```

You can also combine a class name with an ID name or chain multiple class names:

```pug
div#container.main
  a.button.large Cancel
```

Renders to:

```html
<div id="container" class="main">
  <a class="button large">Cancel</a>
</div>
```

This example can be further condensed. `<div>` elements are so common, Pug
allows you to remove the `<div>` element's name:

```pug
#container.main
  a.button.large Cancel
```

## Rendering data

As you saw in an earlier article, you can provide data to a template by passing
an object to the `res.render()` method:

```js
res.render('layout', { firstName: 'Grace', lastName: 'Hopper' });
```

Properties on the object passed as the second argument to the `res.render()`
method are defined within a template as local variables, which can be used to
set element content:

```pug
ul
  li= firstName
  li= lastName
```

Which would render to:

```html
<ul>
  <li>Grace</li>
  <li>Hopper</li>
</ul>
```

Variables can also be used to set element attribute values:

```pug
form
  div
    label First Name:
    input(type='text' name='firstName' value=firstName)
  div
    label Last Name:
    input(type='text' name='lastName' value=lastName)
```

Renders to:

```html
<form>
  <div>
    <label>First Name:</label>
    <input type="text" name="firstName" value="Grace"/>
  </div>
  <div>
    <label>Last Name:</label>
    <input type="text" name="lastName" value="Hopper"/>
  </div>
</form>
```

You can also use interpolation to inject a variable value into text:

```pug
p Welcome #{firstName} #{lastName}!
```

Renders to:

```html
<p>Welcome Grace Hopper!</p>
```

> Notice how Pug's interpolation syntax `#{expression}` differs from
> JavaScript's string template literal interpolation syntax `${expression}`. In
> a Pug template, the text to the right of the element name is just plain text,
> not JavaScript.

## Iteration and conditionals

You can even use dynamic data to control the generation of HTML in your
templates. Suppose you pass an array of colors to the `res.render()` method:

```js
res.render('layout', { colors: ['Red', 'Green', 'Blue'] });
```

Using that array of values, you can generate an ordered list:

```pug
ul
  each color in colors
    li= color
```

Which renders as:

```html
<ul>
  <li>Red</li>
  <li>Green</li>
  <li>Blue</li>
</ul>
```

You can also conditionally display content. First, send a boolean value to the
template that indicates if the current user is logged in or not:

```js
res.render('layout', { userIsLoggedIn: true });
```

Then you can use that boolean variable to determine what content to display:

```pug
if userIsLoggedIn
  h2 Welcome!
else
  a(href='/login') Please login
```

If the `userIsLoggedIn` variable is `true` (indicating that the user has logged
in) then the template would render:

```html
<h2>Welcome!</h2>
```

Otherwise the template would render:

```html
<a href="/login">Please login</a>
```

## What you learned

In this article, you learned how to

* render elements;
* set element attribute values;
* set element class and ID attribute values;
* set element content from a variable;
* set an element attribute value from a variable;
* inject a variable value into text using interpolation;
* iterate the elements in an array to generate content; and
* conditionally display content.

## See also…

There's so much more that you can do with Pug! Be sure to take some time to
explore [Pug's documentation][pug docs].

[pug docs]: https://pugjs.org/api/getting-started.html
