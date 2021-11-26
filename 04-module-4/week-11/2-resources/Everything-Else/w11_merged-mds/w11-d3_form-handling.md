# WEEK-11 DAY-3<br>*Form Handling* {ignore=true}
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=2 orderedList=false} -->

<!-- code_chunk_output -->

- [HTML Forms Learning Objectives](#html-forms-learning-objectives)
- [HTML Forms: An Introduction](#html-forms-an-introduction)
  - [Key components of a form](#key-components-of-a-form)
  - [Submitting the form](#submitting-the-form)
  - [What you've learned](#what-youve-learned)
- [HTML Forms in Express](#html-forms-in-express)
  - [Forms example setup](#forms-example-setup)
  - [Getting the "Add Guest" form](#getting-the-add-guest-form)
  - [A quick aside: Pug layout templates](#a-quick-aside-pug-layout-templates)
  - [Submitting the guest form](#submitting-the-guest-form)
  - [What you've learned](#what-youve-learned-1)
- [Data Validation](#data-validation)
  - [Importance of server-side data validation](#importance-of-server-side-data-validation)
  - [Server-side validations](#server-side-validations)
  - [Server-side validations: an example](#server-side-validations-an-example)
  - [Recap](#recap)
- [Express Middleware](#express-middleware)
  - [Middleware overview](#middleware-overview)
  - [Data validations with middleware](#data-validations-with-middleware)
  - [What you learned](#what-you-learned)
- [Protecting forms from CSRF](#protecting-forms-from-csrf)
  - [CSRF explained](#csrf-explained)
  - [Preventing CSRF](#preventing-csrf)
  - [What you learned](#what-you-learned-1)
- [Formative Forms Project](#formative-forms-project)
  - [Getting started](#getting-started)
  - [Phase 0: Intro to the skeleton directory](#phase-0-intro-to-the-skeleton-directory)
  - [Phase 1: Home page](#phase-1-home-page)
  - [Phase 2: Create the normal user form](#phase-2-create-the-normal-user-form)
  - [Phase 3: Submitting the form](#phase-3-submitting-the-form)
  - [Phase 4: Create interesting user form](#phase-4-create-interesting-user-form)
  - [Phase 5: Submit create interesting user form](#phase-5-submit-create-interesting-user-form)
  - [Bonus](#bonus)

<!-- /code_chunk_output -->
________________________________________________________________________________
________________________________________________________________________________
# HTML Forms Learning Objectives

HTML forms are the way that you collect data from a user to power your Web
application. Using forms is a vital building block for your Web application
knowledge. After this lesson, you should be able to:

1. Describe the interaction between the client and server when an HTML form is
   loaded into the browser, the user submits it, and the server processes it
2. Create an HTML form using the Pug template engine
3. Use express to handle a form's POST request
4. Use the built-in `express.urlencoded()` middleware function to parse incoming
   request body form data
5. Explain what data validation is and why it's necessary for the server to
   validate incoming data
6. Validate user-provided data from within an Express route handler function
7. Write a custom middleware function that validates user-provided data
8. Use the `csurf` middleware to embed a token value in forms to protect against
   Cross-Site Request Forgery exploits

________________________________________________________________________________
# HTML Forms: An Introduction

HTML Forms are an essential and ubiquitous part of the web. You use forms to
search, create resources (i.e. account, posts), update resources, and more.

While forms may seem simple on the surface, there's more complexity that you
have to think about as a developer when you're building a web app that uses HTML
forms. In this introductory lesson you will learn about:

- the key components of a form
- the client and browser interaction when it comes to handling HTML forms
- the usual flow of a form submission

## Key components of a form

Let's imagine that a user just landed on a website you built and loads up a form
that allows users to sign up for a mailing list.

The browser would load up HTML that includes something like this:

```html
<h1>Sign up for an account</h1>
<form action="/sign-up" method="post">
  <label for="name">Name:</label>
  <input type="text" id="name" name="fullname" />

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" />

  <input type="submit" value="Sign Up" />
</form>
```

Let's first break down the various components of the form.

### `<form>`

The `<form>` element is the parent element of all of the input fields. This
element has two attributes that are unique to `<form>` elements: `action` and
`method`.

The `action` attribute defines the location (URL) where the form should send the
data to when it is submitted. In this example, the `action` attribute has a
value of `/sign-up`. The `action` can be set to either an [absolute URL] or a
[relative URL]. If it is a relative URL (ex: `/sign-up`), then it will be sent
to the server that served up the website that the user is on.

The `method` attribute defines the HTTP verb that should be used to make the
request to the server. Browsers support only two values for this attribute:
"get" and "post". You will use "post" 99% of the time.

> Forms typically use POST requests because POST requests are used to send data
> that results in a change on the server. For example, if someone wanted to sign
> up for an account, that form would use a POST request. In contrast, GET
> requests are used to retrieve data from the server. A typical use case for a
> form that uses a GET method is a search form. For example, the search input on
> www.google.com is part of a form that uses a GET method.

In this example, when the form is submitted, it will make a POST request to the
server's `/sign-up` route.

### `<input>`

In this example, there are two input fields for entering data: one for the
user's name, and one for the user's email. These fields are represented by the
`<input>` element.

Notice how there is a `type` attribute in each `<input>` element. The type
attribute tells the browser what kind of input it expects, and the browser
enforces different rules for each type of input.

For example, in the `<input>` field with `type="email"`, if the user tries to
submit an email that does not have the "@" character in it, then most browsers
will display notify users that they have put in an invalid email address.

There are several types of inputs, including number, password, and checkbox. You
can learn more about all of the different types types in the
[MDN docs on input types]. Some of the less-commonly-used ones are quite
interesting!

There are also other HTML elements that serve as data input fields but are not
represented by an `<input>` element, such as `<textarea>` and `<select>`.

The first two `<input>` fields in the example also have a `name` attribute. The
`name` attribute is important because when the form data is sent to the server,
the data is represented in key-value pairs with the value of the `name`
attribute set as the key. For form submissions with a "post" method, the input
field data would be sent to the server in the body of the HTTP request in the
`x-www-form-urlencoded` format. For example, the data for the example form would
look something like this when it is submitted to the server:

```plaintext
fullname=John+Doe&email=john@doe.com
```

The `id` attribute ties the `<input>` element to the `<label>` element by
matching the `<label>` element's `for` attribute. Associating a `<label>`
element with the `<input>` field in this way offers accessibility and useability
benefits. For example, if the user clicks on a `<label>` element that is
associated with an `<input>` field, then the `<input>` field would come into
focus.

Finally, the last `<input>` element with `type="submit"` is unique in that it
does not store any data. Instead, this element renders as a button with text
that is equal to its `value` attribute. You could also write `<input>` elements
with `type="submit"` as a `<button>` element, like this:
`<button type="submit">Sign Up</button>`. When the user clicks on this button,
then the form is submitted.

## Submitting the form

As mentioned earlier, when this form is submitted, it will make a POST request
to the server's `/sign-up` route.

In the previous lesson, you learned about routing in an Express server, so you
can imagine that the above example might make a request to a route that looks
something like this:

```js
app.post("/sign-up", (req, res) => {
  // handle the request here
});
```

When the request reaches the server, the data captured in the form is then
validated. For example, you might want to set up a validation that verifies that
the user actually typed something into the `fullname` field before submitting.

> There are various validations that you can set on the frontend elements
> themselves. For example, if you add a `required` attribute to an `<input>`
> field, then the browser would prevent the user from being able to submit a
> form if that required field were empty. **However**, frontend validations can
> be easily manipulated: someone could simply open up the dev tools and remove
> the `required` attribute and then submit the form with an empty input. This is
> why server-side validations are crucial and necessary.

If the data is invalid, then the server would send back error messages to the
frontend to be displayed to the user. For example, if the user had submitted a
form with an empty `fullname` field, then the server can send back an error
message to notify the user that the "Name field is required". Specifically, the
error would return a complete HTML page containing the entire form along with
the error messages. This is so that the user can resolve the error and then
resubmit the form, effectively repeating the whole form submission process
again.

Validations can also be more robust than simple checks for whether or not a
field was filled out. As a developer, you can customize and set up any sort of
validation on the data that the user is submitting. In a later reading, you'll
learn more about validations.

Finally, once the user resolves the errors, then the server can successfully
process the data. At this point, the server would typically redirect the user to
a different page by responding with a `302 Found` status. For example, if a user
had just signed up for a new account, the server might redirect them to the
profile page after they have successfully signed up.

## What you've learned

In this reading, you learned about:

- the key components of a form
- the client and browser interaction when it comes to handling HTML forms
- the usual flow of a form submission

In the next reading, you'll get an opportunity to build out a form that
interacts with an Express server!

[absolute url]: https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL#Examples_of_absolute_URLs
[relative url]: https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL#Examples_of_relative_URLs
[mdn docs on input types]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input

________________________________________________________________________________
# HTML Forms in Express

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

________________________________________________________________________________
# Data Validation

When setting up HTML forms, it's important to check and clean the incoming data
to ensure that the data is correct.

In this lesson, you will:

1. Understand what data validation is and why it's necessary for the server to
   validate incoming data.
2. Validate user-provided data from within an Express route handler function and
   return a response containing user-friendly validation error messages when
   necessary.

## Importance of server-side data validation

Data validation is the process of ensuring that the incoming data is correct.
This section will cover the rationale for validating incoming
data on the server side.

Even though you could add add validations on the client side, client-side
validations are not as secure and can be circumvented. Because client-side
validations can be circumvented, it's necessary to implement server-side data
validations.

### Lack of trust in client-side validations

Let's talk through an example. Suppose you had an HTML form that collects a
user's age. First of all, the whole point of the form is to collect the user's
age, so you want to ensure that the "age" field is not blank. To account for
this, you set a `required` attribute on the age `<input>`.

You also want to make sure that users submit a number for their age, so you set
the `<input>` field's `type` attribute equal to "number":

```html
<for method="post" action="/age">
  <label for="age">Age: </label>
  <input required type="number" id="age" />
  <input type="submit" />
</form>
```

Excellent, now, whenever users fill out this form, they're unable to submit the
form unless the "age" field is filled out with a number. This seems like it
would ensure that you have clean and correct data being submitted to your
server.

Unfortunately, those frontend validations are not reliable. Someone could open
up the developer's console and remove the `required` attribute, and then change
the `type` to equal "text".

Another situation to account for is that the end user might not even be using
that specific form to submit data. Someone could be programmatically submitting
a POST request to the server. In this scenario, they would never interact with
the HTML form and its validations.

Ultimately, client-side validations are good for immediate feedback to the user,
but they should not be relied upon for enforcing clean data submission.

## Server-side validations

So what kind of data validations should you implement on the server side? Let's
walk through a few examples.

### Expected data types

The previous reading discussed how when a form is submitted, the data is
typically urlencoded. One effect of this url encoding is that each value will
arrive at the server as a string. Because of this, there's a tremendous need to
validate that the provided string can be successfully converted to the desired
type.

The previous example about the "age" field discussed how a user could circumvent
the `type="number"` attribute on the frontend. Without server-side data
validation on that "age" field, you could end up with an invalid value (for
example, `NaN`) when trying to convert the "age" value into a number in the
server.

Other examples of data type validations include:

- Checking for integer vs. float
  (perhaps you want to only store the user's age as an integer)
- Checking that an input date string can be converted to a valid date.

### Valid ranges and format

To continue with our "age" field example, one logical validation you might want
to enforce is that users submit a valid age. For example, it's unlikely that a
user is over 120 years old.

You could also check that values come in the correct format. A telephone number
should not have any letters in it, and if you want to ensure that it is
a US-based telephone number, you might also want to check that the phone number
is 10 digits long.

Another example might be that you want to ensure that your users are creating
strong and secure passwords. To do this, you could require and check for the
presence of a symbol and a number in the password, or prevent users from setting
"password" as their password.

### Other validations

Validations do not have to be constrained to just checking one field at a time.
To continue with the example on passwords, let's suppose you also wanted to add
a "Confirm Password" field to ensure that users did not make a typo on their
password when creating an account. In this scenario, it's necessary to add a
validation to ensure that the "Password" and "Confirmed Password" fields have
the same value.

Validations could get even more complex based on the needs of your application.
For example, let's suppose you have a form for users to order products. You
probably want to validate that their selected shipment order is valid given the
order's weight and destination postal code. After all, you don't want users
trying to select "1-day delivery" for a couch that needs to be transported
across the country.

## Server-side validations: an example

Let's pick up where last reading's example left off and add some server-side
validations. As a reminder, in the last reading, you built a website that allows
you to add guests to a guest list.

### Setup

At this moment, the directory of that example should look like this:

```plaintext
forms-demo
│   node_modules/
|   views/
│   │   guest-form.pug
│   │   index.pug
│   │   layout.pug
│   index.js
│   package-lock.json
│   package.json
```

The `index.js` file should look like this:

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

app.post("/guest", (req, res) => {
  const guest = {
    fullName: req.body.fullName,
    email: req.body.email,
    numGuests: req.body.numGuests
  };
  guests.push(guest);
  res.redirect("/");
});

// Define a port and start listening for connections.
const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

The `views/layout.pug` template should look like this:

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


```

The `views/index.pug` file should look like this:

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
          td #{guest.fullName}
          td #{guest.email}
          td #{guest.numGuests}

```

Finally, the `guest-form.pug` should look like this:

```pug
extends layout.pug

block content
  h2 Add Guest
  form(method="post" action="/guest")
    label(for="fullName") Full Name:
    input(type="text" id="fullName" name="fullName")
    label(for="email") Email:
    input(type="email" id="email" name="email")
    label(for="numGuests") Num Guests
    input(type="number" id="numGuests" name="numGuests")
    input(type="submit" value="Add Guest")

```

### Validations: checking that all fields are filled

First, because all three fields are important, let's add validations to ensure
that each of the field is filled out with a value before it can be successfully
submitted.

To be clear, you can add a `required` attribute to the three `input` fields, and
the user would not be able to submit until each field has a value. However, as
was discussed in the previous reading, these kinds of front-end validations can
be circumvented, so for this reading, let's focus on how to implement these
validations in the server.

To do this, instantiate an `errors` array in `app.post('/guest')`. Then, check
for truthy values in each of the `req.body` fields, and if any of the fields are
missing, then push in an error message into the `errors` array to notify the
user about how that field is required:

```js
app.post("/guest", (req, res) => {
  const { fullName, email, numGuests } = req.body;
  const errors = [];

  if (!fullName) {
    errors.push("Please fill out the full name field.");
  }

  if (!email) {
    errors.push("Please fill out the email field.");
  }

  if (!numGuests) {
    errors.push("Please fill out the field for number of guests.");
  }

  const guest = {
    fullName,
    email,
    numGuests
  };
  guests.push(guest);
  res.redirect("/");
});
```

Now, if the `errors` array has an error message in it, then don't add the
`guest` to the `guests` array. Instead, give the user an opportunity to fix the
errors before resubmitting the form again.

You can do this by rendering the `guest-form.pug` template again along with the
`errors` array. Then, update that template to display each error message to the
user. Also, if there are errors, let's go ahead and return out of the callback
function and ensure that none of the code below executes. Add this below the
validations:

```js
// VALIDATIONS HERE

if (errors.length > 0) {
  res.render("guest-form", { title: "Guest Form", errors });
  return; // `return` if there are errors.
}

// REST OF CODE NOT SHOWN
```

Here's what that route should look like now:

```js
app.post("/guest", (req, res) => {
  const { fullName, email, numGuests } = req.body;
  const errors = [];

  if (!fullName) {
    errors.push("Please fill out the full name field.");
  }

  if (!email) {
    errors.push("Please fill out the email field.");
  }

  if (!numGuests) {
    errors.push("Please fill out the field for number of guests.");
  }

  if (errors.length > 0) {
    res.render("guest-form", { title: "Guest Form", errors });
    return;
  }

  const guest = {
    fullName,
    email,
    numGuests
  };
  guests.push(guest);
  res.redirect("/");
});
```

Update `guest-form.pug` to display error messages whenever they exist:

```pug

extends layout.pug

block content
  div
    ul
      each error in errors
        li #{error}
  h2 Add Guest
  form(method="post" action="/guest")
    label(for="fullName") Full Name:
    input(type="text" id="fullName" name="fullName")
    label(for="email") Email:
    input(type="email" id="email" name="email")
    label(for="numGuests") Num Guests
    input(type="number" id="numGuests" name="numGuests")
    input(type="submit" value="Add Guest")


```

There's one more thing to fix here. One problem is that when the user navigates
to `localhost:8081/guest` now, when `guest-form.pug` is rendered, the
`app.get('/guest')` route is not rendering an `errors` variable. Therefore,
when `guest-form.pug` tries to iterate through the `errors` array, there's an
error because `errors` does not exist.

You have a couple of options here: you can either check for the truthiness of
`errors` in `guest-form.pug`, or you can render an empty `errors` array variable
in the `app.get('/guest')` route callback. For now, let's go ahead and go
with the first option and update the `guest-form.pug` template:

```pug
extends layout.pug

block content
  if errors
    div
      ul
        each error in errors
          li #{error}
  h2 Add Guest
  form(method="post" action="/guest")
    label(for="fullName") Full Name:
    input(type="text" id="fullName" name="fullName")
    label(for="email") Email:
    input(type="email" id="email" name="email")
    label(for="numGuests") Num Guests
    input(type="number" id="numGuests" name="numGuests")
    input(type="submit" value="Add Guest")

```

Things should be working properly now! If the user forgets to submit any of the
fields, the user should get a very specific message about which field needs to
be filled out still.

### Validations: ensuring that `numGuests` is valid

Let's add a couple more validations on the `numGuests` field to get really
comfortable with data validations. First, it probably makes sense that the
number of guests per entry on the guest list is at least one. Also, as
previously mentioned, each of the values will arrive at the server as a string.
Although, JavaScript automatically converts strings into numbers when a string
is being compared to a number, it's good practice to compare values of the same
type.

This brings up another necessary validation. Add a validation that checks to
make sure that the `numGuests` field is actually a value that can be converted
into a number. When you've added these validations, your `app.post('/guest')`
route should look something like this:

```js
app.post("/guest", (req, res) => {
  const { fullName, email, numGuests } = req.body;
  const numGuestsNum = parseInt(numGuests, 10);
  const errors = [];

  if (!fullName) {
    errors.push("Please fill out the full name field.");
  }

  if (!email) {
    errors.push("Please fill out the email field.");
  }

  if (!numGuests || numGuests < 1) {
    errors.push("Please fill out a valid number for number of guests.");
  }

  if (errors.length > 0) {
    res.render("guest-form", { title: "Guest Form", errors });
    return;
  }

  const guest = {
    fullName,
    email,
    numGuests: numGuestsNum
  };
  guests.push(guest);
  res.redirect("/");
});
```

There are now validations in place to ensure that the `numGuests` field is a
valid number that is greater than 0. Test to make sure this is working properly
by changing the `numGuests` input type to "text" and submitting invalid data
(you can either edit this directly in `guest-form.pug` or by opening up the
developers console to edit the HTML)

### Improve user experience

One thing that's somewhat annoying right now is that any time there is a
server-side error, all the fields get wiped, and the user has to fill them all
out again. For example, even if the `fullName` and `email` fields were filled
out without any issue, a small mistake on the `numGuests` field would require
the user to have to start the whole process over again and fill out each field.

Let's improve the user experience by pre-setting each field with the values that
they had just submitted. To do this, whenever there is an error, not only should
you render the `errors` array, but also go ahead and render back the values from
`req.body`:

```js
if (errors.length > 0) {
  res.render("guest-form", {
    title: "Guest Form",
    errors,
    email,
    fullName,
    numGuests
  });
  return;
}
```

Then, in `guest-form.pug`, set each input's `value` attribute to equal the
associated variables that was rendered back:

```pug
extends layout.pug

block content
  if errors
    div
      ul
        each error in errors
          li #{error}
  h2 Add Guest
  form(method="post" action="/guest")
    label(for="fullName") Full Name:
    input(type="text" id="fullName" name="fullName" value=fullName)
    label(for="email") Email:
    input(type="email" id="email" name="email" value=email)
    label(for="numGuests") Num Guests
    input(type="number" id="numGuests" name="numGuests" value=numGuests)
    input(type="submit" value="Add Guest")

```

Go ahead and test out the improved user experience! Now, each field's value
should persist even if there was an error.

## Recap

In this lesson, you learned:

1. What data validation is and why it's necessary for the server to
   validate incoming data.
2. How to validate user-provided data from within an Express route handler
   function and return a response containing user-friendly validation error
   messages when necessary.

________________________________________________________________________________
# Express Middleware

In a previous reading, we briefly introduced the urlencoded middleware function.
Middleware functions are a critical part of a robust Express server. In this
reading you will:

1. Understand that the request pipeline in an Express application is composed of
   a series of middleware functions.
2. Write a custom middleware function that validates user-provided data
   (submitted via an HTML form), sets an array of user-friendly validation error
   messages on the Request object when necessary, and passes control to the next
   middleware function.

## Middleware overview

Express middleware is kind of a misnomer: because of the "middle" in
"middleware", you might assume that middleware is anything that sits between the
client and the Express server. However, according to the
[Express documentation on using middleware]: "An Express application is
essentially a series of middleware function calls." Let's dive into what this
means.

For starters, start up a demo server by running the following commands:

```sh
mkdir middleware-demo
cd middleware-demo
npm init --yes
npm install express@^4.0.0
npm install nodemon@^2.0.0 --save-dev
touch index.js
```

Then, in your `index.js`, handle get requests to the root path by responding
with "Hello World!":

```js
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Define a port and start listening for connections.
const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

Set up a `start` script in your `package.json`:

```json
{
  "name": "middleware-demo",
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
    "express": "^4.17.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.2"
  }
}
```

Then start up your server by running `npm start`

### Anatomy of a middleware function

In Express, a middleware function is a function that takes three arguments, in
this specific order:

1. `req`- the request object
2. `res`- the response object
3. `next`- according to the [Express documentation on using middleware]: "the
   next middleware function in the application’s request-response cycle"

These arguments might seem a little familiar. Up to this point, you've been
handling all requests with a callback function that takes a `req` and `res`
argument.

For example, take a look at the callback function that you just set up to send
back "Hello World!": it takes `req` and `res` as the first two arguments. There
is, in fact, an optional `next` argument that you could have passed into this
function as well. The `next` argument will be discussed in more depth later in
this reading.

This means that all of the callback functions that you've been writing this
whole time to handle requests and send back responses are actually middleware
functions.

### Series of middleware functions

As a reminder, the documentation mentioned that "an Express application is a
_series_ of middleware function calls." To explore what "series" means there,
let's set up another middleware function.

Here's the goal: let's set up a middleware function that logs the time of each
request.

Remember, a middleware function takes three arguments: `req`, `res`, and `next`.
In `index.js`, create a middleware function `logTime` that console logs the
current time formatted as an ISO string. At the end of the middleware function,
invoke the `next` function, which represents the next middleware function:

```js
const logTime = (req, res, next) => {
  console.log("Current time: ", new Date().toISOString());
  next();
};
```

Now, update the `app.get('/')` route so that it calls `logTime` before it
invokes the anonymous callback function that sends back "Hello World!":

```js
app.get("/", logTime, (req, res) => {
  res.send("Hello World!");
});
```

To confirm that this is working, refresh `localhost:3000` and check that your
server logs are showing the current time of each request.

Let's recap what just happened:

1. When the user lands on `localhost:3000`, a GET request is made to the "/" route of the Express server.
2. The first middleware function this route invokes is `logTime`. In `logTime`, the current time is logged. At the end of `logTime`, it invokes `next`, which represents the next middleware function.
3. The next middleware function in this example is the anonymous callback
   function that runs `res.send("Hello World!")`.

You could invoke as many middleware functions as you'd like. In addition,
because the `req` and `res` objects are passed through every one of the
middleware functions, you could store values in the `req` object for the next
middleware function to use.

Let's explore this by creating another middleware function called `passOnMessage`:

```js
const passOnMessage = (req, res, next) => {
  console.log("Passing on a message!");
  req.passedMessage = "Hello from passOnMessage!";
  next();
};
```

Then, let's add this middleware function to the `app.get('/')` route and then
console.log the `req.passedMessage` in one of the later middleware functions:

```js
app.get("/", logTime, passOnMessage, (req, res) => {
  console.log("Passed Message: ", req.passedMessage);
  res.send("Hello World!");
});
```

> In the example above, the `passedMessage` was added to the `req` object so
> that it could be used in a later middleware function. Alternatively, you might
> instead want to store properties inside of the [res.local] object so that you
> don't accidentally override an existing property in the `req` object.

Instead of passing each middleware function in separate arguments, you could
also pass them all in as one array argument:

```js
app.get("/", [logTime, passOnMessage], (req, res) => {
  console.log("Passed Message: ", req.passedMessage);
  res.send("Hello World!");
});
```

The order does matter. Try changing up the order of the middleware functions and
see the order of the console.log statements.

### Application-level middleware

To be clear, with the current set up, `logTime` and `passOnMessage` will only be
executed for the `app.get('/')` route. For example, let's say you set up another
route:

```js
app.get("/bye", (req, res) => {
  res.send("Bye World.");
});
```

Because that route does not currently take in `logTime` as one of its arguments,
it would not invoke the `logTime` middleware function. To fix this, you could
simply pass in the `logTime` function, but if there was a middleware function
that you wanted to execute for every single route, this could be pretty tedious.

Setting up an application-level middleware function that runs for every single
route is simple. In fact, the `express.urlencoded` middleware you set up in the
previous reading was an application-level middleware.

To do this, remove `logTime` from the `app.get('/')` arguments. Instead, add it
as an application-wide middleware by writing `app.use(logTime)`. After doing
this, your `index.js` file should look like this:

```js
const express = require("express");

const app = express();

const logTime = (req, res, next) => {
  console.log("Current time: ", new Date().toISOString());
  next();
};

app.use(logTime);

const passOnMessage = (req, res, next) => {
  console.log("Passing on a message!");
  req.passedMessage = "Hello from passOnMessage!";
  next();
};

app.get("/", passOnMessage, (req, res) => {
  console.log("Passed Message: ", req.passedMessage);
  res.send("Hello World!");
});

app.get("/bye", (req, res) => {
  res.send("Bye World.");
});

// Define a port and start listening for connections.
const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

Now, whenever you navigate to either `localhost:3000` or `localhost:3000/bye`,
the `passTime` middleware function will be executed. Note how the
`passOnMessage` is only executed for the `app.get('/')` route.

## Data validations with middleware

In the previous reading, you set up data validations in your Express server in
the "Guest List" example.

Let's pick up where that example left off and move the data validations into a
middleware function.

At this point, your `index.js` should look like this:

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

app.post("/guest", (req, res) => {
  const { fullname, email, numGuests } = req.body;
  const numGuestsNum = parseInt(numGuests, 10);
  const errors = [];

  if (!fullname) {
    errors.push("Please fill out the full name field.");
  }

  if (!email) {
    errors.push("Please fill out the email field.");
  }

  if (!numGuests || numGuests < 1) {
    errors.push("Please fill out a valid number for number of guests.");
  }

  if (errors.length > 0) {
    res.render("guest-form", {
      title: "Guest Form",
      errors,
      email,
      fullname,
      numGuests
    });
    return;
  }

  const guest = {
    fullname,
    email,
    numGuests: numGuestsNum
  };
  guests.push(guest);
  res.redirect("/");
});

// Define a port and start listening for connections.
const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

You might be wondering why you would want to move the validation logic into a
middleware function. Suppose you now wanted to add a route that would allow the
user to update a `guest` on the guest list.

In that update route, you probably want to enforce the same validations. You
could simply copy and paste over all of those validations, but having it in a
middleware function would keep your code DRY.

To start, create a function called `validateGuest` and move all of the
validation logic into that function.

Because this will be a middleware function, be sure to accept `req`, `res`, and
`next` as arguments in the function.

Finally, your `validateGuest` functions should pass on error messages to a later
function so the later function can render the error messages back to the client.

When you're done with your `validateGuest` function, it should look something
like this:

```js
const validateGuest = (req, res, next) => {
  const { fullname, email, numGuests } = req.body;
  const numGuestsNum = parseInt(numGuests, 10);
  const errors = [];

  if (!fullname) {
    errors.push("Please fill out the full name field.");
  }

  if (!email) {
    errors.push("Please fill out the email field.");
  }

  if (!numGuests || numGuests < 1) {
    errors.push("Please fill out a valid number for number of guests.");
  }

  req.errors = errors;
  next();
};
```

Notice how the `errors` array is passed on to the next middleware function by
being added to the `req` object. Update your `app.post('/guest')` route so that
it now uses the `validateGuest` middleware function and so that it checks
`req.errors` for error messages:

```js
app.post("/guest", validateGuest, (req, res) => {
  const { fullname, email, numGuests } = req.body;
  if (req.errors.length > 0) {
    res.render("guest-form", {
      title: "Guest Form",
      errors: req.errors,
      email,
      fullname,
      numGuests
    });
    return;
  }

  const guest = {
    fullname,
    email,
    numGuests
  };
  guests.push(guest);
  res.redirect("/");
});
```

In summary, moving validations into a middleware allows you to concisely reuse
validations across different routes. In production-level projects, you'll likely
use a validation library called [express-validator], which follows the same
pattern of validating data in middleware functions and then passing on error
messages through the `req` object.

The [express-validator] library gives you a wide range of pre-built validations
so that you don't have to implement validation logic from scratch. For example,
it comes with a pre-built validation for checking whether an input field's is in
a proper email format: `check('email').isEmail()`. You'll get a chance to
explore the `express-validator` middleware functions more in today's project!

## What you learned

In this reading, you learned:

1. that the request pipeline in an Express application is composed of a series
   of middleware functions
2. how to write a custom middleware function that validates user-provided data
   (submitted via an HTML form), sets an array of user-friendly validation error
   messages on the Request object when necessary, and passes control to the next
   middleware function.

[express documentation on using middleware]: https://expressjs.com/en/guide/using-middleware.html
[express-validator]: https://express-validator.github.io/docs/
[res.local]: https://expressjs.com/en/4x/api.html#res.locals

________________________________________________________________________________
# Protecting forms from CSRF

The web, unfortunately, is full of bad actors who consistently try to exploit
any insecurities that a web application might have. This reading will talk about
one common attack called Cross Site Request Forgery (CSRF).

In this reading, you will learn:

1. How to use the `csurf` middleware to embed a token value in forms to protect
   against CSRF exploits.

## CSRF explained

Let's explain what CSRF is with an example. Imagine that you are a customer at a
bank called "Bad Bank Inc.". To put it bluntly, this bank sucks, and their
website is full of security issues.

In any case, you decide one day that you need to send your brother some money,
so you go `http://badbank.com` and sign into your account. Once you have
provided the correct credentials to log in, `http://badbank.com` sends back a
cookie.

> **Brief overview of cookies:** At a super high level, when a user logs into a
> website, one way that the server can "log in the user" is by sending back a
> [cookie] to the client. For example, if you log to `facebook.com`,
> `facebook.com`'s server would send the browser back a cookie. Now, on every
> subsequent request to `facebook.com`, the browser would attach that cookie to
> the request. When the request arrives at the server, the server sees the
> cookie and sees that you're logged in and authorized to navigate around your
> account.

Now that you're logged in, you navigate to `http://badbank.com/send-money`,
which renders a a page that looks like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Bad Bank</title>
  </head>
  <body>
    <h1>Send Money</h1>
    <form action="/send-money" method="post">
      <label for="recipient">Recipient Email: </label>
      <input type="email" id="recipient" name="recipient" />
      <label for="amount">Amount: </label>
      <input type="number" id="amount" name="amount" />
      <input type="submit" value="Send Money" />
    </form>
  </body>
</html>
```

The page has a form where you can fill out a "recipient" field and an "amount"
field. You fill out your brother's email `joe@gmail.com` in the recipient field
and \$100 for the amount, and then hit the 'Send Money' button.

When you hit the 'Send Money' button, the following happens:

1. An HTTP POST request is made to `http://badbank.com/send-money`. When you
   logged in earlier, your browser received a cookie and stored it in
   association with `http://badbank.com`. Now, your browser sees this "send
   money" request going to the `http://badbank.com` domain, so it attaches that
   cookie to the HTTP request.
2. The request arrives at the server. The server sees that there is a cookie,
   and it checks the cookie.
3. Since the cookie is valid, the server knows that you are logged in, and the
   server processes the form data to see who you're sending money to and how
   much you are sending.
4. The server finishes processing the form data and sends \$100 to your brother
   Joe.

Things are going well so far!

Unfortunately, a devious hacker comes along. The hacker puts up another website
that looks like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>See Cute Puppies</title>
    <style>
      form {
        visibility: hidden;
      }
      input[type="submit"] {
        visibility: visible;
      }
    </style>
  </head>
  <body>
    <form action="http://badbank.com/send-money" method="post">
      <label for="recipient">Recipient Email: </label>
      <input
        type="email"
        id="recipient"
        name="recipient"
        value="hacker@gmail.com"
      />
      <label for="amount">Amount: </label>
      <input type="number" id="amount" name="amount" value="1000000" />
      <input type="submit" value="See the cutest puppies!" />
    </form>
  </body>
</html>
```

Let's break down what's going on in the hacker's website:

1. First, the hacker puts up the exact same "Send Money" form on his website: it
   hits the same endpoint (`http://badbank.com/send-money`) with the same method
   ("post"), and it has all the fields that the endpoint expects when parsing
   the form ("recipient" and "amount").
2. One difference here is that the hacker hid the form on the website with CSS
   by setting the form's visibility to hidden.
3. The other key difference is that the hacker went ahead and pre-filled the
   recipient field's value to his own email address, "hacker@gmail.com", and
   then also pre-filled the "amount" field's value to 1 million.
4. The only part of the form that the hacker decides to show is the submit
   button, and he changed the button text to an irresistible prompt: "See the
   cutest puppies!".
5. Naturally, you love puppies, so as you're browsing the web and land on this
   hacker's website, you click the button, thinking that you're about to see
   puppies.
6. Instead, a "ost" request gets sent to `http://badbank.com/send-money` along
   with the pre-filled form data.

Here's the problem, because you had recently logged into `http://badbank.com`,
your browser is currently storing the cookie to keep you logged in. When the
browser sees that you are making another request to the `badbank.com` domain, it
attaches the same cookie to the request that the hacker tricked you into making.

Now, when the hacker's request makes it to `badbank.com`'s server, it sees the
cookie, sees that you're logged in and thinks that it's you making the request,
so it sends \$1 million to "hacker@gmail.com".

## Preventing CSRF

One foundational strategy to prevent a CSRF attack would be to have your server
render a secret token as part of the form. Then, when the form gets submitted,
it checks for the secret token to verify that it actually came from a form that
the server itself had rendered, and not from some other malicious source.

Now, when a hacker tries to imitate the form on his own website, his form
wouldn't have the secret token, and the server would know to reject any requests
from that malicious form.

Let's pick up where we left off in our previous reading's "Guest List" example
and walk through how to implement this CSRF token strategy.

### Example setup

At this point, here's what the `index.js` file for the "Guest List" example
project should look like:

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

const validateGuest = (req, res, next) => {
  const { fullname, email, numGuests } = req.body;
  const numGuestsNum = parseInt(numGuests, 10);
  const errors = [];

  if (!fullname) {
    errors.push("Please fill out the full name field.");
  }

  if (!email) {
    errors.push("Please fill out the email field.");
  }

  if (!numGuests || numGuests < 1) {
    errors.push("Please fill out a valid number for number of guests.");
  }

  req.errors = errors;
  next();
};

app.post("/guest", validateGuest, (req, res) => {
  const { fullname, email, numGuests } = req.body;
  if (req.errors.length > 0) {
    res.render("guest-form", {
      title: "Guest Form",
      errors: req.errors,
      email,
      fullname,
      numGuests
    });
    return;
  }

  const guest = {
    fullname,
    email,
    numGuests
  };
  guests.push(guest);
  res.redirect("/");
});

// Define a port and start listening for connections.
const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

Here's what the `index.pug` file looks like:

````pug
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


Here's what the `guest-form.pug` file looks like:

```pug
extends layout.pug

block content
  if errors
    div
      ul
        each error in errors
          li #{error}
  h2 Add Guest
  form(method="post" action="/guest")
    label(for="fullname") Full Name:
    input(type="fullname" id="fullname" name="fullname" value=fullname)
    label(for="email") Email:
    input(type="email" id="email" name="email" value=email)
    label(for="numGuests") Num Guests
    input(type="number" id="numGuests" name="numGuests" value=numGuests)
    input(type="submit" value="Add Guest")

````

### Using the `csurf` library

Let's use the `csurf` library to handle this whole process of creating a secret
token for the form and then checking the secret token when forms are submitted.

The `csurf` library creates a middleware function that does the following:

1. It creates a secret value, which is sent to the client and stored as a cookie
   named `_csrf`.
2. On every request for a form, a CSRF token is generated from that secret
   value. That CSRF token is then sent back to the client as part of the form in
   a hidden input field.
3. Whenever the client submits the form, the server checks the CSRF token that's
   embedded in the form and verifies that it is a valid CSRF token by checking
   it against the secret `_csrf` value that was attached to the request as a
   cookie.

By taking the steps above, the hacker site would not have the CSRF token
embedded as part of the form on his site, and therefore it would fail the CSRF
token verification process.

Let's implement the above flow in the "Guest List" project. First, start by
running `npm install csurf@^1.0.0`.

Then, go ahead and also install the `cookie-parser` middleware by running
`npm install cookie-parser@^1.0.0`. Remember, the secret value is stored as a
cookie named `_csrf`, so whenever the form is submitted, the server needs to be
able to parse out the cookie in order to verify the CSRF token against the
secret `_csrf` value.

At the top of `index.js`, require the `csurf` and `cookie-parser` dependencies.
Add the `cookie-parser` middleware as an application-wide middleware function.
For the `csurf` middleware, go ahead and create the function now so that you can
later use it in specific routes:

```js
const express = require("express");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");

// Create the Express app.
const app = express();

// Set the pug view engine.
app.set("view engine", "pug");
app.use(cookieParser()); // Adding cookieParser() as application-wide middleware
app.use(express.urlencoded());
const csrfProtection = csrf({ cookie: true }); // creating csrfProtection middleware to use in specific routes

// REST OF FILE NOT SHOWN
```

In the `app.get('/guest-form')` route, pass in the `csrfProtection` function as
one of the middleware functions for that route. Then in the route's final
callback middleware function, generate a CSRF token by calling
`req.csrfToken()`.

The `csrfToken()` function was added to the `req` object by the `csrfProtection`
middleware. The middleware function also generated a secret `_csrf` value and
stored it in the `res` object's headers so that the client can store it as a
cookie. Finally, render the CSRF token under a `csrfToken` key so that the
`guest-form.pug` template can use it:

```js
app.get("/guest-form", csrfProtection, (req, res) => {
  res.render("guest-form", { title: "Guest Form", csrfToken: req.csrfToken() });
});
```

In `guest-form.pug`, add a hidden input field with a `name` attribute of
"\_csrf" and the `value` attribute set to the `csrfToken` that the server
renders:

```pug
extends layout.pug

block content
  if errors
    div
      ul
        each error in errors
          li #{error}
  h2 Add Guest
  form(method="post" action="/guest")
    input(type="hidden" name="_csrf" value=csrfToken)
    label(for="fullname") Full Name:
    input(type="fullname" id="fullname" name="fullname" value=fullname)
    label(for="email") Email:
    input(type="email" id="email" name="email" value=email)
    label(for="numGuests") Num Guests
    input(type="number" id="numGuests" name="numGuests" value=numGuests)
    input(type="submit" value="Add Guest")

```

Finally, back in `index.js`, pass in the `csrfProtection` function to
`app.post('/guest')`:

```js
app.post("/guest", csrfProtection, validateGuest, (req, res) => {
  // REST OF CODE NOT SHOWN
}
```

Now whenever the form is submitted, the `csrfProtection` middleware function
verifies that the CSRF token that was set in the hidden input field is a valid
token by checking it against the secret `_csrf` value that was sent as a cookie.

In summary, now, if a hacker tries to add a guest to your guest list, his form
would be missing the CSRF token. Therefore, the endpoint throw an error and
prevent a guest from being added.

There are [other considerations] to take into account to fully protect your web
applications from CSRF attacks. For now, adding the CSRF token is a solid first
line of defense.

## What you learned

In this reading, you learned how to use the csurf middleware to embed a token
value in forms to protect against CSRF exploits.

This reading concludes this lesson on HTML Forms, and you're now ready to build
out your own Express application that uses forms!

[cookie]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
[other considerations]: https://github.com/pillarjs/understanding-csrf

________________________________________________________________________________
# Formative Forms Project

Today you'll be going through the formative experience of building out an
Express application that uses HTML forms!

This application allows users to create two types of user accounts: a normal
user account and an interesting user account. It keeps track of all of the users
in a table on the home page.

When you're done with the project, your web application should have the
following features:

1. Site-wide navigation elements that allows users to navigate between the home
   page and the two other pages.
2. A table that shows all of the existing users.
3. A form that can be used to create a normal user account.
4. A form that can be used to create an interesting user account.

## Getting started

* Clone the starter project from
  https://github.com/appacademy-starters/formative-forms-starter
* Run `npm install` to install the dependencies
* Run `npm test` to run the tests for the project

## Phase 0: Intro to the skeleton directory

The skeleton directory has a bare bone `index.js` file that renders "Hello
World!" when a user land on `localhost:3000/`. There's also a `users` array that
already has one user created for you. Throughout the project, as you add new
users, you'll do so by pushing the new users into this array.

It also has a `layout.pug` template that your other templates can extend. The
`layout.pug` imports Bootstrap stylesheets in the `head` element. Feel free to
make your website look fancy with the available Bootstrap styling by adding
Bootstrap class names to your elements.

For example, here is the documentation on how to
[add Bootstrap styles to a form element] by adding the Bootstrap classes to each
element.

## Phase 1: Home page

Pass each of the specs in `01_home.test.js` file. Running `npm test` will run
every single test across all five test files. If you only want to run the specs
in `01_home.test.js`, run `npm test -- --grep home`. The `--grep` flag only
executes tests with names that match the passed in option value.

Overall, this project will give you ample opportunity to get familiar with
reading specs and then building out features to satisfy those specs. Be sure to
check the specs often for guidance!

In this first phase, create an `index.pug` template and update the `app.get("/")`
route so that it renders the index template. Remember to render the `users`
array so that it's available in the `index.pug` template.

[Extend] the `index.pug` template to inherit from `layout.pug`. Declare a block
named "content" and add a table to render existing users. Follow the specs to
create an `h2` header for the table.

> **Hint:** Read the error messages to see the expected header name.

Create table headers and columns for each user's information.

> **Hint:** Take a look at 01_home.test.js to view what columns are expected in
> the table.

At the top of the `body` element in `layout.pug`, add navigation links so that
users can easily navigate between the home page ("/" route), normal user
creation form ("/create" route), and interesting user creation form
("/create-interesting" route).

## Phase 2: Create the normal user form

Pass each of the specs in `02_create_form.test.js`. You can run the specs in
this file by running `npm test -- --grep create-normal`.

In this phase, go ahead and set up this route to use the [csurf] middleware to
render a CSRF token in a hidden input field. Be sure to in the `{cookie: true}`
options when creating the middleware function.

Because your application will be using cookies to store the secret CSRF value,
go ahead and also set up the [cookie-parser] middleware as an application-wide
middleware function.

Set up a route so that when users land on `/create`, a form renders with the
following fields:

- `_csrf` **(hidden field)**
- `firstName`
- `lastName`
- `email`
- `password`
- `confirmedPassword`

Be sure to set correct input `type` and `name` attributes, and also remember to
[add a label] correlating to each input field's `name`.

Make sure your `_csrf` field has an appropriate value from your middleware. At
this point, remove some duplication from your Pug template by leveraging
[mixins]. Create a mixin to easily generate `label` and `input` element pairs.
Think of how you would create a mixin using `input` attributes as parameters.

## Phase 3: Submitting the form

Pass each of the specs in `03_form_submit.test.js`. You can run the specs in
this file by running `npm test -- --grep form-submit`.

Begin by setting up a `"/create"` route to handle POST requests. Now that you
are handling POST requests, you'll need access to `req.body`. Have your
application use the `express.urlencoded` middleware to decode the form's request
body string into data that can be accessible in `req.body`.

The next step is to protect this route from CSRF attacks by using the middleware
function that you set up using the [csurf] library. Make sure you've included
the middleware function in both of the GET and POST `"/create"` routes.

Now set up data validations and create an `errors` array within the
`app.post("/create")` route. You want to validate whether the user has provided
a `firstName`, `lastName`, `email`, and `password`. Read the error messages from
the specs to determine what messages to `push` into your `errors` array.

Time to update the `create.pug` template to render the error messages. Start by
creating an unordered list at the top of your `create-form.pug` block. Inside of
the unordered list, add a paragraph element with the following content:
`The following errors were found:`. Now, iterate through each error to create
list items with the error messages. Only render errors if they are present in
the `errors` array. How can you determine if there are errors present?

You'll want to be sure that you're pre-filling each input field with
already-submitted values so that users don't have to fill out all of the fields
again whenever there are errors. How can you update your `input` elements so
that already-submitted values are still showing even after a form submission
fails a data validation?

## Phase 4: Create interesting user form

Pass each of the specs in `04_create_interesting_form.test.js`. You can run the
specs in this file by running `npm test -- --grep create-interesting`.

Notice how this form includes all of the fields from the first form. Reduce code
duplication by leveraging the Pug [includes] feature.

One way you could refactor is to create an `includes` directory inside your
views and make the following files:

- `views/includes/errors.pug`
- `views/includes/form-inputs.pug`

Now create a `create-interesting.pug` template for your "interesting user form"
and refactor your `create.pug` template to leverage the Pug `includes` feature.
Start by dividing your existing `create.pug` template into `errors.pug` and
`form-inputs.pug`. Think of how to use the templates to keep your code DRY.

## Phase 5: Submit create interesting user form

Pass each of the specs in `05_interesting_form_submit.test.js`. You can run the
specs in this file by running `npm test -- --grep submit-interesting`.

Go ahead and add validations and write error messages for this new form. Because
this new form still has the same base fields as the other form, be sure to still
run the same validations that you are currently running for the
`app.post('/create')` route. If you have not done so already, go ahead and move
all of the validations for the first form into a custom middleware function that
both `app.post('/create')` and `app.post('/create-interesting`) can use. Be sure
to store those errors on the `req` object so that they can be used in a later
middleware function.

Once you've ensured that your base fields are being validated, go ahead and add
validations for the new `age` and `favoriteBeatle` fields. Follow the error
messages in the specs to determine what your error messages should be. Please
write these new validations in a custom middleware function.

Create [mixins] for the `favoriteBeatle` options. How can you make sure that a
user's `favoriteBeatle` is automatically selected when a form with errors
re-renders upon submission?

How can you make sure a user's `iceCream` checkbox accurately renders whether
the user likes ice cream upon an unsuccessful form submission? When saving the
user, be sure to use the checkbox's value (ex: "on") to convert the
`user.iceCream` property to a boolean.

Finally, make sure your `index.pug` template is also rendering your new user
properties.

You've made it! Confirm that your whole app works as expected by running
`npm test`.

## Bonus

In a production-level Express application, you'll likely use a library to help
handle most of your data validation. One of the most popular data validation
libraries is the [express-validator] library, which gives you a wide range of
robust validations right out of the box.

Install this dependency and use it to add a validation to check that the user
password being submitted is at least 5 characters long and that it at least has
one number in it.

Then, go ahead and migrate any validations that you had on the `age` and
`favoriteBeatle` fields to use the [express-validator] library instead.

Once you're done with those fields, continue migrating all other validations to
use [express-validator] and add validations to check _all_ user input (e.g,
checking that a valid email is submitted).

[add bootstrap styles to a form element]: https://getbootstrap.com/docs/4.4/components/forms/
[extend]: https://pugjs.org/language/inheritance.html
[add a label]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
[csurf]: https://www.npmjs.com/package/csurf
[cookie-parser]: https://www.npmjs.com/package/cookie-parser
[mixins]: https://pugjs.org/language/mixins.html
[includes]: https://pugjs.org/language/includes.html
[express-validator]: https://express-validator.github.io/docs/
