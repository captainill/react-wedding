/**
 *
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import ApplicationStore from '../stores/ApplicationStore';
import { provideContext, connectToStores }  from 'fluxible/addons';
import { RouteHandler } from 'react-router';
import Debug from 'debug';

const debug = Debug('-------  Debug');

class Application extends React.Component {

  static propTypes = {
    // Injected by React Router:
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }

  constructor(props, router){
    super(props);
    console.log('Appl ', this.props.params, router);
  }

  render() {
    var loaderClass = classNames({
        'page-loader': true,
        'is-loading': this.props.isLoading
    })

    return (
      <div className={'wrapper ' + this.props.currentRouteName}>
        <Nav />
        <RouteHandler {...this.props} />
        <Footer />
        <div className={loaderClass}></div>
      </div>
    );

  }
};

Application = provideContext(connectToStores(Application, [ApplicationStore], function(stores){
  return stores.ApplicationStore.getState();
}));

module.exports = Application;
