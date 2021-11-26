const commentSubmitBtn = document.getElementById('submitComment');
const commentForm = document.getElementById('commentForm');
const commentList = document.getElementById('commentList');
const commentText = document.getElementById('comment');
const currentUser = localStorage.MEDIUM_CURRENT_USER_ID;
const userNameDisplay = document.getElementById('currentUserName');
const storyInfo = JSON.parse(document.getElementById('story-title').dataset.storyinfo);

//display current user's name on the comment form
async function displayCurrentName() {
  let currentUserName = await fetch(`/api/users/${ currentUser }`);
  currentUserName = await currentUserName.json();
  let { firstName, lastName } = currentUserName;
  userNameDisplay.innerHTML = `${ firstName } ${ lastName }`;
}
displayCurrentName();
// hide comments bar from start
document.querySelector('.comments-bar').style.display = 'none';
// close comments bar
document.querySelector('.close-comments-btn').addEventListener('click', () => {
  // hide comments bar
  document.querySelector('.comments-bar').style.display = 'none';
  // hide submit comment button
  document.getElementById('submitComment').style.display = 'none';
  // hide user's name on comment form
  userNameDisplay.style.display = 'none';
  // hide user's avatar on comment form
  document.getElementById('commenting-person-head').style.display = 'none';
});

// open the comments bar when you click on a comments icon
document.querySelectorAll('.comment-show').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.comments-bar').style.maxHeight = window.innerHeight - 300;
    document.querySelector('.comments-bar').style.display = 'block';
  });
});

