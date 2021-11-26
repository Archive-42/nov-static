# WEEK-11 DAY-2<br>*Hello, Express!* {ignore=true}
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=2 orderedList=false} -->

<!-- code_chunk_output -->

- [Express Learning Objectives](#express-learning-objectives)
- [Pug Template Learning Objectives](#pug-template-learning-objectives)
- [Moving Into the Express Lane](#moving-into-the-express-lane)
  - [Installing Express](#installing-express)
  - [Creating an Express application](#creating-an-express-application)
  - [Handling requests](#handling-requests)
  - [Listening for HTTP connections](#listening-for-http-connections)
  - [Testing your application](#testing-your-application)
  - [What you learned](#what-you-learned)
  - [See also…](#see-also)
- [Templating - *Meet Pug!*](#templating-meet-pug)
  - [What is a template?](#what-is-a-template)
  - [Rendering a simple template](#rendering-a-simple-template)
  - [What you learned](#what-you-learned-1)
- [Digging Into the Pug Template Syntax](#digging-into-the-pug-template-syntax)
  - [Setting up a sandbox application](#setting-up-a-sandbox-application)
  - [Rendering elements](#rendering-elements)
  - [Setting element attribute values](#setting-element-attribute-values)
  - [Rendering data](#rendering-data)
  - [Iteration and conditionals](#iteration-and-conditionals)
  - [What you learned](#what-you-learned-2)
  - [See also…](#see-also-1)
- [Exploring Route Paths](#exploring-route-paths)
  - [Getting data from a path](#getting-data-from-a-path)
  - [Defining flexible route paths](#defining-flexible-route-paths)
  - [Redirecting "incorrect" requests](#redirecting-incorrect-requests)
  - [What you learned](#what-you-learned-3)
- [Express Routers](#express-routers)
  - [Setting up the initial project](#setting-up-the-initial-project)
  - [Defining a collection of route handlers](#defining-a-collection-of-route-handlers)
  - [Mounting a Router instance](#mounting-a-router-instance)
  - [What you learned](#what-you-learned-4)
  - [See also…](#see-also-2)
- [Routing Roundup Project](#routing-roundup-project)
  - [Getting started](#getting-started)
  - [Phase 1: Defining the default route](#phase-1-defining-the-default-route)
  - [Phase 2: Using a template to render HTML](#phase-2-using-a-template-to-render-html)
  - [Phase 3: Defining another flexible route](#phase-3-defining-another-flexible-route)
  - [Phase 4: Capturing a value from the URL path](#phase-4-capturing-a-value-from-the-url-path)
  - [Phase 5: Defining a collection of route handlers](#phase-5-defining-a-collection-of-route-handlers)
  - [What We've Learned](#what-weve-learned)

<!-- /code_chunk_output -->
________________________________________________________________________________
________________________________________________________________________________
# Express Learning Objectives

Express is the _de facto_ standard for building HTTP applications with Node.js.
When you complete this lesson, you should be able to

* Send plain text responses for any HTTP request
* Use pattern matching to match HTTP request paths to route handlers
* Use the Pug template engine to generate HTML from Pug templates to send to the
  browser
* Pass data to Pug templates to generate dynamic content
* Use the `Router` class to modularize the definition of routes

________________________________________________________________________________
# Pug Template Learning Objectives

Using Pug.js helps reduce the overall creation and maintenance of source code
for HTML generation. It is one of many template engines supported by Express.js
and remains one of the most popular. At the end of this lesson, you will be able
to effectively use Pug.js to

* Declare HTML tags and their associated ids, classes, attributes, and content
* Use conditional statements to determine whether or not to render a block
* Use interpolation to mix static text and dynamic values in content and
  attributes
* Use iteration to generate multiple blocks of HTML based on data provided to
  the template

________________________________________________________________________________
# Moving Into the Express Lane

In an earlier lesson, you created a simple HTTP server using JavaScript and
Node.js. That HTTP server, or web application, returned a simple response based
upon the incoming request's URL (and HTTP method in one case). For example, a
request to the URL `http://localhost:300/OK` returned a `200 OK` HTTP response
status code.

Overall, this was easy to do using Node's native APIs, though the requirements
were relatively straightforward. Using Node to create a web application with
features commonly found in websites unfortunately requires a fair amount of
boilerplate code (i.e. verbose, repetitive code). This can slow down and
distract developers from working on more important tasks.

Enter Express, a popular Node.js framework for building web applications.
Express aims to make common web development tasks easier to implement by
reducing the amount of boilerplate code you need to write. This allows you to
focus on the things that makes your web application special. At the same time,
Express is, in its own words, unopinionated and minimalistic, giving you the
flexibility to decide what's best for your situation.

As an introduction to Express, let's create a simple web application. Your
application will return a plain text response containing "Hello from Express!"
for any request to `http://localhost:8081/`.

When you finish this article, you should be able to:

* Use the `express()` function to create an Express application;
* Recall that routing is determining how an application responds to a client
  request to a specific URI (or path) and HTTP method combination;
* Use the Application `get()` method to define a route that handles `GET`
  requests;
* Use the Response object `res.send()` method to send a plain text response to a
  client; and
* Use the `app.listen()` method to start a server listening for HTTP connections
  on a specific port.

## Installing Express

Before you can use Express to create a web application, you need to install it
using npm. Open a terminal or command prompt window, browse to your project's
folder, and initialize npm by running the following command:

```
npm init -y
```

You'll now have `package.json` and `package-lock.json` files in the root of your
project. The `package.json` file keeps track of your application's
dependencies—npm packages that your application needs to successfully start and
run.

Run the following command to install Express 4.0:

```
npm install express@^4.0.0
```

The `package.json` file will now list Express as a dependency:

```json
{
 "name": "my-project-folder-name",
 "version": "1.0.0",
 "description": "",
 "main": "index.js",
 "scripts": {
   "test": "echo \"Error: no test specified\" && exit 1"
 },
 "keywords": [],
 "author": "",
 "license": "ISC",
 "dependencies": {
   "express": "^4.17.1"
 }
}
```

> At the time of this writing, the latest version of Express 4.0 is `4.17.1`.
> While newer minor or patch versions of Express 4.0 should work fine, newer
> major versions (5.0+) might not work as expected. The caret character (`^`)
> the precedes the version number in the `package.json` file (`^4.17.1`)
> instructs npm to allow versions greater than `4.17.1` and less than `5.0.0`.

### Git and the `node_modules` folder

In an earlier lesson, you learned that when using `npm install` to install an
npm package locally into your project, npm downloads and installs the specified
package to the `node_modules` folder. Over time, as you install dependencies,
the `node_modules` folder tends to grow to be very large, containing many
folders and files.

If you're using Git for source control, it's important to add a `.gitignore`
file to the root of your project and add the entry `node_modules/` so that the
`node_modules` folder won't be tracked by Git.

> As alternative to creating your own `.gitignore` file, you can use GitHub's
> comprehensive [`.gitignore` file for Node.js projects][github node gitignore].

## Creating an Express application

Now you're ready to create your Express application!

Add a file named `app.js` to your project folder and open it in your code
editor. Use the `require` directive to import the `express` module and assign it
to a variable named `express`. The `express` variable references a function
(exported by the `express` module) that you can call to create an Express
application. Assign the return value from the `express` function call to a
variable named `app`:

```js
const express = require('express');

// Create the Express app.
const app = express();
```

The `app` variable holds a reference to an Express Application (`app`) object.
You'll call methods on the `app` object as you build out your web application.

## Handling requests

Next, you need to configure the routing for your application.

The process of configuring routing is determining how an application should
respond to a client request to an endpoint—a  specific URI (or path) and HTTP
method combination. For example, when a client makes a `GET` request to your
application by browsing to the URL `http://localhost:8081/`, it should return
the plain text response "Hello from Express!".

> **Do you remember the parts of a URL?** In the URL `http://localhost:8081/`,
> the protocol is `http`, the domain is `localhost`, the port is `8081` (we'll
> see in a bit how to configure the port for your application), and the path is
> `/`.

The Express Application (`app`) object contains a collection of methods for
defining an application's routes:

* `get()` - to handle `GET` requests
* `post()` - to handle `POST` requests
* `put()` - to handle `PUT` requests
* `delete()` - to handle `DELETE` requests

`GET` and `POST` are two of the most commonly used HTTP methods, followed by
`PUT` and `DELETE`.

> See the Express documentation for a [complete list of the available routing
> methods][routing methods].

To define a route to handle `GET` requests, call the `app.get()` method passing
in the route path and a route handler function:

```js
app.get('/', (req, res) => {
  // TODO Send a response back to the client.
});
```

Express provides a lot of flexibility with the format of the route path. A route
path can be a string, string pattern, regular expression, or an array containing
any combination of those. For now, you'll just use a string, but in later
articles you'll see how to use the other options.

The route handler function is called by Express whenever an incoming request
matches the route. The function defines two parameters, `req` and `res`, giving
you access respectively to the Request and Response objects. The Request (`req`)
object is used to get information about the client request that's currently
being processed. The Response (`res`) object is used to prepare a response to
return to the client.

To send a plain text response to the client, call the `res.send()` method
passing in the desired content:

```js
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});
```

Here's the code for your application so far:

```js
const express = require('express');

// Create the Express app.
const app = express();

// Define routes.

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});
```

## Listening for HTTP connections

Great job so far! Now you need to start the server listening for HTTP
connections from clients. To do that, call the `app.listen()` method passing in
the desired port to use and an optional callback function:

```js
const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

The callback function will be called when the server has started listening for
connections. Logging a message to the console gives you an easy way to see when
the server is ready for testing.

Here's the complete code for your application:

```js
const express = require('express');

// Create the Express app.
const app = express();

// Define routes.

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Define a port and start listening for connections.

const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

## Testing your application

To test your application, open a terminal or command prompt window, browse to
your project's folder, and run the following command:

```
node app.js
```

If your application starts successfully, you'll see the text "Listening on port
8081…" displayed in the terminal or command prompt window. Next, open a web
browser and browse to the address `http://localhost:8081/`. You should see the
text "Hello from Express!" displayed in the browser.

If you see the expected text, congrats! If you don't, double check the
following:

* Make sure that you started your application by running the command `node
  app.js`.
* Double check that the URL you entered into your browser's address bar is
  `http://localhost:8081/`.
* Check the terminal or command prompt window to see if an error is occurring.

## What you learned

In this article, you learned

* how to use the `express()` function to create an Express application;
* that routing is determining how an application responds to a client request to
  a specific URI (or path) and HTTP method combination;
* how to use the Application `get()` method to define a route that handles `GET`
  requests;
* how to use the Response object `res.send()` method to send a plain text
  response to a client; and
* how to use the `app.listen()` method to start a server listening for HTTP
  connections on a specific port.

## See also…

As you learn about Express, you'll find it helpful to explore Express' official
documentation at [expressjs.com][express website].

[routing methods]: https://expressjs.com/en/4x/api.html#routing-methods
[express website]: https://expressjs.com/
[github node gitignore]: https://github.com/github/gitignore/blob/master/Node.gitignore

________________________________________________________________________________
# Templating - *Meet Pug!*

In a previous article, you learned how to use the Response object's `res.send()`
method to send a plain text response to the client. Sending plain text is, well,
plain! A much more common content format when sending a response to browser
clients is HTML.

You **could** use the `res.send()` method to send a string of HTML content to
the client:

```js
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>Welcome</head></title>
      <body>
        <h1>Hello from Express!</h1>
      </body>
    </html>
  `);
});
```

While it works, using this technique is tedious and prone to errors. Can you
spot the error in the above HTML (hint: look at the nesting of the HTML
elements)?

Luckily, there's a better way. Developers have used templates (files that
contain markup and code) to render HTML content for many years (that's
practically centuries in internet time!) Express integrates with many popular
templating engines (libraries that provide support for writing templates). In
this article you'll learn how to use the popular Pug templating engine to
render HTML content.

When you finish this article, you should be able to:

* Create a Pug template that contains one or more variables;
* Use the `app.set()` method and the `view engine` application setting property
  to configure Express to use the Pug template engine; and
* Use the Response object `res.render()` method to render a Pug template to send
  an HTML response to a client.

## What is a template?

A template allows developers to easily combine static and dynamic content.
Templates are typically written using a special, proprietary syntax to make it
as easy as possible for developers to create content. Here's an example of a
simple Pug template:

```pug
html
  head
    title Welcome
  body
    h1 Welcome #{username}!
```

Notice the lack of angle brackets (i.e. `<` and `>`) in this example on the
`html`, `head`, `title`, `body`, and `h1` elements.

You also don't have to close elements. Pug will take care of that for you. It
uses indents to determine which elements are children of other elements. In the
above example, `head` is a child of `html` because `head` is indented more than
`html`. When Pug turns that into HTML, it will place the `<head>...</head>`
element _inside_ the `<html>...</html>` element. Look at all the typing that Pug
has saved you!

Element content is provided just to the right of the element name. The content
for the `title` element is "Welcome" and the content for the `h1` element is
"Welcome #{username}!".

At runtime, the templating engine combines data (often retrieved from a
database) with a template to render the content for the response to return to
the client. In the above template, Pug will replace the text `#{username}` with
the `username` variable value that you give it when you tell express to render
that template. Assuming that the `username` variable is set to the value
`mycoolusername`, Pug would render the following HTML:

```html
<html><head><title>Welcome</title></head><body><h1>Welcome mycoolusername!</h1></body></html>
```

> Pug, by default, removes indentation and all whitespace between elements.
> In some rare cases you might need to manually control how whitespace
> is handled. For information on how to do this, see the [official Pug
> documentation][pug whitespace control].

## Rendering a simple template

Before we further explore Pug's template syntax, let's see how to use Express to
render a simple template to send a response to a client.

### Setting up the project

Create a folder for your project, open a terminal or command prompt window,
browse to your project's folder, and initialize npm. (You use the `-y` flag so
that you don't have to answer those annoying questions. `npm` will just use
default values for everything.)

```
npm init -y
```

Then install Express using `npm`.

```
npm install express
```

Now you're ready to create the application. Add a file named `app.js` to your
project folder. Import the `express` module and assign it to a variable named
`express`, then call the `express` function and assign the return value to a
variable named `app`:

```js
const express = require('express');

// Create the Express app.
const app = express();
```

In the previous article, you used the `app.get()` method to define a route for
handling `GET` requests. As an alternative to the `app.get()` method, Express
provides a method named `all()` that can be used to define a route that handles
any HTTP method.

Call the `app.all()` method, passing in an asterisk (`*`) for the route path and
a route handler function that calls the `res.send()` method to send a plain text
response to the client:

```js
// Define a route.
app.all('*', (req, res) => {
  res.send('Hello from the Pug template example app!');
});
```

Remember that the route handler function is called by Express whenever an
incoming request matches the route. The function defines two parameters, `req`
and `res`, giving you access respectively to the Request and Response objects.

The asterisk (`*`) in the route path is a wildcard character that will match any
number of characters in the incoming request's URL path (e.g. `/`, `/about`,
`/about/foo`, and so on). Combining this route path with the `get.all()` method
defines a route that will match any incoming request, regardless of its path or
HTTP method.

> This approach is unorthodox and not commonly seen in real world applications.
> Generally speaking, you should prefer to use the `app` methods that map to
> individual HTTP methods. We're using the `app.all()` in this article to
> demonstrate the flexibility that Express provides when defining routes.

When a route can match any incoming request it can be helpful to know the
current request's method and path. The Request object passed into the route
handler function via the `req` parameter provides information about the incoming
request. You can log two Request object properties in particular, `req.method`
and `req.path`, to the console to see the current request's method and path:

```js
// Define a route.
app.all('*', (req, res) => {
  console.log(`Request method: ${req.method}`);
  console.log(`Request path: ${req.path}`);

  res.send('Hello from the Pug template example app!');
});
```

> The Express Request and Response objects provide a number of helpful
> properties and methods for working with HTTP requests and responses. To learn
> more, see the official Express docs for the [Request][express request] and
> [Response][express response] objects.

Now start the server listening for HTTP connections by calling the
`app.listen()` method:

```js
// Define a port and start listening for connections.

const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

Here's what the code for your application should look like at this point:

```js
const express = require('express');

// Create the Express app.
const app = express();

// Define a route.
app.all('*', (req, res) => {
  console.log(`Request method: ${req.method}`);
  console.log(`Request path: ${req.path}`);

  res.send('Hello from the Pug template example app!');
});

// Define a port and start listening for connections.

const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

To test your application, open a terminal, browse to your project's folder, and
run the command:

```
node app.js
```

The text "Listening on port 8081…" should display in the terminal or command
prompt window. Open a web browser and browse to the address
`http://localhost:8081/` to confirm that the application sends a response
containing the plain text "Hello from the Pug template example app!".

### Creating a template

Templates are stored in the `views` folder by default. To create a template, add
a folder named `views` to your project, then add a file named `layout.pug`
containing the following code:

```pug
html
  head
    title= title
  body
    h1= heading
```

The assignment operator (`=`) following the `title` and `h1` element names
instructs Pug to set the content for those elements respectively to the `title`
and `heading` variables.

> You'll learn more about how to render data in a Pug template in a later
> article.

### Configuring Express to use a template engine

Before you can use the Pug template engine in an Express application, you need
to install it:

```
npm install pug@^2.0.0
```

To configure Express to use Pug as its default template engine, call the
`app.set()` method and set the `view engine` application setting property to the
value `pug`:

```js
const express = require('express');

// Create the Express app.
const app = express();

// Set the pug view engine.
app.set('view engine', 'pug');
```

> The `view engine` property is just one of the available application settings.
> For a list of available settings see the [Express documentation][express app
> settings].

Setting the `view engine` application setting property isn't required, but it
has the following benefits:

1. It makes it clearer to code reviewers that your application is using the Pug
   template engine; and
2. You don't have to supply the file extension of the template when rendering a
   template (we'll see how this works next).

### Rendering a template

Now you're ready to update your application to use your template. Update your
route handler function to call the Response object's `res.render()` method,
passing in the name of the template:

```js
// Define a route.
app.all('*', (req, res) => {
  console.log(`Request method: ${req.method}`);
  console.log(`Request path: ${req.path}`);

  res.render('layout');
});
```

At this point, if run and test your application, you won't see any content
displayed in the browser.

> If you left your application running in the terminal or command prompt window,
> you'll need to stop and restart it so that Node picks up your latest code
> changes. To do that, press `CTRL+C` to stop the application and run `node
> app.js` to restart the application.

If you view the source for the page in the browser, you'll see the following
HTML:

```html
<html><head><title></title></head><body><h1></h1></body></html>
```

Notice that the `title` and `h1` elements don't have any content. The template
expects data for the `title` and `heading` variables, but you're currently not
passing any data. To fix that, pass an object literal containing `title` and
`heading` properties as a second argument to the `res.render()` method call:

```js
// Define a route.
app.all('*', (req, res) => {
  console.log(`Request method: ${req.method}`);
  console.log(`Request path: ${req.path}`);

  const pageData = { title: 'Welcome', heading: 'Home' };
  res.render('layout', pageData);
});
```

Now if run and test your application, you should see the expected content
displayed in the browser.

Here's what the code for your application should look like after updating it to
render the Pug template:

**app.js**

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

  const pageData = { title: 'Welcome', heading: 'Home' };
  res.render('layout', pageData);
});

// Define a port and start listening for connections.

const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

**views/layout.pug**

```pug
html
  head
    title= title
  body
    h1= heading
```

## What you learned

In this article, you learned

* how to create a Pug template that contains one or more variables;
* how to use the `app.set()` method and the `view engine` application setting
  property to configure Express to use the Pug template engine; and
* how to use the Response object `res.render()` method to render a Pug template
  to send an HTML response to a client.

[express app settings]: https://expressjs.com/en/4x/api.html#app.settings.table
[pug whitespace control]: https://pugjs.org/language/plain-text.html#whitespace-control
[pug docs]: https://pugjs.org/api/getting-started.html
[express request]: https://expressjs.com/en/4x/api.html#req
[express response]: https://expressjs.com/en/4x/api.html#res

________________________________________________________________________________
# Digging Into the Pug Template Syntax


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

________________________________________________________________________________
# Exploring Route Paths

You've seen that defining route paths in Express using a string is easy to do:

```js
app.get('/about', (req, res) => {
  res.send('About');
});

app.get('/contact', (req, res) => {
  res.send('Contact');
});

app.get('/our-team', (req, res) => {
  res.send('Our Team');
});
```

You can also easily include child paths:

```js
app.get('/our-team/sf', (req, res) => {
  res.send('Our Team - San Francisco');
});

app.get('/our-team/nyc', (req, res) => {
  res.send('Our Team - New York City');
});
```

But what if you need to match multiple paths for a single resource? Having to
define a route using a string route path for each variation is time consuming
and difficult to maintain. In some cases, it might be impossible to spell out
every possible variation. For example, what if the variable part of the path
represents the ID of a database record to retrieve? Luckily, Express provides a
wealth of options for defining route paths that you can use to solve virtually
any routing challenge.

When you finish this article, you should be able to:

* Recall that route parameters are named URL segments used to capture values;
* Define a route whose path contains one or more route parameters;
* Recall that a route path can be a string, string pattern, regular expression,
  or an array containing any combination of those;
* Define a route path using a string pattern; and
* Define a route path using a regular expression.

## Getting data from a path

Imagine that you're developing a website for the Best Company Ever. As a
starting point, your project's `app.js` file contains the following code:

```js
const express = require('express');

// Create the Express app.
const app = express();

// TODO Define routes.

// Define a port and start listening for connections.

const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

> To follow along, be sure to initialize npm in your project folder (`npm init
> -y`) and install Express (`npm install express@^4.0.0`). Use `node app.js` to
> run the server. Remember that if you leave the server running in the terminal
> or command prompt window while you're working, you'll need to stop and restart
> it so that Node picks up your latest code changes. To do that, press `CTRL+C`
> to stop the server and run `node app.js` again to restart the server.

You need to define your application's first route for a "Product" page that
displays information about a product from the Best Company Ever's catalog. The
product to display is variable—meaning that it depends on the product ID that's
passed via the URL path:

* `/product/1` - displays information for the product whose database ID is `1`;
* `/product/2` - displays information for the product whose database ID is `2`;
* and so on.

Your initial thought is to use a query string parameter for the product ID (e.g.
`/product?id=1`) instead of including it in the path. But after a bit of
research, you [decide against that approach for SEO (search engine optimization)
reasons][query string parameters].

Defining routes using string based route paths for the first two products gives
you something like this:

```js
app.get('/product/1', (req, res) => {
  res.send('Product ID: 1');
});

app.get('/product/2', (req, res) => {
  res.send('Product ID: 2');
});
```

This works, but the Best Company Ever is very successful (of course they are…
they're the best company ever!) and they have over 1,000 products in their
catalog. That means you have at least 998 routes left to define! Clearly, using
string based route paths simply won't work. Also, you want to keep your code as
DRY (don't repeat yourself!) as possible.

### Leveraging route parameters

Express route parameters are specifically designed for this situation.

A path is divided into segments using forward slashes (`/`). For example, given
the path `/locations/ca/search`, `locations`, `ca`, and `search` would all be
segments. A route parameter is a named path segment that captures the value at
that position in the path. The captured value is available within a route
handler function via the `req.params` object.

Here's the "Product" page route defined using an `id` route parameter:

```js
app.get('/product/:id', (req, res) => {
  res.send(`Product ID: ${req.params.id}`);
});
```

Using this route definition, the following request URL paths all match:

* `/product/1` - displays "Product ID: 1"
* `/product/2` - displays "Product ID: 2"
* `/product/asdf` - displays "Product ID: asdf"

That's progress! But unfortunately, while `1` and `2` are valid product IDs, the
string `asdf` is not.

### Restricting route parameter matches

By default, a route parameter will match almost any character (exceptions
include a question mark `?` which denotes the beginning of the query string and
a slash `/` which marks the beginning of the next path segment). Given that,
`1`, `2`, and `asdf` are all valid values.

You can use a regular expression to exert more control over which values will
match. Regular expressions use a language agnostic syntax for matching string
patterns. For example, a dot `.` represents any character in a regular
expression, so the expression `c.t` can match `cat`, `cot`, or `cut`, but not
`can` nor `bat`.

There are many other special characters that you can use to match specific
string patterns:

* the special character `\d` matches a single digit (i.e. `0` through `9`); and
* adding a plus sign `\d+` matches one or more digits.

To apply a regular expression to a route parameter, place it in parentheses just
after the route parameter name:

```js
app.get('/product/:id(\\d+)', (req, res) => {
  res.send(`Product ID: ${req.params.id}`);
});
```

Now the route will only match URL paths that have a number in the route
parameter's position:

* `/product/1` - displays "Product ID: 1"
* `/product/2` - displays "Product ID: 2"
* `/product/asdf` - displays "Cannot GET /product/asdf" (404 Not Found)

> The regular expression has an extra backslash `\` in the route path before
> `\d+` because the backslash character is used to escape special characters
> within a JavaScript string literal. For more information see the "Escape
> notation" section on the [MDN Web Docs `String` page][mdn web docs string].

Now the route parameter only matches a numeric value in the URL path but the
value via the `req.params` object is still a string. If you need the route
parameter value as a number, you'll need to convert it:

```js
app.get('/product/:id(\\d+)', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  res.send(`Product ID: ${productId}`);
});
```

> For more information on the `parseInt()` function, see [this page on MDN Web
> Docs][mdn web docs parseInt].

## Defining flexible route paths

As you develop websites and web applications, you'll likely find that using a
combination of strings and route parameters to define your routes will cover the
majority of your use cases. Sometimes though, situations will come up that will
require a different approach.

Your next task for the Best Company Ever website is to define a route for their
"Products" page. After spending some time with the internal stakeholders for the
project from the Sales, Marketing, and Customer Support departments, you've
determined that the following use cases and issues all need to be addressed:

* Marketing somehow managed to design and publish advertisements using both
  `www.bestcompanyever.com/products` and `www.bestcompanyever.com/our-products`
  as the URLs for the same "Products" page.
* Customer Support has noticed that sometimes customers forget the "s" at the
  end of "products" and get frustrated when they get a "Page Not Found" error
  trying to browse to the URL `www.bestcompanyever.com/product`.
* Customer Support has also noticed that sometimes customers mistype the word
  "products" as "prodcts" or "productts".
* Sales would like to allow customers to use "productos" (Spanish for
  "products") to make it as easy as possible for everyone to find the "Products"
  page.

All of this translates into mapping the following paths to the "Products" page:

* `/products`
* `/our-products`
* `/product`
* `/prodcts`
* `/productts`
* `/productos`

Having to define a route for each of these paths would be less than ideal.
Luckily, Express provides a number of options for defining route paths including
using

* a string (this is what you've been using up to this point);
* a string pattern;
* a regular expression; or
* an array containing any combination of those.

Let's use these options to develop a solution!

### Using a string pattern

Your first attempt at defining the route for the "Products" page looks like
this:

```js
app.get('/products', (req, res) => {
  res.send('Products');
});
```

Currently, when running the application (`node app.js`) the only URL that
returns the string "Products" is `http://localhost:8081/products` (i.e. the path
`/products`). This makes sense, as our route's path is defined using the string
`/products`.

You can use a string pattern to define a route path that will match more
incoming request URL paths. The following characters, when used within a string
based route path, behave somewhat like their regular expression counterparts:

* question mark `?` - specifies that the previous character can appear zero to
  one time
* plus sign `+` - specifies that the previous character can appear one or more
  times
* asterisk `*` - matches any number of characters (i.e. "wildcard" character)

Looking at your route again, adding a question mark `?` after the `s` in the
path `/products` specifies that the `s` can appear zero to one time:

```js
app.get('/products?', (req, res) => {
  res.send('Products');
});
```

Now your route will match the URL paths `/products` and `/product`.

After reviewing the list of paths that you need to match, you notice that you
can add an additional question mark `?` after the `u`:

```js
app.get('/produ?cts?', (req, res) => {
  res.send('Products');
});
```

Now both the `u` and the `s` are effectively optional, allowing the following
URL paths to match:

* `/products`
* `/product`
* `/prodcts`

Taking it a step further, you add a plus sign `+` after the `t`:

```js
app.get('/produ?ct+s?', (req, res) => {
  res.send('Products');
});
```

That change allows one or more `t`s to appear in the URL path, allowing the
following URL paths to match:

* `/products`
* `/product`
* `/prodcts`
* `/productts`

And now for the master stroke: you add an asterisk `*` in between the `/` and
`p`:

```js
app.get('/*produ?ct+s?', (req, res) => {
  res.send('Products');
});
```

Now all of the following URL paths match:

* `/products`
* `/product`
* `/prodcts`
* `/productts`
* `/our-products`

Using string patterns to define route paths are useful but fairly limited in
capability. For example, our string pattern based route path has the following
deficiencies:

* The asterisk `*` matches the URL path `/our-products` but also literally
  anything else between the `/` and `p`, including `/cool-products`,
  `asdf-products`, and so on.
* The plus sign `+` after the `t` matches `tt` but also `ttt`, `tttt`, and so
  on.

Depending on your specific situation, these shortcomings might be something you
can live with. If you can't, you can write a more sophisticated route path using
a regular expression.

### Using a regular expression

When defining a route, Express allows you to define your route path using a
regular expression. You can rewrite your original "Products" page route using a
regular expression like this:

```js
app.get(/^\/products\/?$/i, (req, res) => {
  res.send('Products');
});
```

At this point, only the URL path `/products` will match.

Regular expressions can be difficult to read and understand. Here's a
step-by-step breakdown, from left to right, of the above regular expression
(don't worry about committing all of this regular expression syntax to memory;
you'll have access to documentation when designing complex regular expression
based routes):

* `/` - Denotes the beginning of the regular expression.
* `^` - Indicates that the expression must match the beginning of the URL path
  string.
* `\/` - Matches a forward slash `/`. Because forward slashes have special
  meaning (they mark the beginning and ending of a regular expression) they must
  be escaped with a backslash `\`.
* `products` - Matches the literal string `products`.
* `\/?` - Matches zero or one instance of a forward slash `/`.
  * Since you're using the `^` and `$` characters to match the beginning and
    ending of the URL path string, you need to add an optional forward slash at
    the end of the expression in order to allow for URL paths that have a
    trailing forward slash.
* `$` - Indicates that the expression must match the ending of the URL path
  string.
* `/` - Denotes the ending of the regular expression.
* `i` - Indicates that the regular expression is case-insensitive.

> We're just scratching the surface of what's possible with regular expressions.
> For more information about regular expressions, see [this page on MDN Web
> Docs][mdn web docs regex].

Now let's work on extending the regular expression to match more URL paths.

Since the question mark `?` character behaves like it does within a string
pattern, you can make the `u` and the `s` in `products` optional like you did
before:

```js
app.get(/^\/produ?cts?\/?$/i, (req, res) => {
  res.send('Products');
});
```

This allows the following URL paths to match:

* `/products`
* `/product`
* `/prodcts`

Instead of using the plus sign `+` after the `t` to allow one or more `t`s to
appear in the URL path, you can use a set of curly braces `{}` to specify the
minimum and maximum number of instances:

```js
app.get(/^\/produ?ct{1,2}s?\/?$/i, (req, res) => {
  res.send('Products');
});
```

Now the following URL paths will match:

* `/products`
* `/product`
* `/prodcts`
* `/productts` (but not `/producttts`, `/productttts`, or so on)

To match on the URL path `/our-products`, you can use a set of parentheses `()`
to define a capture group containing the string `our-` and follow the capture
group with a question mark `?` to make it optional:

```js
app.get(/^\/(our-)?produ?ct{1,2}s?\/?$/i, (req, res) => {
  res.send('Products');
});
```

> Capture groups are a powerful tool when writing regular expressions. In this
> example, you're simply using a capture group as a way to group the characters
> `our-` together so that the question mark `?` that follows the group will
> apply to the group as if it were a single character.

Going one step further, you can add another capture group by wrapping
`(our-)?produ?ct{1,2}s?` in another set of parentheses. Then, within the new
capture group, append the text `|productos`:

```js
app.get(/^\/((our-)?produ?ct{1,2}s?|productos)\/?$/i, (req, res) => {
  res.send('Products');
});
```

The pipe character `|` is used to create a logical "OR" expression (i.e. "this"
or "that"). Adding the pipe `|` within the new group specifies that the
expression `(our-)?produ?ct{1,2}s?` or `productos` should match.

With this change in place, the following URL paths all match:

* `/products`
* `/product`
* `/prodcts`
* `/productts` (but not `/producttts`, `/productttts`, or so on)
* `/our-products`
* `/productos`

> **Don't worry if you found this section difficult to understand.** A lot of
> developers find regular expressions to be challenging to write, test, and
> debug. Unless your work requires you to write regular expressions on a
> frequent basis, it's likely that you'll need to spend time brushing up your
> regular expressions skills before you can successfully write or update an
> expression. Using a good tool can make a big difference—ask your fellow
> developers what tool(s) they've found to be helpful!

### Using an array of paths

In addition to the techniques you've seen so far, you can also use an array of
values for the route path:

```js
app.get([/^\/(our-)?produ?ct{1,2}s?\/?$/i, '/productos'], (req, res) => {
 res.send('Products');
});
```

When a route is defined using an array of values for the route path, Express
will check each of the array's elements to determine if an incoming request URL
path is a match.

Using an array allows you to simplify the regular expression a bit by pulling
the `/productos` path out of the regular expression into its own route path
string. This change has no effect on the outward functionality of your
application; it's all about choosing the option that's easiest to read,
understand, and maintain.

## Redirecting "incorrect" requests

All of the internal stakeholders at the Best Company Ever love the new website.
They're especially happy that you were able to address all of the URL path
oddities surrounding the "Products" page.

There's one final issue to address though. A sharp-eyed tester noticed that when
you request the "Products" page using one of the non-preferred paths (e.g.
`/prodcts`) the page displays as expected, but the URL in the browser's address
bar shows the non-preferred path (i.e.
`http://www.bestcompanyever.com/prodcts`). Ideally, when a client requests the
"Products" page using anything other than the preferred route of `/products`,
they'd be redirected back to the page using the preferred path.

You can accomplish this by updating the route handler to check if the current
request's path (i.e. `req.path`) starts with the preferred path, and if not,
uses the `res.redirect()` method to redirect the client:

```js
// If the current request path doesn't match our preferred
// route path then redirect the client.
if (!req.path.toLowerCase().startsWith('/products')) {
  res.redirect('/products');
}
```

> By default, Express routing isn't case-sensitive, so the request path
> `/Products` would match our preferred route path `/products`. To prevent from
> redirecting requests that only differ by casing, the string `toLowerCase()`
> method is being used to force the request path to all lowercase. Also, Express
> allows incoming request paths that have an optional trailing forward slash
> (i.e. `/products/`) to match a route path without a trailing forward slash
> (i.e. `/products`). Using the string `startsWith()` method gives us an easy
> way to check for the preferred path without having to account for the trailing
> slash.

After finishing all of the refactoring, the final version of your `app.js` file
should now look like this:

```js
const express = require('express');

// Create the Express app.
const app = express();

// Define routes.

app.get('/product/:id(\\d+)', (req, res) => {
  res.send(`Product ID: ${req.params.id}`);
});

app.get([/^\/(our-)?produ?ct{1,2}s?\/?$/i, '/productos'], (req, res) => {
 // If the current request path doesn't match our preferred
 // route path then redirect the client.
 if (!req.path.toLowerCase().startsWith('/products')) {
   res.redirect('/products');
 }

 res.send('Products');
});

// Define a port and start listening for connections.

const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

## What you learned

In this article, you learned

* that route parameters are named URL segments used to capture values;
* how to define a route whose path contains one or more route parameters;
* that a route path can be a string, string pattern, regular expression, or an
  array containing any combination of those;
* how to define a route path using a string pattern; and
* how to define a route path using a regular expression.

[query string parameters]: https://www.google.com/search?q=query+string+parameters+and+search+engine+results
[mdn web docs string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[mdn web docs parseInt]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
[mdn web docs regex]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

________________________________________________________________________________
# Express Routers

As you've learned about Express routing, you've defined routes within a single
`app.js` file. While this is a convenient approach to use while learning, it's
not very practical for "real world" web applications.

In the real world, web applications tend to target groups of resources, where
each resource is associated with multiple routes. For example, a customer order
management application might target resources like "Customers", "Products",
"Product Categories", and "Orders", and each of those resources might have
routes for creating, retrieving, updating, and deleting records (often referred
to as CRUD operations). Additionally, some resources might need to share the
same routes.

In these situations, defining all of your web application's routes within a
single JavaScript file is simply put, a bad idea.

Express routers allow developers to create collections of modular, mountable
route handlers. Using routers helps to keep your code organized and DRY (don't
repeat yourself!), ensuring that your code is as readable and maintainable as
possible.

As an introduction to Express routers, let's create routing for a sports team
application. You'll use a router to define routes for "Home", "Schedule", and
"Roster" pages. Then you'll see how to mount that router onto your application
so that its routes are shared across multiple teams.

When you finish this article, you should be able to:

* Use the `express.Router` class to define a collection of route handlers; and
* Use the `app.use()` method to mount a Router instance for a specific route
  path.

## Setting up the initial project

Create a folder for your project, open a terminal or command prompt window,
browse to your project's folder, and initialize npm:

```
npm init -y
```

Then install Express 4.0:

```
npm install express@^4.0.0
```

Add a file named `app.js` file to your project containing the following code:

```js
const express = require('express');

// Create the Express app.
const app = express();

// TODO Mount router instances.

// Define a port and start listening for connections.

const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

Your application doesn't contain any routes yet, so hold off on testing for a
bit.

> Remember that if you leave your application running in the terminal or command
> prompt window while you're working, you'll need to stop and restart it so that
> Node picks up your latest code changes. To do that, press `CTRL+C` to stop the
> application and run `node app.js` to restart the application.

## Defining a collection of route handlers

While it's not required, a common convention is to create each Express router
instance within its own Node module. Remember that in Node, each file is treated
as a separate module. So, to create a new module for your router, add a new file
named `routes.js` to your project.

> Typically, the name of the module reflects the resource that the router will
> be defining routes for. Going back to the customer order management
> application, you'd have files named `customers.js` and `products.js`
> containing routers (and route definitions) for the Customers and Products
> resources. For this article, you'll keep things simple and just use the
> filename `routes.js`.

At the top of the file, use the `require` directive to import the `express`
module and assign it to a variable named `express`:

```js
const express = require('express');
```

You've had a lot of practice using the `express` function (exported by the
`express` module) to create Express applications. The `express` module also
exports the `Router` class via a property on the `express` function, which you
can use to create an instance of a router:

```js
// Create the Router instance.
const router = express.Router();
```

Everything that you've done so far with defining routes using an Express
Application (`app`) object can be done with a router instance. For this reason,
a router can be thought of as a "mini-app".

> The Express Application (`app`) object and Router objects also handle
> middleware in the same way. You'll learn about middleware in a future lesson.

Using the `router.get()` method, define a collection of routes for a sports team
including "Home", "Schedule", and "Roster" pages:

```js
// Define routes.

router.get('/', (req, res) => {
 res.send('Home');
});

router.get('/schedule', (req, res) => {
 res.send('Schedule');
});

router.get('/roster', (req, res) => {
 res.send('Roster');
});
```

Code contained within a module isn't automatically visible or callable to code
contained in other modules. To expose code to other modules, you can use the
`module.exports` object. Since you only have one object to export from your
module, simply assign the `router` variable to the `module.exports` property:

```js
module.exports = router;
```

Here's the completed code for the `routes.js` file:

```js
const express = require('express');

// Create the Router instance.
const router = express.Router();

// Define routes.

router.get('/', (req, res) => {
 res.send('Home');
});

router.get('/schedule', (req, res) => {
 res.send('Schedule');
});

router.get('/roster', (req, res) => {
 res.send('Roster');
});

module.exports = router;
```

## Mounting a Router instance

Now that you've finished setting up your router instance, you're ready to make
use of it within your `app.js` file. At the top of the file just below where
you're importing the `express` module, use the `require` directive to import the
`routes` module and assign it to a variable named `routes`:

```js
const express = require('express');
const routes = require('./routes');
```

> Notice that the call to the `require` directive to import the `routes` module
> starts with a relative path (i.e. a dot `.` followed by a forward slash `/`).
> This tells Node that the `routes` module is a local module contained within
> our project, as opposed to a module contained within an external dependency
> located in the `node_modules` folder (that was installed using the `npm
> install` command).

To expose your router instance to the outside world so that it can handle
incoming HTTP requests, you need to tell your Express Application (`app`) object
to use it. To do that, call the `app.use()` method passing in an optional route
path along with the `routes` variable (the instance of your router):

```js
// Create the Express app.
const app = express();

// Mount router instances.
app.use('/portland-thorns', routes);
```

Providing a route path when mounting your router instance allows you to mount
the router instance multiple times each with a different route path:

```js
// Create the Express app.
const app = express();

// Mount router instances.
app.use('/portland-thorns', routes);
app.use('/orlando-pride', routes);
```

The combination of the router mount paths and the route paths defined within the
router allows you to easily and quickly build a hierarchy of routes:

* `/portland-thorns/`
* `/portland-thorns/schedule`
* `/portland-thorns/roster`
* `/orlando-pride/`
* `/orlando-pride/schedule`
* `/orlando-pride/roster`

If you mounted the router instance without supplying a route path (i.e.
`app.use(routes)`), then your application would only have the following routes
configured:

* `/`
* `/schedule`
* `/roster`

> Mounting a router instance without a route path might not seem very useful at
> first glance, but it can be helpful technique for keeping your project
> organized by defining top-level routes in their own module using a router.

The completed code for your `app.js` file should look like this:

```js
const express = require('express');
const routes = require('./routes');

// Create the Express app.
const app = express();

// Mount router instances.
app.use('/portland-thorns', routes);
app.use('/orlando-pride', routes);

// Define a port and start listening for connections.

const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

### Testing the application

To test your application, open a terminal or command prompt window, browse to
your project's folder, and run the following command:

```
node app.js
```

If your application starts successfully, you'll see the text "Listening on port
8081…" displayed in the terminal or command prompt window. Next, open a web
browser and browse to each of the following addresses for the Portland Thorns:

* `http://localhost:8081/portland-thorns` - displays the text "Home" in the
  browser.
* `http://localhost:8081/portland-thorns/schedule` - displays the text
  "Schedule" in the browser.
* `http://localhost:8081/portland-thorns/roster` - displays the text "Roster" in
  the browser.

Now browse to the following addresses for the Orlando Pride:

* `http://localhost:8081/orlando-pride` - displays the text "Home" in the
  browser.
* `http://localhost:8081/orlando-pride/schedule` - displays the text "Schedule"
  in the browser.
* `http://localhost:8081/orlando-pride/roster` - displays the text "Roster" in
  the browser.

Congrats on creating your first Express application with routers!

## What you learned

In this article, you learned

* how to use the `express.Router` class to define a collection of route
  handlers; and
* how to use the `app.use()` method to mount a Router instance for a specific
  route path.

## See also…

For more information about the Express Router class, [see the official
documentation][express router].

[express router]: https://expressjs.com/en/4x/api.html#router

________________________________________________________________________________
# Routing Roundup Project

Now that you've learned about routing in Express, it's time to create an
application to apply your knowledge! In this project, you'll:

* Create a web application using Express;
* Use Express to send an HTTP response containing plain text;
* Use Express to send an HTTP response containing HTML rendered from a Pug
  template;
* Define route paths using a string, string pattern, or regular expression;
* Define a route path containing a route parameter; and
* Use an Express router to define a collection of route handlers.

## Getting started

* Clone the repository from
  https://github.com/appacademy-starters/routing-roundup-starter
* Run `npm install` to install the dependencies
* When you want to run tests, run `npm test`

## Phase 1: Defining the default route

To get started, install Express 4.x using `npm`.

Now you're ready to create your Express application. Add a file named `app.js`
to your project. For your first route, the application should return the plain
text response "Hello from Express!" for `GET` requests to the default or root
resource. Configure your application to listen for HTTP connections on port
`8081`.

If you would like to, setup `nodemon` as a dev dependency so you don't have to
restart your server when you make code changes.

To manually test your application, use Node to start your application. Open up a
browser and browse to the URL `http://localhost:8081/`. You should see the plain
text "Hello from Express!" displayed.

We've also provided automated integration tests that you can use to test your
application.  With your application started and listening for HTTP connections
on port `8081`, run the command `npm test` from a terminal. (You will need _two_
terminals open to do this, one to run the app and one to run the tests.)

The tests will confirm that each of your application's routes return the
expected HTTP responses. Initially, most of the tests will fail as you haven't
implemented all of the expected routes yet. As you work your way through the
project, more tests will start to pass. If you have any trouble with using the
tests don't hesitate to ask a TA for help!

## Phase 2: Using a template to render HTML

For your next route, you'll use Express to send an HTTP response containing HTML
rendered from a Pug template.

Start with creating a Pug template with three variables for the request method,
the request path, and a random number. Render the variable values using an
unordered list:

```html
<ul>
  <li>[method]</li>
  <li>[path]</li>
  <li>[random number]</li>
</ul>
```

Replace the `[method]`, `[path]`, and `[random number]` text with the respective
variable values.

After you complete your template, install Pug 2 and configure Express to use it
as its default view engine. Then define a route that will match any request,
regardless of the HTTP method, to a top level resource (such as `/about` or
`/foo`). Use Express to render your template passing in the request method, the
request path, and a random number. For the request method and path, remember
that a route handler function's `req` parameter references the Express Request
object which provides detail about the client request that's currently being
processed. For the random number, use a whole number (no fractional or decimal
part) greater than or equal to zero.

> Note: there are multiple ways to define a route path that'll match any request
> for a top level resource. Experiment a bit and use the approach that feels the
> easiest to implement. Think carefully about the order of your route
> definitions to ensure that you don't prevent other routes from being able to
> match their intended requests.

> Additional note: remember that you can use the `console.log()` method to
> output the `req` parameter to the console as a way to inspect the properties
> that are available on the Request object. You can also use the [official
> Express documentation][express docs request object] to research the available
> properties.

To manually test your application, use Node to start your application, open up a
browser, and browse to the URL `http://localhost:8081/about`. You should see the
request method (`GET`), the request path (`/about`), and a random number
displayed in an HTML unordered list.

To test your application using the provided automated integration tests, start
your application listening for HTTP connections on port `8081` and run the
command `mocha` from a terminal. You should see an additional set of tests pass
that were previously failing.

## Phase 3: Defining another flexible route

For this route, you'll use Express to define a route that'll match any `GET`
request whose path ends with the letters "xyz". The route should return the
plain text response "That's all I wrote."

> Note: there are multiple ways to define a route path that'll match any request
> whose path ends with a specific set of characters. Experiment a bit and use
> the approach that feels the easiest to implement. Again, think carefully about
> the order of your route definitions to ensure that all of your application's
> routes continue to work as intended.

To manually test your application, use Node to start your application, open up a
browser, and browse to the URL `http://localhost:8081/xyz` or
`http://localhost:8081/something-else-xyz`. You should see the plain text
"That's all I wrote." displayed.

To test your application using the provided automated integration tests, start
your application listening for HTTP connections on port `8081` and run the
command `mocha` from a terminal. Same as before, you should see an additional
set of tests pass that were previously failing.

## Phase 4: Capturing a value from the URL path

Next, you'll use Express to define a route that'll match any `GET` request whose
path starts with the path `/capital-letters/`. The route should return a plain
text response of the uppercase version of the text in the path that follows
`/capital-letters/`. For example, a request URL path of
`/capital-letters/little` would return the plain text response "LITTLE".

To complete this part of the project, think about how to define a route whose
path contains a named path segment that captures the value at that position in
the path. For more information, review the "Exploring Route Paths" article in
this lesson to help you arrive at a solution.

To manually test your application, start your application, open up a browser,
and browse to the URL `http://localhost:8081/capital-letters/express`. You
should see the plain text "EXPRESS" displayed.

To test your application using the provided automated integration tests, start
your application and run the command `mocha` from a terminal. You should see an
additional set of tests pass that were previously failing.

## Phase 5: Defining a collection of route handlers

To complete your project, you'll use an Express router to define a collection of
route handlers. One of those route handlers should respond to the URL path
`/bio` with the plain text "Bio" and another should response to `/contact` with
the plain text "Contact".

Once you've defined your router, mount two instances to your application so
that:

* A request with the URL path `/margot/bio` will return the plain text response
  "Bio" and `/margot/contact` will return the plain text response "Contact"; and

* A request with the URL path `/margeaux/bio` will return the plain text
  response "Bio" and `/margeaux/contact` will return the plain text response
  "Contact".

To manually test your application, start your application, open up a browser,
and browse to the URLs `http://localhost:8081/margot/bio`,
`http://localhost:8081/margot/contact`, `http://localhost:8081/margeaux/bio`,
and `http://localhost:8081/margeaux/contact`, and check that the application
returns the expected responses.

To test your application using the provided automated integration tests, start
your application and run the command `mocha` from a terminal. Now you should see
all of the tests pass!

## What We've Learned

Your Express routing application is now complete! Great job building out your
application's routes using a variety of techniques.

In this project, you:

* Created a web application using Express;
* used Express to send an HTTP response containing plain text;
* used Express to send an HTTP response containing HTML rendered from a Pug
  template;
* defined route paths using a string, string pattern, or regular expression;
* defined a route path containing a route parameter; and
* used an Express router to define a collection of route handlers.

[express docs request object]: https://expressjs.com/en/4x/api.html#req
