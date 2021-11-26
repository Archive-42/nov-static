## Authentication Learning Objectives

1. Define the term authentication

- Authentication is concerned with verifying someone is who they say they are. We generally provide a username/email and password to the server.
- This is different from authorization, which is determining if a user is allowed to perform a certain action.

2. Describe the difference between asymmetric and symmetric cryptographic algorithms

- Symmetric algorithms use one key for both encoding and decoding.
- Asymmetric algorithms use two keys (public and private), one for encoding the other for decoding

3. Identify "strong" vs. "broken" hash functions

- "Broken" hash functions have been cracked. The original input to these functions can be determined by the hashed values produced.
  - Examples: md4, md5, sha1
- "Strong" hash functions have not been cracked. Given a hashed value, we cannot (at this point) determine what the original input was without some brute force, trial and error calculations.
  - Examples: sha256, sha512
- Slow algorithms hash inputs sequentially many times. They use a hash function to hash an input value, then take the result and hash it again, repeating this process thousands of times just for one input. These hashing algorithms are computationally expensive and difficult to crack even with large computing power, so they are recommended for use in hashing passwords that we want to store in our database.
  - Examples: PBKDF2, bcrypt, Argon2

4. Implement session-based authentication in an Express application

- We can use the `express-session` package to create session middleware.
- The session will create a cookie that is passed back and forth between the server and client.
- We can set values on our session to indicate that we have been authenticated. On subsequent requests, when we read the cookie we see that we were logged in previously and can see who the user is.
- With each request that comes in, we check if the authorization key has been created on the session previously. If it has been, we find the user's information and add it in to the local response variables in order to be able to use this information in subsequent middleware or routes.

```js
// app.js
// We use the express-session library in order to set up session middleware
const session = require('express-session');
const cookieParser = require('cookie-parser');

const { sessionSecret } = require('./config');
const { restoreUser } = require('./auth');

// We pass in the same secret to our cookieParser as we do to our session middleware
app.use(cookieParser(sessionSecret));
// Our session middleware sets up a name in order to easily identify the cookie that it creates
app.use(
  session({
    name: 'amusement-park-tracker.sid',
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);
// We use our restoreUser middleware (defined in our auth file below) in order to add the whole user instance to our response's locals key, as well as a flag to indicate we have been authenticated. We can use these values in subsequent routes or middleware functions in order to restrict access, provide customized information, etc.
app.use(restoreUser);
```

```js
// auth.js
const db = require('./db/models');

// We signify that a user is logged in by creating an auth key on the request's session.
// In this implementation, we are adding the userId in order to signify who is logged in.
const loginUser = (req, res, user) => {
  req.session.auth = {
    userId: user.id,
  };
};

// Removing the auth key on our session signifies that we are no longer logged in
const logoutUser = (req, res) => {
  delete req.session.auth;
};

// We create a middleware function that can be added to routes that we want to restrict to logged in users
const requireAuth = (req, res, next) => {
  if (!res.locals.authenticated) {
    return res.redirect('/user/login');
  }
  return next();
};

const restoreUser = async (req, res, next) => {
  // Log the session object to the console
  // to assist with debugging.
  console.log(req.session);

  if (req.session.auth) {
    // If we had an auth key, that means we are logged in in. We pull the userId out of auth, then find the user record associated with it.
    const { userId } = req.session.auth;

    try {
      const user = await db.User.findByPk(userId);

      if (user) {
        // If we successfully found the user, we indicate that we are authenticated and add the user information to the response's locals key for use in other middleware/routes
        res.locals.authenticated = true;
        res.locals.user = user;
        next();
      }
    } catch (err) {
      // If we ran into an error finding our user, we indicate we are not authenticated and invoke our error handlers
      res.locals.authenticated = false;
      next(err);
    }
  } else {
    // If we didn't have an auth key at all, we indicate we are not authenticated and continue to the next middleware (or routes)
    res.locals.authenticated = false;
    next();
  }
};

module.exports = {
  loginUser,
  logoutUser,
  requireAuth,
  restoreUser,
};
```

