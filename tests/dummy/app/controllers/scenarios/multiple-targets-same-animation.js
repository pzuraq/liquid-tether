import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    showSecondTether() {
      this.toggleProperty('secondTether');
    },

    showThirdTether() {
      this.toggleProperty('thirdTether');
    }
  }
});
