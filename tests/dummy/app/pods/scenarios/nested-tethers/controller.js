import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    showInnerTether() {
      this.toggleProperty('showingInner');
    }
  }
});
