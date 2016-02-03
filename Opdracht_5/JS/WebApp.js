(function () {
    var webApp = {
        
        app: {
            init: function () {
                webApp.routes.init();
            },
        },
        
        routes: {
            init: function () { 
                //Window onload to wait for objects to exist
                window.onload = function () {
                    if (window.location.href.indexOf('#') != -1) {
                        webApp.sections.toggle(window.location.href)
                    }
                }
                window.addEventListener('hashchange', function(){
                    webApp.sections.toggle(window.location.href);
                });
            },
        },
        
        sections: {
            toggle: function (route) {
                
                //Clear all existing screens
                var screens = document.getElementsByClassName('container-text');
                for(i = 0; i < screens.length; i++){
                    screens[i].style.display="none";
                }
                
                //Change context depending on route
                var section = route.split('#');
                this.showSection(section[1]);
                
            },
            showSection: function(section){
                document.getElementById(section + '-info').style.display = "";
            },
        },
    }
    
    webApp.app.init();
})();