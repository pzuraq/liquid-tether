import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DocsDynamicTargetsController extends Controller {
  @tracked stepNumber = 0;

  steps = [
    {
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
  ];

  get currentStep() {
    return this.steps[this.stepNumber];
  }

  @action
  prevStep() {
    const stepNumber = this.stepNumber - 1;
    this.stepNumber = stepNumber === -1 ? 2 : stepNumber;
  }

  @action
  nextStep() {
    this.stepNumber = (this.stepNumber + 1) % 3;
  }
}
