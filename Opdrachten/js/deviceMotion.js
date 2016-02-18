var motionHandling = {
    //Source: http://www.html5rocks.com/en/tutorials/device/orientation/
    deviceMotionHandler: function (eventData) {
        var gravity, xyz = "[X, Y, Z]";
    
        // Grab the acceleration including gravity from the results
        var acceleration = eventData.accelerationIncludingGravity;
        gravity = xyz.replace("X", acceleration.x);
        gravity = gravity.replace("Y", acceleration.y);
        gravity = gravity.replace("Z", acceleration.z);
        //document.getElementById("gravity").innerHTML = gravity;
        
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