commentSubmitBtn.addEventListener('click', async e => {
  e.preventDefault();
  const formData = new FormData(commentForm);
  const commentData = formData.get('comment');
  try {
    let comment = await fetch(`/api/stories/${ commentForm.dataset.story }/comments`, {
      method: 'POST',
      body: JSON.stringify({ body: commentData, userId: currentUser }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    comment = await comment.json();

    let commentCount = await fetch(`/api/stories/${ commentForm.dataset.story }/comments`);
    commentCount = await commentCount.json();
    commentCount = commentCount.length;
    document.querySelectorAll('.the-comment-count')[0].innerHTML = `${ commentCount }`;
    document.querySelectorAll('.the-comment-count')[1].innerHTML = `${ commentCount })`;


    const commentItem = document.createElement('li');
    commentItem.setAttribute('class', 'full-comment');
    commentItem.setAttribute('data-commentid', comment.id);
    const commentContainer = document.createElement('ul');
    commentContainer.setAttribute('class', 'comment-ul');
    commentItem.appendChild(commentContainer);
    const commentingUser = document.createElement('li');
    commentingUser.setAttribute('class', 'commenting-user');
    commentContainer.appendChild(commentingUser);
    const commentBody = document.createElement('li');
    commentBody.setAttribute('class', 'comment-body');
    commentContainer.appendChild(commentBody);
    const commentTime = document.createElement('li');
    commentTime.setAttribute('class', 'comment-time');
    commentContainer.appendChild(commentTime);
    const myCommentOptions = document.createElement('li');
    myCommentOptions.setAttribute('class', 'my-comment-options');
    commentContainer.appendChild(myCommentOptions);
    const myCommentEditBtn = document.createElement('button');
    myCommentEditBtn.setAttribute('class', 'editBtn btn-primary');
    myCommentEditBtn.innerHTML = 'Edit';
    myCommentOptions.appendChild(myCommentEditBtn);
    const mmyCommentDltBtn = document.createElement('button');
    mmyCommentDltBtn.setAttribute('class', 'dltBtn btn-primary-red');
    mmyCommentDltBtn.innerHTML = 'Delete';
    myCommentOptions.appendChild(mmyCommentDltBtn);

    //options for comments (edit/delete) show and dissappear
    myCommentOptions.style.display = 'none';
    commentContainer.addEventListener('mouseover', () => {
      myCommentOptions.style.display = 'block';
    });
    commentContainer.addEventListener('mouseout', () => {
      myCommentOptions.style.display = 'none';
    });

    let user = await fetch(`/api/users/${ currentUser }`);
    user = await user.json();

    commentText.value = "";

    let commentingUserName = document.createElement('span');
    let commentingUserImg = document.createElement('img');
    commentingUserImg.setAttribute('src', '/icons/avatar (1).svg');
    commentingUserImg.setAttribute('class', 'sm-icon');
    commentingUser.appendChild(commentingUserImg);
    commentingUserName.innerHTML = `${ user.firstName } ${ user.lastName }`;
    commentingUser.appendChild(commentingUserName);
    commentBody.innerHTML = comment.body;

    let date = new Date(comment.createdAt);
    let dateFormat = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
    commentTime.innerHTML = dateFormat.format(date, dateFormat);

    let commentsListItems = commentList.childNodes;
    commentList.insertBefore(commentItem, commentsListItems[0]);

    myCommentEditBtn.addEventListener('click', async (event) => {
      const fullCommentItem = event.target.parentNode.parentNode.parentNode;
      const commentBodyEl = fullCommentItem.querySelectorAll('.comment-body')[0];
      commentBodyEl.setAttribute('contenteditable', 'true');
      commentBodyEl.style.border = '2px solid #0596FF';
      commentBodyEl.style.borderRadius = '0.25em';
      commentBodyEl.style.backgroundColor = 'rgba(4, 150, 255, 0.2)';
      commentBodyEl.style.padding = '3px';
      const submitNewCommentBtn = document.createElement('button');
      submitNewCommentBtn.innerHTML = 'Submit Edit';
      myCommentOptions.insertBefore(submitNewCommentBtn, myCommentEditBtn);
      myCommentOptions.removeChild(myCommentEditBtn);
      submitNewCommentBtn.addEventListener('click', async event => {
        let newCommentBody = commentBodyEl.innerHTML;
        await fetch(`/api/comments/${ fullCommentItem.dataset.commentid }`, {
          method: 'PATCH',
          body: JSON.stringify({ body: newCommentBody }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        commentBodyEl.style.border = 'none';
        commentBodyEl.style.backgroundColor = 'transparent';
        commentBodyEl.removeAttribute('contenteditable');
        myCommentOptions.insertBefore(myCommentEditBtn, submitNewCommentBtn);
        myCommentOptions.removeChild(submitNewCommentBtn);
      });
    });

    mmyCommentDltBtn.addEventListener('click', async (event) => {
      const fullCommentItem = event.target.parentNode.parentNode.parentNode;
      commentList.removeChild(fullCommentItem);
      await fetch(`/api/comments/${ fullCommentItem.dataset.commentid }`, {
        method: 'DELETE'
      });
      let comCount = await fetch(`/api/stories/${ commentForm.dataset.story }/comments`);
      comCount = await comCount.json();
      comCount = comCount.length;
      document.querySelectorAll('.the-comment-count')[0].innerHTML = parseInt(document.querySelectorAll('.the-comment-count')[0].innerHTML) - 1;
      document.querySelectorAll('.the-comment-count')[1].innerHTML = `${ document.querySelectorAll('.the-comment-count')[0].innerHTML })`;
    });

  } catch (err) {
    console.error(err);
  }
});

// create a new comment - active form
document.getElementById('comment').addEventListener('click', e => {
  let commentArea = document.querySelector('.my-original-comment');
  commentArea.style.backgroundColor = '#F4FAFF';
  commentArea.style.border = '2px solid #0496FF';
  commentArea.style.borderRadius = '5px';
  commentArea.style.height = '5em';
  commentArea.style.padding = '3px';
  commentArea.style.resize = 'none';
  document.getElementById('submitComment').style.display = 'inline-block';
  userNameDisplay.style.display = 'inline-block';
  userNameDisplay.style.verticalAlign = 'center';
  document.getElementById('commenting-person-head').style.display = 'inline-block';
});

window.addEventListener('DOMContentLoaded', async () => {
// LIKES =========================================
let likeList = storyInfo.likes.map(like => like.userId);
if (likeList.includes(currentUser)) {
  //has liked before
  document.querySelectorAll('.i-like-this').forEach(icon => {
    icon.setAttribute('src', '/icons/heart_red.svg');
  })
} else {
  //has not liked yet
  document.querySelectorAll('.i-like-this').forEach(icon => {
    icon.setAttribute('src', '/icons/heart.svg');
  })
}
// ===============================================

  const eachComment = document.querySelectorAll('.full-comment');
  eachComment.forEach(async comment => {
    const commentOptions = comment.querySelectorAll('.my-comment-options')[0];
    commentOptions.style.display = 'none';
    comment.addEventListener('mouseover', () => {
      if (comment.dataset.user === currentUser) {
        commentOptions.parentNode.style.gridTemplateRows = 'repeat(4, 1.5em)';
        commentOptions.style.display = 'block';
      }
    });
    comment.addEventListener('mouseout', () => {
      commentOptions.parentNode.style.gridTemplateRows = 'repeat(3, 1.5em)';
      commentOptions.style.display = 'none';
    })
    if (comment.dataset.user === currentUser) {
      const editButton = comment.querySelectorAll('.editBtn')[0];
      const deleteButton = comment.querySelectorAll('.dltBtn')[0];
      const myCommentOptions = comment.querySelectorAll('.my-comment-options')[0];
      editButton.addEventListener('click', async event => {
        const fullCommentItem = event.target.parentNode.parentNode.parentNode;
        const commentBodyEl = fullCommentItem.querySelectorAll('.comment-body')[0];
        commentBodyEl.setAttribute('contenteditable', 'true');
        commentBodyEl.classList.add('editing');
        const submitNewCommentBtn = document.createElement('button');
        submitNewCommentBtn.innerHTML = 'Submit Edit';
        submitNewCommentBtn.classList.add('btn-primary');
        myCommentOptions.insertBefore(submitNewCommentBtn, editButton);
        myCommentOptions.removeChild(editButton);
        submitNewCommentBtn.addEventListener('click', async event => {
          let newCommentBody = commentBodyEl.innerHTML;
          commentBodyEl.style.border = 'none';
          commentBodyEl.style.backgroundColor = 'transparent';
          await fetch(`/api/comments/${ fullCommentItem.dataset.commentid }`, {
            method: 'PATCH',
            body: JSON.stringify({ body: newCommentBody }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          commentBodyEl.removeAttribute('contenteditable');
          myCommentOptions.insertBefore(editButton, submitNewCommentBtn);
          myCommentOptions.removeChild(submitNewCommentBtn);
        });
      });
      deleteButton.addEventListener('click', async event => {
        const fullCommentItem = event.target.parentNode.parentNode.parentNode;
        commentList.removeChild(fullCommentItem);
        await fetch(`/api/comments/${ fullCommentItem.dataset.commentid }`, {
          method: 'DELETE'
        });
      });
    }
  });

});

// BOOKMARKS =====================================================================

document.querySelectorAll('.bkmrk').forEach(bkmrk => {
  bkmrk.addEventListener('click', e => {
    if (e.target.classList.contains('bookmarked')) {
      document.querySelectorAll('.bkmrk').forEach(mrk => {
        mrk.setAttribute('src', '/icons/bookmark.svg');
        mrk.classList.remove('bookmarked');
      });
    } else {
      document.querySelectorAll('.bkmrk').forEach(mrk => {
        mrk.setAttribute('src', '/icons/bookmarked.svg');
        mrk.classList.add('bookmarked');
      });
    }
  });
});
// ===============================================================================

document.querySelectorAll('.editBtn').forEach(btn => {
  btn.addEventListener('click', e => {
    const fullCommentItem = e.target.parentNode.parentNode.parentNode;
    const commentBodyEl = fullCommentItem.querySelectorAll('.comment-body')[0];
    commentBodyEl.setAttribute('contenteditable', 'true');
    commentBodyEl.style.border = '2px solid rgba(4, 150, 255, 0.7)';
    commentBodyEl.style.borderRadius = '0.25em';
    commentBodyEl.style.backgroundColor = 'rgba(4, 150, 255, 0.1)';
    commentBodyEl.style.padding = '3px';
  });
});


// LIKES =========================================================================
document.querySelectorAll('.i-like-this').forEach(like => {
  like.addEventListener('click', e => {
    if (e.target.classList.contains('liked')) {
      document.querySelectorAll('.i-like-this').forEach(mrk => {
        mrk.setAttribute('src', '/icons/heart.svg');
        mrk.classList.remove('liked');
      });
      document.querySelectorAll('.likeCount').forEach(cnt => {
        let count = parseInt(cnt.innerHTML);
        count--;
        cnt.innerHTML = count;
      });
    } else {
      document.querySelectorAll('.i-like-this').forEach(mrk => {
        mrk.setAttribute('src', '/icons/heart_red.svg');
        mrk.classList.add('liked');
      });
      document.querySelectorAll('.likeCount').forEach(cnt => {
        let count = parseInt(cnt.innerHTML);
        count++;
        cnt.innerHTML = count;
      });
    }
  });
});
// let isLiked = false;
// function checkForLikes() {
//   isLiked = !!document.querySelectorAll('.i-like-this')[0].filter(like => like.userId === currentUser);
//   if (isLiked) {
//     document.querySelectorAll('.i-like-this').forEach(btn => {
//       btn.setAttribute('src', '/icons/heart_red.svg');
//     });
//   } else {
//     document.querySelectorAll('.i-like-this').forEach(btn => {
//       btn.setAttribute('src', '/icons/heart.svg');
//     });
//   }
  // let likes = await fetch(`/api/stories/${ document.querySelectorAll('.i-like-this')[0].dataset.storyid }/likes`);
  // if (!likes.ok) {
  //   likes = [];
  // } else {
  //   likes = await likes.json();
  //   likes = likes.map(like => {
  //     return like.userId;
  //   });
  // }
  // if (likes.includes(currentUser)) {
  //   document.querySelectorAll('.i-like-this').forEach(btn => {
  //     btn.setAttribute('src', '/icons/heart_red.svg');
  //   });
  // }
// }
// checkForLikes();
// document.querySelectorAll('.i-like-this').forEach(async likeBtn => {
//   likeBtn.addEventListener('click', async e => {
//     let like = await fetch(`/api/stories/${ likeBtn.dataset.storyid }/likes`, {
//       method: 'POST',
//       body: JSON.stringify({ userId: currentUser }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     if (!likes.ok) {
//       document.querySelectorAll('.i-like-this').forEach(btn => {
//         btn.setAttribute('src', '/icons/heart.svg');
//       });
//     } else {
//       document.querySelectorAll('.i-like-this').forEach(btn => {
//         btn.setAttribute('src', '/icons/heart_red.svg');
//       });
//     }
//   });
// });
// ===============================================================================

// FOLLOWS =======================================================================
document.querySelectorAll('.follow-button').forEach(button => {
  button.addEventListener('click', () => {
    if (document.querySelectorAll('.follow-button')[0].classList.contains('followed')) {
      document.querySelectorAll('.follow-button').forEach(btn => {
        btn.innerHTML = 'Follow';
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-primary-inverted');
        btn.classList.remove('followed');
      });
    } else {
      document.querySelectorAll('.follow-button').forEach(btn => {
        btn.innerHTML = 'Unfollow';
        btn.classList.add('btn-primary');
        btn.classList.remove('btn-primary-inverted');
        btn.classList.add('followed');
      });
    }
  });
});
// ===============================================================================