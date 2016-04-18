var React = require('react');
var ReactDOM = require('react-dom');
var d3WordCloud = require('./d3WordCloud');

var CommentBox = React.createClass({

	componentWillMount : function(){

	},

	componentDidMount : function(){
		var node = ReactDOM.findDOMNode(this);
		console.debug("node", node);
		d3WordCloud.render(node);
	},

  	render: function() {
    	return (
      		<div className="commentBox">
        		
      		</div>
    	);
  	}

});

module.exports = CommentBox;