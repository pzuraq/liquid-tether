import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    showInnerTether() {
      this.toggleProperty('showingInner');
    }
  }
});
