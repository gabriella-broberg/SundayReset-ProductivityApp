// habits.js

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
    const title = document.getElementById("routineTitle").value;
    const priority = document.getElementById("priority").value;

    routines.push(new DailyRoutine(title, 0, priority));
    displayRoutines();
  }

  function displayRoutines() {
    const habitList = document.getElementById("habitList");
    habitList.innerHTML = "";

    routines.forEach((routine, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
          <span>${routine.title} - Streak: ${routine.streak} - Prio: ${routine.priority}</span>
          <button class="increase" data-index="${index}">+</button>
          <button class="decrease" data-index="${index}">-</button>
          <button class="reset" data-index="${index}">Nollställ</button>
          <button class="delete" data-index="${index}">Radera</button>
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
      routines.splice(index, 1);
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
