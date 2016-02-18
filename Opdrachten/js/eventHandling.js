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
//        var main = $('#main-container');
//        var hammer = new Hammer(main);
//        hammer.on('swipe', function (ev) {
//            window.location('#swipe')
//        });
//        hammer.get('swipe').set({direction: Hammer.DIRECTION_VERTICAL});
        $('body').addEventListener('touchend', function () {
            show($('#swipe-section'));
            //soundcloud.getSoundcloudUser();
        });
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', deviceMotionHandler, false);
        } else {
            document.getElementById("dmEvent").innerHTML = "Not supported."
        }
    },
}

function deviceMotionHandler(eventData) {
  var info, xyz = "[X, Y, Z]";

  // Grab the acceleration from the results
  var acceleration = eventData.acceleration;
  info = xyz.replace("X", acceleration.x);
  info = info.replace("Y", acceleration.y);
  info = info.replace("Z", acceleration.z);
  document.getElementById("moAccel").innerHTML = info;

  // Grab the acceleration including gravity from the results
  acceleration = eventData.accelerationIncludingGravity;
  info = xyz.replace("X", acceleration.x);
  info = info.replace("Y", acceleration.y);
  info = info.replace("Z", acceleration.z);
  document.getElementById("moAccelGrav").innerHTML = info;

  // Grab the rotation rate from the results
  var rotation = eventData.rotationRate;
  info = xyz.replace("X", rotation.alpha);
  info = info.replace("Y", rotation.beta);
  info = info.replace("Z", rotation.gamma);
  document.getElementById("moRotation").innerHTML = info;

  // // Grab the refresh interval from the results
  info = eventData.interval;
  document.getElementById("moInterval").innerHTML = info;       
}