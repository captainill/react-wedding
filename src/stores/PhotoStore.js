/**
 *
 *
 */

import BaseStore from 'fluxible/addons/BaseStore';
import makeId from '../utils/makeId';

let _photos = {};

function _addPhotos(rawPhotos) {
  rawPhotos.forEach(function(photo) {
      photo.id = makeId();
      _photos[photo.id] = photo;
  });
}

class PhotoStore extends BaseStore{

  /*static handlers = {
    'RECEIVE_PHOTOS_SUCCESS': 'handlePhotosSuccess'
  }*/

  constructor (dispatcher) {
    super(dispatcher);
    this.dispatcher = dispatcher; // Provides access to waitFor and getStore methods
  }

  initialize () {
    _photos = _addPhotos(require('../data/PhotoData'));
  }

  /*handlePhotosSuccess(payload) {
    _photos = payload.photos;
    this.emitChange();
  }*/

  get(id){
    return _photos[id];
  }

  getAll(){
    return _photos;
  }

  getAllForGroup(groupID){
    let groups = [];
    for (let id in _photos) {
      if (_photos[id].group_id === groupID) {
        groups.push(_photos[id]);
      }
    }
    groups.sort(function(a, b) {
      if (a.group_id < b.group_id) {
        return -1;
      } else if (a.group_id > b.group_id) {
        return 1;
      }
      return 0;
    });
    return groups;
  }

  getState() {
    return {
      photos: _photos
    };
  }

  dehydrate() {
    return this.getState();
  }

  rehydrate(state) {
    _photos = state.photos;
  }
}

PhotoStore.storeName = 'PhotoStore';

export default PhotoStore;
