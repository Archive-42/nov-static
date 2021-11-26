# Express Routers
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Setting up the initial project](#setting-up-the-initial-project)
- [Defining a collection of route handlers](#defining-a-collection-of-route-handlers)
- [Mounting a Router instance](#mounting-a-router-instance)
  - [Testing the application](#testing-the-application)
- [What you learned](#what-you-learned)
- [See also…](#see-also)

<!-- /code_chunk_output -->
________________________________________________________________________________

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
