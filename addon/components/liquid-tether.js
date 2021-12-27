/* globals Tether */
import { assert } from '@ember/debug';
import { isNone } from '@ember/utils';
import { camelize } from '@ember/string';
import { get, computed } from '@ember/object';
import { schedule } from '@ember/runloop';
import LiquidWormhole from 'liquid-wormhole/components/liquid-wormhole';

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
    this._super(...arguments);

    this._tetherElement = this.nodes[0];
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
    this._super(...arguments);

    schedule('render', () => {
      this.removeTether();
    });
  },

  addTether(bodyElement) {
    const target = this._tetherTarget;

    const element = this._tetherElement;

    const options = { element, target, bodyElement };

    [
      'classPrefix',
      'attachment',
      'targetAttachment',
      'offset',
      'targetOffset',
      'targetModifier',
      'constraints',
      'optimizations',
    ].forEach((k) => {
      const v = get(this, k);
      if (!isNone(v)) {
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

  _tetherTarget: computed('target', function () {
    let target = this.target;

    if (target && target.element) {
      return target.element;
    } else if (target === 'document.body') {
      return document.body;
    }

    assert(
      `Tether target "${target}" does not exist in the document`,
      target instanceof Element || document.querySelector(target) !== null
    );

    return target;
  }),

  actions: {
    clickOverlay() {
      if (this.get('on-overlay-click')) {
        // eslint-disable-next-line
        this.sendAction('on-overlay-click');
      }
    },
  },
});
