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

const debug = Debug('-------  Photo.jsx: ');

class Photo extends React.Component {

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  constructor(props, router){
    super(props);
  }

  render() {

    return (
      <div className='photo'>
        <p>Photo</p>
      </div>
    );

  }
};

Photo = connectToStores(Photo, [PhotoStore], function(stores){
  return stores.PhotoStore.getState();
});

module.exports = Photo;
