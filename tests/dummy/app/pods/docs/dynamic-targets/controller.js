import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  stepNumber: 0,

  // eslint-disable-next-line
  steps: [{
      target: '#feature1',
      text: "Here's a feature!",
    },
    {
      target: '#feature2',
      text: 'Another feature!',
    },
    {
      target: '#feature3',
      text: 'Last feature!',
    },
  ],

  currentStep: computed('stepNumber', 'steps', {
    get() {
      return this.steps[this.stepNumber];
    },
  }),

  actions: {
    prevStep() {
      const stepNumber = this.stepNumber - 1;
      this.set('stepNumber', stepNumber === -1 ? 2 : stepNumber);
    },

    nextStep() {
      this.set('stepNumber', (this.stepNumber + 1) % 3);
    },
  },
});
