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
