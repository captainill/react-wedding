/**
 *
 *
 */

import BaseStore from 'fluxible/addons/BaseStore';
import PhotoStore from './PhotoStore';
import Debug from 'debug';
import { map } from 'lodash';

const debug = Debug('-------  GroupStore.jsx: ');

let counter = 0;
let keyMap = {};
let _groups = {};

class GroupStore extends BaseStore{

  static handlers = {
    'RECEIVE_PHOTOS_SUCCESS': 'handlePhotosSuccess'
  }

  constructor (dispatcher) {
    super(dispatcher);
    this.dispatcher = dispatcher; // Provides access to waitFor and getStore methods
  }

  //hack
  init(payload){
    this.handlePhotosSuccess({ photos: payload});
  }

  handlePhotosSuccess(payload) {
    let photos = payload.photos;
    photos = map(photos, function(photo) {
      let groupID = photo.group_id;
      let group = _groups[keyMap[groupID]];

      if (group) {
        return;
      }

      //the keymap just lets me have an arbitraty group_id to group photos in this flat system while ordering the groups
      //purely on where they appear in PhotoData
      let key = counter++;
      keyMap[groupID] = key;

      _groups[key] = {
        id: groupID,
        type: photo.group_type
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
