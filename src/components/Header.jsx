/**
 *
 *
 */

import React from 'react';
import { Link } from 'react-router';
import HeartSvg from './svg/HeartSvg';
import scrollToTop from '../utils/scrollToTop';

export default class Header extends React.Component{

  constructor(props, context){
    super(props);
    this.context = context;
    this.hanldeHeartClick = this.hanldeHeartClick.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  hanldeHeartClick(e){
    e.preventDefault();

    if(this.context.router.getCurrentPathname() === '/'){
      scrollToTop(1000);
      console.log(window.scrollY);
    }else{
      this.context.router.transitionTo('home');
    }
  }

  render() {
    return (
      <nav id="header" className="header">
        <div className="row">
          <a href="/" className="heart-click" onClick={this.hanldeHeartClick}><HeartSvg/></a>
          <Link to="home" id="back">
            <span className="back-text">Home</span>
          </Link>
        </div>
      </nav>
    );
  }
};
