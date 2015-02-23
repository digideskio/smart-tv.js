//------------------------------------//
//  PLAYER
//------------------------------------//

// Interface to be inherited and implemented by all supported players.



var TV_Player = function() {};

TV_Player.prototype = {
	//
	// Initialize player.
	//
	init: function() {},

	//
	// Start or resume video playback.
	//
	play: function() {},

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
	getDuration: function() {}
};

module.exports = TV_Player;
