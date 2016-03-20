var GoogleMapsLoader = require('google-maps');

var Map = {

  rectangle : null,
  map : null,

  initialize : function(socket){
    var me = this;

    // -- TODO: Figure out why I need this key b/c it works without it
    GoogleMapsLoader.KEY = 'AIzaSyCvagHmbbZPkdmyEq2D3ZJKxZlH0xYn1Dk';
  
    GoogleMapsLoader.load(function(google) {
  
      var myLatlng = new google.maps.LatLng(39.8282, -98.5795);  // center location of map
      var boundingBL = new google.maps.LatLng(38.794968, -77.208481);  // BL bounding boxs
      var boundingTR = new google.maps.LatLng(39.024718, -76.859665);  // TR bounding boxs

      // -- position to center the map on
      var mapOptions = {
        zoom: 4,
        center: myLatlng
      }

      // -- render the map
      me.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

      // -- place markers on map
      socket.on('geolocationTweet', function(data) {
        me.addMarker(new google.maps.LatLng(data.location[0], data.location[1]), data.text);
      });

      // -- place marker at the center of the U.S.
      new google.maps.Marker({
        map: me.map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: myLatlng
      });

      // -- Bottom Left and Upper Right markers to show bounds of dc
      new google.maps.Marker({
        map: me.map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: boundingBL
      });

      // -- Upper right of dc 
      new google.maps.Marker({
        map: me.map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: boundingTR
      });

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

      // -- add the rectangle to the map
      me.rectangle.setMap(me.map);

    });
  },

  // -- add marker to the map
  addMarker : function(cordinates, text) {
    var me = this;

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

  }, // -- end of addMarker method

  // -- Gets the bounds of the selected bounding box
  getBounds : function(){
    var northEast = this.rectangle.getBounds().getNorthEast();
    var southWest = this.rectangle.getBounds().getSouthWest();

    return [southWest.lng(), southWest.lat(), northEast.lng(), northEast.lat()]
  }

};

module.exports = Map

