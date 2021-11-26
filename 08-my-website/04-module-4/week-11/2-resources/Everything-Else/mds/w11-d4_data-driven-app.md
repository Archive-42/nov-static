# WEEK-11 DAY-4<br>*Data-Driven App* {ignore=true}
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=2 orderedList=false} -->

<!-- code_chunk_output -->

- [Data-Driven Web Sites Learning Objectives](#data-driven-web-sites-learning-objectives)
- [Acclimating to Environment Variables](#acclimating-to-environment-variables)
  - [What are environment variables?](#what-are-environment-variables)
  - [Setting and getting environment variable values](#setting-and-getting-environment-variable-values)
  - [Storing environment variables in a `.env` file](#storing-environment-variables-in-a-env-file)
  - [Using a module to organize environment variables](#using-a-module-to-organize-environment-variables)
  - [What you learned](#what-you-learned)
- [Asynchronous Route Handlers in Express](#asynchronous-route-handlers-in-express)
  - [Calling asynchronous functions or methods within route handlers](#calling-asynchronous-functions-or-methods-within-route-handlers)
  - [Reducing boilerplate code](#reducing-boilerplate-code)
  - [What you learned](#what-you-learned-1)
  - [See also…](#see-also)
- [Handling Errors in Express](#handling-errors-in-express)
  - [Setting up an example Express application](#setting-up-an-example-express-application)
  - [The default error handler in Express](#the-default-error-handler-in-express)
  - [Defining a custom error handler](#defining-a-custom-error-handler)
  - [Handling "Page Not Found" errors](#handling-page-not-found-errors)
  - [What you learned](#what-you-learned-2)
- [Data-Driven Websites - Part 1: Setting Up the Project](#data-driven-websites-part-1-setting-up-the-project)
  - [Setting up the project](#setting-up-the-project)
  - [Stubbing out the application](#stubbing-out-the-application)
  - [Splitting the application and server into separate modules](#splitting-the-application-and-server-into-separate-modules)
  - [Logging requests using Morgan](#logging-requests-using-morgan)
  - [Adding custom error handlers](#adding-custom-error-handlers)
  - [Configuring environment variables](#configuring-environment-variables)
  - [Setting up Bootstrap](#setting-up-bootstrap)
  - [What you learned](#what-you-learned-3)
- [Data-Driven Websites Project (Part 2: Integrating Sequelize with Express)](#data-driven-websites-project-part-2-integrating-sequelize-with-express)
  - [Installing and configuring Sequelize](#installing-and-configuring-sequelize)
  - [Testing the connection to the database](#testing-the-connection-to-the-database)
  - [Creating the Book model](#creating-the-book-model)
  - [Seeding the database](#seeding-the-database)
  - [Querying and rendering a temporary list of books](#querying-and-rendering-a-temporary-list-of-books)
  - [What you learned](#what-you-learned-4)
- [Data-Driven Websites Project (Part 3: Using Sequelize to Perform CRUD Operations)](#data-driven-websites-project-part-3-using-sequelize-to-perform-crud-operations)
  - [Planning the routes and views](#planning-the-routes-and-views)
  - [Creating the Book List page](#creating-the-book-list-page)
  - [Adding the Add Book page](#adding-the-add-book-page)
  - [Implementing server-side validation using Sequelize](#implementing-server-side-validation-using-sequelize)
  - [Implementing server-side validation using a validation library](#implementing-server-side-validation-using-a-validation-library)
  - [Adding the Edit Book page](#adding-the-edit-book-page)
  - [Add the Delete Book page](#add-the-delete-book-page)
  - [What you learned](#what-you-learned-5)

<!-- /code_chunk_output -->
________________________________________________________________________________
________________________________________________________________________________
# Data-Driven Web Sites Learning Objectives

This is where it all comes together: databases, HTTP servers, HTML, CSS, request
and response, JavaScript powering it all. This is **full-stack**. At the end of
this content, you should be able to:

1. Use environment variables to specify configuration of or provide sensitive
   information for your code
2. Use the `dotenv` npm package to load environment variables defined in an
   `.env` file
3. Recall that Express cannot process unhandled Promise rejections from
   within route handler (or middleware) functions;
4. Use a Promise `catch` block or a `try`/`catch` statement with `async`/`await`
   to properly handle errors thrown from within an asynchronous route handler
   (or middleware) function
5. Write a wrapper function to simplify catching errors thrown within
   asynchronous route handler (or middleware) functions
6. Use the `morgan` npm package to log requests to the terminal window to assist
   with auditing and debugging
7. Add support for the Bootstrap front-end component library to a Pug layout
   template
8. Install and configure Sequelize within an Express application.
9. Use Sequelize to test the connection to a database before starting the HTTP
   server on application startup
10. Define a collection of routes (and views) that perform CRUD operations
    against a single resource using Sequelize
11. Handle Sequelize validation errors when users are attempting to create or
    update data and display error messages to the user so that they can resolve
    any data quality issues
12. Describe how an Express.js error handler function differs from middleware
    and route handler functions
13. Define a global Express.js error-handling function to catch and process
    unhandled errors
14. Define a middleware function to handle requests for unknown routes by
    returning a 404 NOT FOUND error

________________________________________________________________________________
# Acclimating to Environment Variables


As your Express applications increase in complexity, the need to have a
convenient way to configure your applications will also increase.

For example, consider an application that uses a database for data persistence.
To connect to the database, do you simply provide the username and password to
use when making a connection to the database directly in your code? What if your
teammate uses a different username or password? Do they modify the code to make
it work for them? If they do that, how do you keep the application working on
your system?

It's not just the differences between you and your teammates' systems. Your
applications won't always run locally; eventually they'll need to run on
external servers to facilitate testing or to ultimately serve your end users. In
most cases, your application will need to be configured differently when it's
running on an external server than when it's running locally.

You need a solution for managing your application's configuration! When you
finish this article, you should be able to:

* Recall what environment variables are and how they're commonly used;
* Set and get an environment variable value;
* Store environment variable values in an `.env` file;
* Use a module to organize environment variables; and
* Understand how to run npm scripts in different environments.

## What are environment variables?

To understand what an environment variable is, we need to start with
understanding what an environment is.

An environment is the system that an application is deployed to and running in.
Up to now your applications have been running on your local machine, which is
typically referred to as the "local environment" or "local development
environment".

For real life applications, there are usually several environments—aside from
each developer's local environment—that the application will be deployed and ran
within:

* Testing - An environment that's used to test the application to ensure that
  recent changes don't affect existing functionality and that new features meet
  the project's requirements.
* Staging - An environment that mirrors the production environment to ensure
  that nothing unexpected occurs before the application is deployed to
  production.
* Production - The environment that serves end users. For applications that need
  to support a large number of users, the production environment can contain
  multiple servers (sometimes dozens or even hundreds of servers).

Environment variables are application configuration related variables whose
values change depending on the environment that the application is running in.
Using environment variables allows you to change the behavior of your
application by the environment that it's running in without having to hard code
values in your code.

### How are environment variables commonly used?

In an earlier lesson, you learned how to use the Sequelize ORM to connect to a
PostgreSQL database to retrieve, create, update, and delete data. To connect to
the database, you provided values for the following configuration variables
within a module named `config/database.js`:

```js
module.exports = {
  development: {
    username: "mydbuser",
    password: "mydbuserpassword",
    database: "mydbname",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
```

The database connection settings that you use in your local development
environment—in particular the `username` and `password` values—won't be the same
that the testing, staging, or production environments will need.

Sequelize allows you to define database connection settings per environment like
this:

```js
module.exports = {
  development: {
    username: "mydbuser",
    password: "mydbuserpassword",
    database: "mydbname",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "testdbuser",
    password: "testdbuserpassword",
    database: "testdbname",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "proddbuser",
    password: "proddbuserpassword",
    database: "proddbname",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
```

While you could hard code different settings for each environment this approach
is inelegant, difficult to maintain, and insecure. Application configuration can
unexpectedly need to change in test, staging, and production environments.
Having to make a code change to change an application's configuration in a
specific environment isn't ideal.

Using environment variables for the database connection settings separates the
configuration from the application's code and allows the configuration to be
updated without having to make a code change.

Where else should you use environment variables? Anywhere that the behavior of
your code needs to change based upon the environment that it's running in.
Environment variables are commonly used for:

* Database connection settings (as you've just seen)
* Server HTTP ports
* Static file locations
* API keys and secrets

## Setting and getting environment variable values

Now that you know what environment variables are and how they're used, it's time
to see how to set and get an environment variable value.

### Setting an environment variable value

The simplest way to set an environment variable, is via the command line, by
declaring and setting the environment variable before the `node` command:

```sh
PORT=8080 node app.js
```

You can even declare and set multiple environment variables:

```sh
PORT=8080 NODE_ENV=development node app.js
```

> The `NODE_ENV` environment variable is a special variable that's used by
> many node programs to determine what environment the application is running
> in. For example, setting the `NODE_ENV` environment variable to `production`
> enables features in Express that help to improve the overall performance of
> your application. For more information, see [this page][node_env variable] in
> the Express documentation.
> Sequelize also uses the `NODE_ENV` variable to determine which section of the
> `config.json` file it will use for database configuration.

This approach also works within an npm `start` script:

```json
{
  "scripts": {
    "start": "PORT=8080 NODE_ENV=development node app.js"
  }
}
```

### Getting an environment variable value

To get an environment variable value, you simply use the `process.env` property:

```js
const port = process.env.PORT;
```

The `process` object is a global Node object, so you can safely access the
`process.env` property from anywhere within your Node application.

If the `PORT` environment variable isn't declared and set, it'll have a value of
`undefined`. You can use the logical `OR` (`||`) operator to provide a default
value in code:

```js
const port = process.env.PORT || 8080;
```

## Storing environment variables in a `.env` file

Passing environment variables from the command line is not an ideal solution.
Defining an npm `start` script keeps you from having to type the variables again
and again, but it's still not a convenient way to maintain them.

Using the `dotenv` npm package, you can declare and set all of your environment
variables in a `.env` file and the `dotenv` package will load your variables
from that file and set them on the `process.env` property.

To start, install the `dotenv` npm package as a development dependency:

```sh
npm install dotenv --save-dev
```

> Remember that npm tracks two main types of dependencies in the `package.json`
> file: dependencies (`dependencies`) and development dependencies
> (`devDependencies`). _Dependencies_ (`dependencies`) are the packages that
> your project needs in order to successfully run when in production (i.e. your
> application has been deployed or published to a server that can be accessed by
> your users). _Development dependencies_ (`devDependencies`) are the packages
> that are needed locally when doing development work on the project. Passing
> the `--save-dev` flag when installing a dependency tells npm to install the
> dependency as a development dependency.

Then add an `.env` file to the root of your project that contains all of your
environment variables:

```
PORT=8080
DB_USERNAME=mydbuser
DB_PASSWORD=mydbuserpassword
DB_DATABASE=mydbname
DB_HOST=localhost
```

> **Pro tip for VS Code users:** Install the [DotENV extension][dotenv
> extension] to add syntax coloring in `.env` files.

### Loading environment variables on application startup

Using the `dotenv` npm package, it's easy to load your environment variables
when your Express application starts up. Just run this code before you configure
and start your Express application:

```js
// app.js

const express = require('express');

// Load the environment variables from the .env file
require('dotenv').config();

// Create the Express app.
const app = express();

// Define routes.

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Define a port and start listening for connections.

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

### Another way to use dotenv

Another way to use the dotenv module is to load it before your app loads on
the Node.JS command line by using Node.JS's `-r` option to require a module
immediately.  To use it this way you could change your `npm start` command
in your package.json to look like this:

```json
  {
  "scripts": {
    "start": "node -r dotenv/config app.js"
  }
}
```

Doing it this way makes sure that all of the environment variables are loaded
before you execute any of the code of your app.

Whichever way you decide to go, the main point is to load the contents of your
`.env` file as early as possible so those variables will be available to your
code.

### Keeping the `.env` file out of source control

It's important to keep your `.env` file out of your source control as it will
often contain sensitive information like database connection settings or API
keys and secrets. If you're using Git for your source control, make sure that
your `.gitignore` file includes an entry for `.env` files.

If you're working on a team, you'll need a way to document what the contents of
the `.env` should look like. One approach is to update the project's `README.md`
file with instructions on what environment variables need to be defined in the
`.env` file. Another option is to add an `.env.example` file to your project
that mirrors the contents of the `.env` file but replaces any sensitive
information with dummy values:

```
PORT=8080
DB_USERNAME=dbuser
DB_PASSWORD=dbuserpassword
DB_DATABASE=dbname
DB_HOST=localhost
```

In many companies, managing the environment variables or `.env` files will
be handled by whatever process the company uses to get the code deployed and
running on the actual servers. Often companies will have dedicated teams of
System Administrators or "DevOps" personnel that handle these tasks. As a
developer you may have to work with these teams to determine what the best
strategy is for getting the environment variables set for your application.

## Using a module to organize environment variables

Earlier we mentioned that the `process` object is a global Node object, which
means that you can safely access the `process.env` property from anywhere within
your Node application. While that's true, you might find it helpful to
encapsulate all of your `process.env` property access into a single `config`
module. The `config` module has a single purpose: to import all of your
environment variables and export them to make them available to the rest of your
application:

```js
// config.js

module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
  },
};
```

Creating a `config` module also gives you a convenient place to optionally
provide default values and to alias environment variable names (notice how the
`NODE_ENV` environment variable is being aliased to `environment`).

Any other module in your application that needs access to a configuration
variable value just needs to require the `config` module:

> Make sure this is done after the environment variables are loaded if you are
> using the `dotenv` module.

```js
// app.js

const express = require('express');

// Load the environment variables from the .env file
require('dotenv').config();

// Get the port environment variable value.
const { port } = require('./config');

// Create the Express app.
const app = express();

// Define routes.

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Start listening for connections.
app.listen(port, () => console.log(`Listening on port ${port}...`));
```

Notice how destructuring is being used to get a specific configuration variable
value when requiring the `config` module:

```js
const { port } = require('./config');
```

Without using destructuring, you could get the `port` configuration variable
value like this:

```js
const config = require('./config');
const port = config.port;
```

Or like this:

```js
const port = require('./config').port;
```

Any of these approaches work fine. Deciding which to use is one of the many
stylistic choices you'll make as a developer.

### Running npm binaries

Using npx to run an npm binary like the Sequelize CLI won't work if you've
defined environment variables in an `.env` file for your database connection
settings. You'll need to use a tool like the `dotenv-cli` npm package as an
intermediary between npx and the Sequelize CLI to load your environment
variables from the `.env` file and run the command that you pass into it.

To start, install the `dotenv-cli` package as a development dependency:

```sh
npm install dotenv-cli --save-dev
```

Then use npx to run the `dotenv` command passing in the command to invoke using
the set of environment variables loaded from your `.env` file:

```sh
npx dotenv sequelize db:migrate
```

### Defining environment specific npm scripts

Sometimes you may want to run different npm scripts for different `NODE_ENV`
environments.

For instance you might have this in your package.json for local development.

```json
{
  "scripts": {
    "start": "nodemon app.js"
  }
}
```

But in production we may not want to run nodemon, since our code won't be
changing constantly. Perhaps, production needs a package.json like this instead:

```json
{
  "scripts": {
    "start": "node app.js"
  }
}
```

To keep from having to manually change your npm `start` script before you deploy
your application to the production environment, you can use a tool like the
`per-env` npm package that allows you to define npm scripts for each of your
application's environments.

To start, install the `per-env` package:

```sh
npm install per-env
```

Then update your npm scripts to this:

```json
{
  "scripts": {
    "start": "per-env",
    "start:development": "nodemon app.js",
    "start:production": "node app.js",
  }
}
```

If the `NODE_ENV` environment variable is set to `production`, then running the
`start` script will result in the execution of the `start:production` script. If
the `NODE_ENV` variable isn't defined, then the `start:development` script will
be executed by default.

Using this approach, you can conveniently define a `start` script (or any
predefined or custom script) for each environment that your application will be
deployed to.

## What you learned

In this article, you learned how to

* set and get an environment variable value
* store environment variable values in an `.env` file
* use a module to organize environment variables
* handle running different npm scripts in different environments.

[node_env variable]: https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production
[dotenv extension]: https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv
[vs code launch configurations]: https://code.visualstudio.com/docs/editor/debugging#_launch-configurations
[aws env vars]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environments-cfg-softwaresettings.html

________________________________________________________________________________
# Asynchronous Route Handlers in Express


Up to this point, your Express route handler functions have been
synchronous—each statement predictably executes in the order that they're
written in. Most Express applications, at some point, need to interact with a
database or an API (or both). Interacting with those external resources requires
you to write asynchronous code, which in turn requires your route handler
functions to be asynchronous.

In modern JavaScript applications, writing asynchronous code means working with
Promises and optionally the `async`/`await` keywords. When working with Promises
in Express route handlers or middleware functions, special attention needs to be
spent on how errors are handled.

When you finish this article, you should be able to:

* Recall that Express cannot process unhandled Promise rejections from
  within route handler (or middleware) functions;
* Use a Promise `catch` block or a `try`/`catch` statement with `async`/`await`
  to properly handle errors thrown from within an asynchronous route handler (or
  middleware) function; and
* Write a wrapper function to simplify catching errors thrown within
  asynchronous route handler (or middleware) functions.

## Calling asynchronous functions or methods within route handlers

To see how to properly call asynchronous functions or methods within route
handlers, you need an asynchronous function or method to call.

### Creating a simple asynchronous function

In a future article, you'll see how to integrate your Express application with a
database. For now keep things as simple as possible by creating a standalone
function that wraps the built-in `setTimeout()` function in a Promise:

```js
/**
* Asynchronous function that delays for the provided length of time.
* If the length of time to wait is less than '0', then the returned
* Promise will reject, otherwise it'll resolve.
* @param {number} timeToWait - The length of time to wait in milliseconds.
*/
const delay = (timeToWait) => new Promise((resolve, reject) => {
 setTimeout(() => {
   if (timeToWait < 0) {
     reject(new Error('An error has occurred!'));
   } else {
     resolve(`All done waiting for ${timeToWait}ms!`);
   }
 }, Math.abs(timeToWait));
});
```

The above `delay()` function accepts a `timeToWait` value and returns a new
Promise that calls the `setTimeout()` function passing in the `timeToWait`
absolute value. When the `setTimeout()` function call completes, the Promise is
resolved if the `timeToWait` value is a positive number or it's rejected if the
`timeToWait` value is a negative number.

> **Note:** The `Math.abs()` function is used to get the absolute value of the
> `timeToWait` parameter value. Getting the absolute value ensures that the
> value passed to the `setTimeout()` function is always a positive number. For
> more information about absolute values, see [this Wikipedia page][absolute
> value].

### Setting up the Express application

With your `delay()` function in hand, use it to create a simple Express
application:

```js
// app.js

const express = require('express');

/**
* Asynchronous function that delays for the provided length of time.
* If the length of time to wait is less than '0', then the returned
* Promise will reject, otherwise it'll resolve.
* @param {number} timeToWait - The length of time to wait in milliseconds.
*/
const delay = (timeToWait) => new Promise((resolve, reject) => {
 setTimeout(() => {
   if (timeToWait < 0) {
     reject(new Error('An error has occurred!'));
   } else {
     resolve(`All done waiting for ${timeToWait}ms!`);
   }
 }, Math.abs(timeToWait));
});

// Create the Express app.
const app = express();

// Define routes.

app.get('*', (req, res) => {
  // TODO
});

// Define a port and start listening for connections.

const port = 8080;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

> **Note:** If you're following along, don't forget to use npm to install
> Express (i.e. `npm install express`)!

Now call the `delay()` function within your route handler function. Remember
that the `delay()` function returns a Promise, so you can use the Promise
`then()` method to execute code when the `delay()` method completes. Within the
callback that you pass to the `then()` method, send the value returned from the
`delay()` function to the client using the `res.send()` method:

```js
app.get('*', (req, res) => {
 delay(5000).then((value) => res.send(value));
});
```

If you start your application (i.e. `node app.js`) and browse to
`http://localhost:8080/` you'll see that the request hangs for 5 seconds before
the server sends the response "All done waiting for 5000ms!"

Feel free to experiment by varying the number of milliseconds that you're
passing to the `delay()` function. For now, continue to pass a positive number;
we'll see in just a moment what happens when we pass a negative number.

### Using `async`/`await`

Instead of using the Promise `then()` method to execute code when an
asynchronous function or method call has completed, you can use the `await`
keyword.

Start with adding the `async` keyword to your route handler function to indicate
that it's going to make an asynchronous function or method call. Then use the
`await` keyword to wait for a result to be returned from the `delay()` function
call:

```js
app.get('*', async (req, res) => {
 const result = await delay(5000);
 res.send(result);
});
```

If you test your application again you'll see that it behaves the same as it did
before—the request hangs for 5 seconds before the server sends the response "All
done waiting for 5000ms!"

### Catching errors thrown by asynchronous functions or methods

So far, you've stayed on the "happy" path by passing a positive number to the
`delay()` function. If you pass a negative number to the `delay()` function,
it'll throw an error:

```js
app.get('*', async (req, res) => {
 const result = await delay(-5000);
 res.send(result);
});
```

This time when testing your application, the browser will indefinitely hang as
it waits for the server to return a response. If you look in the terminal,
you'll see that an error occurred:

```
(node:89455) UnhandledPromiseRejectionWarning: Error: An error has occurred!
    at Timeout._onTimeout ([path to the project folder]/app.js:13:14)
    at listOnTimeout (internal/timers.js:537:17)
    at processTimers (internal/timers.js:481:7)
(node:89455) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:89455) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

Node.js is warning you that an unhandled Promise rejection occurred.
Furthermore, it's warning that in a future version of Node, unhandled Promise
rejections will terminate the Node process (which would result in your
application being stopped)!

Luckily, this issue is easy to deal with—simply add a `try`/`catch` statement
around your asynchronous function or method call:

```js
app.get('*', async (req, res, next) => {
 try {
   const result = await delay(-5000);
   res.send(result);
 } catch (err) {
   next(err);
 }
});
```

Notice that you need to add the `next` parameter to your route handler function
parameter list and pass the caught error to the `next()` method in the `catch`
block. Passing the error to the `next()` method allows the Express default error
handler process the error.

> **Note:** When writing custom middleware functions, calling the `next()`
> method **without an argument** passes control to the next middleware function.
> Calling the `next()` method **with an argument** results in Express handling
> the current request as an error and skipping any remaining routing and
> middleware functions.

The Express default error handler is a special type of middleware function
that's responsible for handling errors. In a development environment, the
default error handler logs the error to the console and sends a response with an
HTTP status code of `500 Internal Server Error` to the client containing the
error message along with the stack trace.

If you test your application again, you'll see the default error handler in
action as it provides details about the unhandled error that occurred after the
`delay()` function has waited for the number of milliseconds that you passed in:

```
Error: An error has occurred!
   at Timeout._onTimeout ([path to the project folder]/app.js:13:14)
   at listOnTimeout (internal/timers.js:537:17)
   at processTimers (internal/timers.js:481:7)
```

If you're not using the `async`/`await` keywords, you need to call the `catch()`
method on the Promise returned by the `delay()` function to handle any thrown
errors:

```js
app.get('*', (req, res, next) => {
 delay(-5000)
   .then((value) => res.send(value))
   .catch((err) => next(err));
});
```

Again, notice that you need to add the `next` parameter to your route handler
function parameter list and call the `next()` method passing in the error caught
by the `catch()` method.

If you're only passing the error to the `next()` method, you can simplify your
code by passing the reference to the `next()` method directly to the `catch()`
method call:

```js
app.get('*', (req, res, next) => {
 delay(-5000)
   .then((value) => res.send(value))
   .catch(next);
});
```

Express is able to automatically catch errors thrown by synchronous route
handlers. When performing asynchronous operations within route handlers, it's
important to remember that **Express is unable to catch errors thrown by
asynchronous route handlers**. Given that, asynchronous route handlers need to
catch their own errors and pass them to the `next()` method.

> **Note:** While all of the examples that you've seen in this article are built
> around route handlers, everything that's been shown and discussed equally
> applies to asynchronous custom middleware functions.

## Reducing boilerplate code

Adding a `try`/`catch` statement to each route handler function that needs to
call an asynchronous function or method can result in a lot of boilerplate code.
If your application only has a handful of routes that's probably not an issue,
but if your application has dozens of routes (or more), it's worth taking a look
at how you can reduce the amount of boilerplate code you need to write.

### Writing an asynchronous route handler wrapper function

One approach to avoiding writing boilerplate code is to write a simple
asynchronous route handler wrapper function to catch errors.

Start by defining a function named `asyncHandler` that accepts a reference to a
route handler function and returns a function that defines three parameters,
`req`, `res`, and `next`:

```js
const asyncHandler = (handler) => {
  return (req, res, next) => {
    // TODO
  };
};
```

Then, within the function that's being returned, call the passed in route
handler function (i.e. the `handler` parameter), passing in the `req`, `res`,
and `next` parameters:

```js
const asyncHandler = (handler) => {
 return (req, res, next) => {
   return handler(req, res, next);
 };
};
```

And finally, call the `catch()` method on the Promise returned from the route
handler function passing in the `next` parameter:

```js
const asyncHandler = (handler) => {
 return (req, res, next) => {
   return handler(req, res, next).catch(next);
 };
};
```

Remember, passing the `next` parameter to the `catch()` method allows the
Express default error handler to process any errors thrown by the route handler
function.

Because each of the arrow functions return a single statement, the
`asyncHandler()` function can optionally be written a little more concisely:

```js
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
```

> **Note:** Developers sometimes find the more concise version to be more
> difficult to read and understand, so if you're working on a team, talk with
> your teammates and determine which approach is the team's preferred approach.

### Using the asynchronous route handler wrapper function

As a reminder, this is what your asynchronous route handler currently looks
like:

```js
app.get('*', async (req, res, next) => {
 try {
   const result = await delay(-5000);
   res.send(result);
 } catch (err) {
   next(err);
 }
});
```

Wrapping your asynchronous route handler with your `asyncHandler()` helper
function looks like this:

```js
app.get('*', asyncHandler(async (req, res) => {
 const result = await delay(5000);
 res.send(result);
}));
```

Because the `asyncHandler()` function is calling the `catch()` method on the
Promise that's returned from the asynchronous route handler you can safely
remove the `try`/`catch` statement. This makes asynchronous route handlers
cleaner and easier to read and maintain.

> **Note:** You might wonder how the `asyncHandler()` function can successfully
> call the `catch()` method after invoking the asynchronous route handler
> function if the route handler function doesn't explicitly return a Promise.
> Remember that marking a function or method with the `async` keyword results in
> that function or method implicitly returning a Promise. Your asynchronous
> route handler is marked as an `async` function, so it implicitly returns a
> Promise.

## What you learned

In this article, you learned

* that Express cannot process unhandled Promise rejections from within a route
  handler (or middleware) function;
* how to use a Promise `catch` block or a `try`/`catch` statement with
  `async`/`await` to properly handle errors thrown from within asynchronous
  route handler (or middleware) function; and
* how to write a wrapper function to simplify catching errors thrown within
  asynchronous route handler (or middleware) functions.

## See also…

While writing a wrapper function for your asynchronous route handler function is
easy to do, you can also use an npm package to accomplish the same thing without
having to write any extra code. If you're interested to see what this looks
like, check out the [`express-promise-router` npm
package][express-promise-router].

[absolute value]: https://en.wikipedia.org/wiki/Absolute_value
[express-promise-router]: https://www.npmjs.com/package/express-promise-router

________________________________________________________________________________
# Handling Errors in Express


No matter how hard we try, we all make mistakes when writing code. If you're
lucky, the coding mistake will break the execution of the application in a very
obvious way—crashing the application when testing in the local development
environment. If you're unlucky, the coding mistake will go unnoticed, only to
surface as an unexpected error when the application is being used by end users.

When an unexpected error occurs, the default error handler in Express will send
a response to the browser containing the error message along with the stack
trace (if you're not running in a production environment). While the default
error handler might work fine in your local development environment, for most
applications you'll want to create a custom error handler to precisely control
how errors are handled in other environments (i.e. test, staging, or
production).

When you finish this article, you should be able to:

* Describe how an error handler function differs from middleware and route
  handler functions;
* Define a global error-handling function to catch and process unhandled errors;
  and
* Define a route to handle requests for unknown routes by throwing a 404 NOT
  FOUND error.

## Setting up an example Express application

Let's create a simple application to assist with exploring how to handle errors
in Express.

Create a folder for your project (if you haven't already), open a terminal and
browse to your project folder, and run the following commands:

```sh
npm init -y
npm install express@^4.0.0 pug@^2.0.0
npm install nodemon --save-dev
```

> **Important:** If you're using Git, don't forget to add a `.gitignore` file in
> the root of your project folder that contains an entry to ignore the
> `node_modules` folder! The `node_modules` folder tends to be very large and
> would bloat the Git repository if it was committed and pushed. Ignoring the
> `node_modules` folder is possible because it can be generated on demand by
> running the `npm install` command.

Add an `app.js` file to the root of your project containing the following code:

```js
// app.js

const express = require('express');

// Create the Express app.
const app = express();

// Set the pug view engine.
app.set('view engine', 'pug');

// Define routes.

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/throw-error', (req, res) => {
  throw new Error('An error occurred!');
});

// Define a port and start listening for connections.

const port = 8080;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

Next, define an npm `start` script in your `package.json` file that uses Nodemon
to run the application:

```json
{
 "name": "handling-errors-in-express",
 "version": "1.0.0",
 "description": "",
 "main": "app.js",
 "scripts": {
   "start": "nodemon app.js"
 },
 "keywords": [],
 "author": "",
 "license": "ISC",
 "dependencies": {
   "express": "^4.17.1",
   "pug": "^2.0.4"
 },
 "devDependencies": {
   "nodemon": "^2.0.2"
 }
}
```

> **Pro Tip:** Creating scripts in the `package.json` file allows you to
> customize and rename often used terminal commands. For example, the above
> `"start": "nodemon app.js"` script allows you to run `npm start` instead of
> `npx nodemon app.js` in your terminal to run the application.

The last bit of set up business is to create a couple of Pug views. Add a
`views` folder to the root of the project. Then add two files to the `views`
folder: `layout.pug` and `index.pug`:

```pug
//- layout.pug

doctype html
html
 head
   title Custom Error Handlers - #{title}
 body
   h1 Custom Error Handlers
   h2= title
   div
     block content
```

```pug
//- index.pug

extends layout.pug

block content
 p Welcome to the Custom Error Handlers project!
```

Now you're ready to run and test your application! From the terminal, run the
command `npm start`, then browse to the URL `http://localhost:8080/`. You should
see the application's Home page.

## The default error handler in Express

After an error is thrown or the `next()` method is called with an argument from
within a route handler, Express will handle the error using its default error
handler.

You can see the default error handler in action by starting the example
application (i.e. `npm start`) and browsing to
`http://localhost:8080/throw-error`. The default error handler will send a
response to the browser containing the error message along with the stack trace:

```
Error: An error occurred!
   at throwError ([path to the project folder]/app.js:14:9)
   at [path to the project folder]/app.js:29:3
   at Layer.handle [as handle_request] ([path to the project folder]/node_modules/express/lib/router/layer.js:95:5)
   at next ([path to the project folder]/node_modules/express/lib/router/route.js:137:13)
   at Route.dispatch ([path to the project folder]/node_modules/express/lib/router/route.js:112:3)
   at Layer.handle [as handle_request] ([path to the project folder]/node_modules/express/lib/router/layer.js:95:5)
   at [path to the project folder]/node_modules/express/lib/router/index.js:281:22
   at Function.process_params ([path to the project folder]/node_modules/express/lib/router/index.js:335:12)
   at next ([path to the project folder]/node_modules/express/lib/router/index.js:275:10)
   at expressInit ([path to the project folder]/node_modules/express/lib/middleware/init.js:40:5)
```

> **Note:** If you're following along, the placeholder text "[path to the
> project folder]" in the above error stack trace information will display the
> actual absolute path to your project folder.

The response will also have an HTTP status code of `500 Internal Server Error`.
You can view the response's HTTP status code by inspecting the network
information using your browser's developer tools.

### Do you need a custom error handler?

If the `NODE_ENV` environment variable is set to "production", then the default
error handler will simply return a response with an HTTP status code of `500
Internal Server Error` containing the text "Internal Server Error".

You can see this in action by setting the `NODE_ENV` environment variable before
starting the example application:

```sh
NODE_ENV=production node app.js
```

![express-default-error-handler-in-production]

If an end user were to see the above error message in production, it would
likely leave them frustrated and confused. While a custom error handler won't be
able to magically resolve unexpected errors for your users, it will allow you to
display a friendlier message using your website's layout template (you'll see
how to do this later in this article).

Defining a custom error handler will also allow you to log unexpected errors so
that you (or someone on your team) can review them periodically to determine if
an undetected bug has made its way into production.

## Defining a custom error handler

As you've seen in earlier lessons, Express middleware functions define three
parameters (`req`, `res`, `next`) and route handlers define two or three
parameters (`req`, `res`, and optionally the `next` parameter):

```js
// Middleware function.
app.use((req, res, next) => {
  console.log('Hello from a middleware function!');
  next();
});

// Route handler function.
app.get('/', (req, res) => {
  res.send('Hello from a route handler function!');
});
```

Error handling functions look the same as middleware functions except they
define four parameters instead of three—`err`, `req`, `res`, and `next`:

```js
app.use((err, req, res, next) => {
  console.error(err);
  res.send('An error occurred!');
});
```

Custom error handler functions have to define four parameters otherwise Express
won't recognize the function as an error handler. Route handler function
definitions can omit the `next` parameter if it's not going to be used; error
handler functions have to include the `next` parameter.

Define error handler functions after all other calls to `app.use()` and all of
your application's route definitions:

```js
// app.js

const express = require('express');

// Create the Express app.
const app = express();

// Set the pug view engine.
app.set('view engine', 'pug');

// Define routes.

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/throw-error', (req, res) => {
  throw new Error('An error occurred!');
});

// Custom error handler.
app.use((err, req, res, next) => {
  console.error(err);
  res.send('An error occurred!');
});

// Define a port and start listening for connections.

const port = 8080;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

This ensures that your custom error handler will get called to handle errors
from any of your application's middleware or route handler functions.

If you test your custom error handler by browsing to
`http://localhost:8080/throw-error` you'll see that it sends a response
containing the text "An error occurred!".

If you use your browser's developer tools to inspect the response of
`http://localhost:8080/throw-error`, you'll notice that the response HTTP status
code is `200 OK`, which is the default status code used by Express when sending
responses. You can use the `res.status()` method to set a different status code:

```js
// Custom error handler.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.send('An error occurred!');
});
```

Notice how the `err.status` property is checked to see if it has a value before
the status is set to the literal numeric value `500`. Giving priority to the
`err.status` property allows code elsewhere in the application to throw an error
that includes the specific HTTP status code to send to the client.

You can return an HTML response instead of plain text by rendering a Pug view:

```js
// Custom error handler.
app.use((err, req, res, next) => {
 console.error(err);
 res.status(err.status || 500);
 const isProduction = process.env.NODE_ENV === 'production';
 res.render('error', {
   title: 'Server Error',
   message: isProduction ? null : err.message,
   error: isProduction ? null : err,
 });
});
```

Be sure to add the `error.pug` view to the `views` folder:

```pug
//- error.pug

extends layout.pug

block content
 div
   p= message || 'An unexpected error occurred on the server.'
 if stack
   h3 Stack Trace
   pre= stack
```

Notice that the error `message` and `stack` properties are only being passed to
the view if the `NODE_ENV` environment variable isn't set to "production". For
security reasons, it's important to avoid leaking potentially sensitive
information about your application.

If you test your custom error handler again by browsing to
`http://localhost:8080/throw-error` you'll see that it sends an HTML response
containing information about the error that was thrown.

To test how the error handler will behave in the production environment, set the
`NODE_ENV` environment variable to "production" before starting the example
application:

```sh
NODE_ENV=production node app.js
```

### Defining multiple custom error handlers

Express allows you to define more than one custom error handler which is useful
if you need to handle specific types of errors differently. It's also useful for
creating an error handler to perform a specific error handling task. Let's look
at an example of defining a second error handler that's responsible for logging
errors.

Error handlers, like route handlers, are executed by Express in the order that
they're defined in, so defining a new error handler before the existing handler
ensures that it'll be called first:

```js
// Custom error handlers.

// Error handler to log errors.
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    // TODO Log the error to the database.
  } else {
    console.error(err);
  }
  next(err);
});

// Generic error handler.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = process.env.NODE_ENV === 'production';
  res.render('error', {
    title: 'Server Error',
    message: isProduction ? null : err.message,
    stack: isProduction ? null : err.stack,
  });
});
```

The new error handler simply uses the `console.error()` method to log errors to
the console, provided that the `NODE_ENV` environment variable isn't set to
"production". In the production environment, there's a TODO comment to log the
error to the database. The `console.error()` method call in the existing error
handler was removed; logging errors is now the responsibility of the new error
handler.

> **Note:** Logging errors to a database—or another type of data store—is a
> common practice in production environments. Doing this allows a developer or
> system administrator to periodically review a log of application errors to
> determine if there are any issues that might need to be looked at in more
> detail. There are many ways to handle error logging, ranging from npm logging
> packages (e.g. [`winston`][winston npm package]) to full-blown application
> monitoring cloud-based services. 

Also notice that the new error handler calls the `next()` method passing in the
`err` parameter (the current error) which passes control to the next error
handler. An error handler needs to call `next()` or return a response. Failing
to do this will result in the request "hanging" and consuming resources on the
server.

## Handling "Page Not Found" errors

A common feature for applications to implement is to present a friendly "Page
Not Found" message to end users when a request can't be matched to one of the
application's defined routes. Let's see how to implement this feature using a
combination of a middleware function and an error handler function.

First, add a new middleware function after the last route in your application
(but before any of your error handlers):

```js
// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
 const err = new Error('The requested page couldn\'t be found.');
 err.status = 404;
 next(err);
});
```

Placing this middleware function after all of your routes means that this
middleware function will only be invoked if a request fails to match any of your
routes.

Notice that the middleware function creates a new Error object and sets a
`status` property on the object to the literal number `404`. `404` is the HTTP
status code for "Not Found" responses indicating that the requested resource
could not be found.

After setting the `status` property, the `next()` method is called with the
`err` variable passed as an argument. Remember that calling the `next()` method
with an argument results in Express handling the current request as an error and
skipping any remaining routing and middleware functions.

At this point, you can test your "Page Not Found" middleware function by
browsing to `http://localhost:8080/some-unknown-page` (or really any path that
doesn't match one of your application's configured routes). You should see your
"Server Error" page displaying the message "The requested page couldn't be
found."

### Creating a "Page Not Found" page

While the current solution works, a more elegant solution would be to present a
specific "Page Not Found" page to the end user.

To do this, define another error handler—in between the logging and generic
error handlers—for handling 404 errors:

```js
// Error handler for 404 errors.
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404);
    res.render('page-not-found', {
      title: 'Page Not Found',
    });
  } else {
    next(err);
  }
});
```

This error handler starts by checking if the `err.status` property is set to
`404`—which indicates that the current error is a "Not Found" error. If the
current error is a "Not Found" error, then it sets the response HTTP status code
to `404` and calls the `res.render()` method to render the `page-not-found` view
(you'll create that view in just a bit). Otherwise, the `next()` method is
called with the `err` parameter passed as an argument, which passes control to
the next error handler.

Before testing your new error handler, don't forget to add a new view named
`page-not-found.pug` to the `views` folder with the following content:

```pug
//- page-not-found.pug

extends layout.pug

block content
 div
   p Sorry, we couldn't find the page that you requested.
```

Now if you test your application again by browsing to
`http://localhost:8080/some-unknown-page` (or any path that doesn't match one of
your application's configured routes) you should see your new "Page Not Found"
page.

For your reference, here's the final version of the `app.js` file:

```js
// app.js

const express = require('express');

// Create the Express app.
const app = express();

// Set the pug view engine.
app.set('view engine', 'pug');

// Define routes.

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/throw-error', (req, res) => {
  throw new Error('An error occurred!');
});

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error('The requested page couldn\'t be found.');
  err.status = 404;
  next(err);
});

// Custom error handlers.

// Error handler to log errors.
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    // TODO Log the error to the database.
  } else {
    console.error(err);
  }
  next(err);
});

// Error handler for 404 errors.
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404);
    res.render('page-not-found', {
      title: 'Page Not Found',
    });
  } else {
    next(err);
  }
});

// Generic error handler.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = process.env.NODE_ENV === 'production';
  res.render('error', {
    title: 'Server Error',
    message: isProduction ? null : err.message,
    stack: isProduction ? null : err.stack,
  });
});

// Define a port and start listening for connections.

const port = 8080;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

## What you learned

In this article, you learned

* how an error handler function differs from middleware and route handler
  functions;
* how to define a global error-handling function to catch and process unhandled
  errors; and
* how to define a route to handle requests for unknown routes by throwing a 404
  NOT FOUND error.

[express-default-error-handler-in-production]: images/express-default-error-handler-in-production.png
[winston npm package]: https://www.npmjs.com/package/winston

________________________________________________________________________________
# Data-Driven Websites - Part 1: Setting Up the Project


Data-driven websites are everywhere online. From e-commerce websites to search
websites to mega social media websites, data is the foundation of the dynamic,
personalized experiences that users have come to expect of the Web.

You've learned all of the necessary skills—now it's time to bring it all
together to create a data-driven website using Express!

Over the next three articles, you'll create a data-driven Reading List website
that will allow you to view a list of books, add a book to the list, update a
book in the list, and delete a book from the list. In this article, you'll set
up the project. In the next article, you'll learn how to integrate Sequelize
with an Express application. In the last article, you'll create the routes and
views to perform CRUD (create, read, update, and delete) operations using
Sequelize.

When you finish this article, you should be able to:

* Split the Express application and HTTP server into separate modules;
* Use the `morgan` npm package to log requests; and
* Add support for the Bootstrap front-end component library to your
  application's Pug layout template.

You'll also review the following:

* Setting up a new Express project;
* Stubbing out an Express application;
* Adding custom error handlers to an Express application; and
* Configuring environment variables.

## Setting up the project

First things first, create a folder for your project. If you're using source
control (and you are—right?), open a terminal, browse to your project folder,
and initialize your Git repository by running the command `git init`.

You'll be using npm to install packages in just a bit, so be sure to add a
`.gitignore` file to the root of your project. Then add the entry
`node_modules/` to the `.gitignore` file so that the `node_modules` folder
(where npm downloads packages to) won't be tracked by Git.

> **Pro Tip:** While configuring Git to not track the `node_modules` folder is
> important to do, it's not necessarily the only thing you want to configure Git
> not to track. For a more comprehensive `.gitignore` file for Node.js projects,
> you can use [GitHub's `.gitignore` file for Node.js projects][github node
> gitignore].

### Initializing npm and installing dependencies

Before you stub out the application, use npm to initialize your project and
install the following dependencies:

```sh
npm init -y
npm install express@^4.0.0 pug@^2.0.0
```

Then install Nodemon as a development dependency:

```sh
npm install nodemon@^2.0.0 --save-dev
```

## Stubbing out the application

Now it's time to stub out the application by writing the minimal amount of code
to define the route for the default route (i.e. the "Home" page).

Start with adding a `routes` module by adding a file named `routes.js` to the
root of your project containing the following code:

```js
// ./routes.js

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

module.exports = router;
```

The default route renders the `index` view which you'll create in just a bit.

Next, add the `app` module (`app.js`) to the root of your project containing the
following code:

```js
// ./app.js

const express = require('express');

const routes = require('./routes');

const app = express();

app.set('view engine', 'pug');

app.use(routes);

// Define a port and start listening for connections.

const port = 8080;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

To stub out the initial views for the application, add a folder named `views` to
the root of the project. Then add two Pug templates to the `views`
folder—`layout.pug` and `index.pug` containing the following code:

```pug
//- ./views/layout.pug

doctype html
html
  head
    title Reading List - #{title}
  body
    h1 Reading List
    div
      h2 #{title}
      block content
```

```pug
//- ./views/index.pug

extends layout.pug

block content
  p Hello from the Reading List app!
```

The `layout.pug` template provides the overall HTML for each page in the
application while the `index.pug` template provides the HTML for the index or
default page for the application.

All four of these files—`routes.js`, `app.js`, `layout.pug`, and
`index.pug`—will evolve and change as you add features to the Reading List
application.

### Testing the initial application setup

It's time to test your initial application setup before you make any further
changes.

Open the `package.json` file and replace the placeholder npm `test` script (that
was generated by npm) with the following `start` script:

```json
"scripts": {
  "start": "nodemon app.js"
}
```

From the terminal, run the command `npm start` to start your application, then
browse to `http://localhost:8080/`. You should see the "Home" page displaying
the message "Hello from the Reading List app!"

> **Now is a good time to commit your changes (if you haven't already)!** In
> general, making smaller commits more often where each commit contains a
> related set of changes is better than waiting until the end of the day to make
> one giant commit that contains all of the changes for the entire day.

## Splitting the application and server into separate modules

Now that you've created a simple, initial version of the application, it's time
to start adding additional features and making general improvements to the
overall design of the application.

Up until this point, you've created your Express application and started the
HTTP server within the same module—the `app` module. A common practice is to
separate the application and server into separate modules. Doing this has the
following benefits:

* **Improved separation of concerns:** As much as possible, each module in your
  application should be responsible for doing one thing and only one thing.
  Separating out the server setup and startup into its own module improves the
  overall separation of concerns by allowing the `app` module to only be
  responsible for creating the Express application.
* **Improved testability:** Removing the startup of the HTTP server from the
  `app` module improves the testability of the Express application. While you
  won't be writing tests for your Express application in this project,
  establishing good coding practices will set you up to write tests for your
  application in the future.

### Updating the `app` module

The last two statements in the `app` module (`app.js`) are responsible for
defining a port and starting the server listening for HTTP connections:

```js
// Define a port and start listening for connections.

const port = 8080;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

Go ahead and remove that code. In its place, add this line of code to export the
Express application from the module:

```js
module.exports = app;
```

For reference, here's what the complete `app` module should look like at this
point:

```js
// ./app.js

const express = require('express');

const routes = require('./routes');

const app = express();

app.set('view engine', 'pug');

app.use(routes);

module.exports = app;
```

### Defining a new entry point for the application

As a reminder, the npm `start` script currently looks like this:

```json
"scripts": {
  "start": "nodemon app.js"
}
```

Nodemon is being used to start the application and to restart the application
when a change is made to any of the files in the project. The `app.js` file is
provided as the entry point for the application—the module that's responsible
for configuring and starting the application.

Now that the `app` module doesn't start the server listening for HTTP
connections, it can no longer be used as the entry point for the application. To
create a new entry point for the application, add a folder named `bin` to the
root of the project. Then add a file named `www` (with no `.js` extension) 
containing the following code. Make sure `#!/usr/bin/env node` is on the first 
line of your file:

```js
#!/usr/bin/env node

const app = require('../app');

// Define a port and start listening for connections.

const port = 8080;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

Then update the npm `start` script to pass the `www` file into Nodemon as the
entry point:

```json
"scripts": {
  "start": "nodemon ./bin/www"
}
```

To test your application's new entry point, run the command `npm start`, then
browse to `http://localhost:8080/`. As before, you should see the "Home" page
displaying the message "Hello from the Reading List app!"

### Taking a closer look at the `./bin/www` file

The `bin` folder is a common Unix convention for naming a folder that contains
executable scripts. Even though it's lacking the `.js` file extension, the `www`
file is actually a JavaScript module that contains the code to start up the
Express application.

You might have noticed that the first line of the `www` file isn't valid
JavaScript:

```js
#!/usr/bin/env node
```

This is an instance of a [Unix shebang][wikipedia shebang]. The shebang has to 
be written on the first line of the `www` file. It tells the system what 
interpreter to pass the file to for execution. In this case, `node` is specified 
as the interpreter via the Unix `env` command.

The intention of the `./bin/www` file is for it to be an executable
script—meaning that you could start the application by simply entering the file
name in the terminal as a command:

```sh
bin/www
``` 

If you attempt to execute the script, you'll receive a "permission denied"
error. Text files by default do not have the necessary permissions. You can use
the `chmod` command in the root of your project to add the missing permissions:

```sh
chmod +x bin/www
```

With the proper permissions added, you can run the command `bin/www` to start
your application.

> **Note:** The ability to run your application via a `bin` script is primarily
> useful for Node projects that are intended to be used as command line tools or
> utilities. The Sequelize CLI is an example of a Node.js command line tool
> that's executable via a `bin` folder script. For Express applications like the
> Reading List application, it's far more common to use an npm `start` script to
> run the application.

## Logging requests using Morgan

Currently, after the application starts up and displays the message "Listening
on port 8080...", nothing else is written to the console to show activity. To
assist with testing and debugging, you can install the `morgan` npm package, an
HTTP request logger middleware for Node.js and Express:

```sh
npm install morgan
```

Aftering installing `morgan`, import it into the `app` module:

```js
// ./app.js

const express = require('express');
const morgan = require('morgan');

const routes = require('./routes');
```

> **Code organization tip:** Notice how the external modules are imported first
> and grouped together followed by the imported internal modules. While this
> isn't a hard requirement, it can help make it easier to read a module's
> dependencies.

Then call the `app.use()` method to add `morgan` to the application request
pipeline:

```js
app.use(morgan('dev'));
```

The string literal "dev" is passed into `morgan` to configure the request
logging format. The "dev" format is just one of the available predefined
formats.

Now if you start your application and browse to `http://localhost:8080/`, you'll
see the request logged to the console:

```sh
GET / 200 9.851 ms - 172
```

Here's a breakdown of the above output:

* `GET` - The request HTTP method
* `/` - The request path
* `9.851 ms` - The response time in milliseconds
* `172` - The `Content-Length` response header value that indicates the size of
  the response body in bytes

## Adding custom error handlers

As you learned in a previous article, Express provides a default error handler,
but for most applications you'll want to create a custom error handler to
precisely control how errors are handled.

In the `app` module, start with adding a middleware function to catch unmatched
requests and throw a "Page Not Found" error:

```js
// ./app.js

// Code remove for brevity.

app.use(routes);

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error('The requested page couldn\'t be found.');
  err.status = 404;
  next(err);
});

// TODO Add custom error handlers.

module.exports = app;
```

Next, add the following custom error handlers—an error handler to log errors, an
error handler to handle "Page Not Found" errors, and a generic error handler:

```js
// ./app.js

// Code remove for brevity.

app.use(routes);

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error('The requested page couldn\'t be found.');
  err.status = 404;
  next(err);
});

// Custom error handlers.

// Error handler to log errors.
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    // TODO Log the error to the database.
  } else {
    console.error(err);
  }
  next(err);
});

// Error handler for 404 errors.
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404);
    res.render('page-not-found', {
      title: 'Page Not Found',
    });
  } else {
    next(err);
  }
});

// Generic error handler.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = process.env.NODE_ENV === 'production';
  res.render('error', {
    title: 'Server Error',
    message: isProduction ? null : err.message,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
```

To complete your custom error handlers, add two views to the `views`
folder—`error.pug` and `page-not-found.pug`:

```pug
//- error.pug

extends layout.pug

block content
 div
   p= message || 'An unexpected error occurred on the server.'
 if stack
   h3 Stack Trace
   pre= stack
```

```pug
//- page-not-found.pug

extends layout.pug

block content
 div
   p Sorry, we couldn't find the page that you requested.
```

### Testing your custom error handlers

To test your custom error handlers, update the default route (`/`) in the
`routes` module to temporarily throw an error:

```js
router.get('/', (req, res) => {
  throw new Error('This is a test error!');
  res.render('index', { title: 'Home' });
});
```

Start your application and browse to `http://localhost:8080/` and you should see
the "Server Error" page. Next, browse to an unknown path like
`http://localhost:8080/asdf` and you should see the "Page Not Found" page.

You should also see the errors logged to the terminal:

```sh
Error: This is a test error!
    at [path to the project folder]/routes.js:7:9
    at Layer.handle [as handle_request] ([path to the project folder]/node_modules/express/lib/router/layer.js:95:5)
    at next ([path to the project folder]/node_modules/express/lib/router/route.js:137:13)
    at Route.dispatch ([path to the project folder]/node_modules/express/lib/router/route.js:112:3)
    at Layer.handle [as handle_request] ([path to the project folder]/node_modules/express/lib/router/layer.js:95:5)
    at [path to the project folder]/node_modules/express/lib/router/index.js:281:22
    at Function.process_params ([path to the project folder]/node_modules/express/lib/router/index.js:335:12)
    at next ([path to the project folder]/node_modules/express/lib/router/index.js:275:10)
    at Function.handle ([path to the project folder]/node_modules/express/lib/router/index.js:174:3)
    at router ([path to the project folder]/node_modules/express/lib/router/index.js:47:12)
GET / 500 452.308 ms - 2070
```

```sh
Error: The requested page couldn't be found.
    at [path to the project folder]/app.js:16:15
    at Layer.handle [as handle_request] ([path to the project folder]/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix ([path to the project folder]/node_modules/express/lib/router/index.js:317:13)
    at [path to the project folder]/node_modules/express/lib/router/index.js:284:7
    at Function.process_params ([path to the project folder]/node_modules/express/lib/router/index.js:335:12)
    at next ([path to the project folder]/node_modules/express/lib/router/index.js:275:10)
    at [path to the project folder]/node_modules/express/lib/router/index.js:635:15
    at next ([path to the project folder]/node_modules/express/lib/router/index.js:260:14)
    at Function.handle ([path to the project folder]/node_modules/express/lib/router/index.js:174:3)
    at router ([path to the project folder]/node_modules/express/lib/router/index.js:47:12) {
  status: 404
}
GET /asdf 404 15.648 ms - 223
```

Also notice that thanks to the request logging provided by the `morgan`
middleware, you can see the `500` (Internal Server Error) and `404` (Not Found)
HTTP response status codes returned by the server.

After confirming that your custom error handlers work as expected, be sure to
remove the code that you temporarily added to your default route!

> For a refresher on the custom error handlers, see the "Catching and Handling
> Errors in Express" article.

## Configuring environment variables

Since the Reading List application will use a database for data persistence,
your project needs to include a way to configure the database connection
settings across environments. To do that, let's use environment variables to
configure the application.

> For a refresher on how to use environment variables within an Express
> application, see the "Acclimating to Environment Variables" article.

To start, install `per-env` as a project dependency the `dotenv` and
`dotenv-cli` as development dependencies (i.e. dependencies that are only needed
in development environments):

```sh
npm install per-env
npm install dotenv dotenv-cli --save-dev
```

As a reminder, the `per-env` package allows you to define npm scripts for each
of your application's environments. The `dotenv` package is used to load
environment variables from an `.env` file and the `dotenv-cli` package acts as
an intermediary between npx and tools or utilities (like the Sequelize CLI) to
load your environment variables from an `.env` file and run the command that you
pass into it.

### Adding the `.env` and `.env.example` files

Next, add two files to the root of your project—`.env` and `.env.example` with
the following content:

```txt
PORT=8080
``` 

The `.env` file is where you define the environment variables to configure your
application. At this point in the project, you just need to define the `PORT`
environment variable. The `.env` file shouldn't be committed to source control
as the environment variables it defines are specific to your development
environment. Additionally, it might contain sensitive information.

> To ensure that the `.env` file isn't committed to source control, add `.env`
> as an entry to your project's `.gitignore` file. If you're using GitHub's
> `.gitignore` file for Node.js projects, this has already been done for you.

Because the `.env` file isn't committed to source control, the `.env.example`
file serves as documentation for your teammates so they can create their own
`.env` files.

### Adding the `config` module

Let's encapsulate all of the `process.env` property access into a single
`config` module by importing all of the application's environment variables and
exporting them to make them available to the rest of the application.

Add a folder named `config` to the root of the project. Then add a file named
`index.js` to the `config` folder containing the following code:

```js
module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
};
```

Now you can update the `./bin/www` file to get the port from the `config`
module:

```js
#!/usr/bin/env node

const { port } = require('../config');

const app = require('../app');

// Start listening for connections.

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

### Updating the npm `start` script

To load the environment variables from the `.env` file in the local development
environment while ignoring the `.env` file in the production environment, update
the `package.json` file `scripts` section:

```json
"scripts": {
  "start": "per-env",
  "start:development": "nodemon -r dotenv/config ./bin/www",
  "start:production": "node ./bin/www"
}
```

To review, if the `NODE_ENV` environment variable is set to `production`, then
running the `start` script will result in the execution of the
`start:production` script. If the `NODE_ENV` variable isn't defined (or set to
`development`), then the `start:development` script will be executed by default.

At this point, running the command `npm start` should start your application
just like it before.

### Supporting debugging in Visual Studio Code

To use the debugger in Visual Studio Code, configure it to load your environment
variables from your `.env` file. Open the `launch.json` file located in the
`.vscode` folder and add the `envFile` property to your Node configuration:

```json
{
 "version": "0.2.0",
 "configurations": [
   {
     "type": "node",
     "request": "launch",
     "name": "Launch Program",
     "skipFiles": [
       "<node_internals>/**"
     ],
     "program": "${workspaceFolder}/bin/www",
     "envFile": "${workspaceFolder}/.env"
   }
 ]
}
```

> **Note:** If you don't have `.vscode/launch.json` file in your project, see
> [this page][vs code launch configurations] in the Visual Studio Code
> documentation for instructions on how to set up debugging.

## Setting up Bootstrap

One last bit of project set up work before installing and configuring Sequelize!
Update the `views/layout.pug` view with the following Bootstrap template markup:

```pug
doctype html
html
  head
    meta(charset='utf-8')
    meta(name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no')
    link(rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css' integrity='sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh' crossorigin='anonymous')
    title Reading List - #{title}
  body
    nav(class='navbar navbar-expand-lg navbar-dark bg-primary')
      a(class='navbar-brand' href='/') Reading List
    .container
      h2(class='py-4') #{title}
      block content
    script(src='https://code.jquery.com/jquery-3.4.1.slim.min.js' integrity='sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n' crossorigin='anonymous') script(src='https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js' integrity='sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo' crossorigin='anonymous') script(src='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js' integrity='sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6' crossorigin='anonymous')
```

Adding support for the Bootstrap front-end component library will give the
Reading List application a nice, polished look. The above markup was taken
directly from [the starter template published in the official Bootstrap
documentation][bootstrap starter template]. 

> Adding Bootstrap won't change the look of the application much at this point.
> Later on, once you start adding forms to the application, it'll be easier to
> notice the benefits of using a library like Bootstrap.

## What you learned

In this article, you learned how to:

* Split the Express application and HTTP server into separate modules;
* Use the `morgan` npm package to log requests; and
* Add support for the Bootstrap front-end component library to your
  application's Pug layout template.

You also reviewed the following:

* Setting up a new Express project;
* Stubbing out an Express application;
* Adding custom error handlers to an Express application; and
* Configuring environment variables.

Next up: integrating Sequelize with an Express application!

[github node gitignore]: https://github.com/github/gitignore/blob/master/Node.gitignore
[wikipedia shebang]: https://en.wikipedia.org/wiki/Shebang_(Unix)
[vs code launch configurations]: https://code.visualstudio.com/docs/editor/debugging#_launch-configurations
[bootstrap starter template]: https://getbootstrap.com/docs/4.4/getting-started/introduction/#starter-template

________________________________________________________________________________
# Data-Driven Websites Project (Part 2: Integrating Sequelize with Express)


Welcome to part two of creating the data-driven Reading List website!

Over the course of three articles, you'll create a data-driven Reading List
website that will allow you to view a list of books, add a book to the list,
update a book in the list, and delete a book from the list. In the first
article, you created the project. In this article, you'll learn how to integrate
Sequelize with an Express application. In the last article, you'll create the
routes and views to perform CRUD (create, read, update, and delete) operations
using Sequelize.

When you finish this article, you should be able to:

* Install and configure Sequelize within an Express application; and
* Use Sequelize to test the connection to a database before starting the HTTP
  server on application startup.

You'll also review the following:

* Using the Sequelize CLI to create a model and migration;
* Using the Sequelize CLI to seed the database; and
* Using Sequelize to query data from the database.

## Installing and configuring Sequelize

First things first, you need to install and configure Sequelize!

Use npm to install the following dependencies:

```sh
npm install sequelize@^5.0.0 pg@^8.0.0
```

Then install the Sequelize CLI as a development dependency:

```sh
npm install sequelize-cli@^5.0.0 --save-dev
```

### Configuring the Sequelize CLI

Before using the Sequelize CLI to initialize Sequelize within your project, add
a file named `.sequelizerc` to the root of your project containing the following
code:

```js
const path = require('path');

module.exports = {
  'config': path.resolve('config', 'database.js'),
  'models-path': path.resolve('db', 'models'),
  'seeders-path': path.resolve('db', 'seeders'),
  'migrations-path': path.resolve('db', 'migrations')
};
```

The `.sequelizerc` file configures the Sequelize CLI so that it knows:

* Where your database configuration is located; and
* Where to generate the `models`, `seeders`, and `migrations` folders.

### Initializing Sequelize

Now you're ready to initialize Sequelize by running the following command:

```sh
npx sequelize init
```

When the command completes, your project should now contain the following:

* The `config/database.js` file;
* The `db/migrations`, `db/models`, and `db/seeders` folders; and
* The `db/models/index.js` file.

### Creating a new database and database user

To prepare for configuring Sequelize, you need to create a new database for the
Reading List application to use and a new normal or limited user (i.e. a user
without superuser privileges) that has permissions to access the new database.

Open psql by running the command `psql` (to use the currently logged in user) or
`psql -U «super user username»` to specify the username of the super user to
use. Then execute the following SQL statements:

```sql
create database reading_list;
create user reading_list_app with encrypted password '«a strong password for the reading_list_app user»';
grant all privileges on database reading_list to reading_list_app;
```

Make note of the password that you use as you'll need them for the next step in
the configuration process!

> To review how to create a new PostgreSQL database and user, see the "Database
> Management Walk-Through" and "User Management Walk-Through" readings in the
> SQL lesson.

### Adding the database environment variables

Now you're ready to add the `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`, and
`DB_HOST` environment variables to the `.env` and `.env.example` files:

```
PORT=8080
DB_USERNAME=reading_list_app
DB_PASSWORD=«the reading_list_app user password»
DB_DATABASE=reading_list
DB_HOST=localhost
```

Next, update the `config` module (the `config/index.js` file) with the following
code:

```js
// ./config/index.js

module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
  },
};
```

Remember that the `config` module is responsible for providing access to your
application's environment variables. Any part of the application that needs
access to the `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`, and `DB_HOST`
environment variables can use the `username`, `password`, `database`, and `host`
properties on the `config` module's `db` object.

### Configuring the Sequelize database connection

Now you're ready to configure the database connection for Sequelize! Update the
`config/database.js` file with the following code:

```js
const {
  username,
  password,
  database,
  host,
} = require('./index').db;

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
  },
};
```

The first statement uses the `require()` function to import the `config/index`
module. Destructuring is used to declare the `username`, `password`, `database`,
and `host` variables and initialize them to the values of the corresponding
property names on the `config` module's `db` property.

You could remove the destructuring by refactoring the above statement into the
following statements:

```js
const config = require('./index');

const db = config.db;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;
```

The `config/database` module then exports an object with a property named
`development` set to an object literal with `username`, `password`, `database`,
`host`, and `dialect` properties:

```js
module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
  },
};
```

The `development` property name indicates that these configuration settings are
for the `development` environment. The `username`, `password`, `database`,
`host`, and `dialect` property names are the Sequelize options used to configure
the database connection.

> For a complete list of the available Sequelize options, see [the official
> Sequelize API documentation][sequelize docs instance constructor].

## Testing the connection to the database

You've configured Sequelize—specifically the database connection—but how do you
know if Sequelize can actually connect to the database? The Sequelize instance
method `authenticate()` can be used to test the connection to the database by
attempting to execute the query `SELECT 1+1 AS result` against the database
specified in the `config/database` module.

The Reading List application is a data-driven website, so it'll be heavily
dependent on its database. Given that, it's best to test the connection to the
database as early as possible. You can do that by updating the `./bin/www` file
to test the connection to the database before starting the application listening
for HTTP connections.

Update the `./bin/www` file with the following code:

```js
#!/usr/bin/env node

const { port } = require('../config');

const app = require('../app');
const db = require('../db/models');

// Check the database connection before starting the app.
db.sequelize.authenticate()
  .then(() => {
    console.log('Database connection success! Sequelize is ready to use...');

    // Start listening for connections.
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  })
  .catch((err) => {
    console.log('Database connection failure.');
    console.error(err);
  });
```

In addition to importing the `app` module, the `require()` function is called to
import the `./db/models` module—a module that was generated by the Sequelize CLI
when you initialized your project to use Sequelize.

The `./db/models` module provides access to the Sequelize instance via the
`sequelize` property. The `authenticate()` method is called on the Sequelize
instance. The `authenticate()` method is asynchronous, so it returns a Promise
that will resolve if the connection to the database is successful, otherwise it
will be rejected:

```js
// Check the database connection before starting the app.
db.sequelize.authenticate()
  .then(() => {
    // The connection to the database succeeded.
  })
  .catch((err) => {
    // The connection to the database failed.
  });
```

Inside of the `then()` method callback, a message is logged to the console and
the application is started listening for HTTP connections. Inside of the
`catch()` method callback, an error message and the `err` object are logged to
the console:

```js
// Check the database connection before starting the app.
db.sequelize.authenticate()
  .then(() => {
    console.log('Database connection success! Sequelize is ready to use...');

    // Start listening for connections.
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  })
  .catch((err) => {
    console.log('Database connection failure.');
    console.error(err);
  });
```

To test the connection to the database, run the command `npm start` in the
terminal to start your application. In the console, you should see the success
message if the database connection succeeded, otherwise you'll see the error
message.

## Creating the Book model

Now that you've confirmed that the application can successfully connect to the
database, it's time to create the application's first model.

As a reminder, the Reading List website—when it's completed—will allow you to
view a list of books, add a book to the list, update a book in the list, and
delete a book from the list. At the heart of all of these features are books, so
let's use the Sequelize CLI to generate a `Book` model.

The `Book` model should include the following properties:

* `title` - A string representing the title;
* `author` - A string representing the the author;
* `releaseDate` - A date representing the release date;
* `pageCount` - An integer representing the page count; and
* `publisher` - A string representing the publisher.

From the terminal, run the following command to use the Sequelize CLI to
generate the `Book` model:

```sh
npx sequelize model:generate --name Book --attributes "title:string, author:string, releaseDate:dateonly, pageCount:integer, publisher:string"
```

If the command succeeds, you'll see the following output in the console:

```sh
New model was created at [path to the project folder]/db/models/book.js .
New migration was created at [path to the project folder]/db/migrations/[timestamp]-Book.js .
```

This confirms that two files were generated: a file for the `Book` model and a
file for a database migration to add the `Books` table to the database.

### Updating the generated `Book` model and migration files

The `Book` model and migration files generated by the Sequelize CLI are close to
what is needed, but some changes are required. Two things in particular need to
be addressed: column string lengths and column nullability (i.e. the ability for
a column to accept `null` values).

For your reference, here are the generated model and migration files:

```js
// ./db/models/book.js

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    releaseDate: DataTypes.DATEONLY,
    pageCount: DataTypes.INTEGER,
    publisher: DataTypes.STRING
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};
```

```js
// ./db/migrations/[timestamp]-create-book.js

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      releaseDate: {
        type: Sequelize.DATEONLY
      },
      pageCount: {
        type: Sequelize.INTEGER
      },
      publisher: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Books');
  }
};
```

As it is, the generated migration file would create the following `Books` table
in the database:

```sh
reading_list=# \d "Books"
                                        Table "public.Books"
   Column    |           Type           | Collation | Nullable |               Default
-------------+--------------------------+-----------+----------+-------------------------------------
 id          | integer                  |           | not null | nextval('"Books_id_seq"'::regclass)
 title       | character varying(255)   |           |          |
 author      | character varying(255)   |           |          |
 releaseDate | date                     |           |          |
 pageCount   | integer                  |           |          |
 publisher   | character varying(255)   |           |          |
 createdAt   | timestamp with time zone |           | not null |
 updatedAt   | timestamp with time zone |           | not null |
Indexes:
    "Books_pkey" PRIMARY KEY, btree (id)
```

Notice that all of the `Book` `string` based properties (i.e. `title`, `author`,
and `publisher`) resulted in columns with a data type of `character
varying(255)`, which is a variable length text based column up to 255 characters
in length. Allowing for 255 characters for the `title` column seems about right,
but for the `author` and `publisher` columns, it seems excessive.

Also notice that the `title`, `author`, `releaseDate`, `pageCount`, and
`publisher` columns all allow `null` values (a value of `not null` in the
"Nullable" column means that the column doesn't allow `null` values, otherwise
the column allows `null` values). Ideally, each book in the database would have
values for all of those columns.

We can address both of these issues by updating the `./db/models/book.js` file
to the following code:

```js
// ./db/models/book.js

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    pageCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    publisher: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};
```

The migration file `./db/migrations/[timestamp]-create-book.js` also needs to be
updated to the following code:

```js
// ./db/migrations/[timestamp]-create-book.js

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      author: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      releaseDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      pageCount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      publisher: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Books');
  }
};
```

### Applying the pending migration

After resolving the column data type and nullability issues in the model and
migration files, you're ready to apply the pending migration to create the
`Books` table in the database. In the terminal, run the following command:

```sh
npx dotenv sequelize db:migrate
```

Notice that you're using npx to invoke the `dotenv` tool which loads your
environment variables from the `.env` file and then invokes the `sequelize
db:migrate` command. In the console, you should see something similar to the
following output:

```sh
Loaded configuration file "config/database.js".
Using environment "development".
== [timestamp]-create-book: migrating =======
== [timestamp]-create-book: migrated (0.021s)
```

To confirm the creation of the `Books` table, you can run the following command
from within psql:

```sh
\d "Books"
```

> Be sure that you're connected to the `reading_list` database in psql. If you
> are, the cursor should read `reading_list=#`. If you're not connected to the
> correct database, you can run the command `\c reading_list` to connect to the
> `reading_list` database.

After running the `\d "Books"` command, you should see the following output
within psql:

```sh
                                        Table "public.Books"
   Column    |           Type           | Collation | Nullable |               Default
-------------+--------------------------+-----------+----------+-------------------------------------
 id          | integer                  |           | not null | nextval('"Books_id_seq"'::regclass)
 title       | character varying(255)   |           | not null |
 author      | character varying(100)   |           | not null |
 releaseDate | date                     |           | not null |
 pageCount   | integer                  |           | not null |
 publisher   | character varying(100)   |           | not null |
 createdAt   | timestamp with time zone |           | not null |
 updatedAt   | timestamp with time zone |           | not null |
Indexes:
    "Books_pkey" PRIMARY KEY, btree (id)
```

## Seeding the database

With the `Books` table created in the database, you're ready to seed the table
with some test data!

To start, you need to create a seed file by running the following command in the
terminal from the root of your project:

```sh
npx sequelize seed:generate --name test-data
```

If the command succeeds, you'll see the following output in the console:

```sh
seeders folder at "[path to the project folder]/db/seeders" already exists.
New seed was created at [path to the project folder]/db/seeders/[timestamp]-test-data.js .
```

This confirms that the seed file was generated. Go ahead and replace the
contents of the `./db/seeders/[timestamp]-test-data.js` with the following code:

```js
// ./db/seeders/[timestamp]-test-data.js

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [
      {
        title: 'The Martian',
        author: 'Andy Weir',
        releaseDate: new Date('2014-02-11'),
        pageCount: 384,
        publisher: 'Crown',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Ready Player One',
        author: 'Ernest Cline',
        releaseDate: new Date('2011-08-16'),
        pageCount: 384,
        publisher: 'Crown',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Harry Potter and the Sorcerer\'s Stone',
        author: 'J.K. Rowling',
        releaseDate: new Date('1998-10-01'),
        pageCount: 309,
        publisher: 'Scholastic Press',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
```

The `up` property references an anonymous method that uses the
`queryInterface.bulkInsert()` method to insert an array of books into the `Book`
table while the `down` property references an anonymous method that uses the
`queryInterface.bulkDelete()` method to delete all of the data in the `Books`
table.

> Feel free to add to the array of books… have fun with it!

To seed your database with your test data, run the following command:

```sh
npx dotenv sequelize db:seed:all
```

In the console, you should see something similar to the following output:

```sh
Loaded configuration file "config/database.js".
Using environment "development".
== [timestamp]-test-data: migrating =======
== [timestamp]-test-data: migrated (0.009s)
```

Then you can use psql to check if the `Books` table contains the test data:

```sh
select * from "Books";
```

Which should produce the following output:

```sh
 id |                 title                 |    author    | releaseDate | pageCount |    publisher     |         createdAt          |         updatedAt
----+---------------------------------------+--------------+-------------+-----------+------------------+----------------------------+----------------------------
  2 | The Martian                           | Andy Weir    | 2014-02-11  |       384 | Crown            | 2020-03-31 19:06:32.452-07 | 2020-03-31 19:06:32.452-07
  3 | Ready Player One                      | Ernest Cline | 2011-08-16  |       384 | Crown            | 2020-03-31 19:06:32.452-07 | 2020-03-31 19:06:32.452-07
  4 | Harry Potter and the Sorcerer's Stone | J.K. Rowling | 1998-10-01  |       309 | Scholastic Press | 2020-03-31 19:06:32.452-07 | 2020-03-31 19:06:32.452-07
(3 rows)
```

## Querying and rendering a temporary list of books

Now that you've installed and configured Sequelize, created the `Book` model and
associated migration, and seeded the `Books` table, you're ready to update your
application's default route to query the for a list of books and render the data
in the `index` view!

In the `routes` module (the `./routes.js` file), use the `require()` function to
import the `models` module:

```js
const db = require('./db/models');
```

Then update the default route (`/`) to this:

```js
router.get('/', async (req, res, next) => {
  try {
    const books = await db.Book.findAll({ order: [['title', 'ASC']] });
    res.render('index', { title: 'Home', books });
  } catch (err) {
    next(err);
  }
});
```

The `async` keyword was added to make the route handler an asynchronous function
and the `db.Book.findAll()` method is used to retrieve a list of books from the
database.

For your reference, here's what the complete `./routes.js` file should look
like:

```js
// ./routes.js

const express = require('express');

const db = require('./db/models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const books = await db.Book.findAll({ order: [['title', 'ASC']] });
    res.render('index', { title: 'Home', books });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
```

Now you can update the `./views/index.pug` view to render the array of books:

```pug
extends layout.pug

block content
  p Hello from the Reading List app!
  h3 Books
  ul
    each book in books
      li= book.title
```

For now, the formatting of the book list is very simple. In the next article,
you'll see how to use Bootstrap to improve the look and feel of the book list
table.

Run the command `npm start` to start your application (if it's not already
started) and browse to `http://localhost:8080/`. You should see the list of
books from the database rendered to the page in an unordered list!

## What you learned

In this article, you learned how to:

* Install and configure Sequelize within an Express application; and
* Use Sequelize to test the connection to a database before starting the HTTP
  server on application startup.

You also reviewed the following:

* Using the Sequelize CLI to create a model;
* Using the Sequelize CLI to seed the database; and
* Using Sequelize to query data from the database.

Next up: creating the routes and views to perform CRUD (create, read, update,
and delete) operations using Sequelize!

[sequelize docs instance constructor]: https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor

________________________________________________________________________________
# Data-Driven Websites Project (Part 3: Using Sequelize to Perform CRUD Operations)


Welcome to part three of creating the data-driven Reading List website!

Over the course of three articles, you'll create a data-driven Reading List
website that will allow you to view a list of books, add a book to the list,
update a book in the list, and delete a book from the list. In the first
article, you created the project. In the second article, you learned how to
integrate Sequelize with an Express application. In this article, you'll create
the routes and views to perform CRUD (create, read, update, and delete)
operations using Sequelize.

When you finish this article, you should be able to:

* Define a collection of routes and views that use Sequelize to perform CRUD
  operations against a single resource; and
* Handle Sequelize validation errors when users are attempting to create or
  update data and display error messages to the user so that they can resolve
  any data quality issues.

You'll also review the following:

* Using a wrapper function to catch errors thrown within asynchronous route
  handler functions;
* Using Pug to create HTML forms;
* Using the `csurf` middleware to protect against CSRF exploits;
* Using the built-in `express.urlencoded()` middleware function to parse
  incoming request body form data;
* Using Sequelize model validations to validate user-provided data;
* Using the `express-validator` validation library to validate user-provided
  data within an Express route; and
* Using Pug includes and mixins to remove unnecessary code duplication.

## Planning the routes and views

Before creating any new routes or views, it's a good idea to plan out what pages
need to be added to support the required CRUD (create, read, update, and delete)
operations along with their associated routes, HTTP methods, and views.

Here's a list of the proposed pages to add to the Reading List application:

| Page Name   | Route Path         | HTTP Methods | View Name         |
|-------------|--------------------|--------------|-------------------|
| Book List   | `/`                | `GET`        | `book-list.pug`   |
| Add Book    | `/book/add`        | `GET` `POST` | `book-add.pug`    |
| Edit Book   | `/book/edit/:id`   | `GET` `POST` | `book-edit.pug`   |
| Delete Book | `/book/delete/:id` | `GET` `POST` | `book-delete.pug` |

There are a number of acceptable ways that you could approach implementing the
required CRUD operations for the `Book` resource or model. The above approach is
a common, tried-and-true way of implementing CRUD operations within a
server-side rendered web application.

> The term **server-side rendered** simply means that all of the work of
> generating the HTML for the web application's pages is done on the server.
> Later on, you'll learn how to use client-side technologies like React to move
> some of that work to the client (i.e. the browser).

Notice that the "Add Book", "Edit Book", and "Delete Book" pages need to support
both the `GET` and `POST` HTTP methods. The `GET` HTTP method will be used to
initially retrieve each page's HTML form while the `POST` HTTP method will be
used to process each page's HTML form submissions.

Also notice that the route paths for the "Edit Book" and "Delete Book" pages
define an `:id` route parameter. Without a book ID, those pages wouldn't know
what book record they were supposed to be editing or deleting. The "Add Book"
page doesn't need an `:id` route parameter because that page is adding a new
book record, so a book ID isn't needed (the ID for the new record will be
created by the database when the record is inserted into the table).

Now that you have a plan, let's start building out the proposed pages—starting
with the "Book List" page!

## Creating the Book List page

As a reminder, here's what the default route (`/`) in the `routes` module (i.e.
the `routes.js` file) looks like at this point:

```js
router.get('/', async (req, res, next) => {
  try {
    const books = await db.Book.findAll({ order: [['title', 'ASC']] });
    res.render('index', { title: 'Home', books });
  } catch (err) {
    next(err);
  }
});
```

And the `./views/index.pug` view:

```pug
//- ./views/index.pug

extends layout.pug

block content
  p Hello from the Reading List app!
  h3 Books
  ul
    each book in books
      li= book.title
```

It's a small change, but start with renaming the `./views/index.pug` view to
`./views/book-list.pug`. Changing the name of the view will make it easier to
identify the purpose of the view at a glance.

After renaming the view, update the call to the `res.render()` method in the
default route:

```js
router.get('/', async (req, res, next) => {
  try {
    const books = await db.Book.findAll({ order: [['title', 'ASC']] });
    res.render('book-list', { title: 'Books', books });
  } catch (err) {
    next(err);
  }
});
```

Notice that the `title` property—on the object passed as the second argument to
the `res.render()` method—was changed from "Home" to "Books".

### Applying Bootstrap styles to the Book List page

When you added Bootstrap to the project in the first article in this series, it
was mentioned that the look of the application wouldn't change much at that
point. Let's change that!

Update the `./views/book-list.pug` view with the following code:

```pug
//- ./views/book-list.pug

extends layout.pug

block content
  div(class='py-3')
    a(class='btn btn-success' href='/book/add' role='button') Add Book
  table(class='table table-striped table-hover')
    thead(class='thead-dark')
      tr
        th(scope='col') Title
        th(scope='col') Author
        th(scope='col') Release Date
        th(scope='col') Page Count
        th(scope='col') Publisher
        th(scope='col')
    tbody
      each book in books
        tr
          td= book.title
          td= book.author
          td= book.releaseDate
          td= book.pageCount
          td= book.publisher
          td
            a(class='btn btn-primary' href=`/book/edit/${book.id}` role='button') Edit
            a(class='btn btn-danger ml-2' href=`/book/delete/${book.id}` role='button') Delete
```

Here's an overview of the above Pug template code:

* A hyperlink (`<a>`) at the top of the page (`a(class='btn btn-success'
  href='/book/add' role='button') Add Book`) gives users a way to navigate to
  the "Add Book" page. The hyperlink is styled to look like a button using the
  [Bootstrap button CSS classes][bootstrap buttons] (`btn btn-success`).
* An HTML table is used to render the list of books. The [Bootstrap table CSS
  classes][bootstrap tables] (`table table-striped table-hover`) are used to
  style the table.
* Each row in the books HTML table contains two hyperlinks—one to navigate to
  the "Edit Book" page and another to navigate to the "Delete Book" page. Again,
  both hyperlinks are styled to look like buttons using the [Bootstrap button
  CSS classes][bootstrap buttons].

> For more information about the Bootstrap front-end component library, see [the
> official documentation][bootstrap docs].

### Adding an asynchronous route handler wrapper function

In an earlier article, you learned that Express is unable to catch errors thrown
by asynchronous route handlers. Given that, asynchronous route handlers need to
catch their own errors and pass them to the `next()` method. That's exactly what
the default route handler is currently doing:

```js
router.get('/', async (req, res, next) => {
  try {
    const books = await db.Book.findAll({ order: [['title', 'ASC']] });
    res.render('book-list', { title: 'Books', books });
  } catch (err) {
    next(err);
  }
});
```

While you could continue to add `try`/`catch` statements to each of your route
handlers, defining a simple asynchronous route handler wrapper function will
keep you from having to write that boilerplate code:

```js
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get('/', asyncHandler(async (req, res) => {
  const books = await db.Book.findAll({ order: [['title', 'ASC']] });
  res.render('book-list', { title: 'Books', books });
}));
```

For your reference, here's what the `./routes.js` file should look like at this
point in the project:

```js
// ./routes.js

const express = require('express');

const db = require('./db/models');

const router = express.Router();

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get('/', asyncHandler(async (req, res) => {
 const books = await db.Book.findAll({ order: [['title', 'ASC']] });
 res.render('book-list', { title: 'Books', books });
}));

module.exports = router;
```

### Testing the Book List page

Open a terminal and browse to your project folder. Run the command `npm start`
to start your application and browse to `http://localhost:8080/`. You should see
the list of books from the database rendered to the page—but instead of using an
unordered list to format the list of books you should see a nicely Bootstrap
formatted HTML table!

## Adding the Add Book page

The next page that you'll add to the Reading List application is the "Add Book"
page. As the name clearly suggests, this page will allow you to add a new book
to the reading list.

### Adding protection from CSRF attacks

Before adding the route and view for the "Add Book" page, go ahead and prepare
to add protection from CSRF attacks by installing and configuring the necessary
dependencies and middleware.

To review, Cross-Site Request Forgery (CSRF) is an attack that results in an end
user executing unwanted actions within a web application. Imagine that the
Reading List website requires users to login before they can view and make
changes to their reading list (in a future article you'll learn how to implement
user login within an Express application!) If a user was currently logged into
the Reading List website, a CSRF attack would trick the user into clicking a
link that unexpectedly sends a POST request to the Reading List website—a
request that might add or delete a book without the user's consent!

While this particular example is trivial in terms of its impact to the user,
imagine that the affected web application is a banking application. The end user
could end up unintentionally transferring money to the hacker's bank account!

> For a detailed walkthrough of a CSRF attack and how to protect against CSRF
> attacks, see the "Protecting Forms from CSRF" article in the Express HTML
> Forms lesson.

From a terminal, install the following dependencies into your project:

```sh
npm install csurf@^1.0.0
npm install cookie-parser@^1.0.0
```

Within the `app` module (i.e. the `./app.js` file), use the `require()` function
to import the `cookie-parser` middleware and call the `app.use()` method to add
the middleware just after adding the `morgan` middleware to the request
pipeline. While you're updating the `app` module, go ahead and add the built-in
Express `urlencoded` middleware after adding the `cookie-parser` middleware
(you'll need the `urlencoded` middleware to parse the request body form data in
just a bit):

```js
// ./app.js

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const routes = require('./routes');

const app = express();

app.set('view engine', 'pug');
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

// Code removed for brevity.

module.exports = app;
```

### Defining the routes for the Add Book page

Now you're ready to define the routes for the "Add Book" page!

At the top of the `routes` module (i.e. the `./routes.js` file), add a call to
the `require()` function to import the `csurf` module:

```js
// ./routes.js

const express = require('express');
const csrf = require('csurf');

const db = require('./db/models');

// Code removed for brevity.
```

Then call the `csurf()` function to create the `csrfProtection` middleware that
you'll add to each of the routes that need CSRF protection:

```js
// ./routes.js

const express = require('express');
const csrf = require('csurf');

const db = require('./db/models');

const router = express.Router();

const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

// Code removed for brevity.
```

Now you're ready to add the routes for the "Add Book" page to the `routes`
module just after the existing default route (`/`)—a `GET` route to initially
retrieve the "Add Book" page's HTML form and a `POST` route to process the
page's HTML form submissions:

```js
router.get('/book/add', csrfProtection, (req, res) => {
  const book = db.Book.build();
  res.render('book-add', {
    title: 'Add Book',
    book,
    csrfToken: req.csrfToken(),
  });
});

router.post('/book/add', csrfProtection, asyncHandler(async (req, res) => {
  const {
    title,
    author,
    releaseDate,
    pageCount,
    publisher,
  } = req.body;

  const book = db.Book.build({
    title,
    author,
    releaseDate,
    pageCount,
    publisher,
  });

  try {
    await book.save();
    res.redirect('/');
  } catch (err) {
    res.render('book-add', {
      title: 'Add Book',
      book,
      error: err,
      csrfToken: req.csrfToken(),
    });
  }
}));
```

Here's an overview of the above routes:

* Two routes are defined for the "Add Book" page—a `/book/add` `GET` route and a
  `/book/add` `POST` route. As mentioned earlier, the `GET` route is used to
  initially retrieve the page's HTML form while the `POST` route is used to
  process submissions from the page's HTML form.
* Both routes use the `csrfProtection` middleware to protect against CSRF
  attacks.
* Within the `GET` route handler, the Sequelize `db.Book.build()` method is used
  to create a new instance of the `Book` model which is then passed to the
  `book-add` view.
* Within the `POST` route handler, destructuring is used to declare and
  initialize the `title`, `author`, `releaseDate`, `pageCount`, and `publisher`
  variables from the `req.body` property. The `title`, `author`, `releaseDate`,
  `pageCount`, and `publisher` variables are then used to create a new instance
  of the `Book` model with a call to the `db.Book.build()` method. The
  `book.save()` method is called on the instance to persist the model to the
  database and if that operation succeeds the user is redirected to the default
  route (`/`). If an error occurs, the `book-add` view is rendered and sent to
  the client (so the error can be displayed to the end user).

### Creating the view for the Add Book page

Add a view to the `views` folder named `book-add.pug` containing the following
code:

```pug
//- ./views/book-add.pug

extends layout.pug

block content
  if error
    div(class='alert alert-danger' role='alert')
      p The following error(s) occurred:
      pre= JSON.stringify(error, null, 2)
  form(action='/book/add' method='post')
    input(type='hidden' name='_csrf' value=csrfToken)
    div(class='form-group')
      label(for='title') Title
      input(type='text' id='title' name='title' value=book.title class='form-control')
    div(class='form-group')
      label(for='author') Author
      input(type='text' id='author' name='author' value=book.author class='form-control')
    div(class='form-group')
      label(for='releaseDate') Release Date
      input(type='text' id='releaseDate' name='releaseDate' value=book.releaseDate class='form-control')
    div(class='form-group')
      label(for='pageCount') Page Count
      input(type='text' id='pageCount' name='pageCount' value=book.pageCount class='form-control')
    div(class='form-group')
      label(for='publisher') Publisher
      input(type='text' id='publisher' name='publisher' value=book.publisher class='form-control')
    div(class='py-4')
      button(type='submit' class='btn btn-primary') Add Book
      a(href='/' class='btn btn-warning ml-2') Cancel
```

Here's an overview of the above Pug template code:

* A conditional statement checks to see if the `error` variable is truthy (i.e.
  has a reference to an error) and if there's an error, the `JSON.stringify()`
  method is used to render the error to the page as JSON. Later in this article,
  you'll refactor this part of the view to improve the display of errors to the
  end user.
* A hidden `<input>` element is used to render the CSRF token value to the page
  (i.e. `input(type='hidden' name='_csrf' value=csrfToken)`).
* A series of `<label>` and text `<input>` elements are rendered to create the
  form fields for the `Book` model `title`, `author`, `releaseDate`,
  `pageCount`, and `publisher` properties. The [Bootstrap form CSS
  classes][bootstrap forms] (`form-group`, `form-control`) are used to style the
  form.
* At the bottom of the form, a submit `<button>` element is rendered along with
  a "Cancel" hyperlink that allows the end user to navigate back to the "Book
  List" page.

> **Note:** HTML `<input>` element types aren't used to their fullest extent in
> the above code. Feel free to experiment with using [the available `<input>`
> element types][mdn input element types] to add client-side validation but
> remember that client-side validation is intended only to improve the end user
> experience. Because client-side validation can easily be thwarted, validating
> data on the server is absolutely essential to do. You'll implement server-side
> validation in just a bit.

### Testing the Add Book page

Run the command `npm start` to start your application and browse to
`http://localhost:8080/`. Click the "Add Book" button at the top of the "Book
List" page to browse to the "Add Book" page. Provide a value for each of the
form fields and click the "Add Book" button to submit the form to the server. Be
sure that you provide a valid date value (i.e. "2000-01-31"). You should now see
your new book in the list of books on the "Book List" page!

If you click the "Add Book" button again and submit the "Add Book" page form
without providing any values, an error occurs when attempting to persist an
instance of the `Book` model to the database. The lengthy error message
displayed just above the form will look like this:

```json
{
  "name": "SequelizeDatabaseError",
  "parent": {
    "name": "error",
    "length": 116,
    "severity": "ERROR",
    "code": "22007",
    "file": "datetime.c",
    "line": "3774",
    "routine": "DateTimeParseError",
    "sql": "INSERT INTO \"Books\" (\"id\",\"title\",\"author\",\"releaseDate\",\"pageCount\",\"publisher\",\"createdAt\",\"updatedAt\") VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7) RETURNING *;",
    "parameters": [
      "",
      "",
      "Invalid date",
      "",
      "",
      "2020-04-02 15:20:33.668 +00:00",
      "2020-04-02 15:20:33.668 +00:00"
    ]
  },
  "original": {
    "name": "error",
    "length": 116,
    "severity": "ERROR",
    "code": "22007",
    "file": "datetime.c",
    "line": "3774",
    "routine": "DateTimeParseError",
    "sql": "INSERT INTO \"Books\" (\"id\",\"title\",\"author\",\"releaseDate\",\"pageCount\",\"publisher\",\"createdAt\",\"updatedAt\") VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7) RETURNING *;",
    "parameters": [
      "",
      "",
      "Invalid date",
      "",
      "",
      "2020-04-02 15:20:33.668 +00:00",
      "2020-04-02 15:20:33.668 +00:00"
    ]
  },
  "sql": "INSERT INTO \"Books\" (\"id\",\"title\",\"author\",\"releaseDate\",\"pageCount\",\"publisher\",\"createdAt\",\"updatedAt\") VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7) RETURNING *;",
  "parameters": [
    "",
    "",
    "Invalid date",
    "",
    "",
    "2020-04-02 15:20:33.668 +00:00",
    "2020-04-02 15:20:33.668 +00:00"
  ]
}
```

From the error message, you can see that a `SequelizeDatabaseError` occurred
when attempting to insert into the `Books` table. The underlying error is a
date/time parse error, which is occurring because you didn't supply a value for
the `releaseDate` property on the `Book` model.

It's not just empty strings that result in date/time parse errors. Improperly
formatted date/time `string` values—or simply bad `string` values—can also
produce date/time parse errors. For example, all of the following `string`
date/time values cannot be parsed to date/time values:

* Jan 31st 2002
* 100/31/2002
* Jaanuary 31, 2002

You can use the `input` element's `placeholder` attribute to communicate to
users an example of the expected input format. Refactor your `input#releaseDate`
element to include a placeholder:

```pug
input(type='text' 
      id='releaseDate' 
      name='releaseDate' 
      value=book.releaseDate 
      class='form-control' 
      placeholder='ex: 2000-01-31')
```

Time to implement server-side validations! You'll see how to implement
validations using two different approaches—within the `Book` database model
using Sequelize's built-in model validation and within the "Add Book" page
`POST` route using the `express-validator` validation library.

## Implementing server-side validation using Sequelize

Before updating the `Book` model (the `./db/models/book.js` file), make a copy
of the existing code by copying the entire file with a file extension of `.bak`
(i.e. `book.js.bak`) or simply copying and pasting the code within the existing
file and commenting it out. When implementing validation at the route level
using a validation library, you'll want a convenient way to remove or disable
the validations in the `Book` model.

### Adding validations to the `Book` model

Now you're ready to update the `Book` model to the following code:

```js
// ./db/models/book.js

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for Title',
        },
        notEmpty: {
          msg: 'Please provide a value for Title',
        },
        len: {
          args: [0, 255],
          msg: 'Title must not be more than 255 characters long',
        }
      }
    },
    author: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for Author',
        },
        notEmpty: {
          msg: 'Please provide a value for Author',
        },
        len: {
          args: [0, 100],
          msg: 'Author must not be more than 100 characters long',
        }
      }
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for Release Date',
        },
        isDate: {
          msg: 'Please provide a valid date for Release Date',
        }
      }
    },
    pageCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for Page Count',
        },
        isInt: {
          msg: 'Please provide a valid integer for Page Count',
        }
      }
    },
    publisher: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for Publisher',
        },
        notEmpty: {
          msg: 'Please provide a value for Publisher',
        },
        len: {
          args: [0, 100],
          msg: 'Publisher must not be more than 100 characters long',
        }
      }
    }
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};
```

Here's an overview of the above code:

* Sequelize validation rules or validators are applied to model
  properties—referred to by Sequelize as "attributes"—using the `validate`
  property. The `validate` property is set to an object whose properties
  represent each validation rule to apply to the model attribute.
* For the `string` based model attributes (i.e. text based database table
  columns) that don't allow `null` values—the `title`, `author`, `publisher`
  properties—the `notNull` and `notEmpty` validators are applied to disallow
  `null` values **and** empty string values.
* Notice the nuance between the `allowNull` model attribute property and the
  `notNull` validation rule. The `allowNull` model attribute property is set to
  `false` to configure the underlying database table column to disallow `null`
  values and the `notNull` validation rule is applied to validate that a model
  instance attribute value is not `null`.
* The `len` validation is also applied to the `string` based model attributes to
  give feedback to the end user when a model instance attribute value exceeds
  the configured maximum length for the underlying database table column.
* The `isDate` and `isInt` validators are applied respectively to the
  `releaseDate` and `pageCount` model attributes to validate that the model
  instance attribute values can be successfully parsed to the underlying
  database table column data types.

> Sequelize provides a variety of validators that you can apply to model
> attributes. For a list of the available validators, see [the official
> Sequelize documentation][sequelize validators].

> For more information about Sequelize model validations see the "Model
> Validations With Sequelize" article in the SQL ORM lesson.

### Updating the Add Book page `POST` route

With the model validations in place, now you need to update the "Add Book" page
`POST` route in the `routes` module (the `./routes.js` file) to process
Sequelize validation errors.

To start, add the `next` parameter to the route handler function's parameter
list:

```js
router.post('/book/add', csrfProtection, asyncHandler(async (req, res, next) => {
  // Code removed for brevity.
}));
```

Then update the `try`/`catch` statement to this:

```js
try {
  await book.save();
  res.redirect('/');
} catch (err) {
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map((error) => error.message);
    res.render('book-add', {
      title: 'Add Book',
      book,
      errors,
      csrfToken: req.csrfToken(),
    });
  } else {
    next(err);
  }
}
```

Within the `catch` block, the `err.name` property is checked to see if the error
is a `SequelizeValidationError` error type which is the error type that
Sequelize throws if a validation error has occurred.

If it's a validation error, the `Array#map()` method is called on the
`err.errors` array to create an array of error messages. Currently, `err` is an
object with an `errors` property. 

The `err.errors` property is an array of _error objects_ that provide detailed
information about each validation error. Each element in `err.errors` has a
`message` property. The `Array#map()` method plucks the `message` property from
each _error object_ to create an array of validation messages. This array of
validation messages will be rendered on the form, instead of the array of
_error objects_.

If the error isn't a `SequelizeValidationError` error, then the error is passed
as an argument to the `next()` method call which results in Express handing the
request off to the application's defined error handlers for processing.

For your reference, the updated "Add Book" page `POST` route should now look
like this:

```js
router.post('/book/add', csrfProtection, asyncHandler(async (req, res, next) => {
  const {
    title,
    author,
    releaseDate,
    pageCount,
    publisher,
  } = req.body;

  const book = db.Book.build({
    title,
    author,
    releaseDate,
    pageCount,
    publisher,
  });

  try {
    await book.save();
    res.redirect('/');
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      const errors = err.errors.map((error) => error.message);
      res.render('book-add', {
        title: 'Add Book',
        book,
        errors,
        csrfToken: req.csrfToken(),
      });
    } else {
      next(err);
    }
  }
}));
```

### Updating the Add Book page view

The final part of implementing validations is to update the "Add Book" page view
(the `./views/book-add.pug` file) to render the array of validation messages.
Replace the existing `if error` conditional statement with the following code:

```pug
//- ./views/book-add.pug

extends layout.pug

block content
  if errors
    div(class='alert alert-danger' role='alert')
      p The following error(s) occurred:
      ul
        each error in errors
          li= error

//- Code removed for brevity.
```

The Bootstrap `alert alert-danger` CSS classes are used to style the unordered
list of validation messages.

For your reference, the updated "Add Book" page view should now look like this:

```pug
//- ./views/book-add.pug

extends layout.pug

block content
  if errors
    div(class='alert alert-danger' role='alert')
      p The following error(s) occurred:
      ul
        each error in errors
          li= error
  form(action='/book/add' method='post')
    input(type='hidden' name='_csrf' value=csrfToken)
    div(class='form-group')
      label(for='title') Title
      input(type='text' id='title' name='title' value=book.title class='form-control')
    div(class='form-group')
      label(for='author') Author
      input(type='text' id='author' name='author' value=book.author class='form-control')
    div(class='form-group')
      label(for='releaseDate') Release Date
      input(type='text' id='releaseDate' name='releaseDate' value=book.releaseDate class='form-control' placeholder='ex: 2000-01-31')
    div(class='form-group')
      label(for='pageCount') Page Count
      input(type='text' id='pageCount' name='pageCount' value=book.pageCount class='form-control')
    div(class='form-group')
      label(for='publisher') Publisher
      input(type='text' id='publisher' name='publisher' value=book.publisher class='form-control')
    div(class='py-4')
      button(type='submit' class='btn btn-primary') Add Book
      a(href='/' class='btn btn-warning ml-2') Cancel
```

### Testing the server-side validations

Run the command `npm start` to start your application and browse to
`http://localhost:8080/`. Click the "Add Book" button at the top of the "Book
List" page to browse to the "Add Book" page. Click the "Add Book" button to
submit the "Add Book" page form without providing any values. You should now see
a list of validation messages displayed just above the form.

Provide a value for each of the form fields and click the "Add Book" button to
submit the form to the server. You should now see your new book in the list of
books on the "Book List" page!

## Implementing server-side validation using a validation library

Keeping your application's validation logic out of your database models makes
your code more modular. Improved modularity allows you to more easily update one
part of your application without worrying as much about how that change will
impact another part of your application.

In this section, you'll replace the Sequelize model validations with route level
validations using the `express-validator` validation library.

### Removing the Sequelize model validations

Before you updated the `Book` model (the `./db/models/book.js` file), you made a
copy of the existing code by either copying the entire file with a file
extension of `.bak` (i.e. `book.js.bak`) or copying and pasting the code within
the existing file and commenting it out. It's time to use your backup copy of
the `Book` model to remove the Sequelize validations.

For your reference, here's what the `Book` model (the `./db/models/book.js`
file) should look like before proceeding:

```js
// ./db/models/book.js

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    pageCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    publisher: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};
```

### Updating the Add Book page `POST` route

From the terminal, use npm to install the `express-validator` package:

```sh
npm install express-validator@^6.0.0
```

In the `routes` module (i.e. the `./routes.js` file), use the `require()`
function to import the `express-validator` module (just after importing the
`csurf` module) and destructuring to declare and initialize the `check` and
`validationResult` variables:

```js
// ./routes.js

const express = require('express');
const csrf = require('csurf');
const { check, validationResult } = require('express-validator');

const db = require('./db/models');

// Code remove for brevity.
```

The `check` variable references a function (defined by the `express-validator`
validation library) that returns a middleware function for validating a request.
When you call the `check()` method, you pass in the name of the field—in this
case a request body form field name—that you want to validate:

```js
const titleValidator = check('title');
```

The value returned by the `check()` method is a validation chain object. The
object is referred to as a validation "chain" because you can add one or more
validators by making a series of method calls.

One of the validators that you can add to the validation chain is the `exists()`
validator:

```js
const titleValidator = check('title')
  .exists({ checkFalsy: true });
```

The `exists()` validator will fail if the request body is missing a form field
with the name (or key) `title` or because we set the `checkFalsy` option to
`true` the validator will fail if the request body contains a form field with
the name `title` but the value is set to a falsy value (eg `""`, `0`, `false`,
`null`).

When a validator fails, it'll add a validation error to the current request. You
can chain a call to the `withMessage()` method to customize the validation error
message for the previous validator in the chain:

```js
const titleValidator = check('title')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a value for Title');
```

Now if the `exists()` validator for the field `title` fails, a validation error
will be added to the request with the message "Please provide a value for
Title".

The `express-validator` validation library is built on top of the validator.js
library. This means that all of the [available validators within the
validator.js library][validatorjs validators] are available for you to use in
your validation logic.

One of the available validators is the `isLength()` validator, which can be used
to check the length of a string based field:

```js
const titleValidator = check('title')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a value for Title')
  .isLength({ max: 255 })
  .withMessage('Title must not be more than 255 characters long');
```

Notice how the `isLength()` method is called directly on the return value of the
`withMessage()` method? This is the validation chain in action—each method call
in the validation chain returns the validation chain so you can keep adding
validators. This is also known as "method chaining".

> APIs that make use of method chaining are often referred to as [fluent
> APIs][wikipedia fluent api].

Instead of declaring a variable for each field that you want to define a
validation chain for, you can declare a single variable that's initialized to an
array of validation chains:

```js
const bookValidators = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Title')
    .isLength({ max: 255 })
    .withMessage('Title must not be more than 255 characters long'),
  check('author')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Author')
    .isLength({ max: 100 })
    .withMessage('Author must not be more than 100 characters long'),
  check('releaseDate')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Release Date')
    .isISO8601()
    .withMessage('Please provide a valid date for Release Date'),
  check('pageCount')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Page Count')
    .isInt({ min: 0 })
    .withMessage('Please provide a valid integer for Page Count'),
  check('publisher')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Publisher')
    .isLength({ max: 100 })
    .withMessage('Publisher must not be more than 100 characters long'),
];
```

Each validation chain is an Express middleware function. After initializing an
array containing all of your field validation chains, you can simply add the
array directly to your route definition:

```js
router.post('/book/add', csrfProtection, bookValidators,
  asyncHandler(async (req, res) => {
    // Code removed for brevity.
  }));
```

Because each field validation chain is a middleware function and the Express
Application `post()` method accepts an array of middleware functions, each
validation chain will be called when the request matches the route path.

Within the route handler function, `validationResult()` function is used to
extract any validation errors from the current request:

```js
router.post('/book/add', csrfProtection, bookValidators,
  asyncHandler(async (req, res) => {
    const {
      title,
      author,
      releaseDate,
      pageCount,
      publisher,
    } = req.body;

    const book = db.Book.build({
      title,
      author,
      releaseDate,
      pageCount,
      publisher,
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await book.save();
      res.redirect('/');
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('book-add', {
        title: 'Add Book',
        book,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  }));
```

The `validatorErrors` object provides an `isEmpty()` method to check if there
are any validation errors. If there aren't any validation errors, then the
`book.save()` method is called to persist the book to the database and the user
is redirected to the default route (i.e. the "Book List" page).

If there are validation errors, the `array()` method is called on the
`validatorErrors` object to get an array of validation error objects. Each error
object has a `msg` property containing the validation error message. The
`Array#map()` method plucks the `msg` property from each error object into a
new array of validation messages named `errors`.

> For more information about the `express-validator` library, see [the official
> documentation][express validator docs].

For your reference, here's what the `./routes.js` file should look like after
being updated:

```js
// ./routes.js

const express = require('express');
const csrf = require('csurf');
const { check, validationResult } = require('express-validator');

const db = require('./db/models');

const router = express.Router();

const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get('/', asyncHandler(async (req, res) => {
  const books = await db.Book.findAll({ order: [['title', 'ASC']] });
  res.render('book-list', { title: 'Books', books });
}));

router.get('/book/add', csrfProtection, (req, res) => {
  const book = db.Book.build();
  res.render('book-add', {
    title: 'Add Book',
    book,
    csrfToken: req.csrfToken(),
  });
});

const bookValidators = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Title')
    .isLength({ max: 255 })
    .withMessage('Title must not be more than 255 characters long'),
  check('author')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Author')
    .isLength({ max: 100 })
    .withMessage('Author must not be more than 100 characters long'),
  check('releaseDate')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Release Date')
    .isISO8601()
    .withMessage('Please provide a valid date for Release Date'),
  check('pageCount')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Page Count')
    .isInt({ min: 0 })
    .withMessage('Please provide a valid integer for Page Count'),
  check('publisher')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Publisher')
    .isLength({ max: 100 })
    .withMessage('Publisher must not be more than 100 characters long'),
];

router.post('/book/add', csrfProtection, bookValidators,
  asyncHandler(async (req, res) => {
    const {
      title,
      author,
      releaseDate,
      pageCount,
      publisher,
    } = req.body;

    const book = db.Book.build({
      title,
      author,
      releaseDate,
      pageCount,
      publisher,
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await book.save();
      res.redirect('/');
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('book-add', {
        title: 'Add Book',
        book,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  }));

module.exports = router;
```

### Testing the updated server-side validations

Run the command `npm start` to start your application and browse to
`http://localhost:8080/`. Click the "Add Book" button at the top of the "Book
List" page to browse to the "Add Book" page. Click the "Add Book" button to
submit the "Add Book" page form without providing any values. You should now see
a list of validation messages displayed just above the form.

Provide a value for each of the form fields and click the "Add Book" button to
submit the form to the server. You should now see your new book in the list of
books on the "Book List" page!

## Adding the Edit Book page

The next page that you'll add to the Reading List application is the "Edit Book"
page. As the name clearly suggests, this page will allow you to edit the details
of a book from the reading list.

### Defining the routes for the Edit Book page

Add the routes for the "Edit Book" page to the `routes` module (i.e. the
`./routes.js file) just after the routes for the "Add Book" page—a `GET` route
to initially retrieve the "Edit Book" page's HTML form and a `POST` route to
process the page's HTML form submissions:

```js
router.get('/book/edit/:id(\\d+)', csrfProtection,
  asyncHandler(async (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const book = await db.Book.findByPk(bookId);
    res.render('book-edit', {
      title: 'Edit Book',
      book,
      csrfToken: req.csrfToken(),
    });
  }));

router.post('/book/edit/:id(\\d+)', csrfProtection, bookValidators,
  asyncHandler(async (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const bookToUpdate = await db.Book.findByPk(bookId);

    const {
      title,
      author,
      releaseDate,
      pageCount,
      publisher,
    } = req.body;

    const book = {
      title,
      author,
      releaseDate,
      pageCount,
      publisher,
    };

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await bookToUpdate.update(book);
      res.redirect('/');
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('book-edit', {
        title: 'Edit Book',
        book: { ...book, id: bookId },
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  }));
```

Here's an overview of the above routes:

* Just like you did for the "Add Book" page, two routes are defined for the
  "Edit Book" page—a `GET` route and a `POST` route, both with a path of
  `/book/edit/:id(\\d+)`. The `:id(\\d+)` path segment defines the `id`
  property in your `req.params`, the route parameter to capture the book ID to
  edit. The `\\d+` segment uses [regexp] to ensure that only numbers
  (or **d**igits) will match this segment.
* Within both route handlers, the `parseInt()` function is used to convert the
  `req.params.id` property from a string into an integer.
* Within both route handlers, the Sequelize `db.Book.findByPk()` method uses the
  book ID to retrieve which book to edit from the database.
* Just like in the `/book/add` route, destructuring is used to declare and
  initialize the `title`, `author`, `releaseDate`, `pageCount`, and `publisher`
  variables from the `req.body` property. Those variables are then used to
  create a `book` object literal whose properties align with the `Book` model
  properties. If there aren't any validation errors, the object literal is
  passed into the `book.update()` method to update the book in the database and
  the user is redirected to the default route `/`. If there are validation
  errors, the `book-edit` view is re-rendered with the validation errors.

When passing the `book` object into the `book-edit` view, you can use spread
syntax to copy the `book` object literal properties into a new object. To the
right of spreading the `book` object, an `id` property is declared and assigned
to the `bookId` variable value:

```javascript
book: {
  ...book,
  id: bookId
}
```

The spread syntax above actually creates this `book` object:

```javascript
book: {
  title,
  author,
  releaseDate,
  pageCount,
  publisher,
  id: bookId
}
```

### Creating the view for the Edit Book page

Add a view to the `views` folder named `book-edit.pug` containing the following
code:

```pug
//- ./views/book-edit.pug

extends layout.pug

block content
  if errors
    div(class='alert alert-danger' role='alert')
      p The following error(s) occurred:
      ul
        each error in errors
          li= error
  form(action=`/book/edit/${book.id}` method='post')
    input(type='hidden' name='_csrf' value=csrfToken)
    div(class='form-group')
      label(for='title') Title
      input(type='text' id='title' name='title' value=book.title class='form-control')
    div(class='form-group')
      label(for='author') Author
      input(type='text' id='author' name='author' value=book.author class='form-control')
    div(class='form-group')
      label(for='releaseDate') Release Date
      input(type='text' id='releaseDate' name='releaseDate' value=book.releaseDate class='form-control' placeholder='ex: 2000-01-31')
    div(class='form-group')
      label(for='pageCount') Page Count
      input(type='text' id='pageCount' name='pageCount' value=book.pageCount class='form-control')
    div(class='form-group')
      label(for='publisher') Publisher
      input(type='text' id='publisher' name='publisher' value=book.publisher class='form-control')
    div(class='py-4')
      button(type='submit' class='btn btn-primary') Update Book
      a(href='/' class='btn btn-warning ml-2') Cancel
```

This view is almost the same as the view for the "Add Book" page. On the form
element's `action` attribute and the submit button content are different.

> In just a bit, you'll see how you can leverage features built into Pug to
> avoid unnecessary code duplication.

### Testing the Edit Book page

Run the command `npm start` to start your application and browse to
`http://localhost:8080/`. Click the "Edit" button for one of the books listed in
the table on the "Book List" page to edit that book. Change one or more form
field values and click the "Update Book" button to submit the form to the
server. You should now see the update book in the list of books on the "Book
List" page!

### Including view templates for DRYer code

Currently, the "Add Book" and "Edit Book" views contain very similar code. Pug
allows you to `include` the contents of a template within another template. You
can use this feature to eliminate the code duplication between the
`./views/book-add.pug` and `./views/book-edit.pug` files.

Start by adding a new file named `book-form-fields.pug` to the `views` folder
containing the following code:

```pug
//- ./views/book-form-fields.pug

input(type='hidden' name='_csrf' value=csrfToken)
div(class='form-group')
  label(for='title') Title
  input(type='text' id='title' name='title' value=book.title class='form-control')
div(class='form-group')
  label(for='author') Author
  input(type='text' id='author' name='author' value=book.author class='form-control')
div(class='form-group')
  label(for='releaseDate') Release Date
  input(type='text' id='releaseDate' name='releaseDate' value=book.releaseDate class='form-control' placeholder='ex: 2000-01-31')
div(class='form-group')
  label(for='pageCount') Page Count
  input(type='text' id='pageCount' name='pageCount' value=book.pageCount class='form-control')
div(class='form-group')
  label(for='publisher') Publisher
  input(type='text' id='publisher' name='publisher' value=book.publisher class='form-control')
```

Then update the `book-add.pug` and `book-edit.pug` views to the following code:

```pug
// ./views/book-add.pug

extends layout.pug

block content
  if errors
    div(class='alert alert-danger' role='alert')
      p The following error(s) occurred:
      ul
        each error in errors
          li= error
  form(action='/book/add' method='post')
    include book-form-fields.pug
    div(class='py-4')
      button(type='submit' class='btn btn-primary') Add Book
      a(href='/' class='btn btn-warning ml-2') Cancel
```

```pug
//- ./views/book-edit.pug

extends layout.pug

block content
  if errors
    div(class='alert alert-danger' role='alert')
      p The following error(s) occurred:
      ul
        each error in errors
          li= error
  form(action=`/book/edit/${book.id}` method='post')
    include book-form-fields.pug
    div(class='py-4')
      button(type='submit' class='btn btn-primary') Update Book
      a(href='/' class='btn btn-warning ml-2') Cancel
```

Notice the use of the `include` keyword to include the contents of the
`book-form-fields.pug` template.

Another Pug feature—mixins—allows you to create reusable blocks of Pug code. You
can use this Pug feature to further eliminate code duplication.

Add a new file named `utils.pug` to the `views` folder containing the following
code:

```pug
//- ./views/utils.pug

mixin validationErrorSummary(errors)
  if errors
    div(class='alert alert-danger' role='alert')
      p The following error(s) occurred:
      ul
        each error in errors
          li= error
```

Notice that the `validationErrorSummary` mixin defines an `errors` parameter. As
you might expect, mixin parameters allow you to pass data into the mixin.

Next, update the `book-add.pug` and `book-edit.pug` views to the following code:

```pug
// ./views/book-add.pug

extends layout.pug

include utils.pug

block content
  +validationErrorSummary(errors)
  form(action='/book/add' method='post')
    include book-form-fields.pug
    div(class='py-4')
      button(type='submit' class='btn btn-primary') Add Book
      a(href='/' class='btn btn-warning ml-2') Cancel
```

```pug
//- ./views/book-edit.pug

extends layout.pug

include utils.pug

block content
  +validationErrorSummary(errors)
  form(action=`/book/edit/${book.id}` method='post')
    include book-form-fields.pug
    div(class='py-4')
      button(type='submit' class='btn btn-primary') Update Book
      a(href='/' class='btn btn-warning ml-2') Cancel
```

Notice the use of the `include` keyword again to include the contents of the
`utils.pug` template which makes the `validationErrorSummary` mixin available
within the `book-add.pug` and `book-edit.pug` templates. The mixin is called
by prefixing the mixin name with a plus sign (`+`) and adding a set of
parentheses after the mixin name. Inside of the parentheses, the `errors`
variable is passed as an argument to the `validationErrorSummary` mixin.

You can go a bit further to eliminate more code duplication. Update the
`./views/utils.pug` template to contain the following code:

```pug
//- ./views/utils.pug

mixin validationErrorSummary(errors)
  if errors
    div(class='alert alert-danger' role='alert')
      p The following error(s) occurred:
      ul
        each error in errors
          li= error

mixin textField(labelText, fieldName, fieldValue, placeholder)
  div(class='form-group')
    label(for=fieldName)= labelText
    input(type='text' id=fieldName name=fieldName value=fieldValue class='form-control' placeholder=placeholder)
```

Then update the `./views/book-form-fields.pug` template to contain this code:

```pug
//- ./views/book-form-fields.pug

include utils.pug

input(type='hidden' name='_csrf' value=csrfToken)
+textField('Title', 'title', book.title)
+textField('Author', 'author', book.author)
+textField('Release Date', 'releaseDate', book.releaseDate, 'ex: 2000-01-31')
+textField('Page Count', 'pageCount', book.pageCount)
+textField('Publisher', 'publisher', book.publisher)
```

Run the command `npm start` to start your application and browse to
`http://localhost:8080/`. Use the "Add Book" page to add a new book and then use
the "Edit Book" page to edit the book. Everything should work as it did before
the refactoring of the view code.

Congratulations on making your code DRYer!

## Add the Delete Book page

The next page that you'll add to the Reading List application is the "Delete
Book" page. This page is relatively simple as it only needs to prompt the user
if the selected book is the book that they want to delete.

### Defining the routes for the Delete Book page

Add the routes for the "Delete Book" page to the `routes` module (i.e. the
`./routes.js file) just after the routes for the "Edit Book" page—a `GET` route
to initially retrieve the "Delete Book" page's HTML form and a `POST` route to
process the page's HTML form submissions:

```js
router.get('/book/delete/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const book = await db.Book.findByPk(bookId);
  res.render('book-delete', {
    title: 'Delete Book',
    book,
    csrfToken: req.csrfToken(),
  });
}));

router.post('/book/delete/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const book = await db.Book.findByPk(bookId);
  await book.destroy();
  res.redirect('/');
}));
```

Here's an overview of the above routes:

* Just like you did for the "Add Book" and "Edit Book" pages, two routes are
  defined for the "Delete Book" page—a `/book/delete/:id(\\d+)` `GET` route and
  a `/book/delete/:id(\\d+)` `POST` route.
* Within both route handlers, the `parseInt()` function is used to convert the
  `req.params.id` property string value into a `number`.
* Within both route handlers, the Sequelize `db.Book.findByPk()` method is used
  to retrieve the book to delete from the database.
* Within the `POST` route handler, the `book.destroy()` method is called to
  delete the book from the database and the user is redirected to the default
  route (`/`).

### Creating the view for the Delete Book page

Add a view to the `views` folder named `book-delete.pug` containing the
following code:

```pug
//- ./views/book-delete.pug

extends layout.pug

block content
  h3= book.title
  div(class='py-4')
    p Proceed with deleting this book?
  div
    form(action=`/book/delete/${book.id}` method='post')
      input(type='hidden' name='_csrf' value=csrfToken)
      button(class='btn btn-danger' type='submit') Delete Book
      a(class='btn btn-warning ml-2' href='/' role='button') Cancel
```

The purpose of this view is simple: display the title of the book that's about
to be deleted and render a simple form containing a hidden `<input>` element for
the CSRF token and a `<button>` element to submit the form.

### Testing the Delete Book page

Run the command `npm start` to start your application and browse to
`http://localhost:8080/`. Click the "Delete" button for one of the books listed
in the table on the "Book List" page to delete that book. On the "Delete Book"
page, click the "Delete Book" button to delete the book. You should now see that
the book has been removed from the list of books on the "Book List" page!

## What you learned

In this article, you learned how to:

* Define a collection of routes and views that use Sequelize to perform CRUD
  operations against a single resource; and
* Handle Sequelize validation errors when users are attempting to create or
  update data and display error messages to the user so that they can resolve
  any data quality issues.

You also reviewed the following:

* Using a wrapper function to catch errors thrown within asynchronous route
  handler functions;
* Using Pug to create HTML forms;
* Using the `csurf` middleware to protect against CSRF exploits;
* Using the built-in `express.urlencoded()` middleware function to parse
  incoming request body form data;
* Using Sequelize model validations to validate user-provided data;
* Using the `express-validator` validation library to validate user-provided
  data within an Express route; and
* Using Pug includes and mixins to remove unnecessary code duplication.

[bootstrap buttons]: https://getbootstrap.com/docs/4.4/components/buttons/
[bootstrap tables]: https://getbootstrap.com/docs/4.4/content/tables/
[bootstrap docs]: https://getbootstrap.com/docs/4.4/
[bootstrap forms]: https://getbootstrap.com/docs/4.4/components/forms/
[mdn input element types]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#%3Cinput%3E_types
[sequelize validators]: https://sequelize.org/v5/manual/models-definition.html#validations
[express validator docs]: https://express-validator.github.io/docs/
[validatorjs validators]: https://github.com/validatorjs/validator.js#validators
[wikipedia fluent api]: https://en.wikipedia.org/wiki/Fluent_interface
[regexp]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[mdn spread syntax]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
