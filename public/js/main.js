var $ = require('jquery');
var io = require('socket.io-client');
var WordCloud = require('./wordCloud');
var Tmap = require('./Tmap');

var React = require('react');
var ReactDOM = require('react-dom');


var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;
var Input1 = require('./input1.js');

var CloudStore = require('../stores/CloudStore');
var CloudActions = require('../actions/CloudActions');
var MapStore = require('../stores/MapStore');
var MapActions = require('../actions/MapActions');

/* Initial app state */
function getAppState(){
	return {
		initialRectangle : MapStore.getAll().rectangle,
		initialMarkers : [
						{Lat : 38.794968, Lng : -77.208481},
						{Lat : 39.024718, Lng : -76.859665}
					 ],
		socket : io.connect(),
		cloudWords : CloudStore.getAll(),
		markers : MapStore.getAll().marker,
	}
}

var Main = React.createClass({

	getInitialState: function() {
		return getAppState();
	},

	/* Setup socket listeners and corrisponding actions for each event */
	componentDidMount: function() {
		this.state.socket.on('cloud', function(data){
			CloudActions.receivedWord(data.cloudWords);
		});
		this.state.socket.on('geolocationTweet', function(marker){
			MapActions.updateProp("marker", marker)
		});
		CloudStore.addChangeListener(this._onChange);
		MapStore.addChangeListener(this._onChange);
	},

	render: function() {
		return (
			<Grid>
				<Row className="show-grid">
					<Col xs={12} md={12}>
						<Input1 socket={this.state.socket} />
					</Col>
				</Row>
				<Row className="show-grid">
					<Col md={8}><Tmap initialRectangle={this.state.initialRectangle} 
									  initialMarkers={this.state.initialMarkers} 
									  initialNewMarker={this.state.markers}/></Col>
					<Col md={4}><WordCloud words={this.state.cloudWords}/></Col>
				</Row>
			</Grid>
		);
	},

	/* Event to set that latest state of the application */
	_onChange : function(){
		this.setState(getAppState());
	},

});
module.exports = Main;
