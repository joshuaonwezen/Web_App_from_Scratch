(function () {
    var webApp = {
        //dc749f6f96411300ee6d99c0bae700ea Soundcloud
        //Loading app functions
        app: {
            init: function () {
                webApp.routes.init();
                window.onload = function () {
                    webApp.soundcloud.soundcloudHandler();
                }
            },
        },
        
        //Finding routes functions
        routes: {
            init: function () { 
                //Window onload to wait for objects to exist
//                window.onload = function () {
//                    if (window.location.href.indexOf('#') != -1) {
//                        webApp.section.toggle(window.location.href)
//                    }
//                    Routie code, don't like it as my code is more efficient for my implementation. 
//                    Routie requires me to setup a function for each section, instead of just doing it dynamically on change
                    routie({
                        'playlist': function () {
                            webApp.section.hideSections();
                            document.getElementById('playlist-section').style.display = "";
                        },
                        'track': function () {
                            webApp.section.hideSections();
                            document.getElementById('track-section').style.display = "";
                        }
                    });
//                }
//                window.addEventListener('hashchange', function(){
//                    webApp.section.toggle(window.location.href);
//                });

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
            
        },
        
        
        //Soundcloud
        soundcloud: {
            //Standard info
            clientId: "?client_id=a1ed0ce4135f0f32d4f1eaa4e5699b8e",    
            apiPrefix: "http://api.soundcloud.com/",
            playlistGenerator: undefined,

            //Taken from webworker tutorial http://www.w3schools.com/html/html5_webworkers.asp 
            soundcloudHandler: function(){
                document.getElementById('soundcloud-submit').addEventListener('click', function () {
                    webApp.soundcloud.getSoundcloudUser();
                });
            },
            
            //Setup all info to send to the ajax call
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
        
        template: {
            generateTemplate: function (section, obj) {
                var soundcloudData = JSON.parse(obj);
                if (soundcloudData[0] !== [] || soundcloudData !== undefined) {
                    document.getElementById('soundcloud-playlists').innerHTML = "";

                    //Inserting info for transparency.js
                    var userinfo = {
                        username: 'Name: ' + soundcloudData[0].user.username,
                        last_modified: 'Last modified: ' + soundcloudData[0].user.last_modified,
                        permalink_url: 'URL: ' + soundcloudData[0].user.permalink_url,
                    }
                    
                    console.log(soundcloudData);
                    //filter and map in underscore.js
                    var underscoreExercise = _(soundcloudData).pluck('title').map(function (value){return 'Name:'+ value});
                    var trackcount = _.pluck(soundcloudData, 'track_count');
                    var playlistsWithAtleastFiveTracks = _.filter(trackcount, function(amount){ return amount > 3;});
                    console.log(underscoreExercise, trackcount, playlistsWithAtleastFiveTracks);
                    
                    //Creating playlist embeds for each playlist
                    var playlists = _.pluck(soundcloudData, 'id');
                    for (var i = 0; i < soundcloudData.length; i++) {
                        //No longer needed because of underscore.js
                        //var playlistId = soundcloudData[i].id;
                        document.getElementById('soundcloud-playlists').innerHTML += '<iframe width="400" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/' + playlists[i] + '&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>';
                    }

                    //Actually rendering it
                    Transparency.render(document.getElementById('soundcloud-section'), userinfo)

                    if (webApp.soundcloud.playlistGenerator !== undefined) {
                        webApp.soundcloud.playlistGenerator.terminate();
                        webApp.soundcloud.playlistGenerator = undefined;
                    }

                } else {
                    document.getElementById('soundcloud-errors').innerHTML = "This user was not found.";
                }
            },
        },
        //Information Source: http://www.tutorialspoint.com/ajax/what_is_xmlhttprequest.htm
        ajaxRequest: function(data, action){
//            var xhttp = new XMLHttpRequest();
//            xhttp.onreadystatechange = function () {
//                if (xhttp.readyState == 4 && xhttp.status == 200) {
//                    if (typeof (Worker) !== "undefined") {
//                        if (typeof (webApp.soundcloud.playlistGenerator) == "undefined") {
//                            webApp.soundcloud.playlistGenerator = new Worker(webApp.template.generateTemplate(action, xhttp.responseText));
//                        } else {
//                            //If it already exists, clear it
//                            webApp.soundcloud.playlistGenerator.terminate();
//                            webApp.soundcloud.playlistGenerator = undefined;
//                        }
//                    }
//                    else{
//                        webApp.template.generateTemplate(action, xhttp.responseText);
//                        console.log('Web worker not working')
//                    }
//                }
//            };
//            xhttp.open(data.method, data.url, true);
//            xhttp.send();
            
                return new Promise(function (resolve, reject) {
                    var req = new XMLHttpRequest();
                    req.open(data.method, data.url);

                    req.onload = function () {

                        if (req.status == 200) {
                            resolve(webApp.template.generateTemplate(action, req.response))
                        } else {
                            reject(Error(req.statusText));
                        }
                    };
                    req.onerror = function () {
                        reject(Error("Network Error"));
                    };
                    req.send();
                });
                
//                ajax(data.url, function (res) {
//                    webApp.template.generateTemplate(action, res);
//                });
        },
        
    }
    
    webApp.app.init();
})();