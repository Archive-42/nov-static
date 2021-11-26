const express = require('express');
const csrf = require('csurf');
const { asyncHandler } = require('../utils')
const fetch = require('node-fetch')
const { getAllStoryInfo } = require('./fetch');

const frontEndRouter = express.Router();
const csrfProtection = csrf({ cookie: true });

const { api } = require('../config');


// Provide a 'createdAt' value and receive a string in form 'Jan 01 2020'
function getDate(createdAt) {
  let parsedDate = new Date(createdAt)
  return parsedDate.toDateString().slice(4)
}

// Provide a list of objects with the 'createdAt' property to update their
// values to strings in form 'Jan 01 2020'.
function getDates(content) {
  return content.map(item => {
    item.createdAt = getDate(item.createdAt)
    return item
  })
}

async function getTrendingStories() {
  let stories = await fetch(`${api}/api/stories/trending`)
  stories = await stories.json()
  stories = getDates(stories)
  let count = 1
  stories = stories.map(story => {
    story.rank = count;
    count++
    return story
  })
  return stories
}

// Fetch a User by id, without password info.
async function getUser(id) {
  let user = await fetch(`${api}/api/users/${id}`)
  user = await user.json()
  user.createdAt = getDate(user.createdAt)
  return user
}

// Fetch array of Stories by Author's id and convert 'createdAt' to be readable.
// Includes:
//  .Author.firstName,  .Author.lastName
//  .Comments (array, ids only)
//  .Likes (array, ids only)
async function getStoriesByUser(id) {
  let stories = await fetch(`${api}/api/users/${id}/stories`)
  stories = await stories.json()
  stories = getDates(stories)
  return stories
}

// Fetch array of Stories Liked by User (id).= and convert 'createdAt' to be readable.
// Includes:
// .Story.id, .Story.title, .Story.createdAt, .Story.authorId
// .Story.Likes (ids only)
// .Story.Comments (ids only)
// .Story.Author.firstName, .Story.Author.lastName
async function getLikesByUser(id) {
  let likes = await fetch(`${api}/api/users/${id}/likes`)
  likes = await likes.json()
  console.log("likes?!", likes)
  likes = getDates(likes)
  likes = likes.map(like => {
    like.Story.createdAt = getDate(like.Story.createdAt)
    return like
  })
  return likes
}

// Fetch array of Comments by User (id) with associated Stories
async function getCommentsByUser(id) {
  let comments = await fetch(`${api}/api/users/${id}/comments`)
  comments = await comments.json()
  comments = getDates(comments)
  return comments
}

async function getFollowedUsers(id) {
  let followedUsers = await fetch(`${api}/api/users/${id}/follows`)
  followedUsers = await followedUsers.json()
  return followedUsers
}

async function getFollowingUsers(id) {
  let followingUsers = await fetch(`${api}/api/users/${id}/followers`)
  followingUsers = await followingUsers.json()
  return followingUsers
}

async function getBookmarkedStoriesForUser(id) {
  let bookmarks = await fetch(`${api}/api/users/${id}/bookmarks`)
  bookmarks = await bookmarks.json()
  bookmarks = bookmarks.map(bookmark => {
    bookmark.Story.createdAt = getDate(bookmark.Story.createdAt)
    return bookmark
  })
  return bookmarks
}

async function getStory(id) {
  let story = await fetch(`${api}/api/stories/${id}`)
  story = await story.json()
  story.createdAt = getDate(story.createdAt)
  return story
}
async function getAllStories() {
  let stories = await fetch(`${api}/api/stories`)
  stories = await stories.json()
  stories = getDates(stories)
  return stories
}
async function getStoriesByFollowedAuthors(userId) {
  let stories = await fetch(`${api}/api/users/${userId}/follows/stories`)
  return await stories()
}
async function getCommentsForStory(id) {
  let comments = await fetch(`${api}/api/stories/${id}/comments`)
  return await comments.json()
}


// display story by id
frontEndRouter.get("/stories/:id(\\d+)", async (req, res) => {
  const storyInfo = await getAllStoryInfo(req);
  console.log(storyInfo);
  res.render('story-layout', { storyInfo, title: storyInfo.title, api });
});

