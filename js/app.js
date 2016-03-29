/**
 * Create a new Enemy.
 * @constructor
 * @this {Enemy}
 * @param {integer}     lane                - Number of lane index (zero-based).
 * @param {float}       speed               - Speed of animation.
 * @property {string}   sprite              - Path to sprite.
 * @property {objects}  boundaries          - Boundaries of animation.
 * @property {integer}  boundaries.left     - Left boundary of animation.
 * @property {integer}  boundaries.right    - Right boundary of animation.
 * @property {integer}  width               - Width of sprite.
 * @property {integer}  speed               - Speed of animation.
 * @property {integer}  lane                - Number of lane index (zero-based).
 * @member {integer}    x                   - Horizontal coordinate
 * @member {integer}    y                   - Vertical coordinate
 */
var Enemy = function(lane, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.width = 100;
    this.lane = lane || 0;
    this.speed = (speed || 1) * 170;
    this.boundaries = {
        left: -100,
        right: 500
    };

    this.x = this.boundaries.left;
    this.y = 60 + (lane * 83);
};

/**
 * Callback that is executed in each loop. Update object's x position.
 * @function
 * @this {Enemy}
 * @param {float} dt - time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    this.x += (this.speed * dt);

    if (this.x > this.boundaries.right) {
        this.reset();
    }
};

/**
 * Reset object to original coordinates.
 * @function
 * @this {Enemy}
 */
Enemy.prototype.reset = function() {
    this.x = this.boundaries.left;
};


/**
 * Callback that is executed in each loop. Draw object's sprite.
 * @function
 * @this {Enemy}
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Create a new Player.
 * @constructor
 * @this {Player}
 * @property {string}   sprite              - Path to sprite.
 * @property {integer}  lane                - Number of lane index (zero-based).
 * @property {objects}  boundaries          - Boundaries of sprite.
 * @property {integer}  boundaries.left     - Left boundary of sprite.
 * @property {integer}  boundaries.top      - Top boundary of sprite.
 * @property {integer}  boundaries.right    - Right boundary of sprite.
 * @property {integer}  boundaries.bottom   - Bottom boundary of sprite.
 * @property {objects}  step                - Offsets of steps
 * @property {integer}  step.x              - Offset for step in x direction.
 * @property {integer}  step.y              - Offset for step in y direction.
 * @property {objects}  start               - Start position of sprite.
 * @property {integer}  start.x             - X coordinate of start position.
 * @property {integer}  start.y             - Y coordinate of start position.
 * @member {integer}    x                   - Horizontal coordinate
 * @member {integer}    y                   - Vertical coordinate
 */
var Player = function() {
    this.sprite = "images/char-cat-girl.png";
    this.lane = 4;
    this.boundaries = {
        left: 0,
        top: 73,
        right: 400,
        bottom: 405
    };
    this.step = {
        x: 100,
        y: 83
    };
    this.start = {
        x: 200,
        y: this.boundaries.top + (this.lane * this.step.y)
    };

    this.x = this.start.x;
    this.y = this.start.y;
};

/**
 * Callback that is executed in each loop. Update position.
 * @function
 * @this {Player}
 * @property {integer} dx - Delta of x coordinate.
 * @property {integer} dy - Delta of y coordinate.
 */
Player.prototype.update = function(dx, dy) {
    dx = dx || 0;
    dy = dy || 0;
    
    this.x += dx;
    this.y += dy;
};

/**
 * Callback that is executed in each loop. Draw object's sprite.
 * @function
 * @this {Player}
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Handle keyboard input and triggers update() to change position of instance.
 * @function
 * @this {Player}
 * @param {string} key - Label of key pressed.
 */
Player.prototype.handleInput = function(key) {
    switch (key) {
        case "left":
            if (this.x > this.boundaries.left) {
                this.update(-this.step.x, 0);
            }

            break;
        case "up":
            if (this.y > this.boundaries.top) {
                this.lane--;
                this.update(0, -this.step.y);
            }
            else {
                this.reset();
            }

            break;
        case "right":
            if (this.x < this.boundaries.right) {
                this.update(this.step.x, 0);
            }

            break;
        case "down":
            if (this.y < this.boundaries.bottom) {
                this.lane++;
                this.update(0, this.step.y);
            }
    }
};

/**
 * Reset object to original coordinates.
 * @function
 * @this {Player}
 */
Player.prototype.reset = function() {
    this.x = this.start.x;
    this.y = this.start.y;
    this.lane = 4;
};
