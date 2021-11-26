# WEEK-11 <br>*Learning Objectives* {ignore=true}
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=2 orderedList=false} -->

<!-- code_chunk_output -->

- [Regular Expressions Learning Objectives](#regular-expressions-learning-objectives)
- [HTTP Full-Stack Learning Objectives](#http-full-stack-learning-objectives)
- [Express Learning Objectives](#express-learning-objectives)
- [Pug Template Learning Objectives](#pug-template-learning-objectives)
- [HTML Forms Learning Objectives](#html-forms-learning-objectives)
- [Data-Driven Web Sites Learning Objectives](#data-driven-web-sites-learning-objectives)

<!-- /code_chunk_output -->
________________________________________________________________________________
________________________________________________________________________________
# Regular Expressions Learning Objectives

Regular expressions are a delight and a nightmare. They please and they
confound. They are an important part of every developer's toolbox. By the time
you finish this, you should be able to

* Define the effect of the * operator and use it in a regular expression
* Define the effect of the ? operator and use it in a regular expression
* Define the effect of the + operator and use it in a regular expression
* Define the effect of the . operator and use it in a regular expression
* Define the effect of the ^ operator and use it in a regular expression
* Define the effect of the $ operator and use it in a regular expression
* Define the effect of the [] bracket expression and use it in a regular
  expression
* Define the effect of the - inside brackets and use it in a regular expression
* Define the effect of the ^ inside brackets and use it in a regular expression

________________________________________________________________________________
# HTTP Full-Stack Learning Objectives

Understanding how Node.js handles incoming HTTP requests using the
`IncomingMessage` and `ServerResponse` objects provide a strong foundation of
being able to predict problems when you use frameworks to ease the burden of
writing Web applications. When you complete the associated material for this
lesson, you should be able to:

* Identify the five parts of a URL
* Identify at least three protocols handled by the browser
* Use an `IncomingMessage` object to
  * access the headers sent by a client (like a Web browser) as part of the HTTP
    request
  * access the HTTP method of the request
  * access the path of the request
  * access and read the stream of content for requests that have a body
* Use a `ServerResponse` object to
  * write the status code, message, and headers for an HTTP response
  * write the content of the body of the response
  * properly end the response to indicate to the client (like a Web browser)
    that all content has been written

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
