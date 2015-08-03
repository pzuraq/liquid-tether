import Ember from 'ember';
import layout from '../templates/components/liquid-target';

const { computed, inject } = Ember;
const { service } = inject;

export default Ember.Component.extend({
  layout: layout,
  classNames: ['liquid-target'],

  liquidTargetService: service('liquidTarget'),

  currentItem: computed('items.lastObject', function() {
    return this.get('items.lastObject') || {};
  }),

  cleanup() {
    if (this.get('items.length') === 0) {
      this.sendAction('on-cleanup', this.get('target'));
    }
  },

  actions: {
    didAnimateTransition() {
      this.cleanup();
    }
  }
});
