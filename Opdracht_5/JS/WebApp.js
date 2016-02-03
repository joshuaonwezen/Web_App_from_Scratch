(function () {
    var webApp = {
        
        app: {
            init: function () {
                webApp.routes.init();
            },
        },
        
        routes: {
            init: function () {                
                window.addEventListener('hashchange', function(){
                    
                    var route = window.location.href;
                    webApp.sections.toggle(route);
                    
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