import Ember from 'ember';

const { computed, observer } = Ember;

export default Ember.Controller.extend({
  queryParams: ['a'],
  a: null,

  passedAnchors: Ember.A(),

  // Still terrible. TODO: Think of something better.
  anchorParamDidChange: observer('a', function() {
    const id = this.get('a');

    if (id && id !== this.get('passedAnchors.lastObject')) {
      this.set('locked', true);
      Ember.run.next(() => {
        Ember.$('body').scrollTop(Ember.$(`#${id}`).offset().top - 15);
        this.set('locked', false);
      });
    }
  }),

  updateAnchor() {
    if (!this.get('locked')) {
      this.set('a', this.get('passedAnchors.lastObject') || null);
    }
  },

  showFirstModalDialog: computed.equal('currentModalDialogStep', 1),
  showSecondModalDialog: computed.equal('currentModalDialogStep', 2),
  showThirdModalDialog: computed.equal('currentModalDialogStep', 3),

  showFirstFlytoDialog: computed.gte('currentFlytoDialogStep', 1),
  showSecondFlytoDialog: computed.gte('currentFlytoDialogStep', 2),
  showThirdFlytoDialog: computed.gte('currentFlytoDialogStep', 3),

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
      Ember.run(() => {
        this.get('passedAnchors').pushObject(anchor);
        Ember.run.scheduleOnce('afterRender', this, 'updateAnchor');
      });
    },

    removePassedAnchor(anchor) {
      Ember.run(() => {
        this.get('passedAnchors').removeObject(anchor);
        Ember.run.scheduleOnce('afterRender', this, 'updateAnchor');
      });
    }
  }
});
