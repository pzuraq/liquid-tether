import Ember from 'ember';

const { computed } = Ember;
const { gte } = computed;

export default Ember.Controller.extend({
  documentBody: computed(function() {
    return document.body;
  }),

  modalDialogStepOne: gte('modalDialogStep', 1),
  modalDialogStepTwo: gte('modalDialogStep', 2),
  modalDialogStepThree: gte('modalDialogStep', 3),

  actions: {
    openPopup() {
      this.toggleProperty('showPopup');
    },

    openModalDialog() {
      this.set('modalDialogStep', 1);
    },

    closeModalDialog() {
      this.set('modalDialogStep', 0);
    },

    nextModalDialogStep() {
      this.incrementProperty('modalDialogStep');
    },

    prevModalDialogStep() {
      this.decrementProperty('modalDialogStep');
    },

    toggleInline() {
      this.toggleProperty('inline');
    }
  }
});
