import Ember from 'ember';

const { computed, inject, observer, run, generateGuid } = Ember;

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
    const options = this._wormholeOptions();

    this._target = this.get('liquidTarget');
    this._firstNode = this.element.firstChild;
    this._lastNode = this.element.lastChild;
    this._id = generateGuid();

    this.get('liquidTargetService').appendRange(this._target, this._id, this._firstNode, this._lastNode, options);
  },

  willDestroyElement() {
    run.schedule('render', () => {
      this.get('liquidTargetService').removeRange(this._target, this._id);
    });
  },

  liquidTargetDidChange: observer('liquidTarget', function() {
    const liquidTarget = this.get('liquidTarget');
    const options = this._wormholeOptions();

    this.get('liquidTargetService').removeRange(this._target, this._id);
    this.get('liquidTargetService').appendRange(liquidTarget, this._id, this._firstNode, this._lastNode, options);

    this._target = liquidTarget;
  })
});
