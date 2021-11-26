const express = require('express');
const { check } = require('express-validator');
const db = require('../../db/models');
const { Comment, Story, User } = db;
const {
  asyncHandler,
  handleValidationErrors,
  checkForStory,
  checkForUser,
  checkForComment,
  storyInclude
} = require('../../utils');
const router = express.Router();

const commentValidator = [
  check('body')
    .exists({
      checkNull: true,
      checkFalsy: true
    })
    .withMessage('Your comment must have a body')
];

// Get a Comment by id
// Existing comment: gets comment
// Non-existing Comment: 404 Comment Not Found
// Non-integer Comment id: 404 Generic Not Found
router.get('/comments/:id(\\d+)',
  asyncHandler(checkForComment),
  asyncHandler(async (req, res) => {
    const comment = await Comment.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["id", "firstName", "lastName"] },
        { model: Story, attributes: ["id", "title", "createdAt", "authorId"] }
      ]
    })
    comment.Story.Author = await User.findByPk(comment.Story.authorId,
      { attributes: ["id", "firstName", "lastName"] }
    )
    res.json(comment)
  })
)

// Get all Comments by a User by id
// Existing user: Gets list of User's comments
// Non-existing user: 404 User Not Found
// Non-integer user id: 404 Generic Not Found
router.get('/users/:id(\\d+)/comments',
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    let userComments = await Comment.findAll({
      where: { userId: req.params.id },
      include: [{
        model: Story,
        attributes: ["id", "title", "authorId", "createdAt"],
        include: storyInclude
      }]
    });
    res.json(userComments)
  })
)

// Get all Comments for a Story by id
// Existing story: Gets list of Story's comments
// Non-existing story: 404 Story Not Found
// Non-integer story: Generic Not Found
router.get(
  '/stories/:id(\\d+)/comments',
  asyncHandler(checkForStory),
  asyncHandler(async (req, res) => {
    storyComments = await Comment.findAll({
      where: { storyId: req.params.id },
      include:
        { model: User, attributes: ["id", "firstName", "lastName"] },
      order: [['createdAt', 'DESC']]
    });
    res.json(storyComments)
  })
)


// Post a new Comment to a Story by id
// MIRA Tested
// Existing story/user and body: makes post
// Non-existing user: 500
// Non-existing story: 404 Story Not Found
// Non-integer story id: 404 Not found
// Non-integer user id: 500 Server Error
// No body: 500 Server Error, Comment.body can't be null
// Body is empty string: 400 Bad Request, error message from validator
router.post(
  '/stories/:id(\\d+)/comments',
  asyncHandler(checkForStory),
  commentValidator,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { body, userId } = req.body;
    const comment = await Comment.create({
      body, userId, storyId: req.params.id
    });
    res.json(comment);
  })
);

// Update Comment by id
// Existing comment, valid body: updates comment.
// Non-existing comment: 404 Comment Not Found
// Non-integer comment id: 404 Generic Not Found
// Existing comment, no body: 400 Bad Request, "Your comment must have body"
// Existing comment, empty string body: 400 Bad Request, "Your comment must have body"
router.patch(
  '/comments/:id(\\d+)',
  commentValidator,
  handleValidationErrors,
  asyncHandler(checkForComment),
  asyncHandler(async (req, res) => {
    const { body } = req.body;
    const updatedComment = await req.comment.update({ body });
    res.json(updatedComment);
  })
);

// Delete a Comment by id
// Existing comment: 204 deletes comment
// Non-integer Comment id: 404 Generic Not Found
// Non-existing Comment: 404 Comment Not Found
router.delete(
  '/comments/:id(\\d+)',
  asyncHandler(checkForComment),
  asyncHandler(async (req, res) => {
    await req.comment.destroy();
    res.status(204).end();
  })
);



module.exports = router;