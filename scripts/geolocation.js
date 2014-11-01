var map;
var currentLat;
var currentLng;
var initLat = 53.490009;
var initLng = -2.261631;
var squares = [];
var squaresRow = [];
var pos;

function initialize() {
    var mapOptions = {
        zoom: 17
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    navigator.geolocation.getCurrentPosition(function(position) {
        pos = new google.maps.LatLng(position.coords.latitude,
            position.coords.longitude);
        var infowindow = new google.maps.InfoWindow({
            map: map,
            position: pos,
            content: 'Yo dawg, you are here.'
        });

        map.setCenter(pos);
    }, function() {
        handleNoGeolocation(true);
    });

    for (var y = 0; y < 20; y++) {
        for (var x = 0; x < 20; x++) {
            squaresRow.push(new google.maps.Rectangle({
                strokeColor: '#FF4400',
                strokeOpacity: 0.4,
                strokeWeight: 1,
                fillColor: '#FF4400',
                fillOpacity: 0.05,
                map: map,
                bounds: new google.maps.LatLngBounds(
                    new google.maps.LatLng(initLat - y/1000, initLng + x / 500),
                    new google.maps.LatLng(initLat - y/1000 - 0.001, initLng + 0.002 + x / 500))
            }));
        }
        squares.push(squaresRow);
        squaresRow = [];
    }
    navigator.geolocation.getCurrentPosition(function(position) {
        squares
            [Math.floor(Math.abs(position.coords.latitude-initLat)*1000)]
            [Math.floor(Math.abs(position.coords.longitude-initLng)*500)]
            .fillOpacity=0.5;
        console.log(Math.floor(Math.abs(position.coords.latitude-initLat)*1000));
        console.log(Math.floor(Math.abs(position.coords.longitude-initLng)*500));
    });
}

function getLat(lat) {
    return Math.floor(Math.abs(lat-initLat)*1000);
}
function getLng(lng) {
    return Math.floor(Math.abs(lng-initLng)*2000);
}

function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
    } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
        map: map,
        position: new google.maps.LatLng(60, 105),
        content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);
