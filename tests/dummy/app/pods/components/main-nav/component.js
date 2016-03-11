import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',
  classNames: ['main-nav'],

  click(event) {
    var $target = Ember.$(event.target);
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
    }
  }
});
