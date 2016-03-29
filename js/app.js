// Enemies our player must avoid
var Enemy = function(dy, speed) {
    // first X coord for sprite
    this.startX = -100;
    // last X coord for sprite
    this.endX = 500;

    // sprite coords
    this.x = this.startX;
    // 65px offset plus offset for lane (dy; zero-based)
    this.y = 65 + (dy * 80);

    // path to sprite
    this.sprite = 'images/enemy-bug.png';

    // speed between 0 and 1; multiplied by 180
    this.speed = speed * 170;
};

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += (this.speed * dt);

    // reset X coord if sprite reaches end of screen
    if (this.x > this.endX) {
        this.x = this.startX;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    // path to sprite
    this.sprite = "images/char-cat-girl.png";

    // offset for steps in X and Y direction
    this.step = {
        x: 100,
        y: 83
    };
    
    // boundaries
    this.boundaries = {
        left: 0,
        top: 73,
        right: 400,
        bottom: 405
    };
    
    // start coords for sprite
    this.start = {
        x: 200,
        y: this.boundaries.top + (4 * this.step.y)
    };
    
    this.x = this.start.x;
    this.y = this.start.y;
};

Player.prototype.update = function() {
    // empty
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case "left":
            if (this.x > this.boundaries.left) {
                this.x -= this.step.x;
            }

            break;
        case "up":
            if (this.y > this.boundaries.top) {
                this.y -= this.step.y;
            } else {
                // TODO: reset method
                this.x = this.start.x;
                this.y = this.start.y;
            }

            break;
        case "right":
            if (this.x < this.boundaries.right) {
                this.x += this.step.x;
            }

            break;
        case "down":
            if (this.y < this.boundaries.bottom) {
                this.y += this.step.y;
            }
    }
};

var player = new Player();

var allEnemies = [new Enemy(0, 0.5), new Enemy(1, 1), new Enemy(2, 0.25), new Enemy(0, 0.75)];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
