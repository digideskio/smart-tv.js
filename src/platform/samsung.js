//------------------------------------//
//  PLATFORM: SAMSUNG
//------------------------------------//

// =>



var TV_Platform = require('../platform');
var inherits = require('../inherits');

var TV_Platform_Samsung = function() {
	TV_Platform.apply(this, ['Samsung']);
};

inherits(TV_Platform_Samsung, TV_Platform, {

	//
	// Initialize platform.
	//
	init: function() {
		this.pluginAPI = new Common.API.Plugin();
        this.widgetAPI = new Common.API.Widget();
        this.keysAPI = new Common.API.TVKeyValue();

        // Send 'ready' message to the Application Manager
        // http://www.samsungdforum.com/Guide/art00042/index.html
        this.widgetAPI.sendReadyEvent();

        // OSD Volume
        this.onShow();

		this.log('[TV] Samsung Platform initialized.');
	},

	//
	// Name of the device's model.
	//
	getModel: function() {
		return navigator.userAgent;
	},

	//
	// Get the device UUID.
	// http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
	//
	getUUID: function() {
		return this.getDUID();
	},

	//
	// Close application.
	//
	exit: function() {
		window.close();
	},


	//  Platform specific
    //------------------------------------//

	initSEF: function(pluginName) {
        var sef = document.getElementById('pluginObjectSef');
        if (sef) {
            sef.Close();
        } else {
            document.body.innerHTML = document.body.innerHTML +
            '<object id="pluginObjectSef" classid="clsid:SAMSUNG-INFOLINK-SEF"' +
                'border="0" style="width: 0; height: 0;"></object>';
            sef = document.getElementById('pluginObjectSef');
        }
        if (pluginName === 'Network') {
            sef.Open('Network', '1.001', 'Network');
        }
        if (pluginName === 'NNavi') {
            sef.Open('NNavi', '1.016', 'NNavi');
        }
        if (pluginName === 'Player') {
            sef.Open('Player', '1.112', 'Player');
        }
        return sef;
    },

	onShow: function() {
        var me = this;

        // onShow - Implementation of the built-in TV volume UI elements
        // http://www.samsungdforum.com/Guide/tec00107/index.html
        // http://www.samsungdforum.com/Guide/tec00147/index.html
        // http://www.samsungdforum.com/Guide/tec00106/index.html
        window.onShow = function() {
            var nnaviPlugin = me.initSEF('NNavi');
            nnaviPlugin.Execute('SetBannerState', 1);

            // For volume OSD
            me.pluginAPI.unregistKey(me.keysAPI.KEY_VOL_UP);
            me.pluginAPI.unregistKey(me.keysAPI.KEY_VOL_DOWN);
            me.pluginAPI.unregistKey(me.keysAPI.KEY_MUTE);
        };
    },


    //
	// NNAVI
    //

    // The GetMAC function gets the MAC address.
    // @params MAC: The MAC address of each DTV. The widget can get the MAC
    // Address by using the Network module.
    // @remarks 13 length, and unique value on each individual DTV.
    // @return DUID of each DTV (for example, 7XCBNROQJQPYW) if the command
    // succeeds, or an error code if the command fails.
    //
    getDUID: function () {
        var mac = this.getMAC(0);
        this._sef = this.initSEF('NNavi');
        // this._sef.Open('NNavi', '1.016', 'NNavi');
        return this._sef.Execute('GetDUID', mac);
    },


    //
    // NETWORK
    //

    //
    // The GetMAC function gets the MAC address.
    // @params This function accepts calls with or without parameter
    // The type of interface (Wire//Wireless)
    // 1: wired,
    // 0: wireless
    // If this function is called without parameter, it returns result for
    // wired network.
    // @return The MAC address string, or a null string if an error occurs
    //
    getMAC: function (interfaceType) {
        this._sef = this.initSEF('Network');
        if (interfaceType) {
            return this._sef.Execute('GetMAC', 'interfaceType');
        } else {
            return this._sef.Execute('GetMAC');
        }
    }
});

module.exports = TV_Platform_Samsung;
