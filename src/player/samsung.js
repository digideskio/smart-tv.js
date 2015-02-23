//------------------------------------//
//  PLAYER: SAMSUNG
//------------------------------------//

// => 



var inherits = require('../inherits');
var TV_Player = require('../player');
var utils = require('../utils/samsung');


var TV_Player_Samsung = function() {
	TV_Player.apply(this);
};

inherits(TV_Player_Samsung, TV_Player, {

	//  Implement interface TV_Player
	//------------------------------------//

	//
	// Initialize player.
	//
	init: function() {
		this._player = utils.initSEF('Player');

		// media object events
		this._player.OnEvent = this.onEvent.bind(this);

		utils.log('[TV_Player] Samsung Player initialized.');
	},

	//
	// Start or resume video playback.
	//
	play: function(url) {
		if (url) { this.initPlayer(url); }
		this.setPosition({left: 0, top: 0, width: '960px', height: '540px' });
		return this._player.Execute('StartPlayback');
	},

	//
	// Pause video playback.
	//
	pause: function() {
		return this._player.Execute('Pause');
	},

	//
	// Stop video playback.
	//
	stop: function() {
		return this._player.Execute('Stop');
	},

	//
	// Returns the current playback time.
	//
	getCurrentPlayTime: function() {
		return this.currentTime;
	},

	//
	// Returns the duration of the playing video in milliseconds.
	//
	getDuration: function() {
		return utils.s2ms(this._getDuration());
	},


	//  Player Platform specific
	//------------------------------------//

	// Playback total duration.
	_length: -1,

	// Current playback time.
	currentTime: 0,


	// onEvent: function (val1, val2) {}
	// '1' : 'CONNECTION_FAILED',
	// '2' : 'AUTHENTICATION_FAILED',
	// '3' : 'STREAM_NOT_FOUND',
	// '4' : 'NETWORK_DISCONNECTED',
	// '5' : 'NETWORK_SLOW',
	// '6' : 'RENDER_ERROR',
	// '7' : 'RENDERING_START',
	// '8' : 'RENDERING_COMPLETE',
	// '9' : 'STREAM_INFO_READY',
	// '10' : 'DECODING_COMPLETE',
	// '11' : 'BUFFERING_START',
	// '12' : 'BUFFERING_COMPLETE',
	// '13' : 'BUFFERING_PROGRESS',
	// '14' : 'CURRENT_PLAYBACK_TIME',
	// '15' : 'AD_START',
	// '16' : 'AD_END',
	// '17' : 'RESOLUTION_CHANGED',
	// '18' : 'BITRATE_CHANGED',
	// '19' : 'SUBTITLE',
	// '20' : 'CUSTOM'
	// http://www.samsungdforum.com/SamsungDForum/ForumView/f0cd8ea6961d50c3?forumID=ec9f3562a5ebd82a
	onEvent: function(param1, param2) {
		switch(param1) {
			case 1: this.onConnectionFailed(); break;
			case 2: this.onAuthenticationFailed(); break;
			case 3: this.onStreamNotFound(); break;
			case 4: this.onNetworkDisconnected(); break;
			case 6: this.onRenderError(param2); break;
			case 8: this.onRenderingComplete(); break;
			case 9: this.onStreamInfoReady(); break;
			case 11: this.onBufferingStart(); break;
			case 12: this.onBufferingComplete(); break;
			case 13: this.onBufferingProgress(param2); break;
			case 14: this.setCurrentTime(param2); break;
			case 20: this.onCustomEvent(param2); break;
		}
	},

	setPosition: function(newPos) {
		this.position = newPos;
		this._player.Execute('SetDisplayArea', newPos.left, newPos.top,
			newPos.width, newPos.height);
	},


	//  EVENTS
	//------------------------------------//

	//
	// OnAuthenticationFailed event is sent by media player when it fails to
	// play because authentication process has been failed.
	//
	onAuthenticationFailed: function() {
		// utils.log('[TV_PLAYER] onAuthenticationFailed, state = ' + this.states.ERROR);
		// this.setState(this.states.ERROR);
	},

	//
	// OnBufferingStart event is sent by media player when it gets out of
	// buffering status.
	//
	onBufferingComplete: function() {
		// this.setState(this.states.PLAYING);
		utils.log('[TV_Player] onBufferingComplete.');
	},

	//
	// OnBufferingProgress event is sent by media play to notify how much
	// data it has to receive more to get out from buffering status.
	// @remarks The minimum value of parameter is 0 and the maximum is 100.
	//
	onBufferingProgress: function(progress) {
		// this.setState(this.states.BUFFERING);
		utils.log('[TV_Player] onBufferingProgress.');
	},

	//
	// OnBufferingStart event is sent by media player when it goes on
	// buffering status.
	//
	onBufferingStart: function() {
		// this.setState(this.states.BUFFERING);
		utils.log('[TV_Player] onBufferingStart.');
	},

	//
	// OnConnectionFailed event is sent by media player when it fails to
	// connect to streaming server.
	// @remarks OnConnectionFailed event is different from
	// OnNetworkDisconnected. This event is sent only when media player
	// fails to connect to server at the begining or at the jump in HTTP and
	// HTTPS streaming.
	//
	onConnectionFailed: function() {
		// this.setState(this.states.ERROR);
		utils.log('[TV_PLAYER] onConnectionFailed.');
	},

	//
	// OnCurrentPlayTime is sent by media player to notify current playback
	// time. milli-sec
	// @remarks 'time' argument is in milliseconds.
	//
	setCurrentTime: function(time) {
		if(!isNaN(time)) {
			this.currentTime = parseInt(time, 10);
		}

		// callback settings.onCurrentPlayTime
		// if (typeof this.settings.onCurrentPlayTime === 'function') {
		//     this.settings.onCurrentPlayTime(this.currentTime);
		// }
	},

	//
	// OnNetworkDisconnected is sent by media player when it knows that
	// ethernet is disconnected or streaming server stops to support content
	// in the middle of streaming.
	// @remarks Receiving OnNetworkDisconnected event means media player
	// already succeed to connect to streaming server. Usually this event
	// means network is disconnected during the streaming.
	//
	onNetworkDisconnected: function() {
		// this.setState(this.states.ERROR);
		utils.log('[TV_Player] onNetworkDisconnected.');
	},

	//
	// OnRenderError event is sent by media player when it found that there
	// are some problem in rendering because of the reason specified by
	// parameter. renderErrorType
	// @remarks Parameter value of OnRenderError means as follow;
	// 1 : Unsupported container
	// 2 : Unsupported video codec
	// 3 : Unsupported audio codec
	// 4 : Unsupported video resolution
	//
	onRenderError: function(errorCode) {
		// this.setState(this.states.ERROR);
		utils.log('[TV_Player] onRenderError.');
	},

	//
	// OnRenderingComplete event is sent by media player when it reaches to
	// the end of stream.
	//
	onRenderingComplete : function() {
		this.setState(this.states.FINISHED);
		this.setCurrentTime(0);
		utils.log('[TV_Player] onRenderingComplete.');
	},

	//
	// Event to notify that the Video resolution has been changed during
	// playback. This event is available only for some specific contents
	// which use HAS streaming solution.
	//
	// OnResolutionChanged: function() {},

	//
	// OnStreamInfoReady event is sent by media player when it is ready to
	// send content information such as duration and video resolution after
	// parsing the stream.
	// @remarks There are a few APIs which gives valid information only when
	// they are called after OnStreamInfoReady() event is sent. APIs such as
	// GetDuration(), GetVideoWidth(), and GetVideoHeight() are have to be
	// used after widget get OnStreamInfoReady event.
	//
	onStreamInfoReady: function() {
		this._length = this.getDuration();
		utils.log('[TV_PLAYER] onStreamInfoReady, duration = ' + this._length);
	},

	//
	// OnStreamNotFound event is sent by meida player when it fails to play
	// because streaming server replys that the stream specified by url
	// parameter of Play() API is not exist.
	//
	onStreamNotFound: function() {
		// tv.log('[TV_PLAYER] onStreamNotFound, state = ' +
		//     this.states.ERROR);
		// this.setState(this.states.ERROR);
		utils.log('[TV_PLAYER] onStreamNotFound.');
	},

	//
	// onCustomEvent
	//
	 onCustomEvent: function(errorCode) {
		utils.log('[TV_PLAYER] onCustomEvent, errorCode = ' + errorCode);
	},


	//  API AUX
	//------------------------------------//

	//
	// Initialize media player with the specified url.
	// @return It always returns ture.
	// @remarks
	// The InitPlayer() should not be used with Play() API. If widget uses
	// InitPlayer(), it has to use StartPlayback() to play a content.
	// Otherwidget it has to use Play() only. When InitPlayer() is used, it
	// has to come first becore other APIs are called.
	//
	initPlayer: function(url) {
		// this._player.Execute("SetInitialBufferSize", 400*1024);
		// return this._player.Execute("InitPlayer", this._url);
		// Execute("SetDisplayArea", x, y, width, height);
		// Execute("SetInitialBufferSize" 400*1024); //400KB
		this._url = url || this._url;

		if (this._url.match(/\.m3u8$/i) && !this._url.match(/\|COMPONENT\=HLS/)) {
			// HLS requirement for Samsung
			this._url = this._url + '|COMPONENT=HLS';
		}

		return this._player.Execute('InitPlayer', this._url);
	},


	//
	// GetDuration()
	// @return gets the total playing time of content (in seconds) if it
	// succeeds, otherwise return -1.
	// @remarks This GetDuration() API has be called after OnStreamInfoReady
	// callback function is called.
	//
	_getDuration: function() {
		return this._player.Execute('GetDuration'); // totalTime
	}

});

module.exports = TV_Player_Samsung;
