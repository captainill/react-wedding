/**
 *
 *
 */

import React, { PropTypes } from 'react/addons';
import DocumentTitle from "react-document-title";
import PhotoPage from './PhotoPage.jsx';
import PhotoModal from './PhotoModal.jsx';
import Home from './Home.jsx';
import PageActionCreators from '../actions/PageActionCreators';
import Debug from 'debug';

const debug = Debug('-------  MainContent.jsx: ');

class MainContent extends React.Component{

  static contextTypes = {
    router: React.PropTypes.func.isRequired,
    executeAction: React.PropTypes.func.isRequired
  }

  static async willTransitionTo (transition, params, query, done) {
    //debug('---------About willTransitionTo ', transition);
    //transition.context.executeAction(PageActionCreators.pageLoaded);
    done();
  }

  constructor(props, context){
    super(props);

    this.context = context;
  }

  hasQeury(){
    return Boolean(this.context.router.getCurrentQuery().modal);
  }

  hasParams(){
    return Boolean(this.context.router.getCurrentParams().id);
  }

  getIdParam(){
    return Number(this.context.router.getCurrentParams().id);
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
