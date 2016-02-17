var soundcloud = {
    //Info for soundcloud
    clientId: "?client_id=a1ed0ce4135f0f32d4f1eaa4e5699b8e",
    apiPrefix: "http://api.soundcloud.com/",
    
    //Setup all info to send to the ajax call
    getSoundcloudUser: function () {
        var userId = "josh-onwezen";
        var requestPath = "users";
        if ($('#soundcloud-username').value != "") {
            userId = $('#soundcloud-username').value;
        }
        var data = {
            method: "GET",
            url: soundcloud.apiPrefix + requestPath + "/" + userId + "/playlists" + soundcloud.clientId,
        }
        var section = "soundcloud-section";
        
        
        var worker = new Worker(ajaxRequest.init(data, section));
        worker.onmessage = function (event) {
            console.log("This " + event.data);
        };
    },
}