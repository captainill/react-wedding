/**
 *
 *
 */

import React from 'react';
import HeartSvg from './svg/HeartSvg';

export default class Nav extends React.Component{
  render() {
    return (
      <nav id="header" className="header">
      	<HeartSvg/>
      </nav>
    );
  }
};
