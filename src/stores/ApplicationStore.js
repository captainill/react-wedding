/**
 *
 *
 */

import BaseStore from 'fluxible/addons/BaseStore';
import Debug from 'debug';

const debug = Debug('-------  ApplicationStore.jsx: ');

class ApplicationStore extends BaseStore{

  static handlers = {
    'CHANGE_ROUTE': 'handleNavigate',
    'CHANGE_ROUTE_SUCCESS': 'handleSuccess'
  }

  constructor (dispatcher) {
    super(dispatcher);
    this.dispatcher = dispatcher; // Provides access to waitFor and getStore methods
  }

  initialize() {
    this.currentRoute = null;
    this.currentRouteName = null;
    this.isLoading = false;
  }

  handleNavigate(route) {
    
    if (this.currentRoute && route.path === this.currentRoute.path) {
      return;
    }

    this.currentRoute = route;
    this.currentRouteName = route.routes[route.routes.length - 1].name; //deepest route
    this.isLoading = true;

    this.emitChange();
  }

  handleSuccess(){
    this.isLoading = false;

    this.emitChange();
  }

  getState() {
    return {
      currentRoute: this.currentRoute,
      currentRouteName: this.currentRouteName,
      isLoading: this.isLoading
    };
  }

  dehydrate() {
    return this.getState();
  }

  rehydrate(state) {
    this.currentRoute = state.currentRoute;
    this.currentRouteName = state.currentRouteName;
    this.isLoading = state.isLoading;
  }

}

ApplicationStore.storeName = 'ApplicationStore';


module.exports = ApplicationStore;
