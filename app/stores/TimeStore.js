/**
 * 
 * 
 */

import BaseStore from 'fluxible/addons/BaseStore';


class TimeStore extends BaseStore {

  static handlers = {
    'CHANGE_ROUTE': 'handleTimeChange',
    'UPDATE_TIME': 'handleTimeChange'
  }

  constructor (dispatcher) {
    super(dispatcher);
    this.dispatcher = dispatcher; // Provides access to waitFor and getStore methods
    this.time = new Date();
  }

  handleTimeChange(payload) {
    this.time = new Date();
    this.emit('change');
  }

  getState() {
    return {
      time: this.time.toString()
    };
  }

  dehydrate() {
    return this.getState();
  }

  rehydrate(state) {
    this.time = new Date(state.time);
  }

}

TimeStore.storeName = 'TimeStore';

export default TimeStore;
