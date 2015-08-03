import Ember from 'ember';
import layout from '../templates/components/liquid-target-container';

const { inject } = Ember;
const { service } = inject;

export default Ember.Component.extend({
  layout: layout,
  classNames: ['liquid-target-container'],

  liquidTargetService: service('liquid-target'),

  actions: {
    removeTarget(target) {
      this.get('liquidTargetService').removeTarget(target);
    }
  }
});
