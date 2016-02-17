/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var routes = {
    init: function () {
//                Window onload to wait for objects to exist
        window.onload = function () {
            if (window.location.href.indexOf('#') != -1) {
                section.toggle(window.location.href)
            }
//                    Routie code, don't like it as my code is more efficient for my implementation. 
//                    Routie requires me to setup a function for each section, instead of just doing it dynamically on change
//                    routie({
//                        'playlist': function () {
//                            webApp.section.hideSections();
//                            document.getElementById('playlist-section').style.display = "";
//                        },
//                        'track': function () {
//                            webApp.section.hideSections();
//                            document.getElementById('track-section').style.display = "";
//                        },
//                        'details': function () {
//                            webApp.section.hideSections();
//                            document.getElementById('details-section').style.display = "";
//                        }
//                    });
        }
        window.addEventListener('hashchange', function () {
            section.toggle(window.location.href);
        });
    },
}
//Hiding sections on single page functions
var section = {
    toggle: function (route) {
        this.hideSections();
        //Change context depending on route
        if (window.location.href.indexOf('#') != -1) {
            var section = route.split('#');
            this.showSection(section[1]);
        }else{
            this.showSection('intro');
            this.showSection('soundcloud');
        }
    },
    showSection: function (section) {
        console.log(section);
        document.getElementById(section + '-section').style.display = "";
    },
    hideSections: function () {
        //Clear all existing screens
        var screens = document.getElementsByClassName('container-text');
        for (i = 0; i < screens.length; i++) {
            screens[i].style.display = "none";
        }
    },
}
