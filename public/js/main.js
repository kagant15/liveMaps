
$ = require('jquery');
var mapScript = require('./mapScript');
var indexScript = require('./indexScript');
var io = require('socket.io-client');
var WordCloud = require('./wordCloud');

var React = require('react');
var ReactDOM = require('react-dom');


$(function(){
	var socket = io.connect();
	mapScript.initialize(socket);
	indexScript.initialize(socket);

	ReactDOM.render(
  		<WordCloud />,
  		document.getElementById('example')
	); 
})
