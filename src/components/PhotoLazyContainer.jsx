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

const debug = Debug('-------  PhotoLazyContainer.jsx: ');

class PhotoLazyContainer extends React.Component {

  constructor(props){
    super(props);

    this.url = props.photo.url;
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      visible: false 
    };
  }

  handleScroll() {
    let bounds = React.findDOMNode(this).getBoundingClientRect(),
        scrollTop = window.pageYOffset,
        top = bounds.top + scrollTop,
        height = bounds.bottom - bounds.top;

    if(top < (scrollTop + window.innerHeight) && (top + height) > scrollTop){
      this.setState({visible: true});
      this.handleVisible();
    }
  }

  handleVisible() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleScroll);
    this.handleScroll();
  }

  componentDidUpdate() {
      if(!this.state.visible) this.handleScroll();
  }

  componentWillUnmount() {
      this.handleVisible();
  }

  render() {
    const photo = this.props.photo;
    const style = {
      backgroundImage: 'url(' + Config.imagePath + this.props.photo.url + ')',
    }

    const classes = classNames({
      'photo-item': true,
      'lazy-load': true,
      'lazy-load-visible': this.state.visible
    });    

    return (
      <div className={classes}>
        <Link to="photo" params={{id: photo.id}} query={{modal: true}} style={style} data-src={photo.url} />
      </div>
    );

  }
};

module.exports = PhotoLazyContainer;
