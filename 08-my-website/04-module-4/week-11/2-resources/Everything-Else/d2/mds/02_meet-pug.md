# Templating - *Meet Pug!*
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [What is a template?](#what-is-a-template)
- [Rendering a simple template](#rendering-a-simple-template)
  - [Setting up the project](#setting-up-the-project)
  - [Creating a template](#creating-a-template)
  - [Configuring Express to use a template engine](#configuring-express-to-use-a-template-engine)
  - [Rendering a template](#rendering-a-template)
- [What you learned](#what-you-learned)

<!-- /code_chunk_output -->
________________________________________________________________________________

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
