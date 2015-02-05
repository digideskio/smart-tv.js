//------------------------------------//
//  PLATFORM: SAMSUNG
//------------------------------------//

// =>



var inherits = require('../inherits');
var TV_Platform = require('../platform');
var utils = require('../utils/samsung');
var $script = require('scriptjs');


var TV_Platform_Samsung = function() {
	TV_Platform.apply(this, ['Samsung']);
};

inherits(TV_Platform_Samsung, TV_Platform, {

	//  Implement interface TV_Platform
	//------------------------------------//

	//
	// Initialize platform.
	//
	init: function() {
		var me = this;

		$script([
			'$MANAGER_WIDGET/Common/API/Plugin.js',
			'$MANAGER_WIDGET/Common/API/Widget.js',
			'$MANAGER_WIDGET/Common/API/TVKeyValue.js'
		], function() {
			// load tvmw object
			var tmp = document.createElement('object');
			tmp.id = 'pluginObjectTVMW';
			tmp.setAttribute('classid', 'clsid:SAMSUNG-INFOLINK-TVMW');
			document.body.appendChild(tmp);

			me.pluginAPI = new Common.API.Plugin();
			me.widgetAPI = new Common.API.Widget();
			me.keysAPI = new Common.API.TVKeyValue();

			// Send 'ready' message to the Application Manager
			// http://www.samsungdforum.com/Guide/art00042/index.html
			me.widgetAPI.sendReadyEvent();

			// OSD Volume
			me.onShow();

			me.log('[TV] Samsung Platform initialized.');
		});
	},

	//
	// Name of the device's model.
	//
	getModel: function() {
		return this.getProductCode();
	},

	//
	// Get the device UUID.
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


	//  Plugins
	//------------------------------------//

	// Default Platform Player instance.
	// player: new TV_Player_Samsung(),


	//  Platform specific
	//------------------------------------//

	log: function(msg) {
		if (console && console.log) {
			console.log(msg);
		} else {
			alert(msg);
		}
	},

	onShow: function() {
		var me = this;

		// onShow - Implementation of the built-in TV volume UI elements
		// http://www.samsungdforum.com/Guide/tec00107/index.html
		// http://www.samsungdforum.com/Guide/tec00147/index.html
		// http://www.samsungdforum.com/Guide/tec00106/index.html
		window.onShow = function() {
			var nnaviPlugin = utils.initSEF('NNavi');
			nnaviPlugin.Execute('SetBannerState', 1);

			// For volume OSD
			me.pluginAPI.unregistKey(me.keysAPI.KEY_VOL_UP);
			me.pluginAPI.unregistKey(me.keysAPI.KEY_VOL_DOWN);
			me.pluginAPI.unregistKey(me.keysAPI.KEY_MUTE);
		};
	},


	//
	// TV
	//

	//
	// This is the best way to get a proper TV model.
	// From Samsung Guide:
	// The GetProductCode function gets the product code (for example,
	// UNNOC7000).
	// @return returns the target product code or a negative value if it fails.
	//
	getProductCode: function() {
		this._sef = utils.initSEF('TV');
		return this._sef.Execute('GetProductCode');
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
		this._sef = utils.initSEF('NNavi');
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
		this._sef = utils.initSEF('Network');
		if (interfaceType) {
			return this._sef.Execute('GetMAC', 'interfaceType');
		} else {
			return this._sef.Execute('GetMAC');
		}
	}
});

module.exports = TV_Platform_Samsung;