//actual splash page
frontEndRouter.get("/splash", (req, res) => {
  res.render('splash', { title: "MEDAYUM", api });
});
//splash page
frontEndRouter.get("/", asyncHandler(async (req, res) => {
  try {
    let stories = await getAllStories()
    const trendingStories = await getTrendingStories()
    let bookmarkedStories = await getBookmarkedStoriesForUser(1)
    const isEnoughBookmarks = bookmarkedStories.length >= 6
    let count = 1
    console.log(isEnoughBookmarks)
    if (isEnoughBookmarks) {
      bookmarkedStories = bookmarkedStories.slice(0, 6)
      bookmarkedStories = bookmarkedStories.map(story => {
        story.rank = count
        count++
        return story
      })
    }
    res.render('index', { title: "MeDaYum Feed", stories, trendingStories, bookmarkedStories, isEnoughBookmarks, api });
  } catch (error) {
    res.render('index')
  }
}));
//sign up form
frontEndRouter.get("/sign-up", csrfProtection, (req, res) => {
  res.render('sign-up', { csrfToken: req.csrfToken(), api });
});
//log-in form
frontEndRouter.get("/log-in", csrfProtection, (req, res) => {
  res.render('log-in', { csrfToken: req.csrfToken(), api });
});
//user profile
frontEndRouter.get("/users/:id", csrfProtection, asyncHandler(async (req, res) => {
  const user = await getUser(req.params.id)
  const userStories = await getStoriesByUser(req.params.id)
  res.render('profile-tab-stories',
    { csrfToken: req.csrfToken(), user, userStories, api });
}))

frontEndRouter.get("/users/:id/comments", csrfProtection, asyncHandler(async (req, res) => {
  const user = await getUser(req.params.id)
  const userComments = await getCommentsByUser(req.params.id)
  res.render('profile-tab-comments',
    { csrfToken: req.csrfToken(), user, userComments, api });
}))
frontEndRouter.get("/users/:id/likes", csrfProtection, asyncHandler(async (req, res) => {
  const user = await getUser(req.params.id)
  const userLikes = await getLikesByUser(req.params.id)
  res.render('profile-tab-likes',
    { csrfToken: req.csrfToken(), user, userLikes, api });
}))
frontEndRouter.get("/users/:id/follows", csrfProtection, asyncHandler(async (req, res) => {
  const user = await getUser(req.params.id)
  const followedUsers = await getFollowedUsers(req.params.id)
  res.render('profile-tab-follows',
    { csrfToken: req.csrfToken(), user, followedUsers, api });
}))
frontEndRouter.get("/users/:id/followers", csrfProtection, asyncHandler(async (req, res) => {
  const user = await getUser(req.params.id)
  const followingUsers = await getFollowingUsers(req.params.id)
  res.render('profile-tab-followers',
    { csrfToken: req.csrfToken(), user, followingUsers, api });
}))
frontEndRouter.get("/users/:id/bookmarks", csrfProtection, asyncHandler(async (req, res) => {
  const user = await getUser(req.params.id)
  const bookmarkedStories = await getBookmarkedStoriesForUser(req.params.id)
  res.render('profile-tab-bookmarks',
    { csrfToken: req.csrfToken(), user, bookmarkedStories, api });
}))
// TODO Convert createdAt to Month Year format.

//edit user profile form
// frontEndRouter.get("/users/:id/edit", csrfProtection, (req, res) => {
//   res.render('edit-profile', { csrfToken: req.csrfToken() });
// });
//create new story form
frontEndRouter.get("/create", csrfProtection, (req, res) => {
  res.render('create', { csrfToken: req.csrfToken(), api });
});
//display story edit form
frontEndRouter.get("/stories/:id/edit", csrfProtection, (req, res) => {
  res.render('story-edit-layout', { csrfToken: req.csrfToken(), api });
});
//sign up form
frontEndRouter.get("/sign-up", csrfProtection, (req, res) => {
  res.render('sign-up', { csrfToken: req.csrfToken(), title: "Sign Up", api });
});
//log-in form
frontEndRouter.get("/log-in", csrfProtection, (req, res) => {
  res.render('log-in', { csrfToken: req.csrfToken(), title: "Log In", api });
});
//user profile
frontEndRouter.get("/users", (req, res) => {
  res.render('profile', { title: "Profile", api });
});
//edit user profile form
frontEndRouter.get("/users/:id(\\d+)/edit", csrfProtection, (req, res) => {
  res.render('edit-profile', { csrfToken: req.csrfToken(), title: "Edit Profile", api });
});
//create new story form
frontEndRouter.get("/create", csrfProtection, (req, res) => {
  res.render('create', { csrfToken: req.csrfToken(), title: "Create a Story", api });
});
//display story edit form
frontEndRouter.get("/stories/:id(\\d+)/edit", csrfProtection, (req, res) => {
  res.render('story-edit-layout', { csrfToken: req.csrfToken(), title: "Edit Story", api });
});
//display feed
frontEndRouter.get("/feed", csrfProtection, asyncHandler(async (req, res) => {
  res.render('feed', { title: "My Feed", csrfToken: req.csrfToken(), stories, api });
}));
//throw error
frontEndRouter.get("/error-test", (req, res, next) => {
  const err = new Error("500 Internal Server Error.");
  err.status = 500;
  err.title = "custom 500 error";
  next(err);
})

module.exports = frontEndRouter;
