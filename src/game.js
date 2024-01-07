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

class Projectile {
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 5;
    }

    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        c.closePath();
        c.fillStyle = "white";
        c.fill();
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

const SPEED = 3;
const ROTATIONAL_SPEED = 0.05;
const FRICTION = 0.97;
const PROJECTILE_SPEED = 3;

const projectiles = []

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);

    player.update()

    for (let i = projectiles.length - 1; i >= 0; i--) {
        const projectile = projectiles[i];
        projectile.update();

        // garbage collection for projectiles;
        if (
            projectile.position.x + projectile.radius < 0 || 
            projectile.position.x - projectile.position.radius > canvas.width || 
            projectile.position.y - projectile.radius > canvas.height ||
            projectile.position.y + projectile.radius < 0 
        ) {
            projectiles.splice(i,1);
        }
    }

    if (keys.ArrowUp.pressed) {
        player.velocity.x = Math.cos(player.rotation) * SPEED;
        player.velocity.y = Math.sin(player.rotation) * SPEED;
    } else if (!keys.ArrowUp.pressed) {
        player.velocity.x *= FRICTION;
        player.velocity.y *= FRICTION;
    }

    if (keys.ArrowRight.pressed) player.rotation += ROTATIONAL_SPEED;
    else if (keys.ArrowLeft.pressed) player.rotation -= ROTATIONAL_SPEED;
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
        case 'Space':
            projectiles.push(new Projectile({
                position: {
                    x: player.position.x + Math.cos(player.rotation) * 30,
                    y: player.position.y + Math.sin(player.rotation) * 30,
                },
                velocity: {
                    x: Math.cos(player.rotation) * PROJECTILE_SPEED, 
                    y: Math.sin(player.rotation) * PROJECTILE_SPEED,
                }
            }))
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

