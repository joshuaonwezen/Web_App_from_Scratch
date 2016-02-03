/***
 * cmdaan.js
 *   Bevat functies voor CMDAan stijl geolocatie welke uitgelegd
 *   zijn tijdens het techniek college in week 5.
 *
 *   Author: J.P. Sturkenboom <j.p.sturkenboom@hva.nl>
 *   Credit: Dive into html5, geo.js, Nicholas C. Zakas
 *
 *   Copyleft 2012, all wrongs reversed.
 */

var cmdGeo = {
    // Variable declaration
    SANDBOX: "SANDBOX",
    LINEAIR: "LINEAIR",
    GPS_AVAILABLE: 'GPS_AVAILABLE',
    GPS_UNAVAILABLE: 'GPS_UNAVAILABLE',
    POSITION_UPDATED: 'POSITION_UPDATED',
    REFRESH_RATE: 1000,
    currentPosition: currentPositionMarker = customDebugging = debugId = map = interval = intervalCounter = updateMap = false,
    locatieRij: markerRij = [],
    // Event functies - bron: http://www.nczonline.net/blog/2010/03/09/custom-events-in-javascript/ Copyright (c) 2010 Nicholas C. Zakas. All rights reserved. MIT License
    // Gebruik: ET.addListener('foo', handleEvent); ET.fire('event_name'); ET.removeListener('foo', handleEvent);
    eventTarget: function () {
        function EventTarget() {
            this._listeners = {}
        }
        EventTarget.prototype = {constructor: EventTarget, addListener: function (a, c) {
                "undefined" == typeof this._listeners[a] && (this._listeners[a] = []);
                this._listeners[a].push(c)
            }, fire: function (a) {
                "string" == typeof a && (a = {type: a});
                a.target || (a.target = this);
                if (!a.type)
                    throw Error("Event object missing 'type' property.");
                if (this._listeners[a.type]instanceof Array)
                    for (var c = this._listeners[a.type], b = 0, d = c.length; b < d; b++)
                        c[b].call(this, a)
            }, removeListener: function (a, c) {
                if (this._listeners[a]instanceof Array)
                    for (var b =
                            this._listeners[a], d = 0, e = b.length; d < e; d++)
                        if (b[d] === c) {
                            b.splice(d, 1);
                            break
                        }
            }};
        var ET = new EventTarget();
    },
// Test of GPS beschikbaar is (via geo.js) en vuur een event af

    cmdGeoInit: {
        init: function () {
            cmdGeo.errors.debug_message("Controleer of GPS beschikbaar is...");

            ET.addListener(cmdGeo.GPS_AVAILABLE, cmdGeo.cmdGeoInit._start_interval);
            ET.addListener(cmdGeo.GPS_UNAVAILABLE, function () {
                cmdGeo.errors.debug_message('GPS is niet beschikbaar.')
            });

            (geo_position_js.init()) ? ET.fire(cmdGeo.GPS_AVAILABLE) : ET.fire(cmdGeo.GPS_UNAVAILABLE);
        },
        _start_interval: function (event) {
            debug_message("GPS is beschikbaar, vraag positie.");
            cmdGeo.positions._update_position();
            interval = self.setInterval(cmdGeo.positions._update_position, REFRESH_RATE);
            ET.addListener(cmdGeo.POSITION_UPDATED, cmdGeo.map._check_locations);
        },
    },
// Start een interval welke op basis van REFRESH_RATE de positie updated


    positions: {
        _update_position: function () {
            // Vraag de huidige positie aan geo.js, stel een callback in voor het resultaat
            intervalCounter++;
            cmdGeo.cmdGeoInit.init.geo_position_js.getCurrentPosition(cmdGeo.positions._set_position, _geo_error_handler, {enableHighAccuracy: true});
        },
        // Callback functie voor het instellen van de huidige positie, vuurt een event af
        _set_position: function (position) {
            currentPosition = position;
            ET.fire("POSITION_UPDATED");
            cmdGeo.errors.debug_message(intervalCounter + " positie lat:" + position.coords.latitude + " long:" + position.coords.longitude);
        },
    },
    map: {
// Controleer de locaties en verwijs naar een andere pagina als we op een locatie zijn
        _check_locations: function (event) {
            // Liefst buiten google maps om... maar helaas, ze hebben alle coole functies
            for (var i = 0; i < locaties.length; i++) {
                var locatie = {coords: {latitude: locaties[i][3], longitude: locaties[i][4]}};

                if (cmdGeo.maps._calculate_distance(locatie, currentPosition) < locaties[i][2]) {

                    // Controle of we NU op die locatie zijn, zo niet gaan we naar de betreffende page
                    if (window.location != locaties[i][1] && localStorage[locaties[i][0]] == "false") {
                        // Probeer local storage, als die bestaat incrementeer de locatie
                        try {
                            (localStorage[locaties[i][0]] == "false") ? localStorage[locaties[i][0]] = 1 : localStorage[locaties[i][0]]++;
                        } catch (error) {
                            cmdGeo.errors.debug_message("Localstorage kan niet aangesproken worden: " + error);
                        }

// TODO: Animeer de betreffende marker

                        window.location = locaties[i][1];
                        cmdGeo.errors.debug_message("Speler is binnen een straal van " + locaties[i][2] + " meter van " + locaties[i][0]);
                    }
                }
            }
        },
// Bereken het verchil in meters tussen twee punten
        _calculate_distance: function (p1, p2) {
            var pos1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);
            var pos2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);
            return Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2), 0);
        },
