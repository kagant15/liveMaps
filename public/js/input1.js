var React = require('react');
var ReactDOM = require('react-dom');
var mapScript2 = require('./mapScript2');

var input1 = React.createClass({

  getInitialState: function() {
    return {value: '', socket : null};
  },

  handleChange: function(event) {
    this.setState({value: event.target.value});
  }
  ,
  _handleKeyPress: function(event){
    if (event.key === 'Enter') {
      //send the submit message and pass it the contents of the input box
       this.props.socket.emit('submit', this.state.value, mapScript2.getBounds()); 
       this.setState({value: ''});
    }
  },
  
  render: function() {
    return (
      <input
        type="text"
        value={this.state.value}
        onKeyPress = {this._handleKeyPress}
        onChange={this.handleChange} />
    );
  }

});

module.exports = input1;