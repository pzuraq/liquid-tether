import Ember from 'ember';

const { get, set } = Ember;

export default Ember.Service.extend({
  defaultTargets: Ember.A(),

  nodes: {},

  appendRange(target, firstNode, lastNode, options) {
    this.get(`nodes.${target}`).pushObject({ firstNode, lastNode, options });
  },

  removeRange(target, firstNode, lastNode) {
    const targetNodes = this.get(`nodes.${target}`);
    const nodesToRemove = targetNodes.find((nodes) => {
      return nodes.firstNode === firstNode && nodes.lastNode === lastNode;
    });

    targetNodes.removeObject(nodesToRemove);
  },

  addDefaultTarget(target) {
    this.get('defaultTargets').pushObject(target);
  }
});
