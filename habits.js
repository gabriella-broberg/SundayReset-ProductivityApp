// habits.js
// * Logout method
let logoutUser = () => {
  // Retrieve the current user from localStorage
  const currentUserString = localStorage.getItem(
    "currentUser"
  );
  const currentUser = currentUserString
    ? JSON.parse(currentUserString)
    : null;

  if (currentUser) {
    // Retrieve the users array
    const usersString =
      localStorage.getItem("users");
    let users = usersString
      ? JSON.parse(usersString)
      : [];

    // Find the current user in the users array and update their loggedIn state
    const userIndex = users.findIndex(
      (user) =>
        user.username === currentUser.username
    );
    users[userIndex] = currentUser;
    if (userIndex !== -1) {
      users[userIndex].loggedIn = false;
      localStorage.setItem(
        "users",
        JSON.stringify(users)
      ); // Update the users array in localStorage
    }

    // Clear the currentUser in localStorage
    localStorage.removeItem("currentUser");

    alert("You have been logged out.");
    // Redirect to the login page or home page as required
    window.location.href = "index.html";
  } else {
    alert("No user is currently logged in.");
  }
};

const logoutButton = document.querySelector(
  "#LogoutButton"
);
logoutButton.addEventListener(
  "click",
  logoutUser
);
// * End logout method
class DailyRoutine {
  constructor(title, streak, priority) {
    this.title = title;
    this.streak = streak;
    this.priority = priority;
  }
}

let routines = [];
let filterOption = 0;

document.addEventListener(
  "DOMContentLoaded",
  function () {
    
    routines = getHabitListFromCurrentUser();

    if (routines.length > 0) {
      displayRoutines();
    }

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
    document
      .getElementById("filterPrioSelect")
      .addEventListener(
        "change",
        function (event) {
          filterOnPriority(event);
        },
        false
      );

    document.addEventListener(
      "click",
      function (event) {
        if (event.target.tagName === "BUTTON") {
          handleButtonClick(event);
        }
      }
    );
  }
);

function filterOnPriority(event) {
  filterOption = event.target.value;
  displayRoutines();
}

function addRoutine() {
  // The browser will handle the required attribute, no need for a custom check
  const titleInput = document.getElementById(
    "routineTitle"
  );
  const priority =
    document.getElementById("priority").value;

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
    routines.push(
      new DailyRoutine(title, 0, priority)
    );

    addOrUpdateHabitToLocalStoarge();

    displayRoutines();

    // Clear the title input
    titleInput.value = "";
  }
}

function getHabitListFromCurrentUser() {
  let currentUser = JSON.parse(getCurrentUser());
  if (
    currentUser.habitList === undefined ||
    currentUser.habitList === null
  ) {
    return [];
  } else {
    return currentUser.habitList;
  }
}

// If habitList is missing we create it and add current routines to currentUser
// Else we add current routine to currentUser
// Then we update currentUser in loaclStorage
function addOrUpdateHabitToLocalStoarge() {
  let currentUser = JSON.parse(getCurrentUser());
  if (
    currentUser.habitList === undefined ||
    currentUser.habitList === null
  ) {
    currentUser["habitList"] = routines;
  } else {
    currentUser.habitList = routines;
  }
  updateCurrentUser(JSON.stringify(currentUser));
}

function removeHabitFromCurrentUser() {
  let currentUser = JSON.parse(getCurrentUser());
  if (
    currentUser.habitList !== undefined ||
    currentUser.habitList !== null
  ) {
    currentUser.habitList = routines;
    updateCurrentUser(
      JSON.stringify(currentUser)
    );
  }
}

function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

function updateCurrentUser(currentUserString) {
  localStorage.setItem(
    "currentUser",
    currentUserString
  );
}


function displayRoutines() {
  const habitList =
    document.getElementById("habitList");
  habitList.innerHTML = "";
  let filteredRoutines = routines;
  if (filterOption !== 0) {
    filteredRoutines = routines.filter(
      (routine) =>
        routine.priority == filterOption
    );
  }
  filteredRoutines.forEach((routine, index) => {
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
    routines.sort(
      (a, b) =>
        parseInt(a.priority) -
        parseInt(b.priority)
    );
  }

  displayRoutines();
}

function handleButtonClick(event) {
  const target = event.target;
  const index = target.dataset.index;

  if (target.classList.contains("increase")) {
    routines[index].streak++;
  } else if (
    target.classList.contains("decrease") &&
    routines[index].streak > 0
  ) {
    routines[index].streak--;
  } else if (target.classList.contains("reset")) {
    routines[index].streak = 0;
  } else if (
    target.classList.contains("delete")
  ) {
    // Ask for confirmation before deleting
    const isConfirmed = confirm(
      "Are you sure you want to delete this habit?"
    );

    if (isConfirmed) {
      routines.splice(index, 1);
      removeHabitFromCurrentUser();
      displayRoutines();
    }
  }
  addOrUpdateHabitToLocalStoarge();
  displayRoutines();
}
