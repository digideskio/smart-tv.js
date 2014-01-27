
/**
 * Samsung TV wrapper.
 * @version 0.0.1
 */

var $.tv = $.tv || {};
(function($) {

    $.tv = {

        _device: null,
        widgetAPI: null,


        init: function () {
            this.widgetAPI = new Common.API.Widget();
        },


        /**
         * Widget API
         * http://www.samsungdforum.com/Guide/ref00006/common_module_widget_object.html
         */

        /**
         * The sendExitEvent() method brings about the same effect as pressing
         * the Exit key. Stops the application and returns to the TV screen.
         * @params none
         * @return none
         * @remarks Since Samsung Smart TV version 2.265
         */
        exit: function () {
            this.widgetAPI.sendExitEvent();
        }
    };

})($);
