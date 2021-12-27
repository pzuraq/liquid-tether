import $ from 'jquery';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'nav',
  classNames: ['main-nav'],

  click(event) {
    var $target = $(event.target);
    var $c = this.$();

    if ($target !== $c) {
      if ($target.closest($c.find('a.nav-item')).length) {
        this.set('navOpen', false);
      }
    }
  },

  actions: {
    toggleNav() {
      this.toggleProperty('navOpen');
    },
  },
});
