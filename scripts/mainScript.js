var rectangle = new google.maps.Rectangle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: map,
    bounds: new google.maps.LatLngBounds(
        new google.maps.LatLng(33.671068, -116.25128),
        new google.maps.LatLng(33.685282, -116.233942))
});