// Animación del sistema solar
const sun = new Image();
const moon = new Image();
const earth = new Image();

function init() {
    sun.src = "canvas_sun.png";
    moon.src = "canvas_moon.png";
    earth.src = "canvas_earth.png";
    window.requestAnimationFrame(drawSolarSystem);
}

function drawSolarSystem() {
    const canvas = document.getElementById("canvas_solar");
    const ctx = canvas.getContext("2d");
    const canvasSize = 300;
    const centerX = canvasSize / 2;
    const centerY = canvasSize / 2;

    ctx.globalCompositeOperation = "destination-over";
    ctx.clearRect(0, 0, canvasSize, canvasSize); // Limpiar el lienzo

    ctx.fillStyle = "rgb(0 0 0 / 40%)";
    ctx.strokeStyle = "rgb(0 153 255 / 40%)";
    ctx.save();
    ctx.translate(centerX, centerY);

    // Tierra
    const time = new Date();
    ctx.rotate(
        ((2 * Math.PI) / 60) * time.getSeconds() +
        ((2 * Math.PI) / 60000) * time.getMilliseconds()
    );
    ctx.translate(105, 0);
    ctx.fillRect(0, -12, 40, 24); // Sombra
    ctx.drawImage(earth, -12, -12, 24, 24); // Tamaño ajustado

    // Luna
    ctx.save();
    ctx.rotate(
        ((2 * Math.PI) / 6) * time.getSeconds() +
        ((2 * Math.PI) / 6000) * time.getMilliseconds()
    );
    ctx.translate(0, 28.5);
    ctx.drawImage(moon, -3.5, -3.5, 7, 7); // Tamaño ajustado
    ctx.restore();

    ctx.restore();

    ctx.beginPath();
    ctx.arc(centerX, centerY, 105, 0, Math.PI * 2, false); // Órbita de la Tierra
    ctx.stroke();

    ctx.drawImage(sun, 0, 0, canvasSize, canvasSize); // Tamaño ajustado

    window.requestAnimationFrame(drawSolarSystem);
}

init();

// Reloj
function clock() {
    const now = new Date();
    const canvas = document.getElementById("canvas_reloj");
    const ctx = canvas.getContext("2d");
    const canvasSize = 300;
    const centerX = canvasSize / 2;
    const centerY = canvasSize / 2;

    ctx.save();
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    ctx.translate(centerX, centerY);
    ctx.scale(0.4, 0.4);
    ctx.rotate(-Math.PI / 2);
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";

    // Marcas de horas
    ctx.save();
    for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(100, 0);
        ctx.lineTo(120, 0);
        ctx.stroke();
    }
    ctx.restore();

    // Marcas de minutos
    ctx.save();
    ctx.lineWidth = 5;
    for (let i = 0; i < 60; i++) {
        if (i % 5 !== 0) {
            ctx.beginPath();
            ctx.moveTo(117, 0);
            ctx.lineTo(120, 0);
            ctx.stroke();
        }
        ctx.rotate(Math.PI / 30);
    }
    ctx.restore();

    const sec = now.getSeconds();
    const min = now.getMinutes();
    const hr = now.getHours() % 12;

    ctx.fillStyle = "black";

    // Escribir horas
    ctx.save();
    ctx.rotate(
        (Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec
    );
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(80, 0);
    ctx.stroke();
    ctx.restore();

    // Escribir minutos
    ctx.save();
    ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-28, 0);
    ctx.lineTo(112, 0);
    ctx.stroke();
    ctx.restore();

    // Escribir segundos
    ctx.save();
    ctx.rotate((sec * Math.PI) / 30);
    ctx.strokeStyle = "#D40000";
    ctx.fillStyle = "#D40000";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(83, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fillStyle = "rgb(0 0 0 / 0%)";
    ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();

    ctx.beginPath();
    ctx.lineWidth = 14;
    ctx.strokeStyle = "#325FA2";
    ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
    ctx.stroke();

    ctx.restore();

    window.requestAnimationFrame(clock);
}

window.requestAnimationFrame(clock);

// Animación de la imagen panorámica
const img = new Image();
img.src = "capitan_meadows_yosemite_national_park.jpg";
const speed = 30; // Menor es más rápido
const scale = 1.05;
const y = -4.5; // Desplazamiento vertical

