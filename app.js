const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

let score = 0;
let timeLeft = 30;
let gameRunning = false;
let timer;

// Get Telegram user
const user = tg.initDataUnsafe?.user;

if (user) {
    document.getElementById("playerName").textContent =
        `👋 ${user.first_name}`;
}

// Load best score
let bestScore = Number(localStorage.getItem("bestScore")) || 0;
document.getElementById("best").textContent = bestScore;

const coin = document.getElementById("coin");
const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const message = document.getElementById("message");
const startButton = document.getElementById("startButton");

function startGame() {

    if (gameRunning) return;

    score = 0;
    timeLeft = 30;
    gameRunning = true;

    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;

    message.textContent = "🎯 Tap the coin as fast as you can!";

    startButton.disabled = true;
    startButton.textContent = "🎮 GAME RUNNING...";

    coin.style.display = "block";

    moveCoin();

    timer = setInterval(() => {

        timeLeft--;

        timeDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }

    }, 1000);
}

function tapCoin() {

    if (!gameRunning) return;

    score++;

    scoreDisplay.textContent = score;

    moveCoin();
}

function moveCoin() {

    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;

    const coinSize = 75;

    const maxX = areaWidth - coinSize;
    const maxY = areaHeight - coinSize;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    coin.style.left = `${randomX}px`;
    coin.style.top = `${randomY}px`;
}

function endGame() {

    gameRunning = false;

    clearInterval(timer);

    coin.style.display = "none";

    startButton.disabled = false;
    startButton.textContent = "🔄 PLAY AGAIN";

    if (score > bestScore) {

        bestScore = score;

        localStorage.setItem(
            "bestScore",
            bestScore
        );

        document.getElementById("best").textContent =
            bestScore;

        message.textContent =
            `🏆 NEW RECORD! You scored ${score} points!`;

    } else {

        message.textContent =
            `🎉 Game Over! You scored ${score} points!`;
    }
}
