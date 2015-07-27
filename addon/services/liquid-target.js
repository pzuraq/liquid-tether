import Ember from 'ember';

export default Ember.Service.extend({
  defaultTargets: Ember.A(),

  targets: {},

  appendRange(id, target, nodes) {
    this.get(`targets.${target}`).pushObject({ id, nodes });
  },

  removeRange(id, target) {
    const targetNodes = this.get(`targets.${target}`);
    const nodesToRemove = targetNodes.findBy('id', id);

    targetNodes.removeObject(nodesToRemove);
  },

  addDefaultTarget(target) {
    const defaultTargets = this.get('defaultTargets');

    if (!defaultTargets.contains(target)) {
      defaultTargets.pushObject(target);
    }
  }
});
