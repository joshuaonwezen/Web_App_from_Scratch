var motionHandling = {
    deviceMotionHandler: function (eventData) {
        var gravity, xyz = "[X, Y, Z]";
    
        // Grab the acceleration including gravity from the results
        var acceleration = eventData.accelerationIncludingGravity;
        gravity = xyz.replace("X", acceleration.x);
        gravity = gravity.replace("Y", acceleration.y);
        gravity = gravity.replace("Z", acceleration.z);
        //document.getElementById("gravity").innerHTML = gravity;
        if(acceleration.x > 0){
            $('#direction').innerHTML = 'Turned left';
        }else{
            $('#direction').innerHTML = 'Turned right';
        }
        if(acceleration.x > 8){
            section.showSection('track');
            section.hideSections();
        }
        if(acceleration.x < -8){
            section.showSection('playlist');
            section.hideSections();
        }
        if(acceleration.y > 0){
            $('#angle').innerHTML = 'Turned up';
        }else{
            $('#angle').innerHTML = 'Turned down';
        }
        
    },
}
