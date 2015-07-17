import Ember from 'ember';
import layout from '../templates/components/liquid-target-container';

const { inject } = Ember;

const { service } = inject;

export default Ember.Component.extend({
  layout: layout,

  liquidTargetService: service('liquid-target')
});
