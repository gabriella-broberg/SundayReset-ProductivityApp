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

class UserEvent {
  constructor(title, startTime, endTime) {
    this.title = title;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

let events = [];

document.addEventListener(
  "DOMContentLoaded",
  function () {
    events = getEventListFromCurrentUser();

    if (events.length > 0) {
      displayEvents();
    }
  }
);

let getCurrentUser = () => {
  return localStorage.getItem("currentUser");
};

let updateCurrentUser = (currentUserString) => {
  localStorage.setItem(
    "currentUser",
    currentUserString
  );
};

let displayEvents = () => {
  const pastEventsDiv = document.getElementById("past-events");
  const eventsDiv = document.getElementById("events");

  eventsDiv.innerHTML = "";
  pastEventsDiv.innerHTML = "";

  events.sort((a, b) => a.startTime - b.startTime); 
  // Sort events by start time

  events.forEach((event, index) => {
    const eventDiv =
      document.createElement("div");
    eventDiv.innerHTML = `
       <div class="event-title">${
         event.title
       }</div>
       <ul>
       <li class="startTime">Start: ${event.startTime.toLocaleString()}</li>
       <li class="endTime">End: ${event.endTime.toLocaleString()}</li>
       </ul>
       <div class="button-container2">
        <button class="delete fa-solid fa-trash" data-index="${index}"></button>
        <button class="edit fa-solid fa-pen" data-index="${index}"></button>
        </div>
        `;
    eventDiv.classList.add("event");

    //put a new class on event when time has pased
    if (new Date() > event.endTime) {
      eventDiv.classList.add("past");
      pastEventsDiv.appendChild(eventDiv);
    } else {
      eventsDiv.appendChild(eventDiv);
    }
  });
};

const form = document.getElementById("eventForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title =
    document.getElementById("eventTitle").value;

  const startTime = new Date(
    document.getElementById("startTime").value
  );

  const endTime = new Date(
    document.getElementById("endTime").value
  );

  const overlaps = events.some(
    (event) => startTime < event.endTime && endTime > event.startTime
  );
    if (!overlaps) {
      const event = {
        title,
        startTime,
        endTime,
      };
      events.push(event);
      displayEvents();
    } else {
      alert(
        "The event collides with an existing event."
      );
    }
  
  addOrUpdateEventToLocalStorage();
});

const addOrUpdateEventToLocalStorage = () => {
  let currentUser = JSON.parse(getCurrentUser());
  if (
    currentUser.eventList === undefined ||
    currentUser.eventList === null
  ) {
    currentUser["eventList"] = events;
  } else {
    currentUser.eventList = events;
  }
  updateCurrentUser(JSON.stringify(currentUser));
};

let getEventListFromCurrentUser = () => {
  let currentUser = JSON.parse(getCurrentUser());
  let events = currentUser && currentUser.eventList ? currentUser.eventList : [];
  return events.map(event => ({
    ...event,
    startTime: new Date(event.startTime),
    endTime: new Date(event.endTime)
  }));
};

let removeEventFromCurrentUser = (eventIndex) => {
  let currentUser = JSON.parse(getCurrentUser());
  
  if (!currentUser || !currentUser.eventList || currentUser.eventList.length === 0) return;

  currentUser.eventList.splice(eventIndex, 1);

  localStorage.setItem('currentUser', JSON.stringify(currentUser)); 
  
  events = getEventListFromCurrentUser();
  displayEvents();
}

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('delete')) { 
    const eventIndex = parseInt(e.target.getAttribute('data-index'), 10); 
    removeEventFromCurrentUser(eventIndex);
  }
});
