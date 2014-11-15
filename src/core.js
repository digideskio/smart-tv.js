//------------------------------------//
//      CORE
//------------------------------------//

// =>



(function (global) {

	// Platforms
	var TV_Platform = {
		Default: require('./platform/default')
	};



	//
	// Create platform
	//

	var ua = navigator.userAgent,
		tmp = [],
		name, platform;

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
	name = tmp[0];

	// instantiate platform
	if (typeof TV_Platform[name] !== 'undefined') {
		platform = new TV_Platform[name]();
	} else {
		throw new Error('[TV] Platform "' + name + '" not found.' +
			'TV framework could not start.');
	}

	// player
	if (typeof global['TV_Player_' + name] !== 'undefined') {
		platform.prototype.player = new global['TV_Player_' + name]();
	} else {
		platform.log('[TV] ' + name + ' Platform Player is not implemented.');
	}

	// storage
	if (typeof global['TV_Storage_' + name] !== 'undefined') {
		platform.prototype.storage = new global['TV_Storage_' + name]();
	} else {
		platform.log('[TV] ' + name + ' Platform Storage is not implemented.');
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

	global.TV = platform;

})(window);
