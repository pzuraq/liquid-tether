import Ember from 'ember';

const { computed } = Ember;

export default Ember.Service.extend({
  targets: computed(() => Ember.A()),

  appendItem(targetName, item) {
    const targets = this.get('targets');
    let target;

    if (!(target = targets.findBy('name', targetName))) {
      Ember.run(function() {
        target = {
          name: targetName,
          items: Ember.A(),
          class: `${targetName}-liquid-target`,
          contextClass: item.get('targetClass')
        };

        targets.pushObject(target);
      });
    }

    target.items.pushObject(item);
  },

  removeItem(targetName, item) {
    const targets = this.get('targets');
    const target = targets.findBy('name', targetName);

    target.items.removeObject(item);
  },

  removeTarget(target) {
    const targets = this.get('targets');

    if (targets) {
      this.get('targets').removeObject(target);
    }
  },

  addDefaultTarget() {
    console.log('addDefaultTarget has been deprecated');
  }
});
