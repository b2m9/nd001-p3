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
    
    // speed between 0 and 1; multiplied by 200
    this.speed = speed * 200;
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

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.sprite = "images/char-cat-girl.png";
};

Player.prototype.update = function () {};

Player.prototype.render = function () {};

Player.prototype.handleInput = function () {};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();

var allEnemies = [ new Enemy(0, 0.5), new Enemy(1, 1), new Enemy(2, 0.3), new Enemy(0, 0.8) ];

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
