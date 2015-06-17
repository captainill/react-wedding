import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Config from '../constants/Config';
import classNames from 'classnames';
import Debug from 'debug';

const debug = Debug('-------  Image.jsx: ');

export default class Image extends React.Component{

  static defaultProps = {
    placeholderSrc: 'data:image/gif;base64,R0lGODlhEAAJAIAAAP///wAAACH5BAEAAAAALAAAAAAQAAkAAAIKhI+py+0Po5yUFQA7'
  }

  constructor(props){
    super(props);

    this.onImageLoad = this.onImageLoad.bind(this);
    this.state = {
      loaded: false
    };    
  }

  onImageLoad() {
      this.setState({loaded: true});
  }

  componentDidMount() {
    if (typeof document !== 'undefined') {
      //imgTag = React.findDOMNode(this.refs.image)
      let imgTag = document.createElement('img');
      let imgSrc = Config.imagePath + this.props.photo.url;
      // You may want to rename the component if the <Image> definition
      // overrides window.Image
      //let img = new window.Image();
      imgTag.onload = this.onImageLoad;
      imgTag.src = imgSrc;
    }
  }

  render() {
    const photo = this.props.photo;
    const style = {
      backgroundImage: 'url(' + Config.imagePath + photo.url + ')',
    }

    const classes = classNames({
      'image': true,
      'image-loaded': this.state.loaded
    });

    return (
      <Link to="photo" className={classes} params={{id: photo.id}} query={{modal: true}} style={style} data-src={photo.url} />
    );
  }

};