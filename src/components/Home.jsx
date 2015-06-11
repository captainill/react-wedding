/**
 *
 * <Link to="photo" params={{ id: 2 }} query={{ modal: true }}>photo link</Link>
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import PhotoGroup from './PhotoGroup.jsx'
import GroupStore from '../stores/GroupStore';
import PhotoStore from '../stores/PhotoStore';
import PhotoActionCreators from '../actions/PhotoActionCreators';
import { provideContext, connectToStores }  from 'fluxible/addons';
import { RouteHandler, Link } from 'react-router';
import Debug from 'debug';

const debug = Debug('-------  Home.jsx: ');

class Home extends React.Component {

  static contextTypes = {
    router: React.PropTypes.func.isRequired,
    executeAction: React.PropTypes.func.isRequired
  }

  constructor(props, router){
    super(props);
  }

  componentDidMount(){
    //this.context.executeAction(PhotoActionCreators.getAllPhotos);
  }

  render() {
    debug(this.props.group)
    const _this = this;
    let groups = Object.keys(this.props.groups).map(function(id){
      return <PhotoGroup group={_this.props.groups[id]} />
    })
    return (
      <div className='home'>
        <p>Home</p>
        {groups}
      </div>
    );

  }
};

Home = connectToStores(Home, [PhotoStore, GroupStore], function(stores){
  stores.GroupStore.init(stores.PhotoStore.getAll()); //hack to init groupstore ouside of action flow
  return stores.GroupStore.getState();
});

module.exports = Home;
