import Ember from 'ember';

const { computed, inject, observer, on } = Ember;

const { service } = inject;
const { alias } = computed;

export default Ember.Component.extend({
  to: null,

  liquidTarget: alias('to'),
  liquidTargetService: service('liquid-target'),

  nodes: computed(function() {
    return this.$().children();
  }),

  liquidTargetDidChange: observer('liquidTarget', function() {
    this.removeFromTarget();
    this.appendToTarget();
  }),

  appendToTarget: on('didInsertElement', function() {
    this._target = this.get('liquidTarget');

    this.get('liquidTargetService').appendItem(this._target, this);
  }),

  removeFromTarget: on('willDestroyElement', function() {
    this.get('liquidTargetService').removeItem(this._target, this);
  })
});
