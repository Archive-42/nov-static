# Exploring Route Paths
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Getting data from a path](#getting-data-from-a-path)
  - [Leveraging route parameters](#leveraging-route-parameters)
  - [Restricting route parameter matches](#restricting-route-parameter-matches)
- [Defining flexible route paths](#defining-flexible-route-paths)
  - [Using a string pattern](#using-a-string-pattern)
  - [Using a regular expression](#using-a-regular-expression)
  - [Using an array of paths](#using-an-array-of-paths)
- [Redirecting "incorrect" requests](#redirecting-incorrect-requests)
- [What you learned](#what-you-learned)

<!-- /code_chunk_output -->
________________________________________________________________________________

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
