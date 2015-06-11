/**
 *
 *
 */

import BaseStore from 'fluxible/addons/BaseStore';
import makeId from '../utils/makeId';

let _groups = {};

class GroupStore extends BaseStore{

  static handlers = {
    'RECEIVE_PHOTOS_SUCCESS': 'handlePhotosSuccess'
  }

  constructor (dispatcher) {
    super(dispatcher);
    this.dispatcher = dispatcher; // Provides access to waitFor and getStore methods
  }

  initialize () {

  }

  handlePhotosSuccess(payload) {
    let photos = payload.photos;
    photos.forEach(function(photo) {
      let groupID = photo.group_id;
      let group = _groups[groupID];

      if (group) {
        return;
      }

      _groups[groupID] = {
        id: groupID,
        type: photo.type
      };
    }, this);

    this.emitChange();
  }

  get(id){
    return _groups[id];
  }

  getAll(){
    return _groups;
  }

  getState() {
    return {
      groups: _groups
    };
  }

  dehydrate() {
    return this.getState();
  }

  rehydrate(state) {
    _groups = state.groups;
  }
}

GroupStore.storeName = 'GroupStore';

export default GroupStore;