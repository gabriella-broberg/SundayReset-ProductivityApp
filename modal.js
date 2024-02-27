import { createUser } from "./usersModule.js";

document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from being submitted in the traditional way

  // Get username and password from the form
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    // Använd createUser funktionen för att skapa och lägga till den nya användaren
    createUser(username, password);

    // Stäng modalen
    const registrationModal = bootstrap.Modal.getInstance(document.getElementById('registrationModal'));
    registrationModal.hide();

    // Rensa formuläret
    document.getElementById('registrationForm').reset();
    
    alert('Användare registrerad!');
  } catch (error) {
    alert(error.message); // Visa felmeddelande om användarnamnet redan är taget
  }
});
