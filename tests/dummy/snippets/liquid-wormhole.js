import Controller from '@ember/controller';
export default Controller.extend({
  actions: {
    toggleFlyout() {
      this.toggleProperty('showFlyout');
    }
  }
});
