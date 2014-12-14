//------------------------------------//
//  PLATFORM: LG
//------------------------------------//

// =>



var TV_Platform = require('../platform');
var inherits = require('../inherits');

var TV_Platform_LG = function() {
	TV_Platform.apply(this, ['LG']);
};

inherits(TV_Platform_LG, TV_Platform, {

	_device: null,

	//
	// Initialize platform.
	//
	init: function() {
		this._device = document.getElementById('deviceObj');
		if(!this._device) {
			var tmp = document.createElement('div');
			tmp.innerHTML = '<object type="application/x-netcast-info" ' + 
				'id="deviceObj"></object>';
			document.body.appendChild(tmp);
			this._device = document.getElementById('deviceObj');
		}
		this.log('[TV] LG Platform initialized.');
	},

	//
	// Name of the device's model.
	// Ex: “55LM6700-NC”
	//
	getModel: function() {
		return this._device.modelName;
	},

	//
	// Get the device UUID.
	// Returns the MAC address as a string type.
	//
	getUUID: function() {
		// LG -> Device Info Plugin -> Properties
		// return MAC address as a string type.
		return this._device.net_macAddress;
	},

	//
	// Close application.
	//
	exit: function() {
		// LG -> NetCast API -> Methods
		// Exit or quit the application to AV.
		window.NetCastExit();
	}


	//  Platform specific
	//------------------------------------//

});

module.exports = TV_Platform_LG;
