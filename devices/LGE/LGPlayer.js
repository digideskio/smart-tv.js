
/**
 * LG TV - Player.
 * @version 0.0.1
 */

(function($) {

    $.tv = $.tv || {};

    $.tv.player = {

        _player: null,
        _url: null,


        init: function () {
            this._player = document.getElementById("lgPlayer");

            if (!this._player) {
                // create player
                document.body.innerHTML = document.body.innerHTML
                    + '<object type="application/x-netcast-av" data="" '
                    + 'autostart="false" width="500" height="500" id="lgPlayer" '
                    + 'style="position:absolute; top:0px; left:0px; z-index: 1;">'
                    + '</object>';
                this._player = document.getElementById("lgPlayer");
            }

            // media object events
            this.bindEvents();
        },

        bindEvents: function () {
            // this._player.onPlayStateChange = this.onPlayStateChange;
            // this._player.onBuffering = this.onBuffering;
        },


        /*
         * METHODS
         **********************************************************************/


        // Developers can play media at normal speed using media.play(speed) 
        // API.
        play: function () {
            this._player.data = this._url;

            // media.play(speed);
            // [in] The range of allowed values of speed is from -30.0 to 30.0.
            // 1 : Normal play speed. Default value is 1
            // 0 : Pause
            this._player.play(1);
        },
        pause: function () { this._player.play(0); },

        // Developers can stop media using media.stop() API.
        stop: function () {
            this._player.stop();
        },


        /*
         * PROPERTIES
         *********************************************************************/

        getURL: function () { return this._url; },
        setURL: function (url) { this._url = url; },

        // The NetCast Platform provides playtime read-only property in the
        // Media Player plugin object. Developers can get play time using this
        // property. It will return the duration of the currently playing media
        // item as a string type in milliseconds.
        getDuration: function () {
            return this._player.playTime;
        },

        // The NetCast Platform provides playPosition read-only property in the
        // Media Player plugin object. Developers can get play position using
        // this property. It will return the play position of the currently
        // playing media item as a string type in milliseconds.
        getCurrentPosition: function () {
            return this._player.playPosition;
        }

    };

}($);
