var $ = require('jquery');
var mapScript = require('./mapScript');
var indexScript = require('./indexScript');
var io = require('socket.io-client');
var WordCloud = require('./wordCloud');

var React = require('react');
var ReactDOM = require('react-dom');

// jQuery = require('jquery');

// var Container = require('bootstrap').Container;
// var Row = require('bootstrap').Row;
// var Col = require('bootstrap').Col;


$(function(){
	var socket = io.connect();
	mapScript.initialize(socket);
	indexScript.initialize(socket);

	 var words = [
      {text : "One", size : 20},
      {text : "Two", size : 30},
      {text : "Three", size : 40},
      {text : "Four", size : 50},
      {text : "Five", size : 60},
      {text : "Six", size : 70},
      {text : "Seven", size : 20},
      {text : "Eight", size : 30},
      {text : "Nine", size : 40},
      {text : "Ten", size : 50},
      {text : "Eleven", size : 60},
      {text : "Zero", size : 70}
    ]

	ReactDOM.render(
	  		<WordCloud initialWords={words}/>,
  			document.getElementById('example')
		); 

	socket.on('cloud', function(data) {
		console.log("cloud");
     	ReactDOM.render(
	  		<WordCloud initialWords={data}/>,
  			document.getElementById('example')
		); 
    });



})
