import Controller from '@ember/controller';

export default Controller.extend({
  showHello: true,

  actions: {
    toggleHello() {
      this.toggleProperty('showHello');
    },
  },
});
