/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var template = {
    generateTemplate: function (section, obj) {
        var soundcloudData = JSON.parse(obj);
        if (soundcloudData[0] !== [] || soundcloudData !== undefined) {
            document.getElementById('soundcloud-playlists').innerHTML = "";
            console.log(soundcloudData);
            //Inserting info for transparency.js
            var userinfo = {
                username: 'Name: ' + soundcloudData[0].user.username,
                last_modified: 'Last modified: ' + soundcloudData[0].user.last_modified,
                permalink_url: 'URL: ' + soundcloudData[0].user.permalink_url,
            }

//filter and map in underscore.js
            var underscoreExercise = _(soundcloudData).pluck('title').map(function (value) {
                return 'Name:' + value
            });
            var trackcount = _.pluck(soundcloudData, 'track_count');
            var playlistsWithAtleastFiveTracks = _.filter(trackcount, function (amount) {
                return amount > 3;
            });
            console.log(underscoreExercise, trackcount, playlistsWithAtleastFiveTracks);
            //Creating playlist embeds for each playlist
            var playlists = _.pluck(soundcloudData, 'id');
            for (var i = 0; i < soundcloudData.length; i++) {
//No longer needed because of underscore.js
//var playlistId = soundcloudData[i].id;
                document.getElementById('soundcloud-playlists').innerHTML += '<div class="soundcloud-box"><iframe width="400" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/' + playlists[i] + '&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe><a id="details-' + soundcloudData[i].id + '-ref" href="#details-' + soundcloudData[i].id + '">Details</a></div>';
                document.getElementById('details-section').innerHTML += '<div id="details-' + soundcloudData[i].id + '-section" class="container-text" style="display: none;"></div>'
                template.generateHtml(soundcloudData[i])
                template.detailSectionHandler('details-' + soundcloudData[i].id + '-section', soundcloudData[i]);
            }

//Actually rendering it
            Transparency.render(document.getElementById('soundcloud-section'), userinfo)

        } else {
            document.getElementById('soundcloud-errors').innerHTML = "This user was not found.";
        }
    },
    generateHtml: function (data) {
        var obj = document.getElementById('details-' + data.id + '-section');
        obj.innerHTML += '<div class="trackinfo">'
        obj.innerHTML += '<label>Track: </label><span class="title"></span><br><br>'
        obj.innerHTML += '<label>Link: </label><span class="permalink_url"></span><br><br>'
        obj.innerHTML += '<label>Favorites: </label><span class="favoritings_count"></span><br><br>';
    },
    detailSectionHandler: function (div, data) {
        var titlesObj = _.pluck(data.tracks, 'title');
        var titles = titlesObj.map(function (value) {
            return value
        });
        var urlsObj = _.pluck(data.tracks, 'permalink_url');
        var urls = urlsObj.map(function (value) {
            return value
        });
        var favoritesObj = _.pluck(data.tracks, 'favoritings_count');
        var favorites = favoritesObj.map(function (value) {
            return value
        });
        var toAppend = {
            titles: titles,
            urls: urls,
            favorites: favorites
        };
        var titleText = {
            title: {
                text: function () {
                    return this.titles;
                }
            },
            permalink_url: {
                text: function () {
                    return this.urls;
                }
            },
            favoritings_count: {
                text: function () {
                    return this.favorites;
                }
            },
        }
        Transparency.render(document.getElementById(div), toAppend, titleText);
    },
}