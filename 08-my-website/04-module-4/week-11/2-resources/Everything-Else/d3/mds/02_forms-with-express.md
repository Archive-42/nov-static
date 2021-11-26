# HTML Forms in Express
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Forms example setup](#forms-example-setup)
- [Getting the "Add Guest" form](#getting-the-add-guest-form)
- [A quick aside: Pug layout templates](#a-quick-aside-pug-layout-templates)
- [Submitting the guest form](#submitting-the-guest-form)
  - [`x-www-form-urlencoded`](#x-www-form-urlencoded)
  - [Parsing the request body](#parsing-the-request-body)
- [What you've learned](#what-youve-learned)

<!-- /code_chunk_output -->
________________________________________________________________________________

In the previous reading, you learned about the fundamental components of an HTML
form and how the client and server interacts when a form is submitted.

In this reading, you'll learn how to:

- Create an HTML form using the Pug template engine.
- Define a pair of GET and POST routes to deliver an HTML form to the user and
  process requests from that form.
- Create and use a Pug layout template to eliminate code duplication across Pug
  views.
- Configure an Express application to use the built-in `urlencoded` middleware
  function to parse incoming request body form data (encoded as
  x-www-form-urlencoded).

## Forms example setup

Let's learn about forms with an example. In this example, your friends are
having a wedding, and they want you want to build a simple website that lets
them keep track of their guest list!

Here's how the website will work:

1. The website has two main pages: the home page where your friends can see the
   full list of guests, and a "guest form" page that has a form where they can
   add guests.
2. At the top of both pages, there should be two links that lets them easily
   navigate back and forth between the home page and the guest form page.
3. When they add a guest, they should be redirected back to the home page so
   they can see the newly added guest.

Follow along by creating a `forms-demo` directory, starting up a Node project,
installing the dependencies, and then creating the necessary files:

```sh
mkdir forms-demo
cd forms-demo
npm init --yes
npm install express@^4.0.0 pug@^2.0.0
npm install nodemon@^2.0.0 --save-dev
mkdir views
touch index.js views/index.pug
```

Since this example will be used and built upon in all of the remaining readings
in this lesson, it's highly recommended that you actively follow along in this
example. Executing the above commands should leave you with a `forms-demo`
directory that looks like:

```plaintext
forms-demo
│   node_modules/
|   views/
│   │   index.pug
│   index.js
│   package-lock.json
│   package.json
```

Let's also set up a `start` script. Update your `package.json` so that it looks
something like:

```json
{
  "name": "forms-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js"
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

Don't worry if the minor and patch versions of your dependencies don't end up
matching exactly.

In your `index.js` file, set up the your Express server. In the server file,
keep track of your guests with an array. When the server is first started, the
guests array should be empty. Keep in mind that this guests array will be reset
every time the server/application restarts. In a future lesson, you'll learn how
to persist this type of data to a database in your Express applications.

Go ahead and also set up a root route that renders the `index.pug` template
along with the `title` and `guests` array:

```js
const express = require("express");

// Create the Express app.
const app = express();

// Set the pug view engine.
app.set("view engine", "pug");

const guests = [];

// Define a route.
app.get("/", (req, res) => {
  res.render("index", { title: "Guest List", guests });
});

// Define a port and start listening for connections.
const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

Finally, populate the `index.pug` template with some Pug content. Set the
`title` in the `head` element, render an `h1` element to display the `title`,
and then also set up two links to allow users to easily navigate back and forth
between the `/` and `/guest` URL.

Underneath the navigation links, render a `table` element that will be used to
keep track of all of the invited guests. There will be three pieces of
information will be tracked for each guest:

- Full Name
- Email
- Guests (i.e. will they have a "plus one"? Can they bring their kids?)

After following the instructions above, your `index.pug` should look something
like this:

```pug
doctype html
html
  head
    title= title
  body
    h1= title
    div
      a(href="/") Home
    div
      a(href="/guest") Add Guest

    table
      thead
        tr
          th Full Name
          th Email
          th # Guests
      tbody
        each guest in guests
          tr
            td #{guest.fullname}
            td #{guest.email}
            td #{guest.numGuests}
```

Alright! At this point you should be able to start up your server by running
`npm start`. Navigate to `http://localhost:8081/` to see a page with an `h1`
element that says "Guest List", two navigation links, and an empty guests table.

## Getting the "Add Guest" form

Now that you have the home page set up, let's first set up the `/guest`
route and view.

As a reminder, this view should show a very basic form that allows users to add
a guest to the guest list.

First, create a `guest-form.pug` template for that view, and add a simple form
to it with a full name input field, an email input field, a number of guests
input field, and a submit input.

Then, add the `method` and `action` attributes to the form. Use "post" for the
`method` attribute. For `action`, go ahead and set it so that the form
submission is routed to "/guest":

Here's what your `guest-form.pug` file should look like:

```pug
h2 Add Guest
form(method="post" action="/guest")
  label(for="fullname") Full Name:
  input(type="fullname" id="fullname" name="fullname")
  label(for="email") Email:
  input(type="email" id="email" name="email")
  label(for="numGuests") Num Guests
  input(type="number" id="numGuests" name="numGuests")
  input(type="submit" value="Add Guest")
```

> **Note:** You'll want to be sure that the `name` of your inputs are consistent
> with the `guests` array object properties. The rationale for this will become
> clearer later in the reading when you start saving each guest into the
> `guests` array, but essentially, you want to keep your variable names
> consistent between the frontend and the backend.

Then, set up the route in the Express server so that the `guest-form.pug`
template gets rendered when the user navigates to `localhost:8081/guest`. For
this route, set the `title` to "Guest Form":

```js
app.get("/guest", (req, res) => {
  res.render("guest-form", { title: "Guest Form" });
});
// REST OF FILE NOT SHOWN
```

Here's what the `index.js` file should look like now:

```js
const express = require("express");

// Create the Express app.
const app = express();

// Set the pug view engine.
app.set("view engine", "pug");
app.use(express.urlencoded());

const guests = [];

// Define a route.
app.get("/", (req, res) => {
  res.render("index", { title: "Guest List", guests });
});

app.get("/guest", (req, res) => {
  res.render("guest-form", { title: "Guest Form" });
});

// Define a port and start listening for connections.
const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

When users navigate to `localhost:8081/guest`, the HTTP request will be routed
to the `app.get('/guest')` route, which responds by rendering the
`guest-form.pug` template. You should now see a form that allows users to input
a guest's email, full name, and number of allowed guests.

## A quick aside: Pug layout templates

One thing to note right now is that the `guest-form.pug` template is missing the
navigation links that allows users to easily move back and forth between the
home page and the guest form page.

To fix this, you have a couple of options. You could simply copy and paste the
top of `index.pug` to the top of `guest-form.pug`. However, this solution
quickly grows unwieldy once you need to add other templates that also need easy
navigation.

Fortunately, Pug provides a clean way of preventing duplication of code with its
template inheritance feature. Pug provides two keywords for template
inheritance: `block` and `extends`.

According to the [Pug documentation], a `block` is a chunk of Pug code that "a
child template can replace". To understand what this means, go ahead and start a
new template called `layout.pug`.

Then, move all of the content that you'd like all of your templates to share
into this `layout.pug` file. Finally, at the bottom, declare a new `block` by
writing "`block content`", and nest an `h1` element in that `block` that says
"This is the layout template." Here's what your new `layout.pug` template should
look like:

```pug
doctype html
html
  head
    title= title
  body
    h1= title
    div
      a(href="/") Home
    div
      a(href="/guest") Add Guest

    block content
      h1 This is the layout template
```

Next, update your `index.pug` to this:

```pug
extends layout.pug

block content
  table
    thead
      tr
        th Full Name
        th Email
        th # Guests
    tbody
      each guest in guests
        tr
          td #{guest.fullname}
          td #{guest.email}
          td #{guest.numGuests}

```

Finally, update your `guest-form.pug` file to this:

```pug
extends layout.pug

block content
  h2 Add Guest
  form(method="post" action="/guest")
    label(for="fullname") Full Name:
    input(type="fullname" id="fullname" name="fullname")
    label(for="email") Email:
    input(type="email" id="email" name="email")
    label(for="numGuests") Num Guests
    input(type="number" id="numGuests" name="numGuests")
    input(type="submit" value="Add Guest")

```

Then, navigate back and forth between `localhost:8081/` and
`localhost:8081/guest` and see what happens.

Let's explore how this works. The `extends` key word denotes that the
`index.pug` and `guest-form.pug` templates are now inheriting from the
`layout.pug` template. This means that when the `index.pug` and `guest-form.pug`
templates are rendered, they will render all of the content that exists in
`layout.pug`.

The `block` allows for any child template to redefine the content within that
block. In `layout.pug`, a `block` named "content" is defined with an `h1`
element underneath it. In `guest-form.pug`, the "content" `block` is now
redefined to render the guest `form` instead of that `h1` element.

This would work even if the original "content" `block` in `layout.pug` had no
content inside of it. For example, go ahead and remove that "This is the layout
template" `h1` from `layout.pug`, and notice how the `block` redefinition still
works. You don't need to add that `h1` back to the template. That was only there
to make `block` redefinitions a little bit clearer.

Using template inheritance, you can simply inherit from `layout.pug` in all of
your new Pug templates. This is especially useful if you want to render the same
navigation elements throughout your entire web application.

## Submitting the guest form

Let's get back to finishing up the guest form.

Right now, if the user submits the form, it makes a POST request to "/guest".
Set up the route that would handle this request:

```js
app.post("/guest", (req, res) => {
  // MORE CODE TO COME
});
```

### `x-www-form-urlencoded`

The previous reading briefly touched on how when forms are submitted with a
"post" method, the data is sent to the server in the body of the HTTP request.
It also mentioned how the data is encoded in a `x-www-form-urlencoded` format.
Simply put, `x-wwww-form-urlencoded` format means that the data is formatted in
a consistent way so that the server understands exactly what is being submitted.

This will make more sense with an example. When input data is sent in the body
of the HTTP request, they're sent in a key-value string format, like this:
`fullname=[FULLNAME_VALUE]&email=[EMAIL_VALUE]&numGuests=[NUM_GUESTS_VALUE]`.

Let's suppose you know a married couple called Jack Hill and Jill Hill. You plan
on inviting them, but you really don't want to have to enter them twice. Plus,
they're one of those couples that share email addresses, so it would be super
convenient to enter them as one entry. So for the fullname field, you enter
"Jack&Jill Hill". In the email field, you enter their email,
"jack.jill@hill.com", and then put down "2" for number of guests.

The problem here is that some characters in the key-value string format have
special meaning. For example, notice how the "&" character is used to split the
two key-value pairs.

Unfortunately, because you put down "Jack&Jill Hill" for the `fullname` field,
it could be confusing as to whether or not the "&" character was actually part
of one of the input values or if it's there to split up a key-value pair. In
order to clarify the meaning, the data string needs to be encoded so that those
special characters are consistently mapped to other characters that don't have
special meaning.

So in our example, the "@" character would be represented instead by "%40" and
the "&" symbol would be represented by "%3D". This results in the data being
sent in the `x-www-form-urlencoded` format that looks like this:
`fullname=Jack%3DJill+Hill&email=jack.jill%40hill.com&numGuests=2`.

> "%40" and "%3D" are [percent encoded] values. Values after the "%" character
> are hexadecimal values.

### Parsing the request body

Once the request reaches the server, because the body of the request is now
encoded in an `x-www-form-urlencoded` format, it needs to be decoded and parsed,
preferably into a format that would be easy for the routes to handle.

Fortunately, the Express framework comes with a middleware function that does
this for us. You'll learn more about middleware in an upcoming reading, but for
now, go ahead and add `app.use(express.urlencoded())` to your `index.js` file
under where the view engine is being set:

```js
const express = require("express");

// Create the Express app.
const app = express();

// Set the pug view engine.
app.set("view engine", "pug");
app.use(express.urlencoded());

const guests = [];

// Define a route.
app.get("/", (req, res) => {
  res.render("layout", { title: "Guest List" });
});

app.get("/guest-form", (req, res) => {
  res.render("guest-form", { title: "Guest Form" });
});

app.post("/guest", (req, res) => {
  // MORE CODE TO COME
});

// Define a port and start listening for connections.
const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

Because of the `express.urlencoded()` middleware function, the body data is now
available in the `req` object. Specifically, `req.body` has now been formatted
as an object that looks like this:

```js
{
  fullname: 'Jack&Jill Hill',
  email: 'jack.jill@hill.com',
  numGuests: '2'
}
```

> Notice how the number of guests field is a string even though the `input` type
> was a "number". This will be discussed in more detail in the next reading.

Let's parse out the fields from the `req.body` object and push this guest entry
into the `guests` array. Then, redirect the user back to the home page by using
the `res` object's `redirect` method. That method redirects the user by sending
a response with a `302 Found` HTTP status code to the client.

```js
app.post("/guest", (req, res) => {
  const guest = {
    fullname: req.body.fullname,
    email: req.body.email,
    numGuests: req.body.numGuests
  };
  guests.push(guest);
  res.redirect("/");
});
```

To recap, when the user submits the add guest form, the following happens:

1. Because the `<form>` has a "post" `method`, the form data is sent in the body
   of the HTTP request in an `x-www-form-urlencoded` format.
2. When the request reaches the server, the `express.urlencoded` middleware
   function parses the urlencoded body into an object available via the
   `req.body` property.
3. The request is handled by the `/guest` POST route.
4. After the guest is added to the `guests` array, the server redirects the user
   back to the home page by sending a `302 Found` response. (Feel free confirm
   this in the `network` tab of your developer tools.)
5. When users lands on the home page, they can see the newly added guest in the
   guests table.

## What you've learned

There were a lot of steps that went into submitting just one simple form, but
this form submission process is a common flow that you'll encounter often as a
developer!

In this reading, you learned how to:

- Create an HTML form using the Pug template engine.
- Define a pair of GET and POST routes to deliver an HTML form to the user and
  process requests from that form.
- Create and use a Pug layout template to eliminate code duplication across Pug
  views.
- Configure an Express application to use the built-in `urlencoded` middleware
  function to parse incoming request body form data (encoded as
  x-www-form-urlencoded).

[pug documentation]: https://pugjs.org/language/inheritance.html
[percent encoded]: https://en.wikipedia.org/wiki/Percent-encoding
