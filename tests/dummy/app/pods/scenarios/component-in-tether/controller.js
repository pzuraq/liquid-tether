import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ScenariosComponentInTetherController extends Controller {
  @tracked hideModal = false;

  @action
  toggleModal() {
    this.hideModal = !this.hideModal;
  }
}
