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

class Home extends React.Component {

  static propTypes = {
    // Injected by React Router:
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }

  constructor(props, router){
    super(props);
    console.log('Home meow ', this.props.params, router);
  }

  render() {

    return (
      <div className='photo'>
        <p>Home</p>
      </div>
    );

  }
};

/*Photo = provideContext(connectToStores(Application, [ApplicationStore], function(stores){
  return stores.ApplicationStore.getState();
}));*/

module.exports = Home;
