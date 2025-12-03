import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LiquidWormholeController extends Controller {
  @tracked showFlyout = false;

  @action
  toggleFlyout() {
    this.showFlyout = !this.showFlyout;
  }
}
