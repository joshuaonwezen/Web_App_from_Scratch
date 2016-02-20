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
            storageName: userId,
        }
        
        //Check if user was already stored
        if (localStorage.getItem(userId) != undefined) {
            var storage = localStorage.getItem(userId);
            template.generateTemplate(storage);
        } else {
            soundcloud.createAjaxPromise(data);
        }
    },
    createAjaxPromise: function (data) {
        var errorText = $('#soundcloud-error');
        ajaxRequest.promiseAjaxReq(data).then(function (result) {
            errorText.innerHTML = "";
            //Creating localstorage
            localStorage.setItem(data.storageName, result);
            template.generateTemplate(result);
        }, 
        function (error) {
            var playlists = $('#soundcloud-playlists');
            playlists.innerHTML = "";
            errorText.innerHTML = "This user was not found";
            
            console.log(error);
            loader.hide();
        });
    },
}