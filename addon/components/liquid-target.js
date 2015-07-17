import Ember from 'ember';
import layout from '../templates/components/liquid-target';

const { computed, inject } = Ember;

const { service } = inject;

export default Ember.Component.extend({
  layout: layout,
  classNames: ['liquid-target'],

  liquidTargetService: service('liquid-target'),

  init() {
    const name = this.get('name');
    if (!this.get(`liquidTargetService.nodes.${name}`)) {
      this.set(`liquidTargetService.nodes.${name}`, Ember.A());
    }

    this._super(...arguments);
  },

  nodes: computed('liquidTargetService', 'name', function() {
    const name = this.get('name');
    return this.get(`liquidTargetService.nodes.${name}`);
  }),

  currentNodes: computed('nodes.lastObject', function() {
    const index = this.get('nodes.length');
    const { firstNode, lastNode, options } = index ? this.get('nodes.lastObject') : { null, null, options: {} };

    return { firstNode, lastNode, options, index };
  })
});
