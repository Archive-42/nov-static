# Week 12 Learning Objectives

## Professional Development (not on assessment)
### What is Scrum?
- no standard process. scrum is a framework for organizing and managing work
    - flexible, many aspects vary from team to team
### Scrum roles
- product owner: directs the highest priority development of the product
- scrum master: helps the team follow its process and be most efficient
- development team completes the work that the product owner specifies
### Scrum terminology
- backlog: list of features to be implemented
- grooming: managing the backlog, ensuring it is up-to-date and in prioritized order
- sprint: some amount of time during which the Scrum process is run
- sprint planning: team forecasts how many features they will be able to complete within a predetermined amount of time
- daily scrum: meeting that the Scrum team attends to communicate its activities and blockers
- show and tell: allows a larger group visibility into the products of the sprint
- retrospective: allows the team to determine process improvements
- backlog grooming: ensures that backlog of stories is well ordered and defined
### Sprint process
- timebox: a time frame with specific start and end dates, during which the team is expected to work at a sustainable pace to complete a chosen set of work that aligns with a sprint goal. benefits include:
    - establish work-in-progress (WIP) limits
    - prioritize and perform the small amount of work that matters most
    - demonstrate relevant progress by completing and validating important pieces of work
    - avoid unnecessary perfectionism
    - motivates closure
    - improves predictability
- sprints have short durations:
    - generate fast feedback
    - allow for early and more frequent deliverables
    - bound error
    - multiple, meaningful checkpoints
- sprints have a consistent duration (within a team) unless there is a compelling reason for change
- each sprint has a single clear focus
- 'done' can mean different things for different teams
### User stories
- product backlog items (PBIs): placeholders for requirements, instead of compiling a large inventory of detailed requirements up front
    - when a pbi is small and detailed enough, it can be moved to a sprint, where it will be designed, built and tested
- user stories are crafted in a way that makes them understandable to both business people and technical people.
- the card:
    - "as a-I want-so that" format
    - specifies a class of users (the user role), what that class of users wants to achieve (the goal), and why the users want to achieve the goal (the benefit)
- the conversation:
    - an ongoing dialogue, writing the user story, refining it, diving into task level details, etc.
    - may lead to a UI sketch, or an elaboration of business rules that gets written down
- the confirmation:
    - conditions of satisfaction
    - these are high-level acceptance tests—not identical to the detailed technical tests (of which there will be orders of magnitude more)
- good stories are:
    - Independent of one another
    - Negotiable
    - Valuable to the people using the product
    - Estimable by the development team
    - Small enough to fit in a sprint
    - Testable to know when its done

## Authentication Objectives
- cryptography is a way to use algorithms and secret keys to keep information secure.
- encryption is the process of translating something that's readable into something that looks like nonsense (i.e. not readable) and being able to translate it from a non-readable state back into something that's readable
### Define the term authentication
- authentication is about identity
    - username and password
    - (2 factor) also uses secret code in a text or from an app
    - more specifically, authentication is the process of identifying a user. to authenticate a user, a key and a secret is required.
        - the key is typically a username or an email address.
        - the secret is typically a password.
- authorization is about what a given user is allowed to do—prevents typical users from accessing or changing information they don't have permission for
- session-based authorization
    - starts by sending a cookie, which gets stored in the user's page til it expires
### Describe the difference between asymmetric and symmetric cryptographic algorithms
- a symmetric algorithm uses a single piece of information to encrypt and decrypt the information
- an asymmetric algorithm uses two distinct pieces of information for encryption/decryption, one public key and one private
    - public key encrypts: it can be shared with anyone wanting to encrypt a message for a given recipient
    - private key decrypts: only the single recipient will ever have access to it
- HTTPS:
    - The server passes on its public key to encrypt data along with its SSL certificate.
    - The browser client uses the server's public key to encrypt a value and generate a new private key.  -
    - The client sends the encrypted value and the client's new private key to the server.
    - The browser's private key is used to decrypt messages that have been encrypted with the server's public key.
    - The server sends encrypted data to the client using the client's public key.
    - The browser decrypts the data from the server and renders the decrypted information.
### Identify "strong" vs. "broken" hash functions
- strong hash functions
    - computationally expensive
    - "slow" algorithms e.g. PBKDF2, bcrypt, argon2
- broken hash functions
    - weak because they have been totally solved. for every output hash, there exists a lookup table where people have already found an input that yields that output
    - so an [] could see the output hash of someone's password, and use the other
- hash collision
    - when two inputs yield the same output, this is a collision. this can happen because hashes our lossy
### Implement session-based authentication in an Express application
### Implement a strong hash function to securely store passwords
- using crypto library to select from all available hashing libraries:
```javascript

const crypto = require('crypto');
// broken algorithm
const hasher = crypto.createHash('sha512');
hasher.update('this is my secret message');
const digest = hasher.digest();
console.log(digest.toString('base64'));

// strong pbkdf2
const password = 'my secret password';
const util = require('util');
const salter = util.promisify(crypto.randomBytes);
const hasher = util.primisify(crypto.pbkdf2);

(async () => {
    const salt = await salter(64);
    const hashedPassword = await hasher(
        password,
        salt,
        10000,
        64,
        'sha512'
    );
    const salts = salt.toString('base64');
    const pwds = hashedPassword.toString('base64');
    const hashedPwdForDb = `${salts}:${pwds}`;
    console.log(hashedPwdForDb);
})
```
- using bcrypt to hash user passwords:
```javascript
const bcrypt = require('bcryptjs');
// salt automatically based on number of saltrounds
const saltRounds = 10;
const hash = await bcrypt.hash(password, saltRounds);
// manually generates salt based on number of saltrounds
const saltRounds = 10;
const salt = await bcrypt.genSalt(saltRounds);
const hash = await bcrypt.hash(password, salt);
//
const isPassword = await bcrypt.compare(password, hash);

// full implementation
const bcrypt = require('bcryptjs');

async function getHash(password, saltRounds) {
  const hash = await bcrypt.hash(password, saltRounds);
  console.log(hash);
  return hash;
}

async function isPassword(password, hash) {
  const isPassword = await bcrypt.compare(password, hash);
  console.log(isPassword);
  return isPassword;
};

(async () => {
  const hashedPassword = await getHash('P@ssw0rd', 10);
  const passwordIsMatch = await isPassword('P@ssw0rd', hashedPassword);
})();


// annnd for argon2
const password = 'my secret password';
(async () => {
    const argon2= require('argon2');
    const hashedPwdForDb = await argon2.hash(password);
    console.log(hashedPwdForDb);
})

async function checkPassword(password, hashedPwdForDb) {
    // Backwords from the function signature
    return await argon2.verify(hashedPwdForDb, password);
}
```
### Describe and use the different security options for cookies

## Application Programming Interfaces Objectives
### Recall that REST is an acronym for Representational State Transfer
- cool i'll remember that thanks
### Describe how RESTful endpoints differ from traditional remote-procedure call (RPC) services
- RPCs are more like methods on objects than database operations—they often specify the method name in the url (e.g. `http://localhost/getTweetById?id=12`, instead of the RESTful `http://localhost/tweets/12`)
- RPCs can offer convenience because it's more transparent what a given url will return for you, and the paths are more straightforward. but RPC requires more documentation than RESTful to know all the different methods that are available
### Identify and describe the RESTful meanings of the combinations of HTTP verbs and endpoint types for both HTML-based applications and APIs
#### HTTP verbs: GET, POST, PUT, PATCH, and DELETE
| Method | Meaning                      |
|--------|------------------------------|
| GET    | Get one or some resources    |
| POST   | Create a resource            |
| PUT    | Update a resource            |
| DELETE | Delete one or some resources |
#### Endpoint types: collections of resources and singular resources
### Recall that RESTful is not a standard (like ECMAScript or URLs), but a common way to organize data interactions
- cool i'll recall that thanks
### Explain how RESTful APIs are meant to be stateless
- every HTTP request happens in isolation. every HTTP request includes all the information necessary for the server to fulfill that request
### Given a data model, design RESTful endpoints that interact with the data model to define application functionality

