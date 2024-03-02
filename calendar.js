import { logoutUser } from "./usersModule.js";

let logoutbtn = document.querySelector(".logout-btn");

logoutbtn.addEventListener('click', function (event){
  event.preventDefault();
  try {
    logoutUser();
  } catch (error){
    alert(error.message);
  }

});