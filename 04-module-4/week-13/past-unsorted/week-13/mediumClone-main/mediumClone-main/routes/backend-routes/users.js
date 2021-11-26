const bcrypt = require("bcryptjs")
const express = require("express")
const { check } = require("express-validator")
const {
  asyncHandler,
  handleValidationErrors,
  checkForUser
} = require("../../utils")
const { makeUserToken, requireAuthentication } = require("../../auth")
const { User, Story, Comment, Like, Bookmark, Follow } = require("../../db/models")
// const { values } = require("sequelize/types/lib/operators")
// const { Model } = require("sequelize/types")
const usersRouter = express.Router()

const nameValidators = [
  // MIRA Tested
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please give us a first name.")
    .isLength({ min: 1, max: 40 })
    .withMessage("A first name must be between 1 to 40 characters in length."),
  // MIRA Tested
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please give us a last name.")
    .isLength({ min: 0, max: 40 })
    .withMessage("A last name can't be longer than 40 characters in length."),
]

const emailValidator = [
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please give us an email.")
    .isEmail()
    .withMessage("Please give us a valid email address.")
    .isLength({ max: 80 })
    .withMessage("An email can't be longer than 80 characters in length.")
    .custom(async (val, {req}) => {
      let emailExists = await User.findOne({where: {email: val}})
      if(emailExists){
        throw new Error("Email is in use")
      }
    })
]
const passwordValidator = [
  // MIRA Tested
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please give us a password.")
    .isLength({ min: 10, max: 20 })
    .withMessage("A password must be between 10 to 20 characters in length.")
    .custom((val, {req}) => {
      if(val !== req.body.confirmPassword) {
        throw new Error('Passwords do not match')
      }else{
        return val;
      }
    })
]

// Get User by id
// Existing user: gets User, including sensitive data
// Non-existing user: 404 User not found
// Non-integer user: 404 Generic Not Found
usersRouter.get("/:id(\\d+)",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    // req.user.stories = await Story.findAll({
    //   where: { authorId: req.params.id },
    //   attributes: ["id", "title", "createdAt"]
    // })
    res.json(req.user)
  })
)

// Create a new User.
// Valid body: 201 Creates user
// No body: 400 Bad Request, error messages 'needs first name, valid email, etc.'
usersRouter.post("/",
  nameValidators,
  emailValidator,
  passwordValidator,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      firstName, lastName, email, hashedPassword
    })
    const token = makeUserToken(newUser) // TODO Implement auth AFTER routes.
    res.status(201).json({ token, newUser })
  })
)

// Create a new JWT token for a user on login(?)
usersRouter.post("/token",
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user || !user.validatePassword(password)) {
      const err = new Error("The login failed.")
      err.title = "401 Login Failed"
      err.status = 401
      err.errors = ["The provided credentials are INVALID."]
      return next(err)
    }
    const token = makeUserToken(user)
    await res.json({ token, user })
  })
)

// Edit User data by id.
// Existing user, valid body: Updates user information, returns user with sensitive data
// Existing user, No body: 400 Bad Request, error messages 'need a name, last name, email...'
// Non-existing user: 404 User Not Found
// Non-integer user id: 500 Server Error, 'invalid input syntax'
usersRouter.patch("/:id(\\d+)",
  asyncHandler(checkForUser),
  nameValidators,
  emailValidator,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { firstName, lastName, email } = req.body
    await req.user.update({ firstName, lastName, email })
    res.json(req.user)
  })
)

// TODO MIRA How to handle changing passwords.

// Delete User by id
// Existing user, no dependencies: 204
// Existing user, dependendies: 500 Server Error, 'update or delete violates constraint'
// Non-existing user: 404 User Not Found
// Non-integer user id: 404 Generic not found
usersRouter.delete("/:id(\\d+)",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    await req.user.destroy()
    res.status(204).end()
  })
)


module.exports = usersRouter
