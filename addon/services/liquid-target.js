import Ember from 'ember';

export default Ember.Service.extend({
  defaultTargets: Ember.A(),

  nodes: {},

  appendRange(target, id, firstNode, lastNode, options) {
    if (Ember.typeOf(target) === 'string') {
      this.get(`nodes.${target}`).pushObject({ id, firstNode, lastNode, options });
    } else {
      while(firstNode) {
        target.insertBefore(firstNode, null);
        firstNode = firstNode !== lastNode ? lastNode.parentNode.firstChild : null;
      }
    }
  },

  removeRange(target, id) {
    if (Ember.typeOf(target) === 'string') {
      const targetNodes = this.get(`nodes.${target}`);
      const nodesToRemove = targetNodes.findBy('id', id);

      targetNodes.removeObject(nodesToRemove);
    }
  },

  addDefaultTarget(target) {
    const defaultTargets = this.get('defaultTargets');

    if (!defaultTargets.contains(target)) {
      defaultTargets.pushObject(target);
    }
  }
});
