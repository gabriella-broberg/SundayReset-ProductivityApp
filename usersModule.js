import { DailyRoutine } from "./habits.js";

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

// Funktion för att hämta alla sparade användare från localStorage
function getUsers() {
  const users = JSON.parse(localStorage.getItem('users'));
  return users ? users : {};
}

// Funktion för att spara den uppdaterade listan av användare i localStorage
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Funktion för att skapa en ny användare och lägga till den i listan av sparade användare
function createUser(username, password) {
  const users = getUsers();
  if (users[username]) {
    throw new Error('Användarnamnet är redan taget.');
  }
  users[username] = new User(username, password);
  saveUsers(users);
}

function loginUser(username, password) {
  const users = getUsers();

  if (!users[username]) {
    throw new Error('User does not exist.');
  }
  if (users[username].password !== password) {
    throw new Error('Wrong password.');
  }
  
  // Update the specific user in localStoragege
  localStorage.setItem('users', JSON.stringify(users)); 
  // Update the entire user list including login permissions
  
  localStorage.setItem('currentUser', username); // Spara den nuvarande inloggade användarens användarnamn

  window.location.href = 'todo.html';
}

function getCurrentUser() {
  return localStorage.getItem('currentUser');
}

function logoutUser() {
  const currentUser = getCurrentUser();

  if (currentUser) {
    const userString = localStorage.getItem(currentUser);

    const user = JSON.parse(userString);

    localStorage.setItem(currentUser, JSON.stringify(user));

    localStorage.removeItem('currentUser'); 
    // Remove the current user from localStorage
    // Redirect to login page or main page
    window.location.href = 'index.html';
  }
}


export { createUser, loginUser, logoutUser };
