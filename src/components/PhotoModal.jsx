/**
 *
 * //photo/1?modal=true
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Photo from './Photo.jsx';
import PhotoNavLink from './PhotoNavLink.jsx';
import PhotoStore from '../stores/PhotoStore';
import PageActionCreators from '../actions/PageActionCreators';
import Debug from 'debug';

const debug = Debug('-------  PhotoModal.jsx: ');

class PhotoModal extends React.Component {

  static contextTypes = {
    router: React.PropTypes.func.isRequired,
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
  }

  constructor(props, context){
    super(props);

    this.closeModal = this.closeModal.bind(this);
    /*this.previousPhoto = this.previousPhoto.bind(this);
    this.nextPhoto = this.nextPhoto.bind(this);*/

    this.context = context;
    this.state = {
      photo: this.context.getStore(PhotoStore).get(props.photoId)
    }
  }

  componentDidMount(){
    this.context.executeAction(PageActionCreators.pageLoaded);
  }

  closeModal(e){
    e.preventDefault();
    e.stopPropagation();

    this.context.router.transitionTo('home');
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      photo: this.context.getStore(PhotoStore).get(nextProps.photoId)
    }
  }

  /*previousPhoto(){
    this.context.router.transitionTo('photo', {id: parseInt(this.props.photoId) - 1}, {modal: true});
  }

  nextPhoto(){
    this.context.router.transitionTo('photo', {id: parseInt(this.props.photoId) + 1}, {modal: true});
  }*/

  render() {

    return (
      <div id='photo-modal' onClick={this.closeModal}>
        <div id='photo-modal-backdrop'></div>
        <Photo photo={this.state.photo} key={'photo'}/>
        <div id='photo-wrap'>
          <div id='photo-content'>
            <figure id='photo-figure'>
            </figure>
            <PhotoNavLink direction='previous' id={this.props.photoId}/>
            <PhotoNavLink direction='next' id={this.props.photoId}/>            
          </div>
        </div>
      </div>
    );

  }
};

module.exports = PhotoModal;
