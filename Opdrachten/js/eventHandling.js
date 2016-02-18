//Add event listener
var handler = {
    init: function(){
      this.soundcloudHandler();
      this.swipeHandler();
    },
    soundcloudHandler: function () {
        $('#soundcloud-submit').removeEventListener('click', soundcloud.getSoundcloudUser);
        $('#soundcloud-submit').addEventListener('click', soundcloud.getSoundcloudUser);
    },
    swipeHandler: function(){
        $('body').addEventListener('touchend', function () {
            show($('#swipe-section'));
        });
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', motionHandling.deviceMotionHandler, false);
        }
    },
}

