/**
 *
 * //photo/1?modal=true
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { provideContext, connectToStores }  from 'fluxible/addons';
import PhotoLazyContainer from './PhotoLazyContainer.jsx';
import classNames from 'classnames';
import HeartSvg from './svg/HeartSvg';
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
      case 'spaceless-one':
        return this.wrapSpacelessOne(photos);
      break;      
      case 'six-four':
        return this.wrapSixFour(photos);
      break;
      case 'grid-one':
        return this.wrapGridOne(photos);
      break;
      case 'grid-two':
        return this.wrapGridTwo(photos);
      break;
    }
  }

  //full row with padding
  wrapFeature(photo){
    const style = {
      backgroundImage: 'url(' + Config.imagePath + photo[0].data.url + ')',
    };

    return (
      <div className="row feature-padding">
        <div className="photo-item">
          <Link className="image image-loaded" to="photo" params={{id: photo[0].data.id}} query={{modal: true}} style={style} data-src={photo[0].data.url} />
        </div>
        <div id="feature-text">
          <h1><span>Presenting</span><hr/></h1>
          <p><HeartSvg/>Mr. & Mrs. Crawford. Married June 7th in Victoria, BC.</p>
        </div>
      </div>
    )
  }

  //50% side by side
  wrapFifty(photos){
    const fiftyPhotos = photos.map(function(photo, i){
      let cls = {
        'col': true ,
        '-left': (i % 2 == 0),
        '-right': !(i % 2 == 0),
      }

      if(photo.data.ratio){
        cls['-pad-bottom-' + photo.data.ratio] = true;
      }

      cls = classNames(cls);

      return <div className={cls} key={i} >{photo.Component}</div>
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
        <div className="col -w-1">
          <div className="col -w-3-2 -pad-bottom-100" key="1">
            {photos[0].Component}
          </div>
          <div className="col -w-3-1" key="2">
            <div className="col -w-1 -pad-bottom-100">
              {photos[1].Component}
            </div>
            <div className="col -w-1 -pad-bottom-100">
              {photos[2].Component}
            </div>
          </div>
        </div>
      </div>
    )
  }

  wrapGridOne(){
    return null;
  }

  wrapGridTwo(photos){
    return (
      <div className="row">
        <div className="col -w-4-1 -left" key="1">
          {photos[0].Component}
        </div>
        <div className="col -w-4-2" key="2">
          {photos[1].Component}
        </div>
        <div className="col -w-4-1 -right" key="3">
          <div className="col -w-4-4">
            {photos[1].Component}
          </div>
          <div className="col -w-4-4">
            {photos[1].Component}
          </div>
        </div>
      </div>
    )
  }

  wrapSpacelessOne(photos){
    return (
      <div className="row">
        <div className="col -w-4-2" key="1">
          {photos[0].Component}
        </div>
        <div className="col -w-4-1 -left" key="2">
          {photos[1].Component}
        </div>
        <div className="col -w-4-1 -right" key="3">
          <div className="col -w-4-4">
            {photos[2].Component}
          </div>
          <div className="col -w-4-4">
            {photos[3].Component}
          </div>
          <div className="col -w-4-4">
            {photos[4].Component}
          </div>
          <div className="col -w-4-4">
            {photos[5].Component}
          </div>
        </div>
      </div>
    )
  }  

  render() {
    const photos = this.state.photos.map(function(photo, i){
      return {
        Component: <PhotoLazyContainer photo={photo} key={i}/>,
        data: photo
      }

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
