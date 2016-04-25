var $ = require('jquery');
// var mapScript = require('./mapScript');
var indexScript = require('./indexScript');
var io = require('socket.io-client');
var WordCloud = require('./wordCloud');
var Tmap = require('./Tmap');

var React = require('react');
var ReactDOM = require('react-dom');

// jQuery = require('jquery');

var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;
var Input1 = require('./input1.js');


$(function(){
	var socket = io.connect();

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
    ];

    var initialRectangle = [42.24, -89.14, 42.31, -88.97];
    var initialMarkers = [
    						{Lat : 38.794968, Lng : -77.208481},
    						{Lat : 39.024718, Lng : -76.859665}
    					 ];

	ReactDOM.render(
		<Grid>
			<Row className="show-grid">
				<Col xs={12} md={12}>
					<Input1 socket={socket} />
				</Col>
			</Row>
			<Row className="show-grid">
				<Col md={8}><Tmap initialRectangle={initialRectangle} initialMarkers={initialMarkers} initialNewMarker={null}/></Col>
				<Col md={4}><WordCloud initialWords={words}/></Col>
			</Row>
		</Grid>,
		document.getElementById('cloud')
	); 

	// indexScript.initialize(socket);
	// mapScript.initialize(socket);

	socket.on('cloud', function(data) {
		ReactDOM.render(
			<Grid>
				<Row className="show-grid">
					<Col xs={12}md={12}>
						<input type="text" id="hashtagInput" placeholder="Enter a hashtag here"/>
      					<Button id="stopButton">stop!</Button>
      					<Button id="startButton">start</Button>
					</Col>
				</Row>
				<Row className="show-grid">
					<Col md={8}><Tmap initialRectangle={initialRectangle} initialMarkers={initialMarkers} initialNewMarker={null}/></Col>
					
					<Col md={4}><WordCloud initialWords={data}/></Col>
				</Row>
  			</Grid>,
  		document.getElementById('cloud')
		);
    });



})
