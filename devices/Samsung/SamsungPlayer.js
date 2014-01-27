
/**
 * Samsung TV - Player.
 * @version 0.0.1
 *
 * Latest version    PLAYER-0006
 * CLSID             clsid:SAMSUNG-INFOLINK-PLAYER
 */

(function($) {

    $.tv = $.tv || {};

    $.tv.player = {

        _player: null,
        _url: null,

        duration: -1,
        playPosition: 0,


        init: function () {
            this._player = document.getElementById("plugin-player");

            if (!this._player) {
                // create player
                document.body.innerHTML = document.body.innerHTML
                    + '<object id="pluginPlayer" border=0 '
                    + 'classid="clsid:SAMSUNG-INFOLINK-PLAYER" '
                    + 'style="position:relative; z-index:0; width:400px; '
                    + 'height:400px"></object>';
                this._player = document.getElementById("pluginPlayer");
            }

            // media object events
            this.bindEvents();
        };

        bindEvents: function() {
            this._player.OnStreamInfoReady = '$.tv.player.onStreamInfoReady';
            this._player.OnCurrentPlayTime = '$.tv.player.onCurrentPlayTime';
            // p.OnBufferingStart = '$.tv.player.onBufferingStart';
            // p.OnBufferingProgress = '$.tv.player.onBufferingProgress';
            // p.OnBufferingComplete = '$.tv.player.onBufferingComplete';
            // p.OnRenderingComplete = '$.tv.player.onRenderingComplete';
            // p.OnRenderError = '$.tv.player.onError';
            // p.OnConnectionFailed = '$.tv.player.onError';
            // p.OnNetworkDisconnected = '$.tv.player.onError';
            // p.OnStreamNotFound = '$.tv.player.onError';
            // p.OnAuthenticationFailed = '$.tv.player.onError';
        },


        /*
         * METHODS
         **********************************************************************/

        // Starts playing a content.
        play: function () {
            if (this._url.match(/\.m3u8$/i) && !this._url.match(/\|COMPONENT\=HLS/)) {
                // HLS requirement for Samsung
                this._player.Play(this._url + '|COMPONENT=HLS');
            } else {
                this._player.Play(this._url);
            }
        };

        // Pauses the currently playing content.
        pause: function () { this._player.Pause(); },

        // Stops the currently playing content.
        stop: function () { this._player.Stop(); },


        /*
         * PROPERTIES
         **********************************************************************/

        getURL: function () { return this._url; },
        setURL: function (url) { this._url = url; },

        // GetDuration() retrieves the duration of currently playing content.
        getDuration: function () { return this.duration; },

        // Returns the currentTime.
        getCurrentPosition: function () { return this.playPosition; },


        /*
         * EVENTS
         **********************************************************************/

        // OnStreamInfoReady event is sent by media player when it is ready to
        // send content information such as duration and video resolution after
        // parsing the stream.
        onStreamInfoReady: function() {
            this.duration = this._player.GetDuration();
        },

        // OnCurrentPlayTime is sent by media player to notify current playback
        // time.
        onCurrentPlayTime: function (time) {
            if(!isNaN(time)) {
                this.currentTime = parseInt(time, 10);
            }
        },

    };

})($);