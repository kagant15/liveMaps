
// NOTES: somethings required $ and others reuqire jQuery, I don't know why a simple var jquery = require('jquery') didn't work
$ = require('jquery');
// global.jQuery = require('jquery');

// var GoogleMapsLoader = require('google-maps')


var d3 = require('d3')

var testModule = require('./testModule');
console.log("testModule", testModule.name())

// var indexScript = require('./indexScript');
var mapScript = require('./mapScript');

// var cloud = require('./d3.layout.cloud');
// var cloud = require('d3-cloud');

$(function(){
	mapScript.initialize();
	// var cloudScript = require('./cloudScript');
})




// var canvas = require('canvas-browserify')
// require('d3.layout.cloud')

// NOTES: Trying to initialize the app here instead of in its own file causes an error with flot plot; Also don't know why this happens

// App.initialize();

// NOTES:  Google maps with npm is not working

// GoogleMapsLoader.load(function(google) {
//     // new google.maps.Map(el, options);
// });
// GoogleMapsLoader.onLoad(function(google) {
//     console.log('I just loaded google maps api');
// });


