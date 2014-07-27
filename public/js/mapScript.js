var App = {};
App.Map = {};

App.Map.socket = io.connect(window.location.hostname);
App.Map.markers = []; // containes the markers which are droped onto the map
App.Map.map = null;
App.Map.myLatlng = new google.maps.LatLng(39.8282, -98.5795);  // center location of map
App.Map.mapOptions = null;
App.Map.marker = null;

App.Map.initialize = function() {
  var me = App.Map;
  me.socket.on('tweet', function(data) {
    console.log(data);
  });
  me.socket.on('geolocationTweet', function(data) {
    me.addMarker(new google.maps.LatLng(data.location[0], data.location[1]));
  });
  me.socket.emit('submit', '#love');

  //position to center the map on
  me.mapOptions = {
    zoom: 5,
    center: me.myLatlng
  }

  //marker that is placed on the map
  me.marker = new google.maps.Marker({
    map: me.map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: me.myLatlng
  });

  //map
  me.map = new google.maps.Map(document.getElementById("map-canvas"), me.mapOptions);

  // To add the marker to the map, call setMap();
  me.marker.setMap(me.map);
}

App.Map.addMarker = function(cordinates) {
  var me = App.Map;
  me.markers.push(new google.maps.Marker({
    position: cordinates,
    map: me.map,
    draggable: false,
    animation: google.maps.Animation.DROP
  }));
  if(me.markers.length >= 50){
      google.maps.Map.prototype.clearMarkers();
  }

}
// load the map
google.maps.event.addDomListener(window, 'load', App.Map.initialize);

// This is bad code that needs to be changed
google.maps.Map.prototype.clearMarkers = function() {
    for(var i=0; i<App.Map.markers.length; i++){
        App.Map.markers[i].setMap(null);
    }
    App.Map.markers = new Array();
};