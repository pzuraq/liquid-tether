import Ember from 'ember';
import LiquidWormhole from './liquid-wormhole';
import layout from '../templates/components/liquid-tether';

const { computed, get, observer, run } = Ember;

const { camelize } = Ember.String;

export default LiquidWormhole.extend({
  layout: layout,

  to: 'liquid-tether',

  'class-prefix': 'liquid-tether',
  target: null,
  attachment: null,
  'target-attachment': null,
  offset: null,
  'target-offset': null,
  'target-modifier': null,
  constraints: null,
  optimizations: null,

  didInsertElement() {
    this._tetherElement = this.$('.liquid-tether')[0];

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
    'class-prefix',
    'target',
    'attachment',
    'target-attachment',
    'offset',
    'target-offset',
    'target-modifier',
    'constraints',
    'optimizations',
    'liquidTargetName',
    function() {
      this.removeTether(this._tether);
      this.addTether();
    }
  ),

  addTether() {
    if (!this.get('render-inline') && get(this, '_tetherTarget')) {
      this._tether = new Tether(this._tetherOptions());
    }
  },

  removeTether(tether) {
    if (tether) {
      tether.destroy();
    }
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
      element: this._tetherElement,
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
