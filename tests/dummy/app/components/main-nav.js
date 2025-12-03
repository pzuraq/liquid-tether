import Component from '@ember/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MainNav extends Component {
  tagName = 'nav';

  @tracked navOpen = false;

  click(event) {
    const container = this.element;

    if (event.target !== container && event.target.closest('a.nav-item')) {
      this.navOpen = false;
    }
  }

  @action
  toggleNav() {
    this.navOpen = !this.navOpen;
  }
}
