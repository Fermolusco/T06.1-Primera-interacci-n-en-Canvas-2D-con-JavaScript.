const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

let mouseX = 540;
let mouseY = 490;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawCurvedLines();
}

function dibujarLineaRojaInferior(y) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.moveTo(0, canvas.height - y);
    ctx.lineTo(340, canvas.height - y);
    ctx.stroke();
}

function dibujarLineaRojaSuperior(y) {
    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.moveTo(canvas.width, y);
    ctx.lineTo(700, y);
    ctx.stroke();
}

function dibujarCirculo(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 100, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawCurvedLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.backgroundColor = "#F5EFE1";

    const centerXLeft = 340;
    const centerYLeft = 488;
    const centerXRight = 700;
    const centerYRight = 200;
    const lineSpacing = 10;
    const arcRadius = 10;
    const lines = 20;

    ctx.lineWidth = 2;

    function drawMirroredArcs(centerX, centerY, rotation, strokeColor) {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation);
        ctx.strokeStyle = strokeColor;
        for (let i = 0; i < lines; i++) {
            ctx.beginPath();
            const radius = arcRadius + i * lineSpacing;
            ctx.moveTo(radius, -canvas.height / 2);
            ctx.lineTo(radius, 0);
            ctx.arc(0, 0, radius, 0, Math.PI);
            ctx.stroke();
        }
        ctx.restore();
    }

    for (let i = 0; i < 20; i++) {
        dibujarLineaRojaInferior(i * 10);
        dibujarLineaRojaSuperior(i * 10);
    }

    dibujarCirculo(mouseX, mouseY, "green");
    dibujarCirculo(mouseX, 200, "black");

    drawMirroredArcs(centerXLeft, centerYLeft, -Math.PI / 2, "black");
    drawMirroredArcs(centerXRight, centerYRight, Math.PI / 2, "green");
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    drawCurvedLines();
});

resizeCanvas();
