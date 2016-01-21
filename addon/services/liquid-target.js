import Ember from 'ember';

const { computed } = Ember;

export default Ember.Service.extend({
  targets: computed(() => Ember.A()),
  queue: computed(() => Ember.A()),

  appendItem(targetName, item) {
    const targets = this.get('targets');
    let target;

    if (!(target = targets.findBy('name', targetName))) {
      Ember.run(function() {
        target = {
          name: targetName,
          items: Ember.A(),
          class: `${targetName}-liquid-target`,
          contextClass: item.get('targetClass'),
          firstTime: true
        };

        targets.pushObject(target);
      });
    }

    this.appendToQueue(target, 'pushObject', item);
  },

  removeItem(targetName, item) {
    const targets = this.get('targets');
    const target = targets.findBy('name', targetName);

    this.appendToQueue(target, 'removeObject', item);
  },

  appendToQueue(target, method, item) {
    this.get('queue').pushObject({ target, method, item });

    if (!this.get('isAnimating')) {
      this.flushQueue();
    }
  },

  flushQueue() {
    const queue = this.get('queue');

    queue.forEach(({ target, method, item }) => {
      target.items[method](item);
    });

    queue.clear();
  },

  didAnimate() {
    if (this.get('queue.length')) {
      this.flushQueue();
    } else {
      this.cleanTargets();
    }
  },

  cleanTargets() {
    const targets = this.get('targets');

    if (targets) {
      const targetsToRemove = targets.filter((target) => {
        const firstTime = target.firstTime;
        target.firstTime = false;

        return !firstTime && !target.isAnimating && target.items.get('length') === 0;
      });

      targets.removeObjects(targetsToRemove);
    }
  }
});
