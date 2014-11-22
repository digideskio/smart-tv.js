//------------------------------------//
//  PLATFORM
//------------------------------------//

// Interface to be inherited and implemented by all supported platforms.



var TV_Platform = function(name) {
	this.name = name;
};


TV_Platform.prototype = {
	//
	// Initialize platform.
	//
	init: function() {},

	//
	// Name of the platform.
	//
	getPlatformName: function() { return this.name; },

	//
	// Name of the device's model.
	//
	getModel: function() {},

	//
	// Get the device UUID.
	// http://en.wikipedia.org/wiki/Universally_unique_identifier
	//
	getUUID: function() {},

	//
	// Close application.
	//
	exit: function() {}
};

module.exports = TV_Platform;