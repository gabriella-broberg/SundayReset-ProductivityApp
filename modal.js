let loggedIn = false;

document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from being submitted in the traditional way

  // Get username and password from the form
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Create a user object
  const newUser = { username, password, loggedIn: false };

  let users = JSON.parse(localStorage.getItem('users')) || [];

  if (users.some(user => user.username === username)) {
    alert('Användarnamnet är redan taget. Välj ett annat.');
    return; // Stop execution if username exists
  }
  // // Store the user object in localStorage  
  // localStorage.setItem(username, JSON.stringify(user));

  // // Close the modal
  // const registrationModal = bootstrap.Modal.getInstance(document.getElementById('registrationModal'));
  // registrationModal.hide();

  // // Clear the form
  // document.getElementById('registrationForm').reset();
  
  // alert('Användare registrerad!');

  // Add the new user to the users array
  users.push(newUser);

  // Store the updated users array in localStorage
  localStorage.setItem('users', JSON.stringify(users));

  // Optionally, set the current user (if automatic login is desired after registration)
  // localStorage.setItem('currentUser', JSON.stringify(newUser));

  // Close the modal
  const registrationModal = bootstrap.Modal.getInstance(document.getElementById('registrationModal'));
  registrationModal.hide();

  // Clear the form
  document.getElementById('registrationForm').reset();
  
  alert('Användare registrerad!');
});
