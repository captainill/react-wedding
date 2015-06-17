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
    e.stopPropagation();
  }

  render() {
    return (
      <Link className="modal-nav" id={ 'modal-' + this.props.direction} to={'photo'} params={{id: this.state.targetId }} query={{modal: true}} onClick={this.handleClick}>
        <ArrowSvg transformSvg={(this.props.direction==='previous') ? '"rotate(180 50 50)"' : '""'}/>
      </Link>
    );
  }
};

module.exports = PhotoNavLink;
