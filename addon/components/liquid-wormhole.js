import Ember from 'ember';

const { computed, inject, observer, generateGuid } = Ember;

const { service } = inject;
const { alias } = computed;

export default Ember.Component.extend({
  to: null,

  liquidTarget: alias('to'),
  liquidTargetService: service('liquid-target'),

  nodes: computed(function() {
    return this.$().children();
  }),

  didInsertElement() {
    this.appendNodes();
  },

  willDestroyElement() {
    this.removeNodes();
  },

  liquidTargetDidChange: observer('liquidTarget', function() {
    this.removeNodes();
    this.appendNodes();
  }),

  appendNodes() {
    const nodes = this.get('nodes');

    this._target = this.get('liquidTarget');

    this.get('liquidTargetService').appendRange(this, this._target, nodes);
  },

  removeNodes() {
    this.get('liquidTargetService').removeRange(this, this._target);
  }
});
