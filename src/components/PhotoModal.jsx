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
    let direction;

    if((nextProps.photoId > this.props.photoId && !(this.props.photoId == 1 && nextProps.photoId == store.getLength())) || (this.props.photoId == store.getLength() && nextProps.photoId == 1)){
      direction = 'next';

      this.setState({
        photo: store.get(nextProps.photoId),
        direction: direction
      })
    }else{
      direction = 'previous';

      if(this.props.photoId != nextProps.photoId){
        this.setState({
          photo: store.get(nextProps.photoId),
          direction: direction
        })
      }
    }
  }

  render() {
    let cls = classNames({
      'animated': this.state.didMount,
      'modal-visible': this.state.didMount
    })

    return (
      <div id='photo-modal' className={cls} onClick={this.closeModal}>
        <div id='photo-modal-backdrop'></div>
        <div id='photo-wrap'>
          <div className={this.state.direction}>
            <CSSTransitionGroup component="div" transitionName="example">
              <Photo photo={this.state.photo} key={this.state.photo.id}/>
            </CSSTransitionGroup>
          </div>
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
