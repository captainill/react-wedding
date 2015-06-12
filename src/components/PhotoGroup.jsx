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
      case 'six-four':
        return this.wrapSixFour(photos);
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
    var fiftyPhotos = photos.map(function(photo, i){
      return <div className="col" key={i} >{photo}</div>
    })

    return (
      <div className="row">
          {fiftyPhotos}
      </div>
    )
  }

  //60% / 40% grid
  wrapSixFour(photos){
    return (
      <div className="row">
        <div className="col col-5-3" key="1">
          <div className="col col-3-2" key="1">
            {photos[0]}
          </div>
          <div className="col col-3-1" key="2">
            <div className="col col-1" key="1">
              {photos[1]}
            </div>
            <div className="col col-1" key="2">
              {photos[2]}
            </div>
          </div>
        </div>
        <div className="col col-5-2" key="2">
          <div className="col col-1 pb-50" key="1">
            {photos[3]}
          </div>
          <div className="col col-1 pb-100" key="2">
            {photos[4]}
          </div>
        </div>
      </div>
    )
  }

  render() {
    var photos = this.state.photos.map(function(photo, i){
      var style = {
        backgroundImage: 'url(' + photo.url + ')',
      }
      return <a href={'/photo/' + photo.id + '?modal=true'} style={style} data-src={photo.url} key={i}></a>
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
