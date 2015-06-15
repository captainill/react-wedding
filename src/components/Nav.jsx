/**
 *
 *
 */

import React from 'react';
import { Link } from 'react-router';
import HeartSvg from './svg/HeartSvg';

export default class Nav extends React.Component{
  render() {
    return (
      <nav id="header" className="header">
        <Link to="home"><HeartSvg/></Link>
      </nav>
    );
  }
};
