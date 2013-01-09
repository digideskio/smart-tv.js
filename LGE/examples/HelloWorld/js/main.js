var Main = {

	init : function () {
		LG.init();

		// print hello world in the log
		LG.log('Hello World');

		// print the user agent in the log
		LG.log(navigator.userAgent);
	},

	keyDown: function () {
		LG.log("key pressed: " + event.keyCode);
		
		switch(event.keyCode){
		case VK_UP:
			LG.log('Up arrow pressed.');
			break;
		}
	}

};


