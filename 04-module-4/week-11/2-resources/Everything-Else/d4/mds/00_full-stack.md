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
