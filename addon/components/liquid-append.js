import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    const options = this.get('options');
    let { firstNode, lastNode } = this.get('nodes');

    while(firstNode) {
      this.element.insertBefore(firstNode, null);
      firstNode = firstNode !== lastNode ? lastNode.parentNode.firstChild : null;
    }

    if (options.enable) {
      options.enable();
    }
  },

  willDestroyElement() {
    const options = this.get('options');

    if (options.disable) {
      options.disable();
    }
  }
});