- In a production environment, we would generally store our session information in a database instead of in local memory (the default `MemoryStore`). In order for us to do so, we can use another package, such as `connect-pg-simple`. We have to make sure we are providing environment variables to connect to our database as well as providing a `store` key on our session options to indicate that we are using something other than the default `MemoryStore`

```js
// ./app.js

const express = require('express');
const session = require('express-session');
const store = require('connect-pg-simple');

const app = express();

app.set('view engine', 'pug');
app.use(
  session({
    store: new (store(session))(),
    secret: 'a5d63fc5-17a5-459c-b3ba-6d81792158fc',
    resave: false,
    saveUninitialized: false,
  })
);
```

5. Implement a strong hash function to securely store passwords

- In our express applications, using the `bcryptjs` package is an easy way to hash our passwords and compare passwords for logging a user in.

```js
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
}
```

6. Describe and use the different security options for cookies

- When setting up our session, we can provide a `cookie` key, pointing to an object that specifies options for how our session cookie is set up.
  - httpOnly: prevents JavaScript on the page from accessing the cookie
  - maxAge: sets an expiration for our cookie, which would require the user to re-authenticate
  - path: sets where our cookie is valid. We can make cookies for more specific paths on our app, but the root (`/`) is most common, available throughout the app
  - secure: requires https to be used
  - domain: if not present, the current domain is used by the cookie, but we can also specify a different domain by including this key
  - expires: where maxAge will calculate an expiration time in the future, expires specifies a specific time to expire at

```js
app.use(
	session({
		store: new (store(session))(),
		secret: 'a5d63fc5-17a5-459c-b3ba-6d81792158fc',
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			maxAge: 60000,
			path: '/',
			secure: true
		}
	})
```

## API (Application Programming Interfaces) Learning Objectives

1. Recall that REST is an acronym for Representational State Transfer

2. Describe how RESTful endpoints differ from traditional remote-procedure call (RPC) services

- Remote-procedure call (RPC) services mirror methods on objects. They usually specify the method name in the URL, such as `/getTweetById`, with parameters being passed in through a query string, `http://localhost/getTweetById?id=12`.
- With RPC, we end up with many routes with custom names, unlike the conventions observed in RESTful routes. This means we have to be very familiar with the API in order to use it effectively, as well as necessitating more documentation.
- RPC can be convenient in that the URL tells you exactly what is happening, rather than inferring it like with RESTful conventions. It can also be more convenient in getting related information instead of nesting routes, such as `http://localhost/getCommentsForTweetWithId?id=12`. The name is much more complicated, but tells you exactly what it does.
- Many times the choice is preference, not strictly which is better/worse. RESTful is more common and the convention over configuration ideas are great for building consistent, predictable applications. It's what we'll be using throughout the course.

3. Identify and describe the RESTful meanings of the combinations of HTTP verbs and endpoint types for both HTML-based applications and APIs

- HTTP verbs: GET, POST, PUT, PATCH, and DELETE
- Endpoint types: collections of resources and singular resources

| HTTP Verb | Collection URL Meaning (`/posts`)    | Single-Resource URL Meaning (`/posts/19`) |
| --------- | ------------------------------------ | ----------------------------------------- |
| GET       | Get "all" of the specified resources | Get the details of the resource           |
| POST      | Create a new resource                | n/a                                       |
| PUT       | n/a                                  | Replace the resource                      |
| PATCH     | n/a                                  | Update the resource                       |
| DELETE    | Delete all of the resources          | Delete the specified resource             |

4. Recall that RESTful is not a standard (like ECMAScript or URLs), but a common way to organize data interactions

5. Explain how RESTful APIs are meant to be stateless

- This lends itself well to a typical HTTP implementation. Each interaction between the server and client is independent of each other. We do not need to maintain a session, we can make short, discrete requests.

6. Given a data model, design RESTful endpoints that interact with the data model to define application functionality
   ![RESTful routes](RESTful-routes-source.png)

