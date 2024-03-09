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

                startTimerBtn.disabled = false; 
            
            }
        }

        if (activeClock === false) {

            startTimerBtn.disabled = false;
            
            if (endTimer === true) {

                endCountDown(); 

            }
        }

        // Pausknappen går inte att klicka på när man avslutat timern
        if (endTimer === true) {

            pauseTimerBtn.disabled = true;

        }

        // Pausknappen går att klicka på igen om man startat timern
        if (endTimer === false && activeClock === true) {

            pauseTimerBtn.disabled = false; 
            
        }

    }
    
    timeInterval = setInterval(updateClock, 1000); // Uppdaterar klockan varje sekund

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

    if (endTimer === true && activeClock === false) {
    
    clearInterval(timeInterval); 
    counter = 0;  
    pauseTime = 0; 
    clockDisplay.innerHTML = "0.00"; 

    console.log("INNE I ENDCOUNTDOWN"); 
    
    }

}

// function resetClock() {

//     clearInterval(timeInterval, 1000);
//     console.log("clock is reset"); 
// }

function resumeCountDown() {

    if (pauseStart === true) {

        startTime = new Date().getTime() - pauseTime;
        displayTime(Math.floor((20 * 60 * 1000 - pauseTime) / 1000)); // Starta om timern med kvarstående tid - 20 ska sättas till rätt värde
        paused = false; 
    
    }
}


// KLICKHÄNDELSER -------------------------------------------------------// 

startTimerBtn.addEventListener("click", () => {

    // VILKET LÄGE ÄR KLOCKAN I - EJ STARTAT, STARTAT, PAUSAT, GÅTT TILL SLUTET ... tips: logga ifsatserna + states när man klickar på knappen 

    console.log("klickat på timer start!"); 
    activeClock = true; 

    // Om man klickat på paus och fortsätter timern 
    if (pauseStart === true && endTimer === false) {

        pauseCountDown(); 

        if (activeClock === true) {

            resumeCountDown(); 
        
        }
    } 

    // Om man klickat på endtimer och startar klockan igen
    if (endTimer === true && paused === false) {

        // resetClock(); 
        endCountDown(); 
        endTimer = false; 
        pauseStart = true; 
        console.log("inne i villkoret endtimer!"); 


        if (activeClock === true) {

            console.log("INNE I POMODORODEADLINE"); 
            displayTime(pomodoroDeadline); 

        }
    
    // Kör klockan vanligt - vid nystart
    } else if (pauseStart === false && endTimer === false && paused === false) {

        displayTime(pomodoroDeadline); 

    }

});


pauseTimerBtn.addEventListener("click", () => {

    activeClock = false; 
    paused = true; 

    console.log("Klickat på pause timer!"); 
    // pauseCountDown();  
    
    if (activeClock === true) {
        
        pauseStart = true; 
        paused = false; 

    }

});


endTimerBtn.addEventListener("click", () => {

    activeClock = false; 
    endTimer = true;
    pauseStart = false;  

    console.log("klickat på end timer!");
    
});









