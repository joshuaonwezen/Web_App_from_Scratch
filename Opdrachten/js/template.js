/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var template = {
    generateTemplate: function (section, obj) {
        var soundcloudData = JSON.parse(obj);
        if (soundcloudData[0] !== [] || soundcloudData !== undefined) {

            $('#soundcloud-playlists').innerHTML = "";
            //Inserting info for transparency.js
            var userinfo = {
                username: 'Name: ' + soundcloudData[0].user.username,
                last_modified: 'Last modified: ' + soundcloudData[0].user.last_modified,
                permalink_url: 'URL: ' + soundcloudData[0].user.permalink_url,
            }

            console.log(soundcloudData);
            //Creating playlist embeds for each playlist
            for (var i = 0; i < soundcloudData.length; i++) {
                //No longer needed because of underscore.js
                //var playlistId = soundcloudData[i].id;
                $('#soundcloud-playlists').innerHTML += '<div id="soundcloud-box" class="soundcloud-box"><label style="margin-top:10px;">'+soundcloudData[i].title+'</label><a id="details-' + soundcloudData[i].id + '-ref" href="#details-' + soundcloudData[i].id + '">Details</a></div>';
                $('#details-section').innerHTML += '<div id="details-' + soundcloudData[i].id + '-section" class="container-text" style="display: none;"></div>'
                template.generateHtml(soundcloudData[i])
            }

            //Actually rendering it
            Transparency.render($('#soundcloud-section'), userinfo)

        } else {
            $('#soundcloud-errors').innerHTML = "This user was not found.";
        }
    },
    generateHtml: function (data) {
        var obj = $('#details-' + data.id + '-section');
        obj.innerHTML += '<iframe width="400" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/' + data.id + '&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>';

        for (var i = 0; i < data.tracks.length; i++) {
            obj.innerHTML += '<div id="trackinfo-'+data.tracks[i].id+'" class="trackinfo"><label>Track: </label><span class="title"></span><br><br><label>Link: </label><span class="permalink_url"></span><br><br><label>Favorites: </label><span class="favoritings_count"></span></div><br><br>';
            template.detailSectionHandler('#trackinfo-'+data.tracks[i].id, data.tracks[i]);
        }
        loader.hide();

    },
    detailSectionHandler: function (div, track) {
        var span = $(div + '> span');
        span[0].innerHTML = track.title;
        span[1].innerHTML = track.permalink_url;
        span[2].innerHTML = track.favoritings_count;
    },
}