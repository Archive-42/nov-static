const express = require('express');
const bcrypt = require('bcryptjs');
const bearerToken = require('express-bearer-token');
const { User } = require('../models');
const { generateUserToken, requireAuth } = require('../auth');
const router = express.Router();

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.use(express.json());
router.use(bearerToken());

router.post(
  '/',
  asyncHandler(async (req, res) => {
    // create a new user
    // generate a token to send in our response
  })
);

// create a protected route

router.get('/currentUser', requireAuth, (req, res) => {
  // send a json response with the current user
});
module.exports = router;
