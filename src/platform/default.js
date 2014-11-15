//------------------------------------//
//  PLATFORM: DEFAULT
//------------------------------------//

// =>



var TV_Platform = require('../platform');
var inherits = require('../inherits');

var TV_Platform_Default = function() {
	TV_Platform.apply(this, ['Default']);
};


inherits(TV_Platform_Default, TV_Platform, {

	//
	// Initialize platform.
	//
	init: function() {
		this.log('[TV] Default Platform initialized.');
	},

	log: function(msg) {
		console.log(msg);
	},

	//
	// Close application
	//
	exit: function() {}

});

module.exports = TV_Platform_Default;


// var a = new TV_Platform_Default();

// console.log(TV_Platform.prototype);
// console.log(TV_Platform_Default.prototype);
// console.log(a);
// console.log(a.getDeviceName());
// console.log(a instanceof TV_Platform);
// console.log(a instanceof TV_Platform_Default);


