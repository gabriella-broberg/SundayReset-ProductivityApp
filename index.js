let loginUser = () => {
  const username = document.querySelector('#usernameInput').value;
  const password = document.querySelector('#passwordInput').value;

  // Retrieve the array of users from localStorage
  const usersString = localStorage.getItem('users');
  const users = usersString ? JSON.parse(usersString) : [];

  // Find the user in the array
  const user = users.find(user => user.username === username && user.password === password);

  // If the user exists and the password is correct, update the login state
  if (user) {
    user.loggedIn = true;
    // Update the users array in localStorage to reflect the login status
    localStorage.setItem('users', JSON.stringify(users));
    // Save the logged-in user's username as 'currentUser'
    localStorage.setItem('currentUser', JSON.stringify(user)); // Store the whole user object if needed elsewhere
    alert("Welcome to your Sunday Reset!")
    window.location.href = 'todo.html'; // Redirect to the todo page
  } else {
    alert("Wrong username or password.");
  }
}

const login = document.querySelector('#loginButton');
login.addEventListener('click', loginUser);

