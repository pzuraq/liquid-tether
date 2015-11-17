import Ember from 'ember';
import layout from '../templates/components/liquid-target-container';

const { inject, computed } = Ember;
const { service } = inject;

export default Ember.Component.extend({
  layout: layout,
  classNames: ['liquid-target-container'],
  classNameBindings: ['hasTargets'],

  hasTargets: computed.bool('liquidTargetService.targets.length'),
  liquidTargetService: service('liquid-target')
});
