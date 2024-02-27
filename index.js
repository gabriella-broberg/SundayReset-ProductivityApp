import { loginUser } from "./usersModule.js";

const login = document.querySelector('#loginButton');

login.addEventListener('click', function(event) {
  event.preventDefault();

  const username = document.querySelector('#usernameInput').value;
  const password = document.querySelector('#passwordInput').value;

  try {
    // Försök logga in användaren med de angivna uppgifterna
    loginUser(username, password);

    alert('Du är nu inloggad!');
    // Här kan du hantera vad som ska hända efter en lyckad inloggning
  } catch (error) {
      alert(error.message); // Visa felmeddelande om inloggningen misslyckas
  }

});
