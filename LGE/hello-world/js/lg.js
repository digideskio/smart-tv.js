var LG = {

	_device: null,
	_log: null,

	init: function () {
		var tmp;

		this._device = document.getElementById("deviceObj");
		if(!this._device) {
			tmp = document.createElement("div");
			tmp.innerHTML = "<object type='application/x-netcast-info' id='deviceObj'> </object>";
			document.body.appendChild(tmp);
			this._device = document.getElementById("deviceObj");
		}
		
		// init log
		if(!this._log) {
			tmp = document.createElement("div");
			tmp.setAttribute('id', 'debug');
			tmp.setAttribute('style', 'position: absolute; top: 10px; right: 10px;' +
				'width: 200px; height: 700px; color: pink; font-size: 14px; ' +
				'line-height: 18px; border: none; z-index: 3000; display: block;');
			document.body.appendChild(tmp);
			this._log = document.getElementById("debug");
		}
		this._log = document.getElementById("debug");
	},

	quit: function () {
		window.NetCastBack();
	},

	log: function (text) {
		this._log.innerHTML = text + "<br />" + this._log.innerHTML;
		console.log(text);
	},

	setDebugMode: function (mode) {
		if(mode) {
			_log.style.visibility = 'hidden';
		} else {
			_log.style.visibility = 'visible';
		}
	}

};