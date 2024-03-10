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
let pauseStart = false; 

let pomodoroDeadline = 1200; // 20 minuter
let currentTime = Date.parse(new Date());
let startTime = new Date().getTime() - pauseTime; 

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

        }

    }
    
    timeInterval = setInterval(updateClock, 1000); // Uppdaterar klockan varje sekund

}

function pauseCountDown() {

    if (paused === true) {

    pauseTime = new Date().getTime() - startTime; // calculate elapsed paused time
    activeClock = false; 

    clearInterval(pauseTime); // stop the interval
    console.log("pause Countdown körs"); 

    }
}  

function endCountDown() {

    if (endTimer) {
    
    clearInterval(timeInterval); 
    counter = 0;  
    pauseTime = 0; 
    clockDisplay.innerHTML = "0.00"; 

    console.log("INNE I ENDCOUNTDOWN"); 

    startTimerBtn.disabled = false;

    }

}


function resumeCountDown() {

    if (paused && pauseStart) {

        startTime = new Date().getTime() - pauseTime;
        displayTime(Math.floor((20 * 60 * 1000 - pauseTime) / 1000)); // Starta om timern med kvarstående tid - 20 ska sättas till rätt värde
        pauseStart = true; 
    
    }
}

// ----------- FUNKTIONER FÖR STATES ------------ // 

function pausedClock() {

    if (paused) {

        pauseCountDown(); 
    } 

}

function resumedClock() {

    if (paused && activeClock) {
 
        resumeCountDown(); 
        console.log("INNE I RESUME COUNTDOWN!!!!!"); 

    } 

}

function stoppedClock() {
    
    if (endTimer) {

        endCountDown();
        
        if (activeClock) {

            displayTime(pomodoroDeadline);
        }
    }

}

function endedClock() {

    activeClock = false; 

    if (counter < 0) {

    clearInterval(timeInterval);
    console.log('Ding!!!');

    startTimerBtn.disabled = false; 
    
    } 

}

function startClock() {

    if (paused === false && endTimer === false && pauseStart === false) {

        displayTime(pomodoroDeadline);
        console.log("Inne i startedClock!");  

    } 
    
    if (pauseStart) {
        
        resumeCountDown(); 


    }


}

function btnStates() {

    // Pausknappen går inte att klicka på när man avslutat timern
    if (endTimer) {

        pauseTimerBtn.disabled = true;
        
        if (activeClock) {

            pauseTimerBtn.disabled = false;
        }
    }
    
    // Pausknappen går att klicka på igen om man startat timern
    if (endTimer === false && activeClock) {
    
        pauseTimerBtn.disabled = false; 
                
    }

    // Startknappen går att klicka på när timern gått till noll
    if (counter < 0) {

        startTimerBtn.disabled = false; 

    }

    if (activeClock === false) {

        startTimerBtn.disabled = false;
         
     }

}

// --------------------------------------------- KLICKHÄNDELSER ------------------------------------------------------- // 

startTimerBtn.addEventListener("click", () => {

    console.log("klickat på timer start!"); 
    activeClock = true; 

    resumedClock(); 
    stoppedClock(); 
    startClock(); 

    if (counter < 0) {

        endedClock(); 

    }

    btnStates(); 

});


pauseTimerBtn.addEventListener("click", () => {

    paused = true; 
    activeClock = false; 
    endTimer = false; 

    pausedClock(); 
    stoppedClock(); 

    console.log("klickat på pause timer!"); 


    btnStates(); 

});


endTimerBtn.addEventListener("click", () => {

    endTimer = true; 
    activeClock = false; 

    stoppedClock(); 

    if (counter < 0) {

        endedClock(); 

    }

    btnStates(); 
    
});









