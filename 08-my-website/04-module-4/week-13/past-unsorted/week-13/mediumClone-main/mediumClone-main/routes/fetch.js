const fetch = require('node-fetch');

const { api } = require('../config');

async function getAllStoryInfo(req) {
    const storyId = parseInt(req.params.id);
    let story = await fetch(`${ api }/api/stories/${ storyId }`);
    story = await story.json();
    let {
      title,
      body,
      authorId,
      createdAt
    } = story;
    createdAt = new Date(createdAt);
    let dateFormat = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit' });
    createdAt = dateFormat.format(createdAt, dateFormat);
    let author = await fetch(`${ api }/api/users/${ authorId }`);
    author = await author.json();
    const authorInfo = {
      authorId,
      authorFN: author.firstName,
      authorLN: author.lastName
    };
    let likes = await fetch(`${ api }/api/stories/${ storyId }/likes`);
    if (!likes.ok) {
      likes = [];
    } else {
      likes = await likes.json();
    }
    const likeCount = likes.length;
    let comments = await fetch(`${ api }/api/stories/${ storyId }/comments`);
    comments = await comments.json();
    if (comments.length) {
      comments = comments.map(comment => {
        let date = new Date(comment.createdAt);
        let created = dateFormat.format(date, dateFormat);
        comment = {
          id: comment.id,
          userId: comment.User.id,
          firstName: comment.User.firstName,
          lastName: comment.User.lastName,
          body: comment.body,
          created
        };
        return comment;
      });
    }
    const commentsCount = comments.length;
    const storyInfo = {
      storyId,
      title,
      body,
      createdAt,
      authorInfo,
      likes,
      likeCount,
      comments,
      commentsCount
    };
    return storyInfo;
}

module.exports = {
  getAllStoryInfo
}
