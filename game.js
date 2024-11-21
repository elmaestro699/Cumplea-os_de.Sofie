game.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const jumpButton = document.getElementById("jump-button");

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.6;

let angie = {
    x: 50,
    y: canvas.height - 150,
    width: 50,
    height: 100,
    color: "#fddb3a",
    dy: 0,
    jump: -12,
    gravity: 0.5,
    grounded: false,
    image: null,
};

angie.image = new Image();
angie.image.src = "angie_sprite.png";

let platforms = [
    { x: 0, y: canvas.height - 50, width: canvas.width, height: 50 },
    { x: 200, y: canvas.height - 150, width: 100, height: 20 },
    { x: 400, y: canvas.height - 250, width: 100, height: 20 },
    { x: 600, y: canvas.height - 350, width: 100, height: 20 },
];

let cake = {
    x: 750,
    y: canvas.height - 400,
    width: 50,
    height: 50,
    image: null,
};

cake.image = new Image();
cake.image.src = "cake_sprite.png";

let gameWon = false;

// Key controls and touch button
document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && angie.grounded) {
        angie.dy = angie.jump;
        angie.grounded = false;
    }
});

jumpButton.addEventListener("click", () => {
    if (angie.grounded) {
        angie.dy = angie.jump;
        angie.grounded = false;
    }
});

function drawAngie() {
    if (angie.image.complete) {
        ctx.drawImage(angie.image, angie.x, angie.y, angie.width, angie.height);
    } else {
        ctx.fillStyle = angie.color;
        ctx.fillRect(angie.x, angie.y, angie.width, angie.height);
    }
}

function drawPlatforms() {
    platforms.forEach((platform) => {
        ctx.fillStyle = "#6a0dad";
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

function drawCake() {
    if (cake.image.complete) {
        ctx.drawImage(cake.image, cake.x, cake.y, cake.width, cake.height);
    } else {
        ctx.fillStyle = "#ff6b6b";
        ctx.fillRect(cake.x, cake.y, cake.width, cake.height);
    }
}

function checkCollision() {
    angie.grounded = false;
    platforms.forEach((platform) => {
        if (
            angie.x < platform.x + platform.width &&
            angie.x + angie.width > platform.x &&
            angie.y + angie.height > platform.y &&
            angie.y + angie.height < platform.y + platform.height
        ) {
            angie.y = platform.y - angie.height;
            angie.dy = 0;
            angie.grounded = true;
        }
    });
    if (
        angie.x < cake.x + cake.width &&
        angie.x + angie.width > cake.x &&
        angie.y < cake.y + cake.height &&
        angie.y + angie.height > cake.y
    ) {
        gameWon = true;
    }
}

function showFinalMessage() {
    ctx.fillStyle = "#000";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("¡Feliz cumpleaños, Angietta!", canvas.width / 2, canvas.height / 2 - 40);
    ctx.font = "20px Arial";
    ctx.fillText("Eres increíble, sigue adelante y nunca dejes de devorar 💅!", canvas.width / 2, canvas.height / 2);
    ctx.fillText("TKM ❤", canvas.width / 2, canvas.height / 2 + 40);
}

function update() {
    if (gameWon) {
        showFinalMessage();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    angie.dy += angie.gravity;
    angie.y += angie.dy;

    checkCollision();

    drawPlatforms();
    drawAngie();
    drawCake();
}

function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
