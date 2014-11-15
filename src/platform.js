//------------------------------------//
//  PLATFORM
//------------------------------------//

//



var TV_Platform = function(name) {
	this.name = name;
};


TV_Platform.prototype = {

	//
	// Initialize platform.
	//
	init: function() {},

	getDeviceName: function() {
		return this.name;
	},

	//
	// Close application.
	//
	exit: function() {}

};

module.exports = TV_Platform;