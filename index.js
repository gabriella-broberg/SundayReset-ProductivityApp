let loginUser = () => {
  const username = document.querySelector('#usernameInput').value;
  const password = document.querySelector('#passwordInput').value;

  const userString = localStorage.getItem(username);
  const user = userString ? JSON.parse(userString) : null;
// If the user exists and the password is correct, update the login state
  if (user && user.password === password) {
    user.loggedIn = true;
    // Resave the updated user object in localStorage
    localStorage.setItem(username, JSON.stringify(user));
    // Spara den inloggade användarens användarnamn som 'currentUser'
    localStorage.setItem('currentUser', username);
    window.location.href = 'todo.html';
  } else {
    alert("Wrong username or password.");
  }
}

const login = document.querySelector('#loginButton');
login.addEventListener('click', loginUser);
