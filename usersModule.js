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

function logoutUser() {
  // Hämta det nuvarande användarnamnet direkt utan JSON.parse, eftersom det är en enkel sträng
  const currentUser = localStorage.getItem('currentUser');

  if (currentUser) {
    // Inget behov att uppdatera användarlistan i detta fall, bara ta bort den nuvarande användaren
    localStorage.removeItem('currentUser');

    alert("Du har blivit utloggad.");
    // Omdirigera till inloggningssidan eller hemsidan
    window.location.href = 'index.html';
  } else {
    alert("Ingen användare är inloggad.");
  }
}



export { createUser, loginUser, logoutUser };
