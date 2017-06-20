// A superclass to provide features common to all entities involved in the game
var Entity = function() {

};

// Enemies our player must avoid
var Enemy = function(row) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
	this.y = 65 + (row * 82);
	// Initialise the enemy's horizontal starting position and speed
	this.init();
	// Width and height of bounding boxes for collision detection
	this.width = 55;
	this.height = 35;
};

// Enemy is a subclass of the Entity superclass
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

// Set or reset the enemy's starting position and speed
Enemy.prototype.init = function() {
	this.x = 0 - Math.floor(Math.random() * 1000);
	this.speed = 50 + Math.floor(Math.random() * 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	if (this.x > 500) {
		this.init();
	} else {
		this.x += this.speed * dt;
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	this.sprite = 'images/char-cat-girl.png';
	// Initialise the player's position on screen
	this.init();
	// Width and height of bounding boxes for collision detection
	this.width = 45;
	this.height = 45;
	// Set the starting score and number of lives
	this.score = 0;
	this.lives = 3;
	// Initial display of the score and number of lives
	this.displayScoreboard();
};

// Player is a subclass of the Entity superclass
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

// Set or reset the player object to its initial position
Player.prototype.init = function() {
	this.x = 202;
	this.y = 400;
};

// Update the player's position, required method for game
Player.prototype.update = function() {
	// Check whether the player has reached the water
	if (this.y < 0) {
		this.score += 100;
		this.init();
		this.displayScoreboard();
	}
	if (this.checkCollisions()) {
		this.lives--;
		this.init();
		// Update the display
		this.displayScoreboard();
	}
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the on-screen display of score and lives left
Player.prototype.displayScoreboard = function() {
	$('#score').html('Score: ' + this.score);
	$('#lives').html('Lives: ' + this.lives);
};

// Respond to a key press by the player - check whether the player would move
// beyond the game's boundaries, and if not, adjust the player's location.
Player.prototype.handleInput = function(key) {
	switch (key) {
		case 'left':
			if (this.x > 0) {
				this.x -= 101;
			}
			break;
		case 'up':
			if (this.y > 0) {
				this.y -= 82;
			}
			break;
		case 'right':
			if (this.x < 400) {
				this.x += 101;
			}
			break;
		case 'down':
			if (this.y < 400) {
				this.y += 82;
			}
			break;
	}
};

// Detect collisions using an axis-aligned bounding box algorithm.
// Returns true if a collision with any of the enemies is detected.
Player.prototype.checkCollisions = function() {
	var collision = allEnemies.some(function(enemy) {
		if (
			this.x < enemy.x + enemy.width &&
			this.x + this.width > enemy.x &&
			this.y < enemy.y + enemy.height &&
			this.y + this.height > enemy.y
		) {
			return true;
		} else {
			return false;
		}
	}, this);

	return collision;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Objects are inserted into these variables in the reset() function (engine.js)
var allEnemies;
var player;


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
