import Ember from 'ember';
import layout from '../templates/components/liquid-target';

const { computed, inject } = Ember;
const { htmlSafe } = Ember.String;
const { service } = inject;

export default Ember.Component.extend({
  layout: layout,
  classNames: ['liquid-target'],
  classNameBindings: ['contextClass'],
  attributeBindings: ['style'],

  firstTime: true,

  liquidTargetService: service('liquidTarget'),

  style: computed('index', function() {
    return htmlSafe(`z-index: ${1000000 + this.get('index')}`);
  }),

  currentItem: computed('items.lastObject', function() {
    return this.get('items.lastObject') || {};
  }),

  actions: {
    willTransition() {
      this.get('liquidTargetService').willAnimate();
    },

    afterChildInsertion() {
      const currentItem = this.get('currentItem');

      if (currentItem.didAppendNodes) {
        this.get('currentItem').didAppendNodes();
      }
    },

    afterTransition() {
      if (!this.firstTime) {
        const contextClass = this.get('currentItem.targetClass');
        this.set('contextClass', contextClass);
      }

      this.firstTime = false;
      this.get('liquidTargetService').didAnimate();
    }
  }
});
