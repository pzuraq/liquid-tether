import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  stepNumber: 0,

  steps: [{
    target: "#feature1",
    text: "Here's a feature!"
  }, {
    target: "#feature2",
    text: "Another feature!"
  }, {
    target: "#feature3",
    text: "Last feature!"
  }],

  currentStep: computed('stepNumber', {
    get() {
      return this.get('steps')[this.get('stepNumber')];
    }
  }),

  actions: {
    prevStep() {
      const stepNumber = this.get('stepNumber') - 1;
      this.set('stepNumber', stepNumber === -1 ? 2 : stepNumber);
    },

    nextStep() {
      this.set('stepNumber', (this.get('stepNumber') + 1) % 3);
    }
  }
});
