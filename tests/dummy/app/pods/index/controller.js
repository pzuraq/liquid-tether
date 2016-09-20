import Ember from 'ember';

export default Ember.Controller.extend({
  showHello: true,

  actions: {
    toggleHello() {
      this.toggleProperty('showHello');
    }
  }
});
