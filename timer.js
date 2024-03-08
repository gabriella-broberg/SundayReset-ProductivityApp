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

    activeClock = false; 
    timeInterval = 0; 
    counter = 0;  
    pauseTime = 0; 
    clockDisplay.innerHTML = "0.00"; 

    clearInterval(timeInterval);

}

function resumeCountDown() {

    if (pauseStart === true) {

        startTime = new Date().getTime() - pauseTime;
        displayTime(Math.floor((20 * 60 * 1000 - pauseTime) / 1000)); // Starta om timern med kvarstående tid - 20 ska sättas till rätt värde
        paused = false; 
        console.log("Timer resumed");
        console.log(startTime); 
    
    }
}


// KLICKHÄNDELSER -------------------------------------------------------// 

startTimerBtn.addEventListener("click", () => {

    console.log("klickat på timer start!"); 
    activeClock = true; 
    
    if (pauseStart === true && endTimer === false) {

        endCountDown(); 

        if (pauseStart === true) {
            resumeCountDown(); 
        }
    } 

    if (endTimer === true) {

        endCountDown(); 
        endTimer = false; 
        activeClock = true; 
        pauseStart = false; 

        if (activeClock === true) {

            displayTime(20);
    
        }
    
    } else if (pauseStart === false && endTimer === false && paused === false) {

        displayTime(20); 

    } 
    
});


pauseTimerBtn.addEventListener("click", () => {

    activeClock = false; 
    paused = true; 

    console.log("Klickat på pause timer!"); 
    pauseCountDown();  
    
    if (activeClock === true) {
        
        pauseStart = true; 
        paused = false; 

        if (activeClock === true && pauseStart === true) {

            paused = false; 
            pauseStart = false; 
            activeClock = true; 
            displayTime(20); // Ska sättas till ett nytt värde

        }

    }

});


endTimerBtn.addEventListener("click", () => {

    activeClock = false; 
    paused = true; 
    endTimer = true;
    pauseStart = false;  
    endCountDown(); 

    console.log("klickat på end timer!");  
    

    if (activeClock === true) {
        
        pauseStart = true; 
        endTimer = false; 
    
    }

});









