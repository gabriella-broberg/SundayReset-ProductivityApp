

let loginUser = () => {
  const username = document.querySelector('#usernameInput').value;
  const password = document.querySelector('#passwordInput').value;

  const userString = localStorage.getItem(username);
  const user = userString ? JSON.parse(userString) : null;

  if (user && user.password === password) {
    // Om användaren finns och lösenordet stämmer, uppdatera inloggningstillståndet
    user.loggedIn = true;

    // Spara om det uppdaterade användarobjektet i localStorage
    localStorage.setItem(username, JSON.stringify(user));
    
    window.location.href = 'todo.html';
  } else {
    alert("Wrong username or password.");
  }
}

const login = document.querySelector('#loginButton');
login.addEventListener('click', loginUser);
