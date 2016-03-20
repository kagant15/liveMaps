
$ = require('jquery');
var mapScript = require('./mapScript');
var indexScript = require('./indexScript');
var io = require('socket.io-client');



$(function(){
	var socket = io.connect();
	mapScript.initialize(socket);
	indexScript.initialize(socket);
})
