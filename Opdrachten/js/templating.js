var template = {
    generateTemplate: function (obj) {
        var soundcloudData = JSON.parse(obj);
        if (soundcloudData[0] !== undefined && soundcloudData[0].user !== undefined) {
            var detailSection = $('#details-section');
            var soundcloudSection = $('#soundcloud-playlists');
            detailSection.innerHTML = "";
            soundcloudSection.innerHTML = "";
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
                var id = soundcloudData[i].id;
                soundcloudSection.innerHTML += '<div id="soundcloud-box" class="soundcloud-box"><label style="margin-top:10px;">'+soundcloudData[i].title+'</label><a id="details-' + id + '-ref" onclick="template.createEmbed('+id+');" href="#details-' + id + '">Details</a></div>';
                detailSection.innerHTML += '<div id="details-' + id + '-section" class="container-text hide"></div>'

               
                template.generateHtml(soundcloudData[i]);
            }

            //Actually rendering it
            Transparency.render($('#soundcloud-section'), userinfo)

        } else {
            loader.hide();
            var error = $('#soundcloud-error');
            error.innerHTML = "This user was not found.";
        }
    
    },
    generateHtml: function (data) {
        var obj = $('#details-' + data.id + '-section');
        obj.innerHTML += '<div class="embed"></div>';
        for (var i = 0; i < data.tracks.length; i++) {
            //Check for duplicates and show them in the right section
            if($('#trackinfo-' + data.tracks[i].id) != undefined){
                var duplicateTrackCount = Math.floor((Math.random() * 100000) + 1);
                obj.innerHTML += '<div id="trackinfo-' + data.tracks[i].id + duplicateTrackCount +'" class="trackinfo"><span class="title"></span><br><br><label>Link: </label><a class="permalink_url" href=""></a><br><br><label>Genre: </label><span class="genre"></span></div><br><br>';
                template.detailSectionHandler('#trackinfo-' + data.tracks[i].id + duplicateTrackCount, data.tracks[i]);
            }else{
                obj.innerHTML += '<div id="trackinfo-' + data.tracks[i].id + '" class="trackinfo"><span class="title"></span><br><br><a class="permalink_url" href=""></a><br><br><label>Genre: </label><span class="genre"></span></div><br><br>';
                template.detailSectionHandler('#trackinfo-' + data.tracks[i].id, data.tracks[i]);
            }
        }
        window.onload(loader.hide());

    },
    detailSectionHandler: function (div, track) {
        var span = $(div + '> span');
        var a = $(div + '> .permalink_url');
        span[0].innerHTML = track.title;
        span[1].innerHTML = track.genre;
        a.setAttribute('href', track.permalink_url);
        a.innerHTML = track.permalink_url;
    },
    createEmbed: function (id) {
        var embedDiv = $('#details-' + id + '-section > .embed');
        if ($('#details-' + id + '-section iframe') === undefined){
            embedDiv.innerHTML += '<iframe width="600" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/' + id + '&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>';
        }
    },
}