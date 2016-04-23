var mapScript = require('./mapScript');
var $ = require('jquery')
var d3 = require('d3');
    d3.layout.cloud = require('d3-cloud');

var App = {

  initialize : function(socket){
    var me = this;
    
    var $stopButton = $('#stopButton');
    var $startButton = $('#startButton');
    var $inputBox = $('#hashtagInput');

    // close the connection every time the page loads
    socket.emit('close');

    // -- start button
    $startButton.click(function(event){
      socket.emit('start');
    });

    // -- stop button
    $stopButton.click(function(event){
      socket.emit('close');
    });

    // -- input box
    $inputBox.keyup(function(event) {
      if (event.keyCode == 13) { //on Enter
        socket.emit('submit', $inputBox.val(), mapScript.getBounds()); //send the submit message and pass it the contents of the input box
        $inputBox.val("");
      }
    });

  } // -- end of initialize

};

module.exports = App;  

