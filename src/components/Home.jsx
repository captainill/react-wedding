/**
 *
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import ApplicationStore from '../stores/ApplicationStore';
import GroupStore from '../stores/GroupStore';
import { provideContext, connectToStores }  from 'fluxible/addons';
import { RouteHandler, Link } from 'react-router';
import Debug from 'debug';

const debug = Debug('-------  Home.jsx: ');

class Home extends React.Component {

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  constructor(props, router){
    super(props);
  }

  render() {
    debug(this.props.groups);
    return (
      <div className='home'>
        <p>Home</p>
        <Link to="photo" params={{ id: 2 }} query={{ modal: true }}>photo link</Link>
      </div>
    );

  }
};

Home = connectToStores(Home, [GroupStore], function(stores){
  return stores.GroupStore.getState();
});

module.exports = Home;
