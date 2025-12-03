import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FlytoDialogController extends Controller {
  @tracked currentFlytoDialogStep = 0;

  @gte('currentFlytoDialogStep', 1)
  showFirstFlytoDialog;
  @gte('currentFlytoDialogStep', 2)
  showSecondFlytoDialog;
  @gte('currentFlytoDialogStep', 3)
  showThirdFlytoDialog;

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
}
