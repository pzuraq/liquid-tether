import Ember from 'ember';

const { computed, inject, observer } = Ember;

const { service } = inject;
const { alias } = computed;

export default Ember.Component.extend({
  to: null,
  classNames: ['liquid-wormhole-container'],

  liquidTarget: alias('to'),
  liquidTargetService: service('liquid-target'),

  nodes: computed(function() {
    if (this.element) {
      return this.$().children();      
    }
  }),

  liquidTargetDidChange: observer('liquidTarget', function() {
    this.get('liquidTargetService').removeItem(this._target, this);
    this.get('liquidTargetService').appendItem(this._target, this);
  }),

  didInsertElement() {
    this._target = this.get('liquidTarget');

    this.get('liquidTargetService').appendItem(this._target, this);

    this._super.apply(this, arguments);
  },

  willDestroyElement() {
    this.get('liquidTargetService').removeItem(this._target, this);

    this._super.apply(this, arguments);
  }
});
