/**
 *
 * //photo/1?modal=true
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Photo from './Photo.jsx';
import PhotoStore from '../stores/PhotoStore';
import PageActionCreators from '../actions/PageActionCreators';
import Debug from 'debug';

const debug = Debug('-------  PhotoPage.jsx: ');

class PhotoPage extends React.Component {

  static contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
  }

  constructor(props, context){
    super(props);

    this.context = context;
    this.state = {
      photo: this.context.getStore(PhotoStore).get(props.photoId)
    }
  }

  componentDidMount(){
    this.context.executeAction(PageActionCreators.pageLoaded);
  }

  render() {

    return (
      <div id='photo-page'>
        <p>PhotoPage</p>
        <Photo photo={this.state.photo} key={'photo'}/>
         <Link to="home">Home</Link>
      </div>
    );

  }
};

module.exports = PhotoPage;
