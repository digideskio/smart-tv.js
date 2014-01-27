
/**
 * LG TV wrapper.
 * @version 0.0.1
 */

var $.tv = $.tv || {};
(function($) {

    $.tv = {

        _device: null,


        init: function () {
            this._device = document.getElementById("deviceObj");
            if(!this._device) {
                var tmp = document.createElement("div");
                tmp.innerHTML = "<object type='application/x-netcast-info' id='deviceObj'> </object>";
                document.body.appendChild(tmp);
                this._device = document.getElementById("deviceObj");
            }
        },

        /**
         * The NetCast Platform provides a proprietary API, ‘window.NetCastExit()’,
         * to implement the exit function to AV. A JavaScript application can use
         * this API for users to exit or quit the application to AV.
         */
        quit: function () {
            window.NetCastExit();
        }

    };

};
