import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'h2',

  didInsertElement() {
    Ember.$(document).scroll(() => {
      const scrollSpierOffset = this.$().offset().top;
      const scrollTop = Ember.$('body').scrollTop();

      if ((scrollTop + 20 > scrollSpierOffset || (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 20)) {
        if (!this.get('passed')) {
          this.set('passed', true);
          this.sendAction('on-pass', this.id);
        }
      } else if (scrollTop + 20 <= scrollSpierOffset && this.get('passed')) {
        this.set('passed', false);
        this.sendAction('on-unpass', this.id);
      }
    });
  },

  willDestroyElement() {
    Ember.$(document).off('scroll');
  }
});
