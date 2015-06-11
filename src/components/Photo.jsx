/**
 *
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import ApplicationStore from '../stores/ApplicationStore';
import { provideContext, connectToStores }  from 'fluxible/addons';
import { RouteHandler } from 'react-router';
import Debug from 'debug';

const debug = Debug('-------  Debug');

class Photo extends React.Component {

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

/*Photo = provideContext(connectToStores(Application, [ApplicationStore], function(stores){
  return stores.ApplicationStore.getState();
}));*/

module.exports = Photo;
