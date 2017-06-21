// A superclass to provide features common to all entities involved in the game
var Entity = function(sprite, x, y, width, height) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = sprite;
	// Coordinates for the entity's location in the game
	this.x = x;
	this.y = y;
	// Width and height of bounding boxes for collision detection
	this.width = width;
	this.height = height;
};

// Draw the entity on the screen, required method for game
Entity.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(row) {
	// Set the initial values through the Entity constructor
	Entity.call(
		this,
		'images/enemy-bug.png',
		this.calcX(),
		this.calcY(row),
		55,
		35
	);

	// Set the speed of the enemy's horizontal movement
	this.speed = this.calcSpeed();
};

// Enemy is a subclass of the Entity superclass
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

// Calculate a random off-screen starting position
Enemy.prototype.calcX = function() {
	var x = this.x = 0 - Math.floor(Math.random() * 1000);
	return x;
};

// Calculate y coordinate based on which row the Enemy is assigned to
Enemy.prototype.calcY = function(row) {
	var y = 65 + (row * 82);
	return y;
};

// Calculate a random speed for the Enemy's movement
Enemy.prototype.calcSpeed = function() {
	var speed = 50 + Math.floor(Math.random() * 100);
	return speed;
};

// Reset the enemy's starting position and speed
Enemy.prototype.reset = function() {
	this.x = this.calcX();
	this.speed = this.calcSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.

	// If the Enemy has moved off-screen, reset position and speed
	if (this.x > 500) {
		this.reset();
	} else {
		this.x += this.speed * dt;
	}
};

// Gems that provide a score bonus when collected
var Collectable = function(sprite) {
	this.active = false;
	// Set the initial values through the Entity constructor
	Entity.call(
		this,
		sprite,
		this.calcX(),
		this.calcY(),
		45,
		45
	);
};

// Collectable is a subclass of the Entity superclass
// It is the superclass for collectable bonus items in the game
Collectable.prototype = Object.create(Entity.prototype);
Collectable.prototype.constructor = Collectable;

// Calculate a random column position for an active item, or position an
// inactive item off-canvas
Collectable.prototype.calcX = function() {
	if (this.active) {
		var col = Math.floor(Math.random() * 5);
		var x = 0 + (col * 101);
		return x;
	} else {
		return 600;
	}
};

// Calculate a random row position for an active item, or position an inactive
// item off-canvas
Collectable.prototype.calcY = function() {
	if (this.active) {
		var row = Math.floor(Math.random() * 4);
		var y = 65 + (row * 82);
		return y;
	} else {
		return 0;
	}
};

// Reset an active item to a new random position, or position an inactive
// item off-canvas
Collectable.prototype.reset = function(active) {
	this.active = active;
	this.x = this.calcX();
	this.y = this.calcY();
};

// This function is called when the object is collected by the player
Collectable.prototype.collect = function() {
	this.reset(false);
};

// This function is called when the object is destroyed by an enemy
Collectable.prototype.destroy = function() {
	this.reset(false);
};

// Gems that provide a score bonus when collected
var Gem = function(sprite) {
	var defaultSprite = 'images/Gem Blue.png';
	// Set the initial values through the Collectable and Entity constructors
	Collectable.call(
		this,
		sprite ? sprite : defaultSprite
	);
};

// Gem is a subclass of the Collectable superclass
Gem.prototype = Object.create(Collectable.prototype);
Gem.prototype.constructor = Gem;

// This function is called when a gem is collected
Gem.prototype.collect = function() {
	player.score += 10;
	this.reset(false);
};

// SuperGems that provide a bigger score bonus when collected
var SuperGem = function() {
	// Set the initial values through the Gem, Collectable and Entity
	// constructors
	Gem.call(
		this,
		'images/Gem Green.png'
	);
};

// SuperGem is a subclass of the Gem superclass
SuperGem.prototype = Object.create(Collectable.prototype);
SuperGem.prototype.constructor = SuperGem;

// This function is called when a super gem is collected
SuperGem.prototype.collect = function() {
	player.score += 50;
	this.reset(false);
};

// HyperGems that provide a bigger score bonus when collected
var HyperGem = function() {
	// Set the initial values through the Gem, Collectable and Entity
	// constructors
	Gem.call(
		this,
		'images/Gem Orange.png'
	);
};

// HyperGem is a subclass of the Gem superclass
HyperGem.prototype = Object.create(Collectable.prototype);
HyperGem.prototype.constructor = HyperGem;

// This function is called when a super gem is collected
HyperGem.prototype.collect = function() {
	player.score += 100;
	this.reset(false);
};

// Hearts that provide an extra life when collected
var Heart = function() {
	// Set the initial values through the Collectable and Entity constructors
	Collectable.call(
		this,
		'images/Heart.png'
	);
};

// Heart is a subclass of the Collectable superclass
Heart.prototype = Object.create(Collectable.prototype);
Heart.prototype.constructor = Heart;

// This function is called when a heart is collected
Heart.prototype.collect = function() {
	player.lives++;
	this.reset(false);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	// Define properties for the starting x and y positions
	this.startX = 202;
	this.startY = 400;

	// Set the initial values through the Entity constructor
	Entity.call(
		this,
		'images/char-cat-girl.png',
		this.startX,
		this.startY,
		45,
		45
	);

	// Set the starting score and number of lives
	this.score = 0;
	this.lives = 3;

	// Initial display of the score and number of lives
	this.displayScoreboard();
};

// Player is a subclass of the Entity superclass
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

// Reset the player object to its initial position
Player.prototype.reset = function() {
	this.x = this.startX;
	this.y = this.startY;
};

// Update the player's position, required method for game
Player.prototype.update = function() {
	// Check whether the player has reached the water
	if (this.y < 0) {
		this.score += 100;
		this.reset();
		this.displayScoreboard();
	}
};

Player.prototype.loseLife = function() {
	this.lives--;
	this.reset();
	this.displayScoreboard();
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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Objects are inserted into these variables in the reset() function (engine.js)
var allEnemies;
var allCollectables;
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
