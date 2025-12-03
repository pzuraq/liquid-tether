import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ScenariosNestedTethersController extends Controller {
  @tracked showingInner = false;

  @action
  showInnerTether() {
    this.showingInner = !this.showingInner;
  }
}
