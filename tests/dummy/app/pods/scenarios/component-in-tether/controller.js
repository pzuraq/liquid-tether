import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    toggleModal() {
      this.toggleProperty('hideModal');
    }
  }
});
