// setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// player
class Player {
    constructor({ position, velocity }) {
        this.position = position; 
        this.velocity = velocity;
        this.rotation = 0;
    }

    draw() {
        c.save();
        c.translate(this.position.x, this.position.y);
        c.rotate(this.rotation);
        c.translate(-this.position.x, -this.position.y);

        c.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2, false);
        c.fillStyle = "red";
        c.fill();

        c.beginPath();
        c.moveTo(this.position.x + 30, this.position.y);
        c.lineTo(this.position.x - 10, this.position.y - 10);
        c.lineTo(this.position.x - 10, this.position.y + 10);
        c.closePath();

        c.strokeStyle = "white";
        c.stroke();
        c.restore();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}


const player = new Player({
    position: { x: canvas.width / 2, y: canvas.height / 2 },
    velocity: { x: 0, y: 0}
});


// player movement

const keys = {
    ArrowUp : {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);

    player.update()

    player.velocity.x = 0;
    player.velocity.y = 0;
    if (keys.ArrowUp.pressed) {
        player.velocity.x = Math.cos(player.rotation);
        player.velocity.y = Math.sin(player.rotation);
    }

    if (keys.ArrowRight.pressed) player.rotation += 0.03;
    else if (keys.ArrowLeft.pressed) player.rotation -= 0.03;
}

animate();

window.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'ArrowUp':
            keys.ArrowUp.pressed = true;
            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = true;
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;    
            break
    }
});


window.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = false;
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;    
            break
    }
});

