var LG = {

	_device: null,
	_log: null,
	logConfig: false,
	onFocusId: '',
	onHoverId: '',

	init: function () {
		this._device = document.getElementById("deviceObj");
		if(!this._device) {
			var tmp = document.createElement("div");
			tmp.innerHTML = "<object type='application/x-netcast-info' id='deviceObj'> </object>";
			document.body.appendChild(tmp);
			this._device = document.getElementById("deviceObj");
		}

		// init log
		this._log = document.getElementById("debug");
	},


	//
	// focus
	//
	getOnFocusId: function () { return this.onFocusId; },
	setFocus: function (elementID) {
		var prev = document.getElementById(this.onFocusId),
			el = document.getElementById(elementID);

		// take focus away from existing focused element
		if (prev) {
			prev.blur();
			this.onFocusId = '';
		}

		// set focus on new element
		if (el) {
			el.focus();
			this.onFocusId = elementID;
		}
	},
	isFocused: function (otherID) {
		return otherID == this.onFocusId;
	},

	//
	// hover
	//
	setHover: function (elementID) {
		var prev = document.getElementById(this.onHoverId),
			el = document.getElementById(elementID);

		// take hover away from existing hovered element
		if (prev) {
			this.offHover(this.onHoverId);
		}

		// set hover
		if (el) {
			el.className += " hover";
			this.onHoverId = elementID;
		}
	},
	offHover: function (elementID) {
		var el = document.getElementById(elementID);
		el.className = el.className.replace( /(?:^|\s)hover(?!\S)/g , '' );
		this.hoverEl = '';
	},



	qmenu: function () {
		if(window.NetCastLaunchQMENU)
			window.NetCastLaunchQMENU();
	},

	quit: function () {
		window.NetCastBack();
	},

	log : function (text) {
		if (this.logConfig) {
			this._log.innerHTML = text + "<br />" + this._log.innerHTML;
			console.log(text);
		}
	}
};