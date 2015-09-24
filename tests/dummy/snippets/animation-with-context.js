export default Ember.Controller.extend({
  showFirstModalDialog: gte('currentModalDialogStep', 1),
  showSecondModalDialog: gte('currentModalDialogStep', 2),
  showThirdModalDialog: gte('currentModalDialogStep', 3),

  actions: {
    openModalDialog() {
      this.set('currentModalDialogStep', 1);
    },

    prevModalDialog() {
      this.decrementProperty('currentModalDialogStep');
    },

    nextModalDialog() {
      this.incrementProperty('currentModalDialogStep');
    },

    closeModalDialog() {
      this.set('currentModalDialogStep', 0);
    }
  }
});
