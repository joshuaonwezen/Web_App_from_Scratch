(function () {
    var webApp = {
        //History state change
        //dc749f6f96411300ee6d99c0bae700ea Soundcloud
        //Loading app functions
        app: {
            init: function () {
                routes.init();
                //Add handlers
                window.onload = function () {
                    handler.init();
                }
            },
        },        

    }
    webApp.app.init();
})();