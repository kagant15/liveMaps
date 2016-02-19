// var App = {};
var App = require('./indexScript');

App.Map = {};

App.Map.socket = io.connect(window.location.hostname); // -- Web sockets
App.Map.markers = []; // containes the markers which are droped onto the map
App.Map.map = null; // -- GOOGLE MAP
App.Map.myLatlng = new google.maps.LatLng(39.8282, -98.5795);  // center location of map
App.Map.boundingBL = new google.maps.LatLng(38.794968, -77.208481);  // BL bounding boxs
App.Map.boundingTR = new google.maps.LatLng(39.024718, -76.859665);  // TR bounding boxs
App.Map.centerMarker = null;
App.Map.lowerLeftMarker = null;
App.Map.upperRightMarker = null;
App.Map.rectangle = null;

App.Map.initialize = function() {
  var me = App.Map;
  
  // -- position to center the map on
  var mapOptions = {
    zoom: 4,
    center: me.myLatlng
  }

  // -- listen for and log tweets
  me.socket.on('tweet', function(data) {
  
  });

  // -- place markers on map
  me.socket.on('geolocationTweet', function(data) {
    console.debug("received geolocationTweet")
    me.addMarker(new google.maps.LatLng(data.location[0], data.location[1]), data.text);
  });

  // -- place marker at the center of the U.S.
  me.centerMarker = new google.maps.Marker({
    map: me.map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: me.myLatlng
  });

  // -- Bottom Left and Upper Right markers to show bounds
  me.lowerLeftMarker = new google.maps.Marker({
    map: me.map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: me.boundingBL
  });

  me.upperRightMarker = new google.maps.Marker({
    map: me.map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: me.boundingTR
  });

  // -- GOOGLE MAP
  me.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  // -- Add markers to map
  me.centerMarker.setMap(me.map);
  me.lowerLeftMarker.setMap(me.map);
  me.upperRightMarker.setMap(me.map);

  // -- create bounds for rectangle
  var bounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(42.24, -89.14),
      new google.maps.LatLng(42.31, -88.97)
  );

  // -- rectangle
  me.rectangle = new google.maps.Rectangle({
    bounds: bounds,
    editable: true,
    draggable: true
  });

  // google.maps.event.addListener(rectangle, 'bounds_changed', showNewRect);

  me.rectangle.setMap(me.map);
} // -- End of Initialize method

function showNewRect(event) {
  var ne = me.rectangle.getBounds().getNorthEast();
  var sw = me.rectangle.getBounds().getSouthWest();
}

App.Map.getBounds = function(){
  var me = App.Map
  var northEast = me.rectangle.getBounds().getNorthEast();
  var southWest = me.rectangle.getBounds().getSouthWest();
  console.log("TEST", me.rectangle.getBounds().getNorthEast())

  console.log("bounds", me.rectangle.getBounds())

  console.log("northEast.lat", northEast.lat());
  console.log("southWest.lng", southWest.lng())

  var thing = [southWest.lng(), southWest.lat(), northEast.lng(), northEast.lat()]

  console.log(thing)

  return thing
}

App.Map.addMarker = function(cordinates, text) {
  var me = App.Map;

  // create maker pop-up info window
  var infowindow = new google.maps.InfoWindow({
      content: text
    });

  // create marker
  var marker = new google.maps.Marker({
    position: cordinates,
    map: me.map,
    title : "test",
    draggable: false,
    animation: google.maps.Animation.DROP
  })

  // add listener to marker to display infoWindow
  google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(me.map,marker);
  });

  // add marker to map
  me.markers.push(marker);
  if(me.markers.length >= 50){
      google.maps.Map.prototype.clearMarkers();
  }

} // -- end of addMarker method


// -- load the map
google.maps.event.addDomListener(window, 'load', App.Map.initialize);

module.exports = App