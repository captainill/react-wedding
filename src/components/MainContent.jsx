/**
 *
 *
 */

import React, { PropTypes } from 'react';
import DocumentTitle from "react-document-title";
import Photo from './Photo.jsx';
import Home from './Home.jsx';
import { provideContext, connectToStores }  from 'fluxible/addons';
import Debug from 'debug';

const debug = Debug('-------  MainContent.jsx: ');

class MainContent extends React.Component{

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  constructor(props, context){
    super(props);

    this.firstRender = true;
  }

  hasQeuryParams(){
    return Boolean(this.context.router.getCurrentQuery().modal);
  }

  //&#9829
  render() {
    let contentComponent = null;
    let modalComponent = null;
    let showModal = this.hasQeuryParams();

    if(showModal && this.firstRender){
      contentComponent = <Photo/>;
    }else{
      this.firstRender = false;
      contentComponent = <Home/>;

      if(showModal){
        modalComponent = <Photo/>;
      }
    }

    return (
      <DocumentTitle title="Erica Taylor">
      	<div>
            {contentComponent}
            ------
            {modalComponent}
        </div>
      </DocumentTitle>
    );
  }

}

module.exports = MainContent;
