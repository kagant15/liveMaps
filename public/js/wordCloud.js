var React = require('react');
var ReactDOM = require('react-dom');
var d3WordCloud = require('./d3WordCloud');

var CommentBox = React.createClass({

	propTypes: {
		words : React.PropTypes.array
	},

	getInitialState : function(){
		return {
			words : this.props.initialWords
		};
	},

	componentWillMount : function(){

	},

	componentWillReceiveProps : function(nextProps){
		this.setState({
			words : nextProps
		});
	},

	componentDidMount : function(){
		var node = ReactDOM.findDOMNode(this);
		d3WordCloud.render(node, this.state.words);
	},

	componentWillUpdate : function(){

	},

	componentDidUpdate : function(){
		console.debug("this.state.words", this.state.words);
		d3WordCloud.update(this.state.words);
	},

  	render: function() {
    	return (
      		<div className="wordCloud">
        		
      		</div>
    	);
  	}

});

module.exports = CommentBox;