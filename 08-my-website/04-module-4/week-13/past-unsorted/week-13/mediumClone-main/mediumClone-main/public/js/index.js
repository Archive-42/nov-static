import { loggedIn } from "./utils.js";
import { handleErrors } from "./utils.js";
// import { api } from "../../config";

const logInScreen = document.querySelector('.loggedIn');
const logOutScreen = document.querySelector('.loggedOut');
const signInButton = document.querySelectorAll('.signInBanner');
const signUpButton = document.querySelectorAll('.signUpBanner');
const signInDisplay = document.querySelector('.signInFormDiv');
const signUpDisplay = document.querySelector('.signUpFormDiv');
const swapToLogIn = document.querySelector('.swapToLogIn');
const swapToSignUp = document.querySelector('.swapToSignUp');
const errorsContainer = document.querySelectorAll(".errors-container");
const demoLoginDiv = document.querySelector('.demoLogIn');
const closeForm = document.querySelectorAll('.closeForm')
const logInForm = document.querySelector(".logInForm")
const signUpForm = document.querySelector(".signUpForm");


const demoLogin = document.querySelectorAll('.demo');

window.addEventListener("DOMContentLoaded", async e => {
  let logged = loggedIn();
  if (logged) {
    logInScreen.classList.remove('hidden');
  } else {
    demoLoginDiv.classList.remove('hidden');
    logOutScreen.classList.remove('hidden');
  }
})

signInButton.forEach( e => {
  e.addEventListener('click', e => {
    e.preventDefault();
    signInDisplay.classList.remove('hidden');
    errorsContainer.forEach(e => {
      e.innerHTML = '';
    })
  })
})
// signInButton.addEventListener('click', e => {
//   e.preventDefault();
//   signInDisplay.classList.remove('hidden');
//   errorsContainer.forEach(e => {
//     e.innerHTML = '';
//   })
// })
signUpButton.forEach( e => {
  e.addEventListener('click' , e => {
    e.preventDefault();
    signUpDisplay.classList.remove('hidden');
    errorsContainer.forEach(e => {
    e.innerHTML = '';
    })
  })
})

demoLogin.forEach(elem => {
  elem.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = 'demo@user.com'
    const password = '1234567890'
    const body = { email, password }
    try {
      // ADD THIS ONCE VALIDATION IS IMPLEMENTED
      const res = await fetch(`/api/users/token`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw res;
      }
      const {
        token,
        user: { id },
      } = await res.json();
      // storage access_token in localStorage:
      localStorage.setItem("MEDIUM_ACCESS_TOKEN", token);
      localStorage.setItem("MEDIUM_CURRENT_USER_ID", id);
      // redirect to home page
      window.location.href = "/";
    } catch (err) {
      handleErrors(err);
    }
  })
})
logInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(logInForm);
  const email = formData.get("email");
  email.toLowerCase();
  const password = formData.get("password");
  const body = {email, password};

  try {
      // ADD THIS ONCE VALIDATION IS IMPLEMENTED
      const res = await fetch(`/api/users/token`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw res;
      }
      const {
        token,
        user: { id },
      } = await res.json();
      // storage access_token in localStorage:
      localStorage.setItem("MEDIUM_ACCESS_TOKEN", token);
      localStorage.setItem("MEDIUM_CURRENT_USER_ID", id);
      // redirect to home page:
      window.location.href = "/";
    } catch (err) {
      handleErrors(err);
    }
})
signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(signUpForm);
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get('confirmPassword')
  const body = { firstName, lastName, email, password, confirmPassword };
  try {
    //  ADD THIS ONCE AUTHORIZATION IS IMPLEMENTED
    const res = await fetch(`/api/users`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("res is", res)
    if (!res.ok) {
      console.log("okay is...", res.ok, res.status)
      throw res;
    } else {
      const jsonRes = await res.json();
      console.log("jsonRes is ", jsonRes)
      const { token, newUser: { id } } = jsonRes
      // storage access_token in localStorage:
      localStorage.setItem("MEDIUM_ACCESS_TOKEN", token);
      localStorage.setItem("MEDIUM_CURRENT_USER_ID", id);
      // redirect to home page
      window.location.href = "/";
    }
  } catch (err) {
    console.log("caught the error", err.ok, err)
    handleErrors(err);
  }
});
swapToLogIn.addEventListener('click', e => {
  e.preventDefault();
  signUpDisplay.classList.add('hidden');
  signInDisplay.classList.remove('hidden');
  errorsContainer.forEach(e => {
    e.innerHTML = '';
  })
})
swapToSignUp.addEventListener('click', e => {
  signInDisplay.classList.add('hidden');
  signUpDisplay.classList.remove('hidden');
  errorsContainer.forEach(e => {
    e.innerHTML = '';
  })
})
closeForm.forEach(e => {
  e.addEventListener('click', e => {
    e.preventDefault();
    signInDisplay.classList.add('hidden');
    signUpDisplay.classList.add('hidden');
  })
})


