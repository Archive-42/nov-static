import { loggedIn } from './utils';


window.addEventListener('DOMContentLoaded', async () => {

  const feedContainer = document.querySelector('.feedContainer');
  const storyContainer = document.querySelector('.storyContainer');
  const storySection = document.querySelectorAll('.storySection');
  const storyInfoDiv = document.querySelectorAll('.storyInfoDiv');
  const storyAuthorNameDiv = document.querySelectorAll('.storyAuthorName');
  const storyAuthorNameLink = document.querySelectorAll('.storyAuthorName a')
  const storyLinkDiv = document.querySelectorAll('.storyLink');
  const storyLink = document.querySelectorAll('.storyLink a');
  const storyCreatedAtDiv = document.querySelectorAll('.storyCreatedAt')
  const createBookmarkDiv = document.querySelectorAll('.createBookmarkButtonFeed')
  const bookmarkButtonFeed = document.querySelectorAll('.bookmarkButtonFeed')
  const storyPicDiv = document.querySelectorAll('.storyPicDiv');
  const storyImgDiv = document.querySelectorAll('.storyImgDiv');

  /*
      TODO  When user clicks bookmark tab
  ?           change bookmark img to red one
      TODO  When user clicks author link, story link
  ?           set as active when navigating back to feed
      TODO  FIX ALL OF THIS SHIZZZZZZZ WITH BOOKMARKS ON FRONT END
  */
  // createBookmarkButton.addEventListener('click', (e) => {
  //   alert('hi')
  // })
  // bookmarkButtonFeed.addEventListener('click', (e) => {
  const userId = loggedIn();
    bookmarkButtonFeed.forEach( bm => {
      bm.addEventListener('click', async (e) => {
        console.log(e.target.dataset.storyid)
        if (!e.target.classList.contains('clicked')) {
          console.log('class isnt included')
          try {
            await fetch(`/api/users/${userId}/bookmarks`, {
              method: "POST",
              body: JSON.stringify({
                storyId: e.target.dataset.storyid,
              }),
              headers: {
                "Content-Type": "application/json",
              }
            });
            if(!story.ok){
              throw story;
            } else {
              console.log('added to database')
            }
          } catch (error) {
            console.error(error)
          }

          e.target.classList.toggle('clicked');
          console.log('class switched!');
        } else {
          if (e.target.classList.contains('clicked')) {
          //   try {
          //     const userId = await loggedIn()
          //     const story = await fetch(`/api/users/${userId}/stories`, {
          //       method: "DELETE",
          //       body: JSON.stringify(story),
          //       headers: {
          //         "Content-Type": "application/json",
          //       }
          //     });
          //     if(!story.ok){
          //       throw story;
          //     } else {
          //       console.log('added to database')
          //     }
          //   } catch (error) {
          //     console.error(error)
          //   }
            console.log('hi');
          }
        }

      }, false);
    // }
  }, false);


});
