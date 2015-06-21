/**
 *
 *
 */

import BaseStore from 'fluxible/addons/BaseStore';
import makeId from '../utils/makeId';
import Debug from 'debug';

const debug = Debug('-------  PhotoStore.jsx: ');

function _addRawPhotos(rawPhotos) {
  let photos = {};
  rawPhotos.forEach(function(photo) {
    photo.id = makeId();
    photos[photo.id] = photo;
    _photosLength++;
  });

  return photos;
}

let _photosLength = 0;
let _photos = _addRawPhotos(require('../data/PhotoData'));

class PhotoStore extends BaseStore{

  static handlers = {
    'RECEIVE_PHOTOS_SUCCESS': 'handlePhotosSuccess'
  }

  constructor (dispatcher) {
    super(dispatcher);
    this.dispatcher = dispatcher; // Provides access to waitFor and getStore methods
  }

  handlePhotosSuccess(payload) {
    _photos = payload.photos; //set _photos
    //this.emitChange();
  }

  get(id){
    return _photos[id];
  }

  previous(id){
    let photoId = Number(id);

    if(photoId == 1){
      return _photosLength;
    }else{
      return photoId - 1;
    }
  }

  next(id){
    let photoId = Number(id);

    if(photoId > _photosLength-1){
      return 1;
    }else{
      return  photoId + 1;
    }
  }

  getAll(){
    return _photos;
  }

  getLength(){
    return _photosLength;
  }

  getPhotosForGroup(groupID){
    let groupPhotos = [];
    for (let id in _photos) {
      if (_photos[id].group_id === groupID) {
        groupPhotos.push(_photos[id]);
      }
    }
    /*groupPhotos.sort(function(a, b) {
      if (a.group_id < b.group_id) {
        return -1;
      } else if (a.group_id > b.group_id) {
        return 1;
      }
      return 0;
    });*/
    return groupPhotos;
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
