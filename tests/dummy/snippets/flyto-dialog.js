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
    // eslint-disable-next-line ember/classic-decorator-no-classic-methods
    this.decrementProperty('currentFlytoDialogStep');
  }

  @action
  nextFlytoDialog() {
    // eslint-disable-next-line ember/classic-decorator-no-classic-methods
    this.incrementProperty('currentFlytoDialogStep');
  }

  @action
  closeFlytoDialog() {
    this.currentFlytoDialogStep = 0;
  }
}