let b1 = document.querySelector('.bearButton1')
let b2 = document.querySelector('.bearButton2')
let b3 = document.querySelector('.bearButton3')
let b4 = document.querySelector('.bearButton4')
let b5 = document.querySelector('.bearButton5')
let b6 = document.querySelector('.bearButton6')
let b7 = document.querySelector('.bearButton7')
let b8 = document.querySelector('.bearButton8')
let b9 = document.querySelector('.bearButton9')
let b10 = document.querySelector('.bearButton10')
let b11 = document.querySelector('.bearButton11')
let b12 = document.querySelector('.bearButton12')
let b13 = document.querySelector('.bearButton13')
let b14 = document.querySelector('.bearButton14')
let b15 = document.querySelector('.bearButton15')

b1.addEventListener('click', e => {
  if(b1.classList.contains('clickedBearButton')){
    b1.classList.remove('clickedBearButton');
    b1.classList.add('bearButtonContainerHover');
  }else{
    b1.classList.add('clickedBearButton');
    b1.classList.remove('bearButtonContainerHover');
  }
})
b2.addEventListener('click', e => {
  if(b2.classList.contains('clickedBearButton')){
    b2.classList.remove('clickedBearButton');
    b2.classList.add('bearButtonContainerHover');
  }else{
    b2.classList.add('clickedBearButton');
    b2.classList.remove('bearButtonContainerHover');
  }
})
b3.addEventListener('click', e => {
  if(b3.classList.contains('clickedBearButton')){
    b3.classList.remove('clickedBearButton');
    b3.classList.add('bearButtonContainerHover');
  }else{
    b3.classList.add('clickedBearButton');
    b3.classList.remove('bearButtonContainerHover');
  }
})
b4.addEventListener('click', e => {
  if(b4.classList.contains('clickedBearButton')){
    b4.classList.remove('clickedBearButton');
    b4.classList.add('bearButtonContainerHover');
  }else{
    b4.classList.add('clickedBearButton');
    b4.classList.remove('bearButtonContainerHover');
  }
})
b5.addEventListener('click', e => {
  if(b5.classList.contains('clickedBearButton')){
    b5.classList.remove('clickedBearButton');
    b5.classList.add('bearButtonContainerHover');
  }else{
    b5.classList.add('clickedBearButton');
    b5.classList.remove('bearButtonContainerHover');
  }
})
b6.addEventListener('click', e => {
  if(b6.classList.contains('clickedBearButton')){
    b6.classList.remove('clickedBearButton');
    b6.classList.add('bearButtonContainerHover');
  }else{
    b6.classList.add('clickedBearButton');
    b6.classList.remove('bearButtonContainerHover');
  }
})
b7.addEventListener('click', e => {
  if(b7.classList.contains('clickedBearButton')){
    b7.classList.remove('clickedBearButton');
    b7.classList.add('bearButtonContainerHover');
  }else{
    b7.classList.add('clickedBearButton');
    b7.classList.remove('bearButtonContainerHover');
  }
})
b8.addEventListener('click', e => {
  if(b8.classList.contains('clickedBearButton')){
    b8.classList.remove('clickedBearButton');
    b8.classList.add('bearButtonContainerHover');
  }else{
    b8.classList.add('clickedBearButton');
    b8.classList.remove('bearButtonContainerHover');
  }
})
b9.addEventListener('click', e => {
  if(b9.classList.contains('clickedBearButton')){
    b9.classList.remove('clickedBearButton');
    b9.classList.add('bearButtonContainerHover');
  }else{
    b9.classList.add('clickedBearButton');
    b9.classList.remove('bearButtonContainerHover');
  }
})
b10.addEventListener('click', e => {
  if(b10.classList.contains('clickedBearButton')){
    b10.classList.remove('clickedBearButton');
    b10.classList.add('bearButtonContainerHover');
  }else{
    b10.classList.add('clickedBearButton');
    b10.classList.remove('bearButtonContainerHover');
  }
})
b11.addEventListener('click', e => {
  if(b11.classList.contains('clickedBearButton')){
    b11.classList.remove('clickedBearButton');
    b11.classList.add('bearButtonContainerHover');
  }else{
    b11.classList.add('clickedBearButton');
    b11.classList.remove('bearButtonContainerHover');
  }
})
b12.addEventListener('click', e => {
  if(b12.classList.contains('clickedBearButton')){
    b12.classList.remove('clickedBearButton');
    b12.classList.add('bearButtonContainerHover');
  }else{
    b12.classList.add('clickedBearButton');
    b12.classList.remove('bearButtonContainerHover');
  }
})
b13.addEventListener('click', e => {
  if(b13.classList.contains('clickedBearButton')){
    b13.classList.remove('clickedBearButton');
    b13.classList.add('bearButtonContainerHover');
  }else{
    b13.classList.add('clickedBearButton');
    b13.classList.remove('bearButtonContainerHover');
  }
})
b14.addEventListener('click', e => {
  if(b14.classList.contains('clickedBearButton')){
    b14.classList.remove('clickedBearButton');
    b14.classList.add('bearButtonContainerHover');
  }else{
    b14.classList.add('clickedBearButton');
    b14.classList.remove('bearButtonContainerHover');
  }
})
b15.addEventListener('click', e => {
  if(b15.classList.contains('clickedBearButton')){
    b15.classList.remove('clickedBearButton');
    b15.classList.add('bearButtonContainerHover');
  }else{
    b15.classList.add('clickedBearButton');
    b15.classList.remove('bearButtonContainerHover');
  }
})

