# Classic Arcade Game Clone

This JavaScript web app is inspired by the classic arcade game, Frogger.

The basic game engine and art assets were supplied by Udacity, and I've built
the game as part of the [Front-End Web Developer Nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001).

## Object of the game

Get to the water without being chomped by the bugs!

## Running the game

You have two options for playing the game:

1. Recommended: [Play the online version right now!](https://tobiasziegler.github.io/fend-p5-classic-arcade-game-clone/)

1. To play offline or edit/debug the game, clone this repository (or download
and unzip it) and then open `index.html` in your browser or load it in a
locally-running web server.

## How to play

1. Move your character with the arrow keys.

1. If a bug catches you, you'll be sent back to the start.

1. If you reach the water, you've succeeded! You'll be reset to the start.

1. Bonus items will appear - grab them before a bug does!

	1. Blue gem - bonus points

	1. Green gem - super bonus points!

	1. Orange gem - hyper bonus points!!

	1. Heart - an extra life!!!

	1. Star - clear away the bugs

## Development and Contributing

1. Fork and/or clone the repository.

1. Run `npm install` to set up development dependencies.

1. Use Grunt tasks:

	1. `grunt` will lint JavaScript code and identify errors and potential
	problems, and beautify the HTML, CSS and JavaScript files. Or use
	`grunt jshint` to lint and `grunt jsbeautifier` to beautify.

	1. `grunt watch` will monitor files for changes and run the linter and/or
	beautifier.

1. Submit a pull request if you have a bug fix, or raise an issue to discuss
potential improvements or changes to gameplay.

Note that the base code for this project is available from [this Udacity GitHub
repository.](https://github.com/udacity/frontend-nanodegree-arcade-game)
