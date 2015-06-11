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

  constructor(props, context){
    super(props);
  }

  render() {
    var loaderClass = classNames({
        'page-loader': true,
        'is-loading': this.props.isLoading
    })

    debug(this.context.router.getCurrentParams());

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

Application.contextTypes = {
    router: React.PropTypes.func.isRequired
};

Application = provideContext(connectToStores(Application, [ApplicationStore], function(stores){
  return stores.ApplicationStore.getState();
}));

module.exports = Application;
