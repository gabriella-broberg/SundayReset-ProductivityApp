import { logoutUser } from "./usersModule.js";

let logoutbtn = document.querySelector(".logout-btn");

logoutbtn.addEventListener('click', function (event){
  event.preventDefault();
  try {
    logoutUser();
  } catch (error){
    alert(error.message);
  }

});document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('eventForm');
  
  const eventsDiv = document.getElementById('events');
  
  let events = [];

  form.addEventListener('submit', function(e) {
      e.preventDefault();
      const title = document.getElementById('eventTitle').value;
      const startTime = new Date(document.getElementById('startTime').value);
      const endTime = new Date(document.getElementById('endTime').value);

      // Kontrollera att händelsen inte krockar med andra händelser
      const overlaps = events.some(event => 
          (startTime < event.endTime && endTime > event.startTime)
      );

      if (!overlaps) {
          const event = { title, startTime, endTime };
          events.push(event);
          displayEvents();
      } else {
          alert('Händelsen krockar med en befintlig händelse.');
      }
  });

  function displayEvents() {
      const pastEventsDiv = document.getElementById('past-events');

      eventsDiv.innerHTML = '';
      events.sort((a, b) => a.startTime - b.startTime); // Sortera händelser efter starttid

      events.forEach(event => {
          const eventDiv = document.createElement('div');
          eventDiv.innerHTML = `
           <div class="event-title">${event.title}</div>
           <ul>
           <li class="startTime">Start: ${event.startTime.toLocaleString()}</li>
           <li class="endTime">End: ${event.endTime.toLocaleString()}</li>
           </ul>`
          eventDiv.classList.add('event');

          //put a new class on event when pased
          if (new Date() > event.endTime) {
            eventDiv.classList.add('past');
            pastEventsDiv.appendChild(eventDiv);
          }else {
            eventsDiv.appendChild(eventDiv);
          }

          
      });
  }
});
