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

	readyAudio: function () {
		if(this._player) {
			this.stop();
			this.init();
		}
		this.setHeight(0);
		this.setWidth(0);
		this.setType("audio/mpeg");
	},

	readyVideo: function () {
		if(this._player) {
			this.stop();
			this.init();
		}
		this.setHeight(500);
		this.setWidth(500);
		this.setType("video/mp4");
	},


	/*
	 * METHODS
	 *************************************************************************/


	// Developers can play media at normal speed using media.play(speed) API.
	// Developers can also implement the trick mode play using
	// media.play(speed) API only in mms streaming.
	// 
	// Note
	// In mms streaming, the speed parameter is transparently transmitted to
	// the server without any conversion. Therefore, developers are responsible
	// for matching the speed parameter between the JavaScript application and
	// the server.
	play: function (speed) {
		this._player.data = this._url;

		// media.play(speed);
		// [in] The range of allowed values of speed is from -30.0 to 30.0.
		// 1 : Normal play speed. Default value is 1
		// 0 : Pause
		this._player.play(speed || 1);
	},
	pause: function () { this._player.play(0); },

	// Developers can stop media using media.stop() API.
	stop: function () {
		this._player.stop();
	},

	// The NetCast Platform supports playlist (ASX), and developers can play
	// the next media by calling media.next() API.
	next: function () {
		this._player.next();
	},

	// The NetCast Platform supports playlist (ASX), and developers can play
	// previous media by calling media.previous() API.
	previous: function () {
		this._player.previous();
	},

	// This seek API will be supported for HTTP streaming only if the server
	// supports the HTTP range header and MMS.
	// Developers can set the time position of playback using
	// media.seek(position) API, and the position value has millisecond
	// precision.
	// 
	// Parameters
	// position		[in] Position value. It must have millisecond precision.
	seek: function (position) {
		this._player.seek(position);
	},

	// This API gets media playback related information.
	// 
	// Return Value
	// This API returns an object which contains values for duration,
	// current position, remaining amount of buffer, instant bitrate and
	// target bitrate. Property names and meanings are listed in the following
	// table. The duration variable has same meaning and value with the
	// property named as playTime. The currentPosition has same meaning and
	// value as the property named as playPosition.
	getMediaPlayInfo: function () { return this._player.mediaPlayInfo(); },
	// Duration of media file (same as playTime property). (millisecond)
	getDuration: function () { return this._player.mediaPlayInfo().duration; },
	// Current play position (same as playPosition property). (millisecond)
	getCurrentPosition: function () { return this._player.mediaPlayInfo().currentPosition; },
	// Remaining amount of buffer (if the buffer reaches the end of stream then
	// the value will be -1) (millisecond)
	getBufRemain: function () { return this._player.mediaPlayInfo().bufRemain; },
	// Instant stream input bitrate (bit per second)
	getBitrateInstant: function () { return this._player.mediaPlayInfo().bitrateInstant; },
	// Target bitrate for stream playback (bit per second)
	getBitrateTarget: function () { return this._player.mediaPlayInfo().bitrateTarget; },

	// This API gets the media source information being played currently.
	//
	// Return Value
	// This API returns the object that includes the media source information.
	// This information is set by content provider.
	getSrcInfo: function () { return this._player.getSrcInfo(); },
	// Content title (string)
	getTitle: function () { return this._player.getSrcInfo().title; },
	// Content author (string)
	getArtist: function () { return this._player.getSrcInfo().artist; },
	// Copyright owner (string)
	getCopyright: function () { return this._player.getSrcInfo().copyright; },
	// Album (string)
	getAlbum: function () { return this._player.getSrcInfo().album; },
	// Content genre
	getGenre: function () { return this._player.getSrcInfo().genre; },
	// Content creation date
	getDate: function () { return this._player.getSrcInfo().date; },
	// Content size (integer)
	getDataSize: function () { return this._player.getSrcInfo().dataSize; },
	// Content format
	getFormat: function () { return this._player.getSrcInfo().format; },
	// Video codec
	getVideoCodec: function () { return this._player.getSrcInfo().videoCodec; },
	// Audio codec
	getAudioCodec: function () { return this._player.getSrcInfo().audioCodec; },
	// Live or VOD (boolean)
	isScrDurationValid: function () { return this._player.getSrcInfo().isDurationValid; },
	// Seeking is available or not (boolean)
	isScrSeekable: function () { return this._player.getSrcInfo().isSeekable; },
	// Scanning is available or not (boolean)
	isSrcScannable: function () { return this._player.getSrcInfo().isScannable; },


	/*
	 * PROPERTIES
	 *************************************************************************/


	// The NetCast Platform provides a version read-only property in the
	// MediaPlayer plugin object. Developers can get version of
	// Media Player Plugin using this property. It will return the
	// Media Player Plugin version information as a string type.
	getVersion: function () {
		return this._player.version;
	},

	// The NetCast Platform provides a type read-write property in the
	// Media Player plugin object. Developers can get media type (MIME type)
	// using this property. It will return the MIME type information
	// as a string type.
	getType: function () { return this._player.type; },
	setType: function (type) { this._player.type = type; },

	// // The NetCast Platform provides a data read-write property in the
	// Media Player plugin object. Developers can get media URL information
	// using this property. It will return the media URLinformation
	// as a string type.
	getURL: function () { return this._url; },
	setURL: function (URL) { this._url = URL; },
	getData: function () {
		return this.getURL();
	},

	// The NetCast Platform provides ‘width’ and ‘height’ read-write properties
	// in the Media Player plugin object. It will return the width and height
	// information of the media object as string types.
	getWidth: function () { return this._player.width; },
	getHeight: function () { return this._player.height; },

	// Developers can set the size of video using ‘media.width = value; media.height = value;’ API.
	setWidth: function (width) { this._player.width = width; },
	setHeight: function (height) { this._player.height = height; },

	//Developers can also make a full-screen video by specifying the media object size.
	setFullscreen: function () {
		this.setWidth(1280);
		this.setHeight(720);
	},

	// The NetCast Platform provides playtime read-only property in the
	// Media Player plugin object. Developers can get play time using this
	// property. It will return the duration of the currently playing media
	// item as a string type in milliseconds.
	getPlayTime: function () {
		return this._player.playTime;
	},

	//  The NetCast Platform provides playPosition read-only property in the
	//  Media Player plugin object. Developers can get play position using this
	//  property. It will return the play position of the currently playing
	//  media item as a string type in milliseconds.
	getPlayPosition: function () {
		return this._player.playPosition;
	},

	// The NetCast Platform provides playState read-only property in the
	// Media Player plugin object. Developers can get play state using this
	// property. It will return the play state of the currently playing media
	// item as an enumerated number. See the following table for the mapping
	// rule between the resolutions and enumerated return values.
	//
	// [Table]
	// The enumerated value of play state
	// 
	// Play state	Enumerated Return Value
	// 0			Stopped
	// 1			Playing
	// 2			Paused
	// 3			Connecting
	// 4			Buffering
	// 5			Finished
	// 6			Error
	getPlayState: function () {
		return this._player.playState;
	},

	// The NetCast Platform provides error read-only property in the
	// Media Player plugin object. Developers can get error code using this
	// property. Developers can get the error code using the API if the
	// Media Player plugin meets an error while the current media file is
	// playing.
	//
	// [Table]
	// The error code
	// 
	// Error code	Description
	// 0			A/V format not supported
	// 1			Cannot connect to server or connection lost
	// 2			Unidentified error
	// 1000			File is not found
	// 1001			Invalid protocol
	// 1002			DRM failure
	// 1003			Play list is empty
	// 1004			Unrecognized play list
	// 1005			Invalid ASX format
	// 1006			Error in downloading play list
	// 1007			Out of memory
	// 1008			Invalid URL list format
	// 1009			Not playable in play list
	// 1100			Unidentified WM-DRM error
	// 1101			Incorrect license in local license store
	// 1102			Fail in receiving correct license from server
	// 1103			Stored license is expired
	getError: function () {
		return this._player.error;
	},

	// The NetCast Platform provides autoStart read-write property in the
	// Media Player plugin object. Developers can get and set autoStart
	// property. Developers should set the value to false if the media file
	// playout is not to be started automatically.
	isAutoStart: function () { return this._player.autoStart; },
	setAutoStart: function (autoStart) { this._player.autoStart = autoStart; },
	toggleAutoStart: function () {
		if (this._player.autoStart) {
			this._player.autoStart = false;
		} else {
			this._player.autoStart = true;
		}
	},

	// The NetCast Platform provides isScannable read-only property in the
	// Media Player plugin object. Developers can get ‘isScannable’ property.
	// If the value of this property is true, the current media can be scanned
	// (fastforward or rewind). If a media file has not been opened, the value
	// of this property will be false.
	// 
	// The media can be scanned only if media is indexed and delivered via the
	// MMS protocol.
	isScannable: function () {
		return this._player.isScannable;
	},

	// The NetCast Platform provides ‘speed’ read-only property in the
	// Media Player plugin object. Developers can get ‘speed’ property.
	// The value of this property is the relative playback speed of the media
	// file currently being played. Its value is 0 if the
	// playState is not 1 (playing). The speed can differ from 1 only if the
	// media is indexed and delivered via the MMS protocol.
	getSpeed: function () {
		return this._player.speed;
	},

	// The NetCast Platform provides ‘bufferingProgress’ read-only property in
	// the Media Player plugin object. Developers can get ‘bufferingProgress’
	// property. The value of this property is the percentage of buffering
	// complete. Each time playback stops and restarts, this property may
	// decrease or increase. It does not vary if playback is paused. This
	// property returns a valid value only after a media file has been opened
	// and decoding starts.
	// 
	// Note
	// The value of this property is not very accurate. It is just informative.
	// Therefore, application authors should not use the value of this property
	// for logical decisions in an application. For example, an application
	// should not enable and disable a loading message using the value of this
	// property. In this example, it would be better for application authors to
	// use the onBuffering event instead of this property. See onBuffering.
	getBufferingProgress: function () {
		return this._player.bufferingProgress;
	},

	// The NetCast Platform provides ‘subtitleOn’ read-write property in the
	// Media Player plugin object. Developers can get and set ‘subtitleOn’
	// property. The value of this property is the status of subtitle decoder
	// and is a Boolean type. LG Smart TV applications can turn the subtitle
	// decoder on and off by setting this property with “true” or “false”
	// values respectively.
	//
	// The subtitle must be applied when a full size video is being played.
	isSubtitleOn: function () { return this._player.subtitleOn; },
	setSubtitleOn: function (subtitleOn) { this._player.subtitleOn = subtitleOn; },
	toggleSubtitle: function () {
		if (this._player.subtitleOn) {
			this._player.subtitleOn = false;
		} else {
			this._player.subtitleOn = true;
		}
	},

	// The NetCast Platform provides ‘subtitle’ read-write property in the
	// Media Player plugin object. Developers can get and set ‘subtitle’
	// property. The value of this property is the URL of the subtitle file.
	// The media player retrieves the subtitle file before decoding the media
	// file. LG Smart TV applications set this property every time a new
	// subtitle file is required.
	// 
	// Note
	// Characters other than ASCII are recommended to be encoded with UTF-8.
	// (ISO8859-* or UTF-16/32 may not work normally.)
	getSubtitle: function () { return this._player.subtitle; },
	setSubtitle: function (subtitle) { this._player.subtitle = subtitle; },

	// The NetCast Platform provides ‘mode3D’ read-only property in the
	// Device Information / Media Player plugin object. Developers can get a
	// 3D mode. It will return the current 3D format for 3D mode. Developers
	// should get the value when TVs are presently in 3D mode. See the
	// following table for available values about 3D format.
	// 
	// [Table]
	// Available values for “mode3D” property
	// 
	// Variable			Meaning
	// off				Original 2D Format
	// from_2d_to_3d	2D-to-3D Conversion Format
	// side_by_side		Side-by-Side Frame Compatible 3D (Left / Right)
	// side_by_side_rl	Side-by-Side Frame Compatible 3D (Right / Left)
	// top_bottom		Top-and-Bottom (or Over-Under) Frame Compatible 3D
	// checker_bd		Checker board Frame Compatible 3D only available for
	//					HD format (1080p @ 30Hz)
	getMode3D: function () {
		return this._player.mode3D;
	},

	// The NetCast Platform provides ‘audioLanguage’ write-only property that
	// is used for selecting audio language when media content has the
	// multi-audio language.
	//
	// Note
	// The value of this property shall be exactly matched with the language
	// code of audio track in media container. Matching of the two language
	// codes is developer’s own responsibility. NetCast Platform does only
	// search the matched audio track in media container.
	// 
	// Note
	// When video is paused, this API does not work normally.
	// 
	// Note
	// After the audio is changed, audio mute may occur for a few seconds due
	// to the synchronization of video and audio.
	getAudioLanguage: function () { return this._player.audioLanguage; },
	setAudioLanguage: function (audioLanguage) { this._player.audioLanguage = audioLanguage; },


	/*
	 * EVENTS
	 *************************************************************************/


	// The NetCast Platform provides an onPlayStateChange event in the
	// Media Player plugin object. Developers can receive play state change
	// event. Developer can receive a play state change event when the play
	// state of currently playing media item is changed.
	//
	// To refer to the values of the playState property, see playState.
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

	// The NetCast Platform provides an onBuffering event in the Media Player
	// plugin object. Developers can receive buffering event. Developers can
	// receive a buffering event when the media player begins and ends
	// buffering. A Boolean type parameter specifies whether data buffering has
	// started or finished. A value of true indicates that the data buffering
	// has started. Buffering also occurs whenever playback stops and then
	// restarts (either from calls to play() and stop()) methods or when
	// network congestion occurs during playing streamed media.
	onBuffering: function () {
		LG.log('buffering');
	},

	// The NetCast Platform provides an onError event in the Media Player
	// plugin object. Developers can receive error event. Developers can
	// receive an error event when the media player encounters an error while
	// playing.
	onError: function () {
		LG.log('onError');
		LG.log('_player.error = ' + this.getError());
	},

	// The script function that is called when a DRM licensing error occurs
	// during playback, recording, or timeshifting of DRM-protected AV content
	// inside the embedded object.
	onDRMRightsError: function (errorState, contentID, DRMSystemID, rightsIssuerURL) {
		if (errorState === 0) {
			console.log('no license');
		} else if (errorState == 1) {
			LG.log('invalid license');
		}
		LG.log("HandleOnDRMRightsError");
		LG.log("errorState:" + errorState);
		LG.log("contentID:" + contentID);
		LG.log("DRMSystemID: " + DRMSystemID);
		LG.log("rightsIssuerURL: " + rightsIssuerURL);
	}

};