- Get all of the posts: `GET /posts`
- Get a specific post: `GET /posts/1`
- Create a new post: `POST /posts`
- Delete a specific post: `DELETE /posts/1`
- Update a specific post: `PATCH /posts/1` (or `PUT` to replace)
- Get all comments on a post: `GET /posts/1/comments`
- Get a specific comment: `GET /comments/1`
- Create a comment on a post: `POST /posts/1/comments`
- Delete a specific comment: `DELETE /comments/1`
- Update a specific comment: `PATCH /comments/1` (or `PUT` to replace)

7. Use the express.json() middleware to parse HTTP request bodies with type application/json

- In order for us to use json that has been sent in the body of a request, we have to parse the data with middlware. Without parsing the body, it will appear empty. Express has a built in middleware function to parse json, so we can add it in to the top level of our application in order to parse all requests that come in with json-formatted bodies.

```js
app.use(express.json());
```

8. Determine the maximum data an API response needs and map the content from a Sequelize object to a more limited data object

- We often don't need to send back to the client _all_ of the information that's been provided to us from our database query. We may have extra information that is just unnecessary or could even be a security risk to send in our response (we probably don't want to send the user's hashedPassword on a response, for example).
- We can specify what properties of our Sequelize object that we want to send back instead of sending the entire object.
- In this example, after signing a user up for our app and creating a token, we send back the token and only the id of the user in the response.

```js
router.post(
  '/',
  check('username').exists({ checkFalsy: true }).withMessage('Please provide a username'),
  validateEmailAndPassword,
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, hashedPassword });

    const token = getUserToken(user);
    res.status(201).json({
      user: { id: user.id },
      token,
    });
  })
);
```

9. Define a global Express error handler to return appropriate responses and status codes

- This is primarily review from last week.
- We can define a middleware to catch unhandled routes and throw a 404 error.
- We can define an error handler that catches Sequelize validation errors and maps the messages to an errors array.
- We include a generic error handler at the end which will catch any errors, whether they have been manipulated by our previous handlers or not, and responds with an appropriate status and information about the error. Here we can also tailor the response based on whether or not we are in a production environment (not passing the stack trace to end-users in production, for example)

```js
// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

// Error handlers. (must have all four arguments to communicate to Express that
// this is an error-handling middleware function)

// Process sequelize errors
app.use((err, req, res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Sequelize Error';
  }
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === 'production';
  res.json({
    title: err.title || 'Server Error',
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});
```

## API Security Learning Objectives

1. Define Cross-Origin Resource Sharing (CORS) and how it is implemented in some Web clients

- Cross-Origin Resource Sharing is the process of accessing resources located at a different origin from the application making the request. An origin is the combination of three components:
  1. Protocol
  2. Domain
  3. Port
- With CORS, we have the concept of "simple" requests, which will be sent to the server immediately, and then "preflighted" requests.
- In order for a request to be considered simple, it has to meet certain criteria:
  - The HTTP method has to be either `GET`, `HEAD`, or `POST`
  - It can only use safe-listed request headers:
    - accept
    - accept-language
    - content-language
    - content-type
    - width
    - viewport-width
    - (a few more less common)
  - The `content-type` can only be `application/x-www-form-urlencoded`, `multipart/form-data`, or `text/plain`
- If a request fails any of these criteria, it is a "preflighted" request. Before sending our request to the server, the browser makes an initial "preflight" check. It sends a request with the HTTP verb `OPTION`, which hits the server and determines if the response is CORS-compliant. If it is, it then sends the original request.

2. Explain that CORS is an opt-in feature of Web clients

- Browsers implement CORS policies themselves. If a request resulting in CORS is made from a browser that implements CORS policies and the server responding has not signified that it allows CORS, the response's body is stripped by the browser, preventing the user from seeing the content of the response.
- Important takeaway is that browsers such as Chrome or Firefox are the ones enforcing these policies in an attempt to protect their users.

3. Configure your API to use CORS to prevent unauthorized access from browser-based Web requests

- We can use the `cors` package, which provides us middleware for our application.
- We can add the middleware to specific routes, or use it on the application in general.
- The easiest way to use CORS is to apply it as generic middleware to our application, then provide it the origin that we are allowing requests to come from.

```js
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:4000' }));
```

4. Explain the fundamental concepts of OAuth as a way to authenticate users

