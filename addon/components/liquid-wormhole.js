import Ember from 'ember';

const { computed, inject, observer, run } = Ember;

const { service } = inject;
const { alias } = computed;

export default Ember.Component.extend({
  to: null,
  'render-in-place': false,

  liquidTargetName: alias('to'),
  liquidTargetService: service('liquid-target'),

  liquidTarget: computed('liquidTargetName', 'render-in-place', function() {
    return this.get('render-in-place') ? this.element : this.get('liquidTargetName');
  }),

  didInsertElement() {
    const liquidTarget = this.get('liquidTarget');
    const options = this._wormholeOptions();

    this._firstNode = this.element.firstChild;
    this._lastNode = this.element.lastChild;

    this.get('liquidTargetService').appendRange(liquidTarget, this._firstNode, this._lastNode, options);
  },

  willDestroyElement() {
    const liquidTarget = this.get('liquidTarget');
    const options = this._wormholeOptions();

    run.schedule('render', () => {
      this.get('liquidTargetService').removeRange(liquidTarget, this._firstNode, this._lastNode, options);
    });
  },

  liquidTargetDidChange: observer('liquidTarget', function() {
    const liquidTarget = this.get('liquidTarget');
    const options = this._wormholeOptions();

    run.schedule('render', () => {
      this.get('liquidTargetService').appendRange(liquidTarget, this._firstNode, this._lastNode, options);
    });
  })
});
