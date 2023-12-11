let timer;
var hasFunctionBeenCalled = false;
let isRunning = false;

document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    if (isRunning) {
      smaller()
      stopTimer();
    } else {
      startTimer();
    }
  }
});


document.getElementById('theme-toggle').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
});

document.getElementById('reset-timer').addEventListener('click', function() {
  resetTimer();
});

function startTimer() {
 const hours = parseInt(document.getElementById('hours').value, 10);
  const minutes = parseInt(document.getElementById('minutes').value, 10);
  const seconds = parseInt(document.getElementById('seconds').value, 10);

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) || (hours === 0 && minutes === 0 && seconds === 0)) {
    alert("Please set a valid time before starting the timer.");
    return;
  }
    isRunning = true;
    bigger()
    hideSection3(); // Add this line to hide section3
    timer = setInterval(updateTimer, 1000);
  
}

function stopTimer() {
  isRunning = false;
  showSection3()
  clearInterval(timer);
}

function resetTimer() {
  if (!hasFunctionBeenCalled) {
    stopTimer();
    let initialTime = '__:__:__';
    document.getElementById('timer').innerHTML = initialTime;
    hasFunctionBeenCalled = true;
    
  } else {
    console.log('Function has already been called.');
  }
}

function setTimerValues(hours, minutes, seconds) {
  const timerElement = document.getElementById('timer');
  timerElement.dataset.hours = pad(hours);
  timerElement.dataset.minutes = pad(minutes);
  timerElement.dataset.seconds = pad(seconds);
}
  

function updateTimer() {
  const timerElement = document.getElementById('timer');
  let hours = parseInt(timerElement.dataset.hours);
  let minutes = parseInt(timerElement.dataset.minutes);
  let seconds = parseInt(timerElement.dataset.seconds);

  if (hours === 0 && minutes === 0 && seconds === 0) {
    stopTimer();
    playTimerSound();
    return;
  }

  if (seconds > 0) {
    seconds--;
  } else {
    seconds = 59;
    if (minutes > 0) {
      minutes--;
    } else {
      minutes = 59;
      if (hours > 0) {
        hours--;
      }
    }
  }

  setTimerValues(hours, minutes, seconds);
  updateTimerDisplay();
}


function updateTimerDisplay() {
  const timerElement = document.getElementById('timer');
  const hours = parseInt(timerElement.dataset.hours);
  const minutes = parseInt(timerElement.dataset.minutes);
  const seconds = parseInt(timerElement.dataset.seconds);
  timerElement.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(value) {
  return value < 10 ? `0${value}` : value;
}

function playTimerSound() {
  const timerSound = document.getElementById('timerSound');
  timerSound.play();
}


function bigger() {
  var textElement = document.getElementById('timer');
  var currentSize = parseInt(window.getComputedStyle(textElement).fontSize);
  var newSize = currentSize + 70; // You can adjust the increment as needed

  textElement.style.fontSize = newSize + 'px';
}

function smaller() {
  var textElement = document.getElementById('timer');
  var currentSize = parseInt(window.getComputedStyle(textElement).fontSize);
  var newSize = currentSize - 70; // You can adjust the increment as needed

  textElement.style.fontSize = newSize + 'px';
}


// Listen for input events on the number fields
const numberInputs = document.querySelectorAll('input[type="number"]');
numberInputs.forEach(function(input) {
  input.addEventListener('input', function() {
    setTimerValues(
      parseInt(document.getElementById('hours').value),
      parseInt(document.getElementById('minutes').value),
      parseInt(document.getElementById('seconds').value)
    );
    updateTimerDisplay();
  });
});


function hideSection3() {
  const section3 = document.querySelector('.section3');
  if (section3) {
    section3.style.display = 'none';
  }
}

function showSection3() {
  const section3 = document.querySelector('.section3');
  if (section3) {
    section3.style.display = 'block';
  }
}
