// setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

c.fillStyle = "black";
c.fillRect(0, 0, canvas.width, canvas.height);

// player
class Player {
    constructor({ position, velocity }) {
        this.position = position; 
        this.velocity = velocity
    }

    draw() {
        // c.fillStyle = "red";
        // c.fillRect(this.position.x, this.position.y, 100, 100);
        c.moveTo(this.position.x, this.position.y);
        c.lineTo()
    }
}

const player = new Player({
    position: { x: canvas.width / 2, y: canvas.height / 2 },
    velocity: { x: 0, y: 0}
});

player.draw();

console.log(player);