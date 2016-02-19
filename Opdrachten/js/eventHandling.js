//Add event listener
var eventHandling = {
    init: function(){
      this.soundcloudHandler();
      this.swipeHandler();
    },
    soundcloudHandler: function () {
        $('#soundcloud-submit').removeEventListener('click', soundcloud.getSoundcloudUser);
        $('#soundcloud-submit').addEventListener('click', soundcloud.getSoundcloudUser);
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

