import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DocsComponentsController extends Controller {
  @tracked showHello = false;

  @action
  toggleHello() {
    this.showHello = !this.showHello;
  }
}
