const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

stopButton.disabled = true;

let timerID = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

startButton.addEventListener('click', () => {
    startButton.disabled = true;
    stopButton.disabled = false;

    timerID = setInterval(() => {
        document.body.style.background = getRandomHexColor();
    }, 700);
});

stopButton.addEventListener('click', () => {
    clearInterval(timerID);

    startButton.disabled = false;
    stopButton.disabled = true;
});
