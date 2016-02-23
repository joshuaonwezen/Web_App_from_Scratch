//Add event listener
var eventHandling = {
    init: function(){
      this.soundcloudLoadHandler();
      this.swipeHandler();
    },
    soundcloudLoadHandler: function () {
        var submit = $('#soundcloud-submit');
        submit.removeEventListener('click', soundcloudAPIController.getSoundcloudUser);
        submit.addEventListener('click', soundcloudAPIController.getSoundcloudUser);
    },
    swipeHandler: function(){
        var body = $('body');
        body.addEventListener('touchend', function () {
            show($('#swipe-section'));
        });
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', deviceMotion.deviceMotionHandler, false);
        }
    },
}

