/**
 *
 * //photo/1?modal=true
 */

import React, { PropTypes } from 'react';
import { RouteHandler, Link } from 'react-router';
import { provideContext, connectToStores }  from 'fluxible/addons';
import classNames from 'classnames';
import PhotoStore from '../stores/PhotoStore';
import Config from '../constants/Config';
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
    const fiftyPhotos = photos.map(function(photo, i){
      let cls = classNames({
        'col': true ,
        '-border-it-black': (photo.props['data-src'].indexOf('.gif') != -1)
      })
      return <div className={cls} key={i} >{photo}</div>
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
      <div className="">
        <div className="col -w-5-3" key="1">
          <div className="col -w-3-2" key="1">
            {photos[0]}
          </div>
          <div className="col -w-3-1" key="2">
            <div className="col -w-1" key="1">
              {photos[1]}
            </div>
            <div className="col -w-1" key="2">
              {photos[2]}
            </div>
          </div>
          <div className="col -w-3-1 -pb-200" key="3">
            {photos[5]}
          </div>
          <div className="col -w-3-2 -pb-50" key="4">
            {photos[5]}
          </div>
          <div className="col -w-3-1 -pb-100" key="5">
            {photos[5]}
          </div>
          <div className="col -w-3-2 -pb-50 -pull-1" key="6">
            {photos[5]}
          </div>
        </div>
        <div className="col -w-5-2" key="2">
            <div className="col -w-2-1 -pb-50" key="1">
              {photos[3]}
            </div>
            <div className="col -w-2-1 -pb-100 -box-it-white" key="2">
              {photos[4]}
            </div>
          <div className="col -w-2-2 -pb-100 -push-1" key="3">
            {photos[4]}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const photos = this.state.photos.map(function(photo, i){
      const style = {
        backgroundImage: 'url(' + Config.imagePath + photo.url + ')',
      }
      return <Link to="photo" params={{id: photo.id}} query={{modal: true}} style={style} data-src={photo.url} key={i} />
    })

    const wrapType = this.createTypeWrap(photos);

    return (
      <div className={'photo-group ' + this.props.group.type }>
        {wrapType}
      </div>
    );

  }
};

module.exports = PhotoGroup;
