/**
 *
 * <Link to="photo" params={{ id: 2 }} query={{ modal: true }}>photo link</Link>
 */

import React, { PropTypes } from 'react';
import { RouteHandler, Link } from 'react-router';
import classNames from 'classnames';
import PhotoGroup from './PhotoGroup.jsx'
import GroupStore from '../stores/GroupStore';
import PhotoStore from '../stores/PhotoStore';
import PhotoActionCreators from '../actions/PhotoActionCreators';
import PageActionCreators from '../actions/PageActionCreators';

import { provideContext, connectToStores }  from 'fluxible/addons';
import { map } from 'lodash';
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
    this.context.executeAction(PageActionCreators.pageLoaded);
  }

  render() {
    const _this = this;
    const groups = map(this.props.groups, function(group){
      return <PhotoGroup group={group} />
    })

    return (
      <div className='home'>
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