const dx = 0.75;
let imgW;
let imgH;
let x = 0;
let clearX;
let clearY;
let ctx;

img.onload = () => {
    imgW = img.width * scale;
    imgH = img.height * scale;

    const canvas = document.getElementById("canvas_panoramico");
    canvas.width = imgW;
    canvas.height = imgH;

    clearX = Math.max(imgW, canvas.width);
    clearY = Math.max(imgH, canvas.height);

    ctx = canvas.getContext("2d");

    setInterval(draw, speed);
};

function draw() {
    ctx.clearRect(0, 0, clearX, clearY);

    if (imgW <= clearX) {
        if (x > clearX) {
            x = -imgW + x;
        }

        if (x > 0) {
            ctx.drawImage(img, -imgW + x, y, imgW, imgH);
        }

        if (x - imgW > 0) {
            ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
        }
    } else {
        if (x > clearX) {
            x = clearX - imgW;
        }

        if (x > clearX - imgW) {
            ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
        }
    }

    ctx.drawImage(img, x, y, imgW, imgH);

    x += dx;
}

// Animación siguiendo el ratón
// siguiendo el raton
const canvas_raton = document.getElementById("canvas_raton");
const context = canvas_raton.getContext("2d");
context.globalAlpha = 0.5;
canvas_raton.width = 300; // Ajustar el ancho del canvas al mismo que el canvas original
canvas_raton.height = 300; // Ajustar el alto del canvas al mismo que el canvas original

const cursor = {
    x: canvas_raton.width / 2, // Centrar el cursor horizontalmente en el canvas
    y: canvas_raton.height / 2, // Centrar el cursor verticalmente en el canvas
};

let particlesArray = [];

generateParticles(101);
setSize();
anim();

addEventListener("mousemove", (e) => {
    const canvasRect = canvas_raton.getBoundingClientRect();
    cursor.x = e.clientX - canvasRect.left;
    cursor.y = e.clientY - canvasRect.top;
});

addEventListener(
    "touchmove",
    (e) => {
        e.preventDefault();
        const canvasRect = canvas_raton.getBoundingClientRect();
        cursor.x = e.touches[0].clientX - canvasRect.left;
        cursor.y = e.touches[0].clientY - canvasRect.top;
    },
    { passive: false },
);

addEventListener("resize", () => setSize());

function generateParticles(amount) {
    for (let i = 0; i < amount; i++) {
        particlesArray[i] = new Particle(
            canvas_raton.width / 2,
            canvas_raton.height / 2,
            4,
            generateColor(),
            0.02,
        );
    }
}

function generateColor() {
    let hexSet = "0123456789ABCDEF";
    let finalHexString = "#";
    for (let i = 0; i < 6; i++) {
        finalHexString += hexSet[Math.ceil(Math.random() * 15)];
    }
    return finalHexString;
}

function setSize() {
    canvas_raton.height = canvas_raton.offsetHeight;
    canvas_raton.width = canvas_raton.offsetWidth;
}

function Particle(x, y, particleTrailWidth, strokeColor, rotateSpeed) {
    this.x = x;
    this.y = y;
    this.particleTrailWidth = particleTrailWidth;
    this.strokeColor = strokeColor;
    this.theta = Math.random() * Math.PI * 2;
    this.rotateSpeed = rotateSpeed;
    this.t = Math.random() * 150;

    this.rotate = () => {
        const ls = {
            x: this.x,
            y: this.y,
        };
        this.theta += this.rotateSpeed;
        this.x = cursor.x + Math.cos(this.theta) * this.t;
        this.y = cursor.y + Math.sin(this.theta) * this.t;
        context.beginPath();
        context.lineWidth = this.particleTrailWidth;
        context.strokeStyle = this.strokeColor;
        context.moveTo(ls.x, ls.y);
        context.lineTo(this.x, this.y);
        context.stroke();
    };
}

function anim() {
    requestAnimationFrame(anim);

    context.fillStyle = "rgb(0 0 0 / 5%)";
    context.fillRect(0, 0, canvas_raton.width, canvas_raton.height);

    particlesArray.forEach((particle) => particle.rotate());
}
