/**
 *
 *
 */

import React, { PropTypes } from 'react/addons';
import DocumentTitle from "react-document-title";
import PhotoPage from './PhotoPage.jsx';
import PhotoModal from './PhotoModal.jsx';
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
  }

  hasQeury(){
    return Boolean(this.context.router.getCurrentQuery().modal);
  }

  hasParams(){
    return Boolean(this.context.router.getCurrentParams().id);
  }

  getIdParam(){
    return this.context.router.getCurrentParams().id;
  }

  //&#9829
  render() {
    let contentComponent = null;
    let modalComponent = null;
    let isModal = this.hasQeury();
    let isPhotoPage = this.hasParams();

    if(!isModal && isPhotoPage){
      contentComponent = <PhotoPage photoId={this.getIdParam()} key={'photo'}/>;
    }else{
      contentComponent = <Home key={'home'}/>;

      if(isModal){
        modalComponent = (
          <PhotoModal photoId={this.getIdParam()}/>
        )
      }
    }

    return (
      <DocumentTitle title="Erica Taylor">
      	<div>
          {contentComponent}
          {modalComponent}
        </div>
      </DocumentTitle>
    );
  }

}

module.exports = MainContent;
