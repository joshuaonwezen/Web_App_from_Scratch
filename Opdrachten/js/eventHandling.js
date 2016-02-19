//Add event listener
var eventHandling = {
    init: function(){
      this.soundcloudHandler();
      this.swipeHandler();
    },
    soundcloudHandler: function () {
        var submit = $('#soundcloud-submit');
        submit.removeEventListener('click', soundcloud.getSoundcloudUser);
        submit.addEventListener('click', soundcloud.getSoundcloudUser);
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

