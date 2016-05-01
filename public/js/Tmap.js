var React = require('react');
var ReactDOM = require('react-dom');
var mapScript = require('./mapScript');


var Tmap = React.createClass({

	propTypes: {
		rectangle : React.PropTypes.object,
		markers : React.PropTypes.array,
		newMarker : React.PropTypes.object
	},

	getInitialState : function(){
		return {
			rectangle : this.props.initialRectangle,
			markers : this.props.initialMarkers,
			newMarker : this.props.initialNewMarker
		};
	},

	componentWillMount : function(){

	},

	componentWillReceiveProps : function(nextProps){
		this.setState({
			rectangle : nextProps.initialRectangle,
			markers : nextProps.initialMarkers,
			newMarker : nextProps.initialNewMarker,
		});

	},

	componentDidMount : function(){
		var node = ReactDOM.findDOMNode(this);
		mapScript.render(node, this.state.rectangle, this.state.markers);
	},

	componentWillUpdate : function(){

	},

	componentDidUpdate : function(){
		mapScript.addMarker(this.state.newMarker)
	},

  	render: function() {
    	return (
      		<div className="tmap">
        		
      		</div>
    	);
  	}

});

module.exports = Tmap;