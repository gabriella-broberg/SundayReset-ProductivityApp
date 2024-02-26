let loggedIn = false;

document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Förhindra att formuläret skickas på traditionellt sätt

  // Hämta användarnamn och lösenord från formuläret
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Skapa ett användarobjekt
  const user = { username, password, loggedIn: false };

  // Spara användarobjektet i localStorage
  
  localStorage.setItem(username, JSON.stringify(user));

  // Stäng modalen
  const registrationModal = bootstrap.Modal.getInstance(document.getElementById('registrationModal'));
  registrationModal.hide();

  // Rensa formuläret
  document.getElementById('registrationForm').reset();

  // Valfritt: Visa ett meddelande till användaren
  alert('Användare registrerad!');
});
