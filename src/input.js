//------------------------------------//
//  INPUT
//------------------------------------//

// Object to be instanciated by all supported platforms.



var events = require('./events');


var TV_Input = function(platform) {
	// Initialize.
	this.init(platform);
};


TV_Input.prototype = {
	//
	// Keys.
	//
	key: {},

	//
	// Status for platform key input.
	// (Set to false for disabling input)
	//
	enabled: true,

	//
	// Initialize input.
	//
	init: function(platform) {
		// Create key map.
		this.buildKeyMap(platform);
	},


	//  Key Maps
	//------------------------------------//

	//
	// Default Virtual Key Codes.
	//
	keyMap: {
		VK_LEFT: 37,
		VK_UP: 38,
		VK_RIGHT: 39,
		VK_DOWN: 40,
		VK_ENTER: 13,
		VK_BACK: 8
	},

	//
	// Create key map based on platform name.
	//
	buildKeyMap: function(platform) {
		this.key = this['keyMap' + platform]();
	},

	//
	// 'Default' Platform key maps.
	// (usually browsers)
	//
	keyMapDefault: function() {
		// http://www.w3.org/TR/2001/WD-DOM-Level-3-Events-20010410/DOM3-Events.html#events-Events-KeyEvent
		if (window.KeyEvent && window.KeyEvent.DOM_VK_LEFT) {
			var k = this.createKeys('DOM_VK_', window.KeyEvent);
			// Normalize VK_ENTER and VK_BACK
			k.VK_ENTER = k.VK_RETURN;
			k.VK_BACK = k.VK_BACK_SPACE;
			return k;
		} else {
			// Absolute default keys.
			// http://www.javascripter.net/faq/keycodes2011.htm
			return this.createKeys('VK_', this.keyMap);
		}
	},

	//
	// 'Samsung' Platform key maps.
	//
	keyMapSamsung: function() {
		var k = this.createKeys('KEY_', new Common.API.TVKeyValue());
		// Normalize VK_BACK
		k.VK_BACK = k.VK_RETURN;
		return k;
	},

	//
	// Map virtual keys. (Polyfill for keyboard events keyCode)
	//
	createKeys: function(prefix, platformKeys) {
		var alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N',
			'O','P','Q','R','S','T','U','V','W','X','Y','Z'],
			k, i = 0, j = 0, tmp,
			result = {};

		// copy special keys
		for (k in platformKeys) {
			if (platformKeys.hasOwnProperty(k)) {
				tmp = k.replace(prefix, '');
				result['VK_' + tmp] = platformKeys[k];
			}
		}
		// copy number keys
		for (i = 0, j = 48; i <= 9; i++, j++) {
			if (typeof platformKeys[prefix + i] !== 'undefined') {
				result['VK_' + i] = platformKeys[prefix + i];
			} else {
				result['VK_' + i] = j;
			}
		}
		// copy letters
		for (i = 0, j = 65; i < alpha.length; i++, j++) {
			if (typeof platformKeys[prefix + alpha[i]] !== 'undefined') {
				result['VK_' + alpha[i]] = platformKeys[prefix + alpha[i]];
			} else {
				result['VK_' + alpha[i]] = j;
			}
		}
		return result;
	}

};

module.exports = TV_Input;
