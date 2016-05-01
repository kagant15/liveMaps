var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
// var ChatWebAPIUtils = require('../utils/ChatWebAPIUtils');
// var ChatMessageUtils = require('../utils/ChatMessageUtils');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  receivedMarker: function(marker) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVED_MARKER,
      data: marker
    });
  }

};