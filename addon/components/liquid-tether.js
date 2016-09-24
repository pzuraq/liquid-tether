import Ember from 'ember';
import LiquidWormhole from 'liquid-wormhole/components/liquid-wormhole';

const { computed, get, run } = Ember;

const { camelize } = Ember.String;

export default LiquidWormhole.extend({
  classPrefix: 'liquid-tether',
  target: null,
  attachment: null,
  targetAttachment: null,
  offset: null,
  targetOffset: null,
  targetModifier: null,
  constraints: null,
  optimizations: null,

  didInsertElement() {
    this._super.apply(this, arguments);

    this._tetherElement = this.get('nodes')[0];
  },

  willAppendNodes(bodyElement) {
    if (this._tether) {
      this.removeTether();
    }

    this.addTether(bodyElement);
  },

  didAppendNodes() {
    this._tether.position();
  },

  willRemoveNodes() {
    this._tether.position();
  },

  willDestroyElement() {
    this._super.apply(this, arguments);

    run.schedule('render', () => {
      this.removeTether();
    });
  },

  addTether(bodyElement) {
    const target = this.get('_tetherTarget');
    const element = this._tetherElement;

    const options = { element, target, bodyElement };

    [ 'classPrefix',
      'attachment',
      'targetAttachment',
      'offset',
      'targetOffset',
      'targetModifier',
      'constraints',
      'optimizations'
    ].forEach((k) => {
      const v = get(this, k);
      if (!Ember.isNone(v)) {
        options[camelize(k)] = v;
      }
    });

    this._tether = new Tether(options);
  },

  removeTether() {
    if (this._tether) {
      this._tether.destroy();
    }
  },

  _tetherTarget: computed('target', function() {
    let target = get(this, 'target');
    if (target && target.element) {
      target = target.element;
    } else if (target === 'document.body') {
      target = document.body;
    }
    return target;
  }),

  actions: {
    clickOverlay() {
      if (this.get('on-overlay-click')) {
        this.sendAction('on-overlay-click');
      }
    }
  }
});
