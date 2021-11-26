# HTML Forms: An Introduction
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Key components of a form](#key-components-of-a-form)
  - [`<form>`](#form)
  - [`<input>`](#input)
- [Submitting the form](#submitting-the-form)
- [What you've learned](#what-youve-learned)

<!-- /code_chunk_output -->
________________________________________________________________________________

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
