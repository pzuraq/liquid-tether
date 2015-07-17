import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    let { firstNode, lastNode } = this.get('nodes');

    while(firstNode) {
      this.element.insertBefore(firstNode, null);
      firstNode = firstNode !== lastNode ? lastNode.parentNode.firstChild : null;
    }
  }
});
