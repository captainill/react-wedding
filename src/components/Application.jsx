/**
 *
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import ApplicationStore from '../stores/ApplicationStore';
import { provideContext, connectToStores }  from 'fluxible/addons';
import BodyClass from '../utils/BodyClass';
import { RouteHandler } from 'react-router';
import Debug from 'debug';

const debug = Debug('-------  Application.jsx: ');

class Application extends React.Component {

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  constructor(props, context){
    super(props);
  }

  componentDidMount(){
    //fastclick
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
      }, false);
    }    
  }

  render() {
    const loaderClass = classNames({
        'page-loader': true,
        'is-loading': this.props.isLoading
    })

    let pageClass = {
        'wrapper': true
    }
    //pageClass[this.props.currentRouteName + ((this.props.currentRoute.query.modal) ? '-modal' : '') +'-page'] = true;
    //pageClass = classNames(pageClass);

    return (
      <BodyClass className={'wrapper'}>
        <div>
          <Header />
          <RouteHandler {...this.props} />
          <Footer />
          <div className={loaderClass}></div>
        </div>
      </BodyClass>
    );

  }
};

Application = provideContext(connectToStores(Application, [ApplicationStore], function(stores){
  return stores.ApplicationStore.getState();
}));

module.exports = Application;
