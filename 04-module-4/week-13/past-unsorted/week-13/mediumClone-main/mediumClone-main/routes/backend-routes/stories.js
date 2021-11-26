const express = require('express');
const { check } = require('express-validator');
const {
  asyncHandler,
  handleValidationErrors,
  checkForStory,
  checkForUser,
  deleteForStory,
  storyInclude,
 } = require('../../utils');
const db = require('../../db/models');
const { sequelize } = require('../../db/models');
const { Story, Comment, Like, Bookmark, User } = db;

const router = express.Router();



const authorValidation = [
  // MIRA Tested
  check('authorId')
    .exists({ checkFalsy: true })
    .withMessage('Your story must specify the author.')
];

const storyValidations = [
  // MIRA Tested
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Your story must have a title')
    .isLength({ max: 255 })
    .withMessage('Your title may not be longer than 255 characters.'),
  // MIRA Tested
  check('body')
    .exists({ checkFalsy: true })
    .withMessage('Your story needs a body.')
];

// Get all Stories
// Include Author (id, firstName, lastName),
//    Comments (id, body, userId),
//    Likes (id, userId)
router.get(
  '/stories',
  asyncHandler(async (req, res) => {
    let stories = await Story.findAll({
      include: storyInclude,
      order: [['createdAt', 'DESC']]
    })
    res.json(stories);
  })
);


// Get all Stories by Author
router.get("/users/:id/stories",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    let stories = await Story.findAll({
      where: { authorId: req.params.id },
      include: storyInclude,
      order: [['createdAt', 'DESC']]
    })
    res.json(stories)
  })
)

router.get("/stories/trending", asyncHandler(async (req, res) => {
  let stories = await Story.findAll({
    include: storyInclude,
    order: sequelize.random(),
    limit: 6,
  })
  res.json(stories)
}))

// TODO MIRA I just barfed this real quick, untested, haven't done includes
// Get all stories by User Follows
router.get("/users/:id(\\d+)/follows/stories",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    const follows = await Follow.findAll({
      where: { followerId: req.params.id },
      order: [['createdAt', 'DESC']]
    })
    const followedAuthorIds = follows.map(follow => {
      return follow.followingId
    })
    followedAuthorIds.map(authorId => {
      Stories.findAll({
        where: { authorId }
      })
    })
    res.json(followedAuthorIds)
  })
)

// Get a Story by id
// MIRA Tested
// Existing story: gets story
// Non-existing story: 404 Story Not Found
// Non-integer story id: 404 Generic Not FOund

router.get('/stories/:id(\\d+)',
  asyncHandler(checkForStory),
  asyncHandler(async (req, res) => {
    const story = await Story.findByPk(req.params.id, {
      include: [{
        model: User,
        as: "Author",
        attributes: ["id", "firstName", "lastName"]
      }, {
        model: Comment,
        attributes: ["id", "body", "createdAt", "updatedAt", "userId"],
        include: {
          model: User,
          attributes: ["id", "firstName", "lastName"]
        }
      }, {
        model: Like,
        attributes: ["id"],
        include: {
          model: User,
          attributes: ["id", "firstName", "lastName"]
        }
      }],
      order: [['createdAt', 'DESC']]
    }
    )
    res.json(story)
  })
);

// MIRA Tested
// Valid body: 201, creates story (non-unique allowed)
// No body: 400 Bad Request, error messages 'must have title', 'must have author', 'must have body'
// Empty string body content: 400 Bad Request "Must have body"
router.post(
  '/stories',
  authorValidation,
  storyValidations,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { title, body, authorId } = req.body;
    const author = await User.findByPk(authorId, {
      order: [['createdAt', 'DESC']]
    })
    if (author) {
      const story = await Story.create({ title, body, authorId });
      res.status(201).json(story);
    } else {
      story
    }
  })
);


// Update a Story by id
// MIRA Tested
// Existing story, valid body: updates story contents
// No body: 400 Bad Request, error messages 'must have title', 'must have body'
// Body with only title: 400 Bad Request, error message 'must have body'
// Body with empty string contents: 400 Bad Request, 'must have body'
// Non-existing story: 404 Story Not Found
// Non-integer story id: 404 Generic Not Found
router.patch(
  '/stories/:id(\\d+)',
  asyncHandler(checkForStory),
  storyValidations,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { title, body, } = req.body;
    const updatedStory = await req.story.update({ title, body });
    res.json(updatedStory);
  })
);

// Delete a Story and associated dependencies by Story id
// MIRA Tested
// Existing story: 204 deletes story
// Non-existing story: 404 Story not found
// Non-integer story id: 404 Generic not found

router.delete(
  '/stories/:id(\\d+)',
  asyncHandler(checkForStory),
  asyncHandler(async (req, res) => {
    await deleteForStory(req.params.id, Comment)
    await deleteForStory(req.params.id, Like)
    await deleteForStory(req.params.id, Bookmark)

    await req.story.destroy();
    res.status(204).end();
  })
);





module.exports = router;
