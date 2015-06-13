/**
 *
 * //photo/1?modal=true
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Photo from './Photo.jsx';
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

    this.context = context;
    this.state = {
      photo: this.context.getStore(PhotoStore).get(props.photoId)
    }
  }

  componentDidMount(){
    this.context.executeAction(PageActionCreators.pageLoaded);
  }

  closeModal(e){
    console.log(e, e.nativeEvent);
    this.context.router.transitionTo('home');
  }

  render() {

    return (
      <div id='photo-modal' onClick={this.closeModal}>
        <Photo photo={this.state.photo} key={'photo'}/>
        <Link to="photo" params={{id: parseInt(this.props.photoId) + 1}} query={{modal: true}}>Next</Link>
      </div>
    );

  }
};

module.exports = PhotoModal;
