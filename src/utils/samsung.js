//------------------------------------//
//  UTILS
//------------------------------------//

// =>



module.exports = {

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
		return sef;
	}
	
};
