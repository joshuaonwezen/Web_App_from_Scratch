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
                    if (window.location.hash) {
                        webApp.sections.toggle(window.location.hash)
                    }
                }
                window.addEventListener('hashchange', function(){
                    webApp.sections.toggle(window.location.hash);
                });
            },
        },
        
        sections: {
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
    }
    
    webApp.app.init();
})();

// Raymond's code review:
// in de if else in routes.init functie check je met (window.location.href.indexOf('#') != -1) of er een hash in de url zit. 
// Dit kan veel makkelijker door (window.location.hash) in te vullen in de if.
// Je geeft de volledige url (window.location.href) door aan de toggle functie waarin je hem ontleedt.
// Door simpelweg window.location.hash door te geven, kan je hem in één keer in de queryselector zetten.