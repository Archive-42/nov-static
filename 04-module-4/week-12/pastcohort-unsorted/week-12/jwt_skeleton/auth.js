const jwt = require('jsonwebtoken');
const secret = 'dhu48a82374537ugs';
const expiresIn = 604800;

function generateUserToken(user) {
  // create the desired payload for token
  // create and return the token
}

function requireAuth(req, res, next) {
  // destructure token from the the request object
  // express-bearer-token middleware will put it there by parsing the token out of the incoming request
  // if no token, create an unauthorized error and forward to error handlers
  // attempt to verify the token (jwt.verify)
}

module.exports = { requireAuth, generateUserToken };
