import Component from '@ember/component';

export default Component.extend({
  tagName: 'nav',
  classNames: ['main-nav'],

  click(event) {
    const container = this.element;

    if (event.target !== container && event.target.closest('a.nav-item')) {
      this.set('navOpen', false);
    }
  },

  actions: {
    toggleNav() {
      this.toggleProperty('navOpen');
    },
  },
});
