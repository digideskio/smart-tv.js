var LG_Player = {

	_player: null,
	_url: null,

	init: function () {
		LG.log('player init');

		var holder = document.getElementById("playerBox");
		if(holder) {
			// player already exists, remove it.
			this.stop();
			holder.removeChild(this._player);
		} else {
			// player does not exists, create holder.
			holder = document.createElement("span");
			holder.setAttribute("id", "playerBox");
			document.body.appendChild(holder);
		}

		// create player
		holder.innerHTML = '<object type="application/x-netcast-av" data="" ' +
			'autostart="false" width="500" height="500" id="lgPlayer" ' +
			'style="position:absolute; top:0px; left:0px; z-index: 1;">' +
			'</object>';
		this._player = document.getElementById("lgPlayer");

		// media object events
		this._player.onPlayStateChange = this.onPlayStateChange;
		this._player.onBuffering = this.onBuffering;
	},

	setURL: function (URL) { this._url = URL; },
	getURL: function () { return this._url; },

	setWidth: function (width) { this._player.width = width; },
	getWidth: function () { return this._player.width; },
	setHeight: function (height) { this._player.height = height; },
	getHeight: function () { return this._player.height; },

	play: function () {
		this._player.data = this._url;
		
		// media.play(speed);
		// [in] The range of allowed values of speed is from -30.0 to 30.0.
		// 1 : Normal play speed. Default value is 1
		// 0 : Pause
		this._player.play(1);
	},

	stop: function () {
		this._player.stop();
	},

	pause: function () {
		this._player.play(0);
	},


	//
	// EVENTS
	//

	// Play State
	// 0 Stopped
	// 1 Playing
	// 2 Paused
	// 3 Connecting
	// 4 Buffering
	// 5 Finished
	// 6 Error

	onPlayStateChange: function () {
		LG.log('playState: ' + this._player.playState);
		switch (this._player.playState) {
		case 1:
			LG.log('playing');
			break;
		}
	},

	onBuffering: function () {
		LG.log('buffering');
	}

};