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

    if (!this.get(`liquidTargetService.targets.${name}`)) {
      this.set(`liquidTargetService.targets.${name}`, Ember.A());
    }

    this._super(...arguments);
  },

  nodes: computed('liquidTargetService', 'name', function() {
    const name = this.get('name');
    return this.get(`liquidTargetService.targets.${name}`);
  }),

  currentNodes: computed('nodes.lastObject', function() {
    const index = this.get('nodes.length');
    const { nodes } = index ? this.get('nodes.lastObject') : { null };

    return { nodes, index };
  })
});
