# smart-tv.js
A Smart TV app development framework. It's designed so that it adds a device abstraction layer.

## Installation

## Usage

Example:

```javascript
$.tv.init();
$.tv.player.init();
$.tv.player.setUrl(someContentUrl);
$.tv.player.play();
```

## API

---------------------------------------

### Player

The Player object provides the ability to play video files on a device.

$.tv.player

#### Methods

+ [init](#player-init)
+ [getCurrentPosition](#player-gcp)
+ [getDuration](#player-duration)
+ [getUrl](#player.geturl)
+ [play](#player-play)
+ [pause](#player-pause)
+ [stop](#player-stop)

---------------------------------------

### <a name='player-gcp'></a>getCurrentPosition

The current playback position of the currently playing content.
@return milliseconds

Example:
`var curTime = $.tv.player.getCurrentPosition();`

### <a name='player-duration'></a>getDuration

Duration of currently playing content.
@return milliseconds

Example:
`var duration = $.tv.player.getDuration();`

### <a nane='player-geturl'></a>getUrl

Returns the content url set using setUrl().
@params none
@return The content url

Example:
`var url = $.tv.player.getUrl();`

### <a name="plater-play"></a>play

The Play function starts playing the content URL set using setUrl().
@return none

Example:
`$.tv.player.play();`

### <a name="player-pause"></a>pause

Pauses the currently playing content.
@return none

Example:
`$.tv.player.pause();`

### <a name="player-seturl"></a>setUrl

Sets the content url to be played using play().
@params url - The content url to be played.
@return none

Example:
`$.tv.player.setUrl(url);`


### <a name="player-stop"></a>stop

Stops media playback.
@return none

Example:
`$.tv.player.stop();`
