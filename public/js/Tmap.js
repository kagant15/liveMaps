var React = require('react');
var ReactDOM = require('react-dom');
var mapScript2 = require('./mapScript2');


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
		mapScript2.render(node, this.state.rectangle, this.state.markers, this.state.newMarker);
	},

	componentWillUpdate : function(){

	},

	componentDidUpdate : function(){
		
	},

  	render: function() {
    	return (
      		<div className="tmap">
        		
      		</div>
    	);
  	}

});

module.exports = Tmap;