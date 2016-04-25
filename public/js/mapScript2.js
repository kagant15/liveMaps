var GoogleMapsLoader = require('google-maps');

var Map = {

  rectangle : null,
  map : null,

  render : function(element, rectangle, markers, newMarker){

    console.debug("element", element);
    console.debug("rectangle", rectangle);
    console.debug("markers", markers);

    var me = this;

    // -- TODO: Figure out why I need this key b/c it works without it
    GoogleMapsLoader.KEY = 'AIzaSyCvagHmbbZPkdmyEq2D3ZJKxZlH0xYn1Dk';
  
    GoogleMapsLoader.load(function(google) {
      console.debug("google", google);
      var myLatlng = new google.maps.LatLng(39.8282, -98.5795);  // center location of map
      // var boundingBL = new google.maps.LatLng(38.794968, -77.208481);  // BL bounding boxs
      // var boundingTR = new google.maps.LatLng(39.024718, -76.859665);  // TR bounding boxs

      // -- position to center the map on
      var mapOptions = {
        zoom: 4,
        center: myLatlng
      }

      // -- render the map
      me.map = new google.maps.Map(element, mapOptions);

      markers.forEach(function(marker){
        new google.maps.Marker({
          map: me.map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(marker.Lat, marker.Lng)
        });
      });

      // -- new marker
      if(newMarker){
        new google.maps.Marker({
            map: me.map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(newMarker.Lat, newMarker.Lng)
          });
      }

      // -- place marker at the center of the U.S.
      new google.maps.Marker({
        map: me.map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: myLatlng
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

  // -- Gets the bounds of the selected bounding box
  getBounds : function(){
    var northEast = this.rectangle.getBounds().getNorthEast();
    var southWest = this.rectangle.getBounds().getSouthWest();

    return [southWest.lng(), southWest.lat(), northEast.lng(), northEast.lat()]
  }

};

module.exports = Map

