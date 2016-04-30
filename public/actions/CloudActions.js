var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
// var ChatWebAPIUtils = require('../utils/ChatWebAPIUtils');
// var ChatMessageUtils = require('../utils/ChatMessageUtils');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  receivedWord: function(words) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_WORDS,
      words: words
    });
    // var message = ChatMessageUtils.getCreatedMessageData(text, currentThreadID);
    // ChatWebAPIUtils.createMessage(message);
  }

};