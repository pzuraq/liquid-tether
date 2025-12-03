import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class AnimationWithContextController extends Controller {
  @tracked currentModalDialogStep = 0;

  @gte('currentModalDialogStep', 1)
  showFirstModalDialog;
  @gte('currentModalDialogStep', 2)
  showSecondModalDialog;
  @gte('currentModalDialogStep', 3)
  showThirdModalDialog;

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
}
