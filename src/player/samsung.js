//------------------------------------//
//  PLAYER: SAMSUNG
//------------------------------------//

// => 



var inherits = require('../inherits');
var TV_Player = require('../player');
var utils = require('../utils/samsung');


var TV_Player_Samsung = function() {
	TV_Player.apply(this);
};

inherits(TV_Player_Samsung, TV_Player, {

	//  Implement interface TV_Player
	//------------------------------------//

	//
	// Initialize player.
	//
	init: function() {
		this._player = utils.initSEF('Player');

		// media object events
		// this.bindEvents();
	},

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
	getDuration: function() {},


	//  Player Platform specific
	//------------------------------------//

	log: function(msg) {
		console.log(msg);
	}
});

module.exports = TV_Player_Samsung;
