/* globals Tether */
import { assert } from '@ember/debug';
import { isNone } from '@ember/utils';
import { camelize } from '@ember/string';
import { get } from '@ember/object';
import { schedule } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';
import LiquidWormhole from 'liquid-wormhole/components/liquid-wormhole';

export default class LiquidTether extends LiquidWormhole {
  classPrefix = 'liquid-tether';
  @tracked target = null;
  @tracked attachment = null;
  @tracked targetAttachment = null;
  @tracked offset = null;
  @tracked targetOffset = null;
  @tracked targetModifier = null;
  @tracked constraints = null;
  @tracked optimizations = null;

  didInsertElement() {
    super.didInsertElement(...arguments);

    this._tetherElement = this.nodes[0];
  }

  willAppendNodes(bodyElement) {
    if (this._tether) {
      this.removeTether();
    }

    this.addTether(bodyElement);
  }

  didAppendNodes() {
    this._tether.position();
  }

  willRemoveNodes() {
    this._tether.position();
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);

    schedule('render', () => {
      this.removeTether();
    });
  }

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
  }

  removeTether() {
    if (this._tether) {
      this._tether.destroy();
    }
  }

  get _tetherTarget() {
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
  }

  // TODO: This did not seem to be used, but keeping it commented out for now.
  // @action
  // clickOverlay() {
  //   // eslint-disable-next-line ember/no-get
  //   if (get(this, 'on-overlay-click')) {
  //     // eslint-disable-next-line
  //     this.sendAction('on-overlay-click');
  //   }
  // }
}
