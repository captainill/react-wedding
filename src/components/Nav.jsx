/**
 *
 *
 */

import React from 'react';
import { Link } from 'react-router';

export default class Nav extends React.Component{
  contextTypes: {
      router: React.PropTypes.func.isRequired
  }
  render() {
    return (
      <nav id="header" className="header">
      </nav>
    );
  }
};
