let loggedIn = false;

document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from being submitted in the traditional way

  // Get username and password from the form
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Create a user object
  const user = { 
    username, 
    password, 
    loggedIn: false 
  };

  // Store the user object in localStorage  
  localStorage.setItem(username, JSON.stringify(user));

  // Close the modal
  const registrationModal = bootstrap.Modal.getInstance(document.getElementById('registrationModal'));
  registrationModal.hide();

  // Clear the form
  document.getElementById('registrationForm').reset();
  
  alert('Användare registrerad!');
});
