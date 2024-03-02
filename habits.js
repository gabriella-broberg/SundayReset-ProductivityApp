// habits.js

let logoutUser = () => {
  // Retrieve the current user from localStorage
  const currentUserString = localStorage.getItem('currentUser');
  const currentUser = currentUserString ? JSON.parse(currentUserString) : null;

  if (currentUser) {
    // Retrieve the users array
    const usersString = localStorage.getItem('users');
    let users = usersString ? JSON.parse(usersString) : [];

    // Find the current user in the users array and update their loggedIn state
    const userIndex = users.findIndex(user => user.username === currentUser.username);
    if (userIndex !== -1) {
      users[userIndex].loggedIn = false;
      localStorage.setItem('users', JSON.stringify(users)); // Update the users array in localStorage
    }

    // Clear the currentUser in localStorage
    localStorage.removeItem('currentUser');

    alert("You have been logged out.");
    // Redirect to the login page or home page as required
    window.location.href = 'index.html';
  } else {
    alert("No user is currently logged in.");
  }
}

// Assuming you have a logout button with the ID 'logoutButton'
const logoutButton = document.querySelector('#LogoutButton');
logoutButton.addEventListener('click', logoutUser);


document.addEventListener("DOMContentLoaded", function () {
  // Skapa en array för att lagra dagliga rutiner
  let routines = [];

  class DailyRoutine {
    constructor(title, streak, priority) {
      this.title = title;
      this.streak = streak;
      this.priority = priority;
    }

    increaseStreak() {
      this.streak++;
    }

    decreaseStreak() {
      if (this.streak > 0) {
        this.streak--;
      }
    }

    resetStreak() {
      this.streak = 0;
    }
  }

  function addRoutine() {
    // The browser will handle the required attribute, no need for a custom check
    const titleInput = document.getElementById("routineTitle");
    const priority = document.getElementById("priority").value;

    // Check if the title is empty
    if (titleInput.value.trim() === "") {
      // Set custom validation message
      titleInput.setCustomValidity("Add title");
      titleInput.reportValidity(); // Display the validation message
      return;
    }

    // Clear the custom validation message
    titleInput.setCustomValidity("");

    // Create a routine only if the form is valid (title is not empty)
    if (titleInput.checkValidity()) {
      const title = titleInput.value.trim();
      routines.push(new DailyRoutine(title, 0, priority));
      displayRoutines();

      // Clear the title input
      titleInput.value = "";
    }
  }

  function displayRoutines() {
    const habitList = document.getElementById("habitList");
    habitList.innerHTML = "";

    routines.forEach((routine, index) => {
      const li = document.createElement("li");
      li.className = "habit-list-item"; // Add the class to the created element
      li.innerHTML = `
        <div class="info-container">
          <div class="title">${routine.title}</div>
          <div class="streak">Streak: ${routine.streak}</div>
          <div class="prio">Prio: ${routine.priority}</div>
        </div>
        <div class="button-container">
         

         <button class="increase fa-solid fa-plus" data-index="${index}"></button>
         <button class="decrease fa-solid fa-minus" data-index="${index}"></button>
          <button class="reset fa-solid fa-undo" data-index="${index}"></button>
          </div>

          <div class="button-container2">
          <button class="delete fa-solid fa-trash" data-index="${index}"></button>
          </div>
          
       
      `;
      habitList.appendChild(li);
    });
  }

  function sortFilter(attribute) {
    if (attribute === "streak") {
      routines.sort((a, b) => b.streak - a.streak);
    } else if (attribute === "priority") {
      routines.sort((a, b) => parseInt(a.priority) - parseInt(b.priority));
    }

    displayRoutines();
  }

  function handleButtonClick(event) {
    const target = event.target;
    const index = target.dataset.index;

    if (target.classList.contains("increase")) {
      routines[index].increaseStreak();
    } else if (target.classList.contains("decrease")) {
      routines[index].decreaseStreak();
    } else if (target.classList.contains("reset")) {
      routines[index].resetStreak();
    } else if (target.classList.contains("delete")) {
      // Ask for confirmation before deleting
      const isConfirmed = confirm(
        "Are you sure you want to delete this habit?"
      );

      if (isConfirmed) {
        routines.splice(index, 1);
        displayRoutines();
      }
    }

    displayRoutines();
  }

  // Lägg till event listener på dokumentet och använd event delegation
  document
    .getElementById("addRoutineButton")
    .addEventListener("click", addRoutine);
  document
    .getElementById("sortStreakButton")
    .addEventListener("click", function () {
      sortFilter("streak");
    });
  document
    .getElementById("sortPriorityButton")
    .addEventListener("click", function () {
      sortFilter("priority");
    });

  document.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      handleButtonClick(event);
    }
  });
});
