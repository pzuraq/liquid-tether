import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    const templateEl = this.$('.template')[0];
    const jsEl = this.$('.js')[0];
    const stylesEl = this.$('.styles')[0];
    const transitionsEl = this.$('.transitions')[0];
    const currentEl = templateEl || jsEl || stylesEl || transitionsEl;


    this.set('templateEl', templateEl);
    this.set('stylesEl', stylesEl);
    this.set('jsEl', jsEl);
    this.set('transitionsEl', transitionsEl);

    this.set('currentTab', currentEl);

    this.$(currentEl).show();
  },

  actions: {
    changeTab(tabEl) {
      this.set('currentTab', tabEl);
    }
  }
});
