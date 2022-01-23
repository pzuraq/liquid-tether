import { equal, gte } from '@ember/object/computed';
import { run, scheduleOnce } from '@ember/runloop';
import Controller from '@ember/controller';

export default Controller.extend({
  // eslint-disable-next-line
  exampleConstraints: [{
      to: 'scrollParent',
      attachment: 'together',
      pin: true,
    },
  ],

  showFirstModalDialog: equal('currentModalDialogStep', 1),
  showSecondModalDialog: equal('currentModalDialogStep', 2),
  showThirdModalDialog: equal('currentModalDialogStep', 3),

  showFirstFlytoDialog: gte('currentFlytoDialogStep', 1),
  showSecondFlytoDialog: gte('currentFlytoDialogStep', 2),
  showThirdFlytoDialog: gte('currentFlytoDialogStep', 3),

  actions: {
    toggleHello() {
      this.toggleProperty('showHello');
    },

    toggleFlyout() {
      this.toggleProperty('showFlyout');
    },

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
    },

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
    },

    addPassedAnchor(anchor) {
      run(() => {
        this.passedAnchors.pushObject(anchor);
        scheduleOnce('afterRender', this, 'updateAnchor');
      });
    },

    removePassedAnchor(anchor) {
      run(() => {
        this.passedAnchors.removeObject(anchor);
        scheduleOnce('afterRender', this, 'updateAnchor');
      });
    },
  },
});
