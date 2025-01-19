let startTime;
let updatedTime;
let running = false;
let timeElapsed = 0;
let lapTimes = [];

const timeDisplay = document.getElementById('time');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

function formatTime(ms) {
    const date = new Date(ms);
    return `${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}:${date.getMilliseconds() < 100 ? '0' + date.getMilliseconds() : date.getMilliseconds()}`;
}

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - timeElapsed;
        updatedTime = setInterval(function () {
            timeElapsed = new Date().getTime() - startTime;
            timeDisplay.innerHTML = formatTime(timeElapsed);
        }, 1);
        running = true;
        startStopBtn.innerHTML = 'Stop';
    } else {
        clearInterval(updatedTime);
        running = false;
        startStopBtn.innerHTML = 'Start';
    }
}

function resetStopwatch() {
    clearInterval(updatedTime);
    running = false;
    timeElapsed = 0;
    timeDisplay.innerHTML = '00:00:00';
    lapList.innerHTML = '';
    lapTimes = [];
    startStopBtn.innerHTML = 'Start';
}

function recordLap() {
    if (running) {
        const lapTime = formatTime(timeElapsed);
        lapTimes.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.innerText = lapTime;
        lapList.appendChild(lapItem);
    }
}

startStopBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
