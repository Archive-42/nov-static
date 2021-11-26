import { handleErrors } from "./utils.js";

const authorId = window.localStorage.getItem('MEDIUM_CURRENT_USER_ID');
const publishNav = document.querySelector('.publishStory');

const form = document.querySelector('.create-story-form');
const publishStoryButton = document.querySelector('#publishStoryButton');
publishNav.classList.remove('hidden');



publishStoryButton.addEventListener('click', async e =>{
  e.preventDefault();
  const formData = new FormData(form);
    const title = formData.get("title");
    const body = formData.get("body");
    const obj = {title, body, authorId};
    try {
        // ADD THIS ONCE VALIDATION IS IMPLEMENTED
        const res = await fetch(`/api/stories`, {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw res;
        }
        window.location.href = "/";
      } catch (err) {
        console.log(err)
      }
})


form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);
    const title = formData.get("title");
    const body = formData.get("body");
    const obj = {title, body, authorId};
    try {
        // ADD THIS ONCE VALIDATION IS IMPLEMENTED
        const res = await fetch(`/api/stories`, {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw res;
        }
        window.location.href = "/";
      } catch (err) {
        console.log(err)
      }
})
