/**
 *
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import ApplicationStore from '../stores/ApplicationStore';
import GroupStore from '../stores/GroupStore';
import { provideContext, connectToStores }  from 'fluxible/addons';
import { RouteHandler } from 'react-router';
import Debug from 'debug';

const debug = Debug('-------  Debug');

class Home extends React.Component {

  constructor(props, router){
    super(props);
  }

  render() {

    return (
      <div className='home'>
        <p>Home</p>
      </div>
    );

  }
};

Home = provideContext(connectToStores(Home, [GroupStore], function(stores){
  return stores.GroupStore.getState();
}));

module.exports = Home;
