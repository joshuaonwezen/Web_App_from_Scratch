var motionHandling = {
    //Source: http://www.html5rocks.com/en/tutorials/device/orientation/
    deviceMotionHandler: function (eventData) {
        var acceleration = eventData.accelerationIncludingGravity;
        
        //X / Y axis
         $('#direction').innerHTML = (acceleration.x > 0 ? 'Turned left' : 'Turned right');
         $('#angle').innerHTML = (acceleration.y > 0 ? 'Turned up' : 'Turned down');
        
        //Changing sections
        if (acceleration.x > 8) {
            window.location.href = '#playlist';
        }
        if (acceleration.x < -8) {
            window.location.href = '#track';
        }
        if (acceleration.y < -2) {
            window.location.href = '#intro';
        }        
    },
}
