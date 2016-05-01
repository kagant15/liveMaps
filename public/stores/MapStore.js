
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _data = {
  marker : null,
  rectangle : [{Lat : 42.24, Lng: -89.14},{Lat : 42.31, Lng : -88.97}],
}

function update(data) {
  _data = data;
}

function updateProp(key, value) {
  _data[key] = value;
}

var MapStore = assign({}, EventEmitter.prototype, {

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


MapStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.RECEIVED_MARKER:
      update(action.data)
      MapStore.emitChange();
    break;
    case ActionTypes.UPDATE_MAP_PROP:
      updateProp(action.key, action.value)
      MapStore.emitChange();
    break;
    default:
      // do nothing
  }

});

module.exports = MapStore;