### Use the `express.json()` middleware to parse HTTP request bodies with type `application/json`
### Determine the maximum data an API response needs and map the content from a Sequelize object to a more limited data object
### Define a global Express error handler to return appropriate responses and status codes given a specific Accept header in the HTTP request
### Define Cross-Origin Resource Sharing (CORS) and how it is implemented in some Web clients
- by default a web application running in the browser can only access API resources from the same origin
- an API can be configured to use Cross-Origin Resource Sharing (CORS) to grant web applications from a different origin access to some or all of its resources.
- cors npm package is a piece of middleware to enable cross-origin resource sharing
### Explain that CORS is an opt-in feature of Web clients
### Configure your API to use CORS to prevent unauthorized access from browser-based Web requests

## API Security Objectives
### Explain the fundamental concepts of OAuth as a way to authenticate users
- application: the client or app that wants to have access to information from a user's account on another site
- user: the owner of the protected resource
- service API: includes the authorization server (responsible for authorizing the application) and the resource server ()
- steps
    - redirect to special OAUTH login page
    - handle redirect from OAUTH server
    - use code from OAUTH server to POST a requiest to their special auth token url
    - get auth token from the response
    - put the auth token in a cookie or header
### Describe the workflow of OAuth resource owner password credentials grant (RFC 6749 Section 4.3)
- Your application requests authorization from the person
- The person informs the authorization server that they want to issue an authorization grant - for your application
- The application uses the authorization grant with its secret information to request an access token
- The authorization server returns an access token
- Your application uses the access token to gain access to the user's data from the service API
- The service API returns the resource that the token allows access to
### Describe the components of a JSON Web Token (JWT) and how it is constructed
- jwt allow you to identify that a user is logged in without requiring the server to store anything
- verifiable and trusted exchange of information
- transmittable through the url, a post, or http request header
- self-contained: all the information you need to know whether it's legit is inside it
- json web tokens do not hide or obscure data
- 3-part structure:
    - header: identifies type of token and signature alorithm
        - e.g. `{ "typ": "JWT", "alg": "HS256" }`
    - payload: contains all of the information that the jwt uses to pass information. information inside is called "claim"
        - predefined claims (not required): `iss` (issuer), `sub` (subject), `aud` (intended recipients/audience), `exp` (expiration), `nbf`, `iat`, `jti`
    - signature:
### Configure an Express application to use token-based authentication and authorization using OAuth resource owner password credentials grant
- started to put all the code below, but then that got too complicated
```javascript
// Application uses the authorization grant
const fetch = require('node-fetch');
const qs = require('querystring');

const options = {
  method: 'POST',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  body: qs.stringify({
    grant_type: 'authorization_code',
    client_id: `${mymint.com_client_id}`,
    client_secret: `${mymint.com_client_secret}`,
    code: `${authorization_code}`,
    redirect_uri: 'https://mintmint.com/callback-time' // same callback_url you provided
  })
};
const url = 'https://authorization.chase.com/oauth/token';
const response = await fetch(url, options);
const data = await response.json();
console.log(data);
```

```javascript
// Authorization server issues an access token
// response looks like this
{
  "access_token": "eyJz93ak4laUWw",
  "refresh_token": "GEbRxBNedjnXbL",
  "id_token": "eyJ0XAi4faeEoQ",
  "token_type": "Bearer"
}
```

```javascript
// access token is used

// i don't understand what the line directly below does?
var request = require("node-fetch");

const url = 'https://resources.chase.com/api/johnny/transactions';
const options = {
  headers: {
    'content-type': 'application/json',
    'authorization': `Bearer ${access_token}`
  }
};

const response = await fetch(url, options);
const data = await response.json();
console.log(data);
```


- code dump from token auth example
```javascript
// this is in utils.js in the project root folder
const { validationResult } = require("express-validator");
const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  // If the validation errors are empty,
  if (!validationErrors.isEmpty()) {
    // Generate an array of error messages
    const errors = validationErrors.array().map((error) => error.msg);

    // Generate a new `400 Bad request.` Error object
    // and invoke the next function passing in `err`
    // to pass control to the global error handler.
    const err = Error("Bad request.");
    err.status = 400;
    err.title = "Bad request.";
    err.errors = errors;
    return next(err);
  }

  // Invoke the next middleware function
  next();
};

module.exports = { asyncHandler, handleValidationErrors };
```
```javascript
//- ./routes/tasks.js

const express = require("express");
const db = require("../db/models");
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../utils");

// REST OF FILE NOT SHOWN
```
