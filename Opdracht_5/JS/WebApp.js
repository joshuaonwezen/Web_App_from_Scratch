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
                var register = document.getElementById('register-info');
                var login = document.getElementById('login-info');
                
                var intro = document.getElementById('intro-info');
                intro.style.display="none";
                
                if(route.indexOf('register') != -1){
                    register.style.display="";
                    login.style.display="none";
                }else if (route.indexOf('login') != -1){
                    register.style.display="none";
                    login.style.display="";
                }
            },
        },
    }
    
    webApp.app.init();
})();