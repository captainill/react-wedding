/**
 *
 * //photo/1?modal=true
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { provideContext, connectToStores }  from 'fluxible/addons';
import ArrowSvg from './svg/ArrowSvg';
import PhotoStore from '../stores/PhotoStore';
import Config from '../constants/Config';
import Debug from 'debug';

const debug = Debug('-------  Photo.jsx: ');

class PhotoNavLink extends React.Component {

  static contextTypes = {
    router: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
  }

  constructor(props, context){
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.context = context;

    this.state = {
      targetId: this.context.getStore(PhotoStore)[this.props.direction](props.id)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      targetId: this.context.getStore(PhotoStore)[this.props.direction](nextProps.id)
    }
  }
  
  handleClick(e){
    e.preventDefault();
    e.stopPropagation();

    this.context.router.transitionTo('photo', {id: parseInt(this.state.targetId) }, {modal: true});
  }

  render() {
    return (
      <a href="#" id={this.props.direction + '-photo'} onClick={this.handleClick}>
        <ArrowSvg/>
      </a>
    );
  }
};

module.exports = PhotoNavLink;
