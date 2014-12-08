//------------------------------------//
//  STORAGE: DEFAULT
//------------------------------------//

// => TV_Storage_Default uses HTML5 localStorage.



var TV_Storage = require('../storage');

var TV_Storage_Default = function() {
	TV_Storage.apply(this);

	// TV_Storage interface is based on HTML5 localStorage, so
	// TV_Storage_Default should just use HTML5 localStorage.

	// http://github.com/Modernizr/Modernizr/blob/master/feature-detects/storage/localstorage.js
	var hasStorage = (function() {
		var test = 'test';
		try {
			localStorage.setItem(test, test);
			localStorage.removeItem(test);
			return true;
		} catch (exception) {
			return false;
		}
	}());

	// get localStorage
	if (hasStorage) {
		return window.localStorage;
	} else {
		return null;
	}
};

module.exports = TV_Storage_Default;
