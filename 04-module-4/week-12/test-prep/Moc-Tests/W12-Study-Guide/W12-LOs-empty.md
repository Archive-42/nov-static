## Assessment Format
- 20-25 Multiple Choice questions
- 1-2 Short Free Response questions
- No code is going to be written
- 30 minutes overall

## Authentication Learning Objectives
1. Define the term authentication
2. Describe the difference between asymmetric and symmetric cryptographic algorithms
3. Identify "strong" vs. "broken" hash functions
4. Implement session-based authentication in an Express application
  - see code block in `explained`
  - recognize important aspects such as which libraries we have to use, functions that we create, etc.
5. Implement a strong hash function to securely store passwords
  - see code block in `explained`
  - recognize important aspects such as which libraries we have to use, functions that we create, etc.
6. Describe and use the different security options for cookies
  - know the major options that are available for us to specify within our session's cookie

## API (Application Programming Interfaces) Learning Objectives
1. Recall that REST is an acronym for Representational State Transfer
2. Describe how RESTful endpoints differ from traditional remote-procedure call (RPC) services
3. Identify and describe the RESTful meanings of the combinations of HTTP verbs and endpoint types for both HTML-based applications and APIs
  - HTTP verbs: GET, POST, PUT, PATCH, and DELETE
  - Endpoint types: collections of resources and singular resources

| HTTP Verb | Collection URL Meaning (`/posts`)    | Single-Resource URL Meaning (`/posts/19`) |
|-----------|--------------------------------------|-------------------------------------------|
| GET       |                                      |                                           |
| POST      |                                      |                                           |
| PUT       |                                      |                                           |
| PATCH     |                                      |                                           |
| DELETE    |                                      |                                           |

4. Recall that RESTful is not a standard (like ECMAScript or URLs), but a common way to organize data interactions
5. Explain how RESTful APIs are meant to be stateless
6. Given a data model, design RESTful endpoints that interact with the data model to define application functionality

![RESTful routes](RESTful-routes-source.png)
- Get all of the posts: 
- Get a specific post: 
- Create a new post: 
- Delete a specific post: 
- Update a specific post: 
- Get all comments on a post: 
- Get a specific comment: 
- Create a comment on a post: 
- Delete a specific comment: 
- Update a specific comment: 
7. Use the express.json() middleware to parse HTTP request bodies with type application/json
8. Determine the maximum data an API response needs and map the content from a Sequelize object to a more limited data object
9. Define a global Express error handler to return appropriate responses and status codes


## API Security Learning Objectives
1. Define Cross-Origin Resource Sharing (CORS) and how it is implemented in some Web clients
2. Explain that CORS is an opt-in feature of Web clients
3. Configure your API to use CORS to prevent unauthorized access from browser-based Web requests
4. Explain the fundamental concepts of OAuth as a way to authenticate users
5. Describe the workflow of OAuth resource owner password credentials grant (RFC 6749 Section 4.3)
6. Describe the components of a JSON Web Token (JWT) and how it is constructed
7. Configure an Express application to use token-based authentication