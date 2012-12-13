var Main = {

	init : function () {
		LG.init();
		LG.log('hello world');
		LG.log(navigator.userAgent);
	},

	keyDown: function () {
		LG.log("key pressed: " + event.keyCode);
		
		switch(event.keyCode){

		case VK_STOP:
			LG.log('stop');
			LG_Player.stop();
			break;
		case VK_PLAY:
			LG.log('play');
			LG_Player.play();
			break;
		case VK_PAUSE:
			LG.log('pause');
			LG_Player.pause();
			break;
		case VK_BACK:
			LG.log('quit.');
			LG.quit();
			break;
		}
	}

};


