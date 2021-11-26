# Routing Roundup Project
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Getting started](#getting-started)
- [Phase 1: Defining the default route](#phase-1-defining-the-default-route)
- [Phase 2: Using a template to render HTML](#phase-2-using-a-template-to-render-html)
- [Phase 3: Defining another flexible route](#phase-3-defining-another-flexible-route)
- [Phase 4: Capturing a value from the URL path](#phase-4-capturing-a-value-from-the-url-path)
- [Phase 5: Defining a collection of route handlers](#phase-5-defining-a-collection-of-route-handlers)
- [What We've Learned](#what-weve-learned)

<!-- /code_chunk_output -->
________________________________________________________________________________

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
