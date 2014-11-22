//------------------------------------//
//  PLATFORM: DEFAULT
//------------------------------------//

// => Browser support.



var TV_Platform = require('../platform');
var inherits = require('../inherits');

var TV_Platform_Default = function() {
	TV_Platform.apply(this, ['Default']);
};

inherits(TV_Platform_Default, TV_Platform, {

	//  Implement interface TV_Platform
	//------------------------------------//

	//
	// Initialize platform.
	//
	init: function() {
		this.log('[TV] Default Platform initialized.');
	},

	//
	// Name of the device's model.
	//
	getModel: function() {
		return navigator.userAgent;
	},

	//
	// Get the device UUID.
	// http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
	//
	getUUID: function() {
		return  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
			function(c) {
				var r = Math.random() * 16 | 0,
					v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
	},

	//
	// Close application.
	//
	exit: function() {
		window.close();
	},


	//  Platform specific
	//------------------------------------//

	log: function(msg) {
		console.log(msg);
	}
});

module.exports = TV_Platform_Default;
