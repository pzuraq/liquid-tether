import Ember from 'ember';

const { observer } = Ember;

export default Ember.Controller.extend({
  queryParams: ['a'],
  a: null,

  passedAnchors: Ember.A(),

  // This is terrible. TODO Think of something better.
  anchorParamDidChange: observer('a', function() {
    const id = this.get('a');

    if (id && id !== this.get('passedAnchors.lastObject')) {
      this.set('locked', true);
      Ember.run.next(() => {
        Ember.$('body').scrollTop(Ember.$(`#${id}`).offset().top - 15);
        this.set('locked', false);
      });
    }
  }),

  updateAnchor() {
    if (!this.get('locked')) {
      this.set('a', this.get('passedAnchors.lastObject') || null);
    }
  },

  actions: {
    addPassedAnchor(anchor) {
      this.get('passedAnchors').pushObject(anchor);
      Ember.run.scheduleOnce('afterRender', this, 'updateAnchor');
    },

    removePassedAnchor(anchor) {
      this.get('passedAnchors').removeObject(anchor);
      Ember.run.scheduleOnce('afterRender', this, 'updateAnchor');
    }
  }
});
