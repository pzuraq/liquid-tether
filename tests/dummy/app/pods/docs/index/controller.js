import Controller from '@ember/controller';
import { action } from '@ember/object';
import { equal, gte } from '@ember/object/computed';
import { run, scheduleOnce } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';

export default class DocsIndexController extends Controller {
  exampleConstraints = [
    {
      to: 'scrollParent',
      attachment: 'together',
      pin: true,
    },
  ];

  @tracked currentFlytoDialogStep = 0;
  @tracked currentModalDialogStep = 0;
  @tracked showFlyout = false;
  @tracked showHello = false;

  @equal('currentModalDialogStep', 1)
  showFirstModalDialog;
  @equal('currentModalDialogStep', 2)
  showSecondModalDialog;
  @equal('currentModalDialogStep', 3)
  showThirdModalDialog;

  @gte('currentFlytoDialogStep', 1)
  showFirstFlytoDialog;
  @gte('currentFlytoDialogStep', 2)
  showSecondFlytoDialog;
  @gte('currentFlytoDialogStep', 3)
  showThirdFlytoDialog;

  @action
  toggleHello() {
    this.showHello = !this.showHello;
  }

  @action
  toggleFlyout() {
    this.showFlyout = !this.showFlyout;
  }

  @action
  openModalDialog() {
    this.currentModalDialogStep = 1;
  }

  @action
  prevModalDialog() {
    this.decrementProperty('currentModalDialogStep');
  }

  @action
  nextModalDialog() {
    this.incrementProperty('currentModalDialogStep');
  }

  @action
  closeModalDialog() {
    this.currentModalDialogStep = 0;
  }

  @action
  openFlytoDialog() {
    this.currentFlytoDialogStep = 1;
  }

  @action
  prevFlytoDialog() {
    this.decrementProperty('currentFlytoDialogStep');
  }

  @action
  nextFlytoDialog() {
    this.incrementProperty('currentFlytoDialogStep');
  }

  @action
  closeFlytoDialog() {
    this.currentFlytoDialogStep = 0;
  }

  @action
  addPassedAnchor(anchor) {
    run(() => {
      this.passedAnchors.pushObject(anchor);
      scheduleOnce('afterRender', this, 'updateAnchor');
    });
  }

  @action
  removePassedAnchor(anchor) {
    run(() => {
      this.passedAnchors.removeObject(anchor);
      scheduleOnce('afterRender', this, 'updateAnchor');
    });
  }
}