// GOOGLE MAPS FUNCTIES
        /**
         * generate_map(myOptions, canvasId)
         *  roept op basis van meegegeven opties de google maps API aan
         *  om een kaart te genereren en plaatst deze in het HTML element
         *  wat aangeduid wordt door het meegegeven id.
         *
         *  @param myOptions:object - een object met in te stellen opties
         *      voor de aanroep van de google maps API, kijk voor een over-
         *      zicht van mogelijke opties op http://
         *  @param canvasID:string - het id van het HTML element waar de
         *      kaart in ge-rendered moet worden, <div> of <canvas>
         */
        generate_map: function (myOptions, canvasId) {
// TODO: Kan ik hier asynchroon nog de google maps api aanroepen? dit scheelt calls
            cmdGeo.errors.debug_message("Genereer een Google Maps kaart en toon deze in #" + canvasId)
            cmdGeo.map = new google.maps.Map(document.getElementById(canvasId), myOptions);

            var routeList = [];
            // Voeg de markers toe aan de map afhankelijk van het tourtype
            cmdGeo.errors.debug_message("Locaties intekenen, tourtype is: " + tourType);
            for (var i = 0; i < cmdGeo.locaties.length; i++) {

                // Met kudos aan Tomas Harkema, probeer local storage, als het bestaat, voeg de locaties toe
                try {
                    (cmdGeo.localStorage.visited == undefined || isNumber(cmdGeo.localStorage.visited)) ? cmdGeo.localStorage[cmdGeo.locaties[i][0]] = false : null;
                } catch (error) {
                    cmdGeo.errors.debug_message("Localstorage kan niet aangesproken worden: " + error);
                }

                var markerLatLng = new google.maps.LatLng(cmdGeo.locaties[i][3], cmdGeo.locaties[i][4]);
                routeList.push(markerLatLng);

                cmdGeo.locatieRij.markerRij[i] = {};
                for (var attr in cmdGeo.locatieMarker) {
                    cmdGeo.locatieRij.markerRij[i][attr] = cmdGeo.locatieMarker[attr];
                }
                cmdGeo.locatieRij.markerRij[i].scale = cmdGeo.locaties[i][2] / 3;

                var marker = new google.maps.Marker({
                    position: markerLatLng,
                    map: cmdGeo.currentPosition.map,
                    icon: cmdGeo.locatieRij.markerRij[i],
                    title: cmdGeo.locaties[i][0]
                });
            }
// TODO: Kleur aanpassen op het huidige punt van de tour
            if (cmdGeo.tourType == LINEAIR) {
                // Trek lijnen tussen de punten
                debug_message("Route intekenen");
                var route = new google.maps.Polyline({
                    clickable: false,
                    map: cmdGeo.currentPosition.map,
                    path: routeList,
                    strokeColor: 'Black',
                    strokeOpacity: .6,
                    strokeWeight: 3
                });

            }

            // Voeg de locatie van de persoon door
            currentPositionMarker = new google.maps.Marker({
                position: cmdGeo.currentPosition.kaartOpties.center,
                map: cmdGeo.currentPosition.map,
                icon: cmdGeo.currentPosition.positieMarker,
                title: 'U bevindt zich hier'
            });

            // Zorg dat de kaart geupdated wordt als het POSITION_UPDATED event afgevuurd wordt
            ET.addListener(POSITION_UPDATED, update_positie);
        },
        isNumber: function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        },
// Update de positie van de gebruiker op de kaart
        update_positie: function (event) {
            // use currentPosition to center the map
            var newPos = new google.maps.LatLng(cmdGeo.currentPosition.coords.latitude, cmdGeo.currentPosition.coords.longitude);
            cmdGeo.currentPosition.map.setCenter(newPos);
            cmdGeo.currentPosition.currentPositionMarker.setPosition(newPos);
        },
// FUNCTIES VOOR DEBUGGING
    },
    errors: {
        _geo_error_handler: function (code, message) {
            debug_message('geo.js error ' + code + ': ' + message);
        },
        debug_message: function (message) {
            (cmdGeo.currentPosition.customDebugging && cmdGeo.currentPosition.debugId) ? document.getElementById(cmdGeo.currentPosition.debugId).innerHTML : console.log(message);
        },
        set_custom_debugging: function (debugId) {
            debugId = this.debugId;
            cmdGeo.currentPosition.customDebugging = true;
        },
    },
}