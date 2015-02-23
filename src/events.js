//------------------------------------//
//  EVENTS
//------------------------------------//

// Global object that all platforms and platforms plugins can use.



var events = {

	on: function(el, type, fn) {
		try {
			el.addEventListener(type, fn, false);
		} catch (e) {
			el.attachEvent('on' + type, fn);
		}
	},

	off: function(el, type, fn) {
		try {
			el.removeEventListener(type, fn, false);
		} catch (e) {
			el.detachEvent('on' + type, fn);
		}
	},

	//
	// Trigger event.
	//
	trigger: function(target, type, opts) {
		var ev;
		if (document.createEvent) {
			ev = new Event(type);
			target.dispatchEvent(ev);
		} else {
			ev = document.createEventObject();
			target.fireEvent('on' + type, ev);
		}
	}

};

module.exports = events;
