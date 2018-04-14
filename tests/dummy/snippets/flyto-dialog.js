import Controller from '@ember/controller';
export default Controller.extend({
  showFirstFlytoDialog: gte('currentFlytoDialogStep', 1),
  showSecondFlytoDialog: gte('currentFlytoDialogStep', 2),
  showThirdFlytoDialog: gte('currentFlytoDialogStep', 3),

  actions: {
    openFlytoDialog() {
      this.set('currentFlytoDialogStep', 1);
    },

    prevFlytoDialog() {
      this.decrementProperty('currentFlytoDialogStep');
    },

    nextFlytoDialog() {
      this.incrementProperty('currentFlytoDialogStep');
    },

    closeFlytoDialog() {
      this.set('currentFlytoDialogStep', 0);
    }
  }
});
