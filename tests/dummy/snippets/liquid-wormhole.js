export default Ember.Controller.extend({
  actions: {
    toggleFlyout() {
      this.toggleProperty('showFlyout');
    }
  }
});
