var React = require('react');
var ReactDOM = require('react-dom');
var d3WordCloud = require('./d3WordCloud');

var CloudStore = require('../stores/CloudStore');

var WordCloud = React.createClass({

	propTypes: {
		words : React.PropTypes.array
	},

	getInitialState : function(){
		return {
			words : this.props.words
		};
	},

	componentWillMount : function(){

	},

	componentWillReceiveProps : function(nextProps){
		this.setState({
			words : nextProps.words
		});
	},

	componentDidMount : function(){
		var node = ReactDOM.findDOMNode(this);
		d3WordCloud.render(node, this.state.words);
	},

	componentWillUpdate : function(){

	},

	componentDidUpdate : function(){
		d3WordCloud.update(this.state.words);
	},

  	render: function() {
    	return (
      		<div className="wordCloud">
        		
      		</div>
    	);
  	}

});

module.exports = WordCloud;