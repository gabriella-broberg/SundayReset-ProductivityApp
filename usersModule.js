class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.loggedIn = false;
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
    throw new Error('Användaren finns inte.');
  }
  if (users[username].password !== password) {
    throw new Error('Felaktigt lösenord.');
  }
  users[username].loggedIn = true;
  saveUsers(users);
  window.location.href = 'todo.html';
}

export { createUser, loginUser };
