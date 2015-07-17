import Ember from 'ember';
import LiquidWormhole from './liquid-wormhole';
import layout from '../templates/components/liquid-tether';

const { computed, get, observer, run } = Ember;

const { camelize } = Ember.String;
const { reads } = computed;

export default LiquidWormhole.extend({
  layout: layout,
  'class-prefix': 'liquid-tether',
  target: null,
  attachment: null,
  'target-attachment': null,
  offset: null,
  'target-offset': null,
  'target-modifier': null,
  constraints: null,
  optimizations: null,

  to: 'liquid-tether',

  didInsertElement() {
    this._super();

    this.addTether();
  },

  willDestroyElement() {
    this._super();

    var tether = this._tether;
    run.schedule('render', () => {
      this.removeTether(tether);
    });
  },

  tetherDidChange: observer(
    'classPrefix',
    'target',
    'attachment',
    'targetAttachment',
    'offset',
    'targetOffset',
    'targetModifier',
    'constraints',
    'optimizations',
    'render-in-place',
    'destinationName',
    function() {
      this.removeTether(this._tether);
      this.addTether();
    }
  ),

  addTether() {
    if (!this.get('render-in-place') && get(this, '_tetherTarget')) {
      this._tether = new Tether(this._tetherOptions());
    }
  },

  removeTether(tether) {
    if (tether) {
      tether.destroy();
      this._firstNode.setAttribute('style', '');
    }
  },

  _wormholeOptions() {
    return {
      disable: () => {
        this._tether.disable();
      },
      enable: () => {
        this._tether.enable();
      }
    };
  },

  _tetherTarget: computed('target', function() {
    let t = get(this, 'target');
    if (t && t.element) {
      t = t.element;
    } else if (t === 'document.body') {
      t = document.body;
    }
    return t;
  }),

  _tetherOptions() {
    let options = {
      element: this._firstNode,
      target: get(this, '_tetherTarget'),
    };
    [ 'class-prefix',
      'attachment',
      'target-attachment',
      'offset',
      'target-offset',
      'target-modifier',
      'constraints',
      'optimizations'
    ].forEach((k) => {
      const v = get(this, k);
      if (!Ember.isNone(v)) {
        options[camelize(k)] = v;
      }
    });
    return options;
  }
});
