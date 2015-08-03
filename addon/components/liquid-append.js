import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    const nodes = this.get('nodes');

    this.$().append(nodes);
  },

  didAnimateTransition() {
    this.sendAction('did-animate-transition');
  }
});
