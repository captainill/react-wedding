/**
 *
 * //photo/1?modal=true
 */

import React, { PropTypes } from "react/addons";
import { Link } from 'react-router';
import Photo from './Photo.jsx';
import PhotoNavLink from './PhotoNavLink.jsx';
import CloseSvg from './svg/CloseSvg.jsx';
import PhotoStore from '../stores/PhotoStore';
import PageActionCreators from '../actions/PageActionCreators';
import classNames from 'classnames';
import Debug from 'debug';

const { addons } = React;
const { CSSTransitionGroup } = addons;

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
      photo: this.context.getStore(PhotoStore).get(props.photoId),
      didMount: false,
      direction: null
    }
  }

  componentDidMount(){
    this.context.executeAction(PageActionCreators.pageLoaded);

    this.setState({
      didMount: true
    })
  }

  closeModal(e){
    e.preventDefault();
    e.stopPropagation();

    this.context.router.transitionTo('home');
  }

  componentWillReceiveProps(nextProps) {
    const store = this.context.getStore(PhotoStore);
    debug('will receive', store.getDirection())
    this.setState({
      photo: store.get(nextProps.photoId),
      direction: store.getDirection()
    })
  }

  /*previousPhoto(){
    this.context.router.transitionTo('photo', {id: parseInt(this.props.photoId) - 1}, {modal: true});
  }

  nextPhoto(){
    this.context.router.transitionTo('photo', {id: parseInt(this.props.photoId) + 1}, {modal: true});
  }*/

  render() {

    let cls = classNames({
      'animated': this.state.didMount,
      'modal-visible': this.state.didMount
    })

    debug(this.state.direction)

    return (
      <div id='photo-modal' className={cls} onClick={this.closeModal}>
        <div id='photo-modal-backdrop'></div>
        <div id='photo-wrap'>
          <CSSTransitionGroup component="div" transitionName="example">
            <Photo photo={this.state.photo} direction={this.state.direction} key={this.state.photo.id}/>
          </CSSTransitionGroup>
          <div id='photo-content'>
            <figure id='photo-figure'>
            </figure>
            <PhotoNavLink direction='previous' id={this.props.photoId}/>
            <PhotoNavLink direction='next' id={this.props.photoId}/>
          </div>
        </div>
        <Link to="home" id="close-photo">
          <CloseSvg/>
        </Link>
      </div>
    );

  }
};

module.exports = PhotoModal;
