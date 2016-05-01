var GoogleMapsLoader = require('google-maps');

var Map = {

  rectangle : null,
  map : null,

  render : function(element, rectangle, markers){
    var me = this;

    // -- TODO: Figure out why I need this key b/c it works without it
    GoogleMapsLoader.KEY = 'AIzaSyCvagHmbbZPkdmyEq2D3ZJKxZlH0xYn1Dk';
  
    GoogleMapsLoader.load(function(google) {
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

      if(markers){
        markers.forEach(function(marker){
          new google.maps.Marker({
            map: me.map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(marker.Lat, marker.Lng)
          });
        });
      }

      // // -- new marker
      // if(newMarker){
      //   new google.maps.Marker({
      //       map: me.map,
      //       draggable: true,
      //       animation: google.maps.Animation.DROP,
      //       position: new google.maps.LatLng(newMarker.Lat, newMarker.Lng)
      //     });
      // }

      // -- place marker at the center of the U.S.
      new google.maps.Marker({
        map: me.map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: myLatlng
      });

      // -- create bounds for rectangle
      var bounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(rectangle[0].Lat, rectangle[0].Lng),
          new google.maps.LatLng(rectangle[1].Lat, rectangle[1].Lng)
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
  addMarker : function(newMarker) {
    var me = this;

    // create maker pop-up info window
    var infowindow = new google.maps.InfoWindow({
      content: newMarker.text
    });

    // create marker
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(newMarker.cordinates.Lat, newMarker.cordinates.Lng),
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

