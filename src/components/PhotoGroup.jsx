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

  render() {
    debug(this.state.photos);
    var photos = this.state.photos.map(function(photo){
      //return <img src={photo.url} />
      return <p>{photo.url}</p>
    })
    return (
      <div className='photo-group'>
        <p>PhotoGroup {this.props.group.id}</p>
        {photos}
      </div>
    );

  }
};

module.exports = PhotoGroup;
