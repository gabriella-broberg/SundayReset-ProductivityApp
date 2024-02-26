// let loggedIn = false;

// document.getElementById('registrationForm').addEventListener('submit', function(event) {
//   event.preventDefault(); // Förhindra att formuläret skickas på traditionellt sätt

//   // Hämta användarnamn och lösenord från formuläret
//   const username = document.getElementById('username').value;
//   const password = document.getElementById('password').value;

//   // Skapa ett användarobjekt
//   const user = { username, password, loggedIn: false };

//   // Spara användarobjektet i localStorage
  
//   localStorage.setItem(username, JSON.stringify(user)); x

//   // Stäng modalen
//   const registrationModal = bootstrap.Modal.getInstance(document.getElementById('registrationModal'));
//   registrationModal.hide();

//   // Rensa formuläret
//   document.getElementById('registrationForm').reset();

//   // Valfritt: Visa ett meddelande till användaren
//   alert('Användare registrerad!');
// });


let loginUser = () => {
  const username = document.querySelector('#usernameInput').value;
  const password = document.querySelector('#passwordInput').value;

  const userString = localStorage.getItem(username);
  const user = userString ? JSON.parse(userString) : null;
  // console.log("Username:", username);
  // const userString = localStorage.getItem(username);
  // const user = userString ? JSON.parse(userString) : null;
  // console.log(userString);

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
