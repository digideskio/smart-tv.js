//------------------------------------//
//  UTILS
//------------------------------------//

// => Samsung platform specific utilities file.



module.exports = {


	//
	// Logging
	//
	log: function(msg) {
		if (console && console.log) {
			console.log(msg);
		} else {
			alert(msg);
		}
	},


	//
	// Initialize Samsung native object.
	//
	initSEF: function(pluginName) {
		var sef = document.getElementById('pluginObjectSef');
		if (sef) {
			sef.Close();
		} else {
			var e = document.createElement('object');
			e.id = 'pluginObjectSef';
			e.setAttribute('classid', 'clsid:SAMSUNG-INFOLINK-SEF');
			document.body.appendChild(e);
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
		if (pluginName === 'TV') {
			sef.Open('TV', '1.001', 'TV');
		}
		return sef;
	},


	//
	// Seconds to Milliseconds
	//
	s2ms: function(seconds) {
		return seconds * 1000;
	}

};
