// var points = 0, lives = 5;
var gameOn = false;
var color, angle;
var gameMode = "survival";
var points = 0;
var pointsTarget = 100;
var lives = 10;
var minutes = 1;
var seconds = 30;
var myInterval;

const container_elm = document.querySelector('.container');
const blocker_elm = document.querySelector('.blocker');
const indicator_elm = document.querySelector('#indicator');
const arrow_elm = document.querySelector('#arrow');
const mask_elm = document.querySelector('#mask');
const minutes_elm = document.querySelector('#minutes');
const seconds_elm = document.querySelector('#seconds');
const points_elm = document.querySelector('#points');
const lives_elm = document.querySelector('#lives');
const target_elm = document.querySelector('#target');
const settings_elm = document.querySelector('#game-settings-container');
const colors = ['blue', 'red'];
const angles = ['0', '90', '180', '270'];

points_elm.textContent = points;
lives_elm.textContent = lives;
minutes_elm.textContent = minutes;
seconds_elm.textContent = pad(seconds);

function subtractSecond() {
    if (seconds_elm.textContent == 0 && minutes_elm.textContent == 0) {
        return endGame();
    }

    if (seconds_elm.textContent > 10) {
        seconds_elm.textContent--;
    } else if (seconds_elm.textContent > 0) {
        seconds_elm.textContent = "0" + --seconds_elm.textContent;
    } else {
        seconds_elm.textContent = 59;
    }
    
    if (seconds_elm.textContent == 59) {
        minutes_elm.textContent--; // timer does not accommodate periods longer than 1m30s, so no need for extra-ifs 
    }
}

function startGame() {
    gameOn = true;
    mask_elm.classList.toggle('removed');
    blocker_elm.classList.toggle('hidden');
    myInterval = setInterval(subtractSecond, 1000);
}

function resetArrow() {
    if (lives === 0) return;

    color = colors[Math.floor(Math.random() * 2)];
    angle = angles[Math.floor(Math.random() * 4)];
    indicator_elm.style.backgroundColor = `var(--clr-indicator-${color})`;
    arrow_elm.style.transform = `rotate(${angle}deg)`;
};

resetArrow();

document.body.addEventListener('keydown', function(e) {
    if (!gameOn) return;
    if (gameMode === "survival" && lives === 0) return;
    if (gameMode === "timeAttack" && points === pointsTarget) return;
    if (gameMode === "lap" && minutes == 0 && seconds == 0) return;
    
    if (!e.code.startsWith('Arrow')) return;

    if ((e.code.endsWith('Left') && ((color === 'blue' && angle === '90') || (color === 'red' && angle === '270'))) || 
        (e.code.endsWith('Up') && ((color === 'blue' && angle === '180') || (color === 'red' && angle === '0'))) ||
        (e.code.endsWith('Right') && ((color === 'blue' && angle === '270') || (color === 'red' && angle === '90'))) ||
        (e.code.endsWith('Down') && ((color === 'blue' && angle === '0') || (color === 'red' && angle === '180')))) {
        points_elm.textContent = ++points;
    } else {
        lives_elm.textContent = --lives;
    }

    if (lives === 0) alert('you lose, loser');

    if (lives > 0) resetArrow();
})

settings_elm.addEventListener('click', function(e) {
    if (!e.target.classList.contains('btn')) return;
    if (e.target.classList.contains('btn active')) console.log('object');;

    var button = e.target;
    var settings = button.parentElement;
    settings.querySelector('.btn.active').classList.remove('active');
    button.classList.add('active');

    if (button.classList.contains('btn-mode')) changeMode(button);
    if (button.classList.contains('btn-lives')) changeLives(button);
    if (button.classList.contains('btn-timer')) changeTimer(button);
    if (button.classList.contains('btn-target')) changeTarget(button);
})

function changeMode(button) {
    var mode = button.dataset.mode;
    container_elm.dataset.activeMode = mode;
    gameMode = mode;
}

function changeLives(button) {
    var lifeCount = parseInt(button.dataset.lives);
    lives_elm.textContent = lifeCount;
    lives = lifeCount;
}

function changeTimer(button) {
    var time = parseInt(button.dataset.time);
    var s = time % 60, m = Math.floor(time / 60);
    seconds_elm.textContent = pad(s);
    seconds = s;
    minutes_elm.textContent = m;
    minutes = m;
}

function changeTarget(button) {
    var pointsTarget = parseInt(button.dataset.target);
    target_elm.textContent = pointsTarget;
    target = pointsTarget;
}

function pad(number) {
    return (number < 10 ? "0" : "") + number;
}

function endGame() {
    gameOn = false;
    mask_elm.classList.toggle('removed');
    clearInterval(myInterval);
}

// Stopwatch

var timeBegan = null
    , timeStopped = null
    , stoppedDuration = 0
    , started = null;

function startStopwatch() {
    if (timeBegan === null) {
        timeBegan = new Date();
    }

    if (timeStopped !== null) {
        stoppedDuration += (new Date() - timeStopped);
    }

    started = setInterval(clockRunning, 10);	
}

function stopStopwatch() {
    timeStopped = new Date();
    clearInterval(started);
}
 
function resetStopwatch() {
    clearInterval(started);
    stoppedDuration = 0;
    timeBegan = null;
    timeStopped = null;
    sw_elm.innerHTML = "00:00:00.000";
}

const sw_elm = document.querySelector('#stopwatch');
const sw_minutes_elm = sw_elm.querySelector('#sw_minutes');
const sw_seconds_elm = sw_elm.querySelector('#sw_seconds');
const sw_milliseconds_elm = sw_elm.querySelector('#sw_milliseconds');

function clockRunning(){
    var currentTime = new Date(),
        timeElapsed = new Date(currentTime - timeBegan - stoppedDuration),
        min = timeElapsed.getUTCMinutes(),
        sec = timeElapsed.getUTCSeconds(),
        ms = Math.floor(timeElapsed.getUTCMilliseconds() / 10);

    sw_elm.innerHTML = pad(min) + ":" + pad(sec) + "," + pad(ms);
};