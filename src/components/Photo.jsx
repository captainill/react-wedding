/**
 *
 * //photo/1?modal=true
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Config from '../constants/Config';
import Debug from 'debug';

const debug = Debug('-------  Photo.jsx: ');

class Photo extends React.Component {

  constructor(props, router){
    super(props);
  }

  render() {
    const cls = classNames({
      'photo': true
    })

    return (
      <div className={cls}>
        <img src={Config.imagePath + this.props.photo.url} />
      </div>
    );

  }
};

module.exports = Photo;
