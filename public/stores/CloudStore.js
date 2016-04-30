
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _data = [
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
      ]

function update(words) {
  _data = words;
}

var CloudStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAll: function() {
    return _data;
  },

});


CloudStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.RECEIVE_WORDS:
      update(action.words)
      CloudStore.emitChange();
    break;

    default:
      // do nothing
  }

});

module.exports = CloudStore;