var ajaxRequest = {
//Information Source: http://www.tutorialspoint.com/ajax/what_is_xmlhttprequest.htm
    promiseAjaxReq: function(data){
        var error = $('#soundcloud-error');
        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();
            req.open(data.method, data.url);
            loader.show();
            req.onload = function () {

                if (req.status == 200) {
                    error.innerHTML = "";
                    resolve(req.response);
                } else {
                    reject(Error(req.statusText));
                }
            }
            req.onerror = function(){
                reject(Error("Network error"));
            };
            //Didn't manage to handle the 404 even with try/catch
            req.send();
           
        });
    }
};

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