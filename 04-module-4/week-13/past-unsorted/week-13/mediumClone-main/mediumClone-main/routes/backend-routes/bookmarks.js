const express = require("express")
const {
  asyncHandler,
  checkForUser,
  checkForStory,
  contentNotFound,
  checkForContent
} = require("../../utils")
const { Bookmark, Story, User, Comment, Like } = require("../../db/models")

const bookmarksRouter = express.Router()

const storyAttributes = ["id", "title", "authorId", "createdAt"]
const userAttributes = ["id", "firstName", "lastName"]


// Get list of Bookmarked Stories for a User
// MIRA Tested:
// Existing user and bookmarks
// Existing user, no bookmarks: 204
// Non-existing user: 404 User Not Found
// Non-digit user id: 500 Server Error, invalid input syntax
// MIRA UPDATE Added (\\d+)
bookmarksRouter.get("/users/:id(\\d+)/bookmarks",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    const userBookmarks = await Bookmark.findAll({
      where: { userId: req.params.id },
      include: [
        {
          model: Story,
          attributes: ["id", "title", "authorId", "createdAt"],
          include: [{
            model: User,
            as: "Author",
            attributes: ["id", "firstName", "lastName"]
          }, {
            model: Like,
            attributes: ["id"]
          }, {
            model: Comment,
            attributes: ["id"]
          }]
        }
      ]
    })
    checkForContent(res, userBookmarks)
  }))

// Get a list of Bookmarks for a Story
// MIRA Tested:
// Existing story and bookmarks
// Existing story, no bookmarks: 204
// Non-existing story: 404 Story Not Found
// Non-digit Story id: 500 Server Error, invalid input syntax
// MIRA UPDATE Added (\\d+)
// MIRA UPDATE Not sure if it's better to include User and story info with bookmark...
bookmarksRouter.get("/stories/:id(\\d+)/bookmarks",
  asyncHandler(checkForStory),
  asyncHandler(async (req, res) => {
    let storyBookmarks = await Bookmark.findAll({
      where: { storyId: req.params.id },
      include: [
        { model: User, attributes: ["id", "firstName", "lastName"] },
        { model: Story, attributes: ["id", "title", "createdAt"] }
      ]
    })
    checkForContent(res, storyBookmarks)
  })
)

// Create or Delete a Bookmark to a Story for a User
// MIRA Tested
// Existing user/story, no bookmark: makes bookmark
// Existing user/story/bookmark: 304
// Non-existing user: 404 User Not Found
// Non-existing story: 404 Story Not Found
// Non-digit user id: 500 Server Error, invalid input syntax
// Non-digit storyId: 500 Server Error, invalid input syntax
// No body: 500 Server Error, WHERE param storyId has invalid undefined value
// MIRA UPDATE Added (\\d+)
bookmarksRouter.post("/users/:id(\\d+)/bookmarks",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res, next) => {
    const newBookmark = { userId: req.params.id, storyId: req.body.storyId }
    const bookmark = await Bookmark.findOne({ where: newBookmark })
    const story = await Story.findByPk(req.body.storyId)

    if (!story) next(contentNotFound(req.body.storyId, "Story"))
    else if (bookmark) {
      await bookmark.destroy()
      res.status(204).end()
    }
    else {
      const bookmark = await Bookmark.create(newBookmark)
      res.json(bookmark)
    }
  })
)

// Delete a Bookmark to a Story for a User by id
// MIRA Tested
// Existing bookmark: 204 deletes bookmark
// No bookmark: 304
// Non-existing story: 304
// Non-existing user: 304
// Non-digit user id: 500 Server Error, invalid input syntax
// Non-digit storyId: 500 Server Error, invalid input syntax
// No body: 500 Server Error, WHERE param storyId has invalid undefined value
// MIRA UPDATE Added (\\d+)
bookmarksRouter.delete("/users/:id(\\d+)/bookmarks",
  asyncHandler(async (req, res) => {
    const bookmark = await Bookmark.findOne({
      where: { userId: req.params.id, storyId: req.body.storyId }
    })
    if (bookmark) {
      await bookmark.destroy()
      res.status(204).end()
    } else {
      res.status(304).end()
    }
  })
)

module.exports = bookmarksRouter