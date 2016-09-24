import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    toggleHello() {
      this.toggleProperty('showHello');
    }
  }
});
