import Ember from 'ember';
import LiquidWormhole from 'liquid-wormhole/components/liquid-wormhole';
import layout from '../templates/components/liquid-tether';

const { computed, get, observer, run } = Ember;

const { camelize } = Ember.String;

export default LiquidWormhole.extend({
  layout: layout,

  to: 'liquid-tether',

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
    this._tetherElement = this.$('.liquid-tether')[0];

    this._super.apply(this, arguments);
  },

  didAppendNodes() {
    this.addTether();
  },

  willDestroyElement() {
    this._super.apply(this, arguments);

    run.schedule('render', () => {
      this.removeTether();
    });
  },

  addTether() {
    if (get(this, '_tetherTarget')) {
      this._tether = new Tether(this._tetherOptions());
    }
  },

  removeTether() {
    if (this._tether) {
      this._tether.destroy();
    }
  },

  tetherDidChange: observer(
    'class-prefix',
    'target',
    'attachment',
    'targetAttachment',
    'offset',
    'targetOffset',
    'targetModifier',
    'constraints',
    'optimizations',
    'liquidTarget',
    function() {
      this.removeTether(this._tether);
      this.addTether();
    }
  ),

  _tetherTarget: computed('target', function() {
    let target = get(this, 'target');
    if (target && target.element) {
      target = target.element;
    } else if (target === 'document.body') {
      target = document.body;
    }
    return target;
  }),

  _tetherOptions() {
    let options = {
      element: this._tetherElement,
      target: get(this, '_tetherTarget'),
      moveRoot: false
    };
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
    return options;
  },

  actions: {
    clickOverlay() {
      if (this.get('on-overlay-click')) {
        this.sendAction('on-overlay-click');
      }
    }
  }
});
