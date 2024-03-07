let timeLeft; 
let timeInterval; 
let pauseTime = 0; 
let counter = 0; 

let startTimerBtn = document.getElementById("start-timer");
let pauseTimerBtn = document.getElementById("pause-timer"); 
let endTimerBtn = document.getElementById("end-timer"); 
let hideNotePad = document.getElementById("hide-notepad"); 
let clockDisplay = document.getElementById("timer-clock-h2"); 

let paused = false; 
let activeClock = false; 
let endTimer = false; 

let pomodoroDeadline = 1; // Ska sättas till 20!
let currentTime = Date.parse(new Date());
let startTime = new Date().getTime() - pauseTime; 
// let deadline = new Date(currentTime + pomodoroDeadline*60*1000); //*60*1000

//-----------------------------------------------------------------------------------------------//


function displayTime(sec) {

    let counter = sec;

    function updateClock() {

        if (activeClock === true) {

            let minutes = Math.floor(counter / 60);
            let seconds = counter % 60;
            clockDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            counter--;
            
            startTimerBtn.disabled = true; 

            console.log(counter); 

            if (counter < 0) {

                clearInterval(timeInterval);
                console.log('Ding!');
            
            }
        }

        if (activeClock === false) {
            startTimerBtn.disabled = false;
            
            if (endTimer === true) {
                endCountDown(); 
                
            }
        }

    }

    let timeInterval = setInterval(updateClock, 1000); // Uppdaterar klockan varje sekund

}

// FUNKTION FÖR ATT STARTA TIMERN
function startCountDown(seconds) {
    let counter = seconds;
      
    const timeInterval = setInterval(() => {
      console.log(counter);
      counter--;
        
      if (counter === 0 ) {
        clearInterval(timeInterval);
        console.log('Ding!');
      }
    }, 1000);
  }

function pauseCountDown() {

    if (paused === true) {

    pauseTime = new Date().getTime() - startTime; // calculate elapsed paused time
    timeInterval = null; // reset the interval variable
    activeClock = false; 

    clearInterval(pauseTime); // stop the interval
    console.log("pause Countdown körs"); 

    }
}  

function endCountDown() {

    timeInterval = 0; 
    counter = 0;  
    pauseTime = 0; 
    clockDisplay.innerHTML = "0.00"; 

    clearInterval(timeInterval);

}

function resumeCountDown() {

    if (paused) {
        startTime = new Date().getTime() - pauseTime;
        startCountDown(Math.floor((20 * 60 * 1000 - pauseTime) / 1000)); // Starta om timern med kvarstående tid
        paused = false; // Återställ pausflaggan
        activeClock = true; // Aktivera timern
        console.log("Timer resumed");
    }
}

startTimerBtn.addEventListener("click", () => {

    console.log("klickat på timer start!"); 
    activeClock = true; 
    displayTime(20); // Ska sättas till ett nytt värde
    
});


pauseTimerBtn.addEventListener("click", () => {

    activeClock = false; 
    paused = true; 

    console.log("Klickat på pause timer!"); 
    pauseCountDown();  
    
    if (activeClock === true) {
    
        resumeCountDown(); 
    }

});


endTimerBtn.addEventListener("click", () => {

    activeClock = false; 
    paused = true; 
    endTimer = true; 
    endCountDown(); 

    console.log("klickat på end timer!");  
    
    // SKA STÄLLAS OM TILL 20 MINUTER
    if (activeClock === true) {
        
        displayTime(20); 
    
    }

});









