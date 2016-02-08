(function () {
    var webApp = {
        //dc749f6f96411300ee6d99c0bae700ea Soundcloud
        //Loading app functions
        app: {
            init: function () {
                webApp.routes.init();
                window.onload = function () {
                    webApp.soundcloud.createSoundcloudRequest();
                }
            },
        },
        
        //Finding routes functions
        routes: {
            init: function () { 
                //Window onload to wait for objects to exist
                window.onload = function () {
                    if (window.location.href.indexOf('#') != -1) {
                        webApp.section.toggle(window.location.href)
                    }
                    /* 
                    routie({
                        'register': function () {
                            webApp.section.hideSections();
                            document.getElementById('register-section').style.display = "";
                        },
                        'login': function () {
                            webApp.section.hideSections();
                            document.getElementById('login-section').style.display = "";
                        }
                    });
                    */
                }
                window.addEventListener('hashchange', function(){
                    webApp.section.toggle(window.location.href);
                });

            },
        },
        
        //Hiding sections on single page functions
        section: {
            toggle: function (route) {
                this.hideSections();
                
                //Change context depending on route
                var section = route.split('#');
                this.showSection(section[1]);
            },
            showSection: function(section){
                document.getElementById(section + '-section').style.display = "";
            },
            hideSections: function(){
                //Clear all existing screens
                var screens = document.getElementsByClassName('container-text');
                for (i = 0; i < screens.length; i++) {
                    screens[i].style.display = "none";
                }
            },
            
            generateTemplate: function(section, obj){
                var soundcloudData = JSON.parse(obj);
                if (soundcloudData[0] !== [] || soundcloudData !== undefined) {
                    document.getElementById('soundcloud-playlists').innerHTML = "";

                    var userinfo = {
                        username: 'Name: ' + soundcloudData[0].user.username,
                        last_modified: 'Last modified: ' + soundcloudData[0].user.last_modified,
                        permalink_url: 'URL: ' + soundcloudData[0].user.permalink_url,
                    }
                    var playlists = _.pluck(soundcloudData, 'id');
                    for (var i = 0; i < soundcloudData.length; i++) {
                        //No longer needed because of underscore.js
                        //var playlistId = soundcloudData[i].id;
                        document.getElementById('soundcloud-playlists').innerHTML += '<iframe width="400" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/' + playlists[i] + '&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>';
                    }

                    Transparency.render(document.getElementById('soundcloud-section'), userinfo)
                    
                    if (webApp.soundcloud.playlistGenerator !== undefined) {
                        webApp.soundcloud.playlistGenerator.terminate();
                        webApp.soundcloud.playlistGenerator = undefined;
                    }

                    //var uri = _.where(newObj, 'soundcloud')
                }else{
                    document.getElementById('soundcloud-errors').innerHTML = "This user was not found.";
                }
            },
        },
        
        
        //Soundcloud
        soundcloud: {
            //Standard info
            clientId: "?client_id=a1ed0ce4135f0f32d4f1eaa4e5699b8e",    
            apiPrefix: "http://api.soundcloud.com/",
            playlistGenerator: undefined,


            createSoundcloudRequest: function(){

                //Taken from webworker tutorial http://www.w3schools.com/html/html5_webworkers.asp 
                document.getElementById('soundcloud-submit').addEventListener('click', function () {
                    if (typeof (Worker) !== "undefined") {
                        if (typeof (webApp.soundcloud.playlistGenerator) == "undefined") {
                            webApp.soundcloud.playlistGenerator = new Worker(webApp.soundcloud.getSoundcloudUser());
                        }else{
                            webApp.soundcloud.playlistGenerator.terminate();
                            webApp.soundcloud.playlistGenerator = undefined;
                        }
                    }else{
                        webApp.soundcloud.getSoundcloudUser();
                    }
                });
            },
            
            getSoundcloudUser: function(){
                var userId = "josh-onwezen";
                var requestPath = "users";
                
                if (document.getElementById('soundcloud-username').value != "") {
                    userId = document.getElementById('soundcloud-username').value;
                }
                var data = {
                    method: "GET",
                    url: webApp.soundcloud.apiPrefix + requestPath + "/" + userId + "/playlists" + webApp.soundcloud.clientId,
                }
                var section = "soundcloud-section";
                webApp.ajaxRequest(data, section);
            },
        },
        
        ajaxRequest: function(data, action){
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        webApp.section.generateTemplate(action, xhttp.responseText);
                        //document.getElementById(action).innerHTML = xhttp.responseText;
                    }
                };
                xhttp.open(data.method, data.url, true);
                xhttp.send();
        },
        
    }
    
    webApp.app.init();
})();