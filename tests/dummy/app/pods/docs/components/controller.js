import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    toggleHello() {
      this.toggleProperty('showHello');
    },
  },
});