//Slideshow handlers
const slide1 = document.querySelector(".slide1");
const slide2 = document.querySelector(".slide2");
const slide3 = document.querySelector(".slide3");
const slide4 = document.querySelector(".slide4");
const slide5 = document.querySelector(".slide5");
const slideButton1 = document.querySelector(".slideShowNavigationButton1");
const slideButton2 = document.querySelector(".slideShowNavigationButton2");
const slideButton3 = document.querySelector(".slideShowNavigationButton3");
const slideButton4 = document.querySelector(".slideShowNavigationButton4");
const slideButton5 = document.querySelector(".slideShowNavigationButton5");
const wipeCss = () => {
  slide1.classList.add('hidden')
  slide2.classList.add('hidden')
  slide3.classList.add('hidden')
  slide4.classList.add('hidden')
  slide5.classList.add('hidden')
  slideButton1.classList.remove('currentSlideButton')
  slideButton2.classList.remove('currentSlideButton')
  slideButton3.classList.remove('currentSlideButton')
  slideButton4.classList.remove('currentSlideButton')
  slideButton5.classList.remove('currentSlideButton')
}

let count = 1;
const displaySlideEventListener = (slide, slideButton, counter) => {
  slideButton.addEventListener('click', e => {
    wipeCss();
    slide.classList.remove('hidden')
    slideButton.classList.add('currentSlideButton')
    count = counter;
  })
}
displaySlideEventListener(slide1, slideButton1, 1);
displaySlideEventListener(slide2, slideButton2, 2);
displaySlideEventListener(slide3, slideButton3, 3);
displaySlideEventListener(slide4, slideButton4, 4);
displaySlideEventListener(slide5, slideButton5, 5);

const displaySlide = (slide, slideButton) => {
  wipeCss();
  slide.classList.remove('hidden')
  slideButton.classList.add('currentSlideButton')
}
setInterval(function dynamicDisplay(){
  if(count === 1){
    displaySlide(slide2, slideButton2);
    count++
  }
  else if(count === 2){
    displaySlide(slide3, slideButton3);
    count++
  }
  else if(count === 3){
    displaySlide(slide4, slideButton4);
    count++
  }
  else if(count === 4){
    displaySlide(slide5, slideButton5);
    count++
  }
  else if(count === 5){
    displaySlide(slide1, slideButton1);
    count = 1
  }
}, 7000)
