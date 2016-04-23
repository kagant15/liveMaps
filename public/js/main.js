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
    					 ]

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
					<Col md={8}><Tmap initialRectangle={initialRectangle} initialMarkers={initialMarkers}/></Col>
					
					<Col md={4}><WordCloud initialWords={words}/></Col>
				</Row>
  			</Grid>,
  			document.getElementById('cloud')
		); 



	indexScript.initialize(socket);
	// mapScript.initialize(socket);

	// WHERE I LEFT OFF. BUG: WHEN THIS RE-RENDERS ITS GOING TO DESTROY THE OTHER ELEMENTS
	//  AND WE DON'T WANT THAT TO HAPPEN.  THAYS WHY THE MAP DISAPPERAS AFTER FIRST CLOUD MESSAGE
	//  IS RECEIVED
	socket.on('cloud', function(data) {
		console.log("cloud");
		console.debug("data", data);
     	ReactDOM.render(
	  		<WordCloud initialWords={data}/>,
  			document.getElementById('cloud')
		); 
    });



})
