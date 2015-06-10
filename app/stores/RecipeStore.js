/**
 * 
 * 
 */

import BaseStore from 'fluxible/addons/BaseStore';

class RecipeStore extends BaseStore{

  static handlers = {
    'LOAD_PAGE': 'handleContentChange'
  }

  constructor (dispatcher) {
    super(dispatcher);
    this.dispatcher = dispatcher; // Provides access to waitFor and getStore methods
  }

  initialize () {
    this.content = 'initial content...';
  }

  handleContentChange(payload) {
    this.content = 'content for page with id '+payload.id;
    this.emitChange();
  }

  getState() {
    return {
      content: this.content
    };
  }

  dehydrate() {
    return this.getState();
  }

  rehydrate(state) {
    this.content = state.content;
  }
}

RecipeStore.storeName = 'RecipeStore';

export default RecipeStore;
