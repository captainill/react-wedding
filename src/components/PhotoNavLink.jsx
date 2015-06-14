/**
 *
 * //photo/1?modal=true
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { provideContext, connectToStores }  from 'fluxible/addons';
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

    this.context = context;

    this.state = {
      targetId: this.context.getStore(PhotoStore)[this.props.direction](props.id)
    }
  }

  render() {

    return (
      <Link id={this.props.direction + '-photo'} to="photo" params={{id: parseInt(this.state.targetId) }} query={{modal: true}}></Link>
    );

  }
};

module.exports = PhotoNavLink;