- OAuth is a method of authenticating users using credentials from other applications. The user grants us permission to connect to the third-party application, then the application sends us a token that we can use on future requests in order to verify that we have been authorized. We can ask specify the scope of access that the user grants us, such as giving us basic user information or permissions to interact with the other application in some capacity.

5. Describe the workflow of OAuth resource owner password credentials grant (RFC 6749 Section 4.3)

![oauth_flow](./oauth_flow.png)

1. We ask the user for permission to connect to the third-party.
2. The user grants us permission in their response to our server.
3. We send along the authorization grant to the third-party's authorization server.
4. The authorization server checks the authorization grant and sends back a token that we can use for future requests to the resources server for this user's data.
5. We send a request to the third-party's resource server for whatever information we may need related to the user, providing the token that we were issued for the specific user.
6. The resource server checks the token and then sends back the requested information.

7. Describe the components of a JSON Web Token (JWT) and how it is constructed

- Three components of a JWT
  - Header
    - typ: identifies the type of token ("JWT")
    - alg: identifies the signature's hashing algorithm
  - Payload
    - Contains all of the information that we want the JWT to include.
    - We can specify any kind of data that we want here. Adding information that we will be using regularly about the user (username, roles, etc.) can be helpful so that we aren't constantly querying the database.
    - There are several predefined claims that we can specify to give standard information about the JWT, as well
  - Signature
    - Cryptographically signed header and payload.
- When the server receives a JWT, it regenerates the signature by hashing the header and payload together using the algorithm specified by the header, then comparing the result to the signature that was passed with the request. If the two match, we know the JWT was not modified.

7. Configure an Express application to use token-based authentication

- We use two packages in our server in order to work with JWTs in our applications: `jsonwebtoken` and `express-bearer-token`
  - `jsonwebtoken` will be used to sign and verify our tokens
  - `express-bearer-token` will be used to extract the token from headers (looks for an `Authorization` key and ) and set it as a `token` key on the request object
- To create a token we use the `sign` method on our jwt, passing in the payload to encode, the secret that we are using for encoding, and options to add to our JWT, especially of note is an expiresIn, which will allow us to set an expiry time for our authentication:

```js
const getUserToken = (user) => {
  // Don't store the user's hashed password
  // in the token data.
  const userDataForToken = {
    id: user.id,
    email: user.email,
  };

  // Create the token.
  const token = jwt.sign(
    { data: userDataForToken },
    secret,
    { expiresIn: parseInt(expiresIn, 10) } // 604,800 seconds = 1 week
  );

  return token;
};
```

- To decode a token, we use the `verify` method on our jwt. We must have first invoked our bearerToken middleware in order to get the token information onto our request object, but after doing so we can pass the token and secret to the `verify` function and use the result's payload to extract the data we originally stored there:

```js
const restoreUser = (req, res, next) => {
  // token being parsed from request header by the bearerToken middleware
  // function in app.js:
  const { token } = req;

  if (!token) {
    return res.set('WWW-Authenticate', 'Bearer').status(401).end();
  }

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      err.status = 401;
      return next(err);
    }

    const { id } = jwtPayload.data;

    try {
      req.user = await User.findByPk(id);
    } catch (e) {
      e.status = 401;
      return next(e);
    }

    if (!req.user) {
      // Send a "401 Unauthorized" response status code
      // along with an "WWW-Authenticate" header value of "Bearer".
      return res.set('WWW-Authenticate', 'Bearer').status(401).end();
    }

    return next();
  });
};
```

- How we handle the token in terms of storage can vary (cookies vs. localStorage). Using localStorage is a very common approach, however, that allows us to set headers on our frontend to attach the authorization token on future requests to our backend server.
  - After logging in, our frontend can set a localStorage item
  ```js
  localStorage.setItem('TWITTER_LITE_ACCESS_TOKEN', token);
  ```
  - When we make a request to our backend, we can provide the token in a header
  ```js
  const res = await fetch('http://localhost:8080/tweets', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('TWITTER_LITE_ACCESS_TOKEN')}`,
    },
  });
  ```
