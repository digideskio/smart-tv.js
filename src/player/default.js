//------------------------------------//
//  PLAYER: DEFAULT
//------------------------------------//

// => HTML5 Video tag wrapper.



var inherits = require('../inherits');
var TV_Player = require('../player');


var TV_Player_Default = function() {
	TV_Player.apply(this);
};

inherits(TV_Player_Default, TV_Player, {

	//  Implement interface TV_Player
	//------------------------------------//

	//
	// Initialize player.
	//
	init: function() {
		console.log('[TV_Player] Default Player initialized.');
	},

	//
	// Start or resume video playback.
	//
	play: function() {
		return '[TV_Player] "play" not implemented.';
	},

	//
	// Pause video playback.
	//
	pause: function() {},

	//
	// Stop video playback.
	//
	stop: function() {},

	//
	// Returns the current playback time.
	//
	getCurrentPlayTime: function() {},

	//
	// Returns the duration of the playing video in milliseconds.
	//
	getDuration: function() {},


	//  Player Platform specific
	//------------------------------------//

	log: function(msg) {
		console.log(msg);
	}
});

module.exports = TV_Player_Default;
