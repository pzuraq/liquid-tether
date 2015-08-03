export default Ember.Controller.extend({
  actions: {
    toggleHello() {
      this.toggleProperty('showHello');
    }
  }
});
