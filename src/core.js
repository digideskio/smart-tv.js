//------------------------------------//
//      CORE
//------------------------------------//

// =>




// Platforms
var TV_Platform = {
	Default: require('./platform/default'),
	Samsung: require('./platform/samsung')
};



//
// Create platform
//

var ua = navigator.userAgent,
	tmp = [],
	nameP = '',
	platform;

// detect platform
// http://udger.com/resources/ua-list/device-detail?device=Smart%20TV
// http://brettjankord.com/categorizr/categorizr-results.php
if (ua.indexOf('Maple 5') >= 0) {
	tmp = ['Samsung', '2010'];
} else if (ua.indexOf('Maple 6') >= 0) {
	tmp = ['Samsung', '2011'];
} else if (ua.indexOf('SmartTV; Maple2012') >= 0) {
	tmp = ['Samsung', '2012'];
} else if (ua.indexOf('Maple') >= 0) {
	tmp = ['Samsung', '2013'];
} else {
	tmp = ['Default', ''];
}
nameP = tmp[0];

// instantiate platform
if (typeof TV_Platform[nameP] !== 'undefined') {
	platform = new TV_Platform[nameP]();
} else {
	throw new Error('[TV] Platform "' + nameP + '" not found.' +
		'TV framework could not start.');
}

// document ready callback
var ready = function(fn) {
	var isDomLoaded = false;
	function callback(ev) {
		if (!isDomLoaded) {
			isDomLoaded = true;
			if (typeof fn === 'function') {
				fn.call(this, ev);
			}
		}
	}
	if (document.readyState) {
		if (document.readyState === 'complete') {
			setTimeout(function() { callback(null); }, 1);
		}
	}
	if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', callback, false);
	} else if (document.attachEvent) {
		document.attachEvent('onreadystatechange', callback);
	}
	if (window.attachEvent) {
		window.attachEvent('onload', callback);
	} else if (window.addEventListener) {
		window.addEventListener('load', callback, false);
	}
};

// onready call platform.init
ready(function() {

	platform.init();

});

module.exports = platform;
