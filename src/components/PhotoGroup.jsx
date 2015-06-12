/**
 *
 * //photo/1?modal=true
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import PhotoStore from '../stores/PhotoStore';
import { provideContext, connectToStores }  from 'fluxible/addons';
import { RouteHandler } from 'react-router';
import Debug from 'debug';

const debug = Debug('-------  PhotoGroup.jsx: ');

class PhotoGroup extends React.Component {

  static contextTypes = {
    router: React.PropTypes.func.isRequired,
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
  }

  constructor(props, context){
    super(props);

    this.context = context;
    this.state = {
      photos: this.context.getStore(PhotoStore).getPhotosForGroup(props.group.id)
    }
  }

  createTypeWrap(photos){
    switch(this.props.group.type){
      case 'feature':
        return this.wrapFeature(photos);
      break;
      case 'fifty':
        return this.wrapFifty(photos);
      break;
    }
  }

  //full row with padding
  wrapFeature(photos){
    return (
      <div className="row feature-padding">
        {photos}
      </div>
    )
  }

  //50% side by side
  wrapFifty(photos){
    var fiftyPhotos = photos.map(function(photo){
      return <div className="col">{photo}</div>
    })

    return (
      <div className="row">
          {fiftyPhotos}
      </div>
    )
  }

  render() {
    var photos = this.state.photos.map(function(photo){
      var style = {
        backgroundImage: 'url(' + photo.url + ')',
      }
      return <a href={'/photo/' + photo.id + '?modal=true'} style={style} data-src={photo.url} ></a>
    })

    var wrapType = this.createTypeWrap(photos);

    return (
      <div className={'photo-group ' + this.props.group.type }>
        {wrapType}
      </div>
    );

  }
};

module.exports = PhotoGroup;
