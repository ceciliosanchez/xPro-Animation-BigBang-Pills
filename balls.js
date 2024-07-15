const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balls = [];
const size = 26;  // 20 * 1.3 = 26
const stepsize = 10;

class Ball {
    constructor(x, y, gradient, velX, velY) {
        this.x = x;
        this.y = y;
        this.radius = size / 2;
        this.gradient = gradient;
        this.velX = velX;
        this.velY = velY;
    }

    draw() {
        const grad = ctx.createRadialGradient(this.x, this.y, this.radius * 0.3, this.x, this.y, this.radius);
        grad.addColorStop(0, this.gradient.start);
        grad.addColorStop(1, this.gradient.end);
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.velX = -this.velX;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.velY = -this.velY;
        }

        this.x += this.velX;
        this.y += this.velY;

        this.draw();
    }
}

function getRandom(scale) {
    return Math.floor(Math.random() * scale - scale / 2);
}

function createGradient() {
    const gradients = [
        { start: 'black', end: 'white' },
        { start: 'white', end: 'black' }
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
}

function createBalls(total) {
    for (let i = 0; i < total; i++) {
        let velX = getRandom(stepsize);
        let velY = getRandom(stepsize);
        balls.push(new Ball(canvas.width / 2, canvas.height / 2, createGradient(), velX, velY));
        balls.push(new Ball(canvas.width / 2, canvas.height / 2, createGradient(), -velX, -velY));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => ball.update());
}

window.onload = () => {
    createBalls(80); // create 160 balls initially (80 pairs)
    animate(); // start the animation
};

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    balls = [];
    createBalls(80); // recreate balls on resize
});
