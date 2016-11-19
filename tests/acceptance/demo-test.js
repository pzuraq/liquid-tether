/* global ranWormholeTransition, noTransitionsYet */
import moduleForAcceptance from '../helpers/module-for-acceptance';
import { injectTransitionSpies } from '../helpers/integration';

import { test } from 'ember-qunit';

moduleForAcceptance('Acceptance | Demos', {
  beforeEach() {

    // Conceptually, integration tests shouldn't be digging around in
    // the container. But animations are slippery, and it's easier to
    // just spy on them to make sure they're being run than to try to
    // observe their behavior more directly.
    injectTransitionSpies(this.application);
  }
});

test('target container is cleaned when empty', function(assert) {
  visit('/docs');
  click('#hello-world-button');
  click('#hello-world-button');

  andThen(() => {
    assert.equal(find('.default-liquid-destination .liquid-destination-stack').length, 0, 'it\'s empty');
  });
});

test('basic liquid-tether works correctly', function(assert) {
  visit('/docs');
  noTransitionsYet(assert);

  click('#hello-world-button');
  andThen(() => {
    assert.equal(find('.default-liquid-destination .liquid-wormhole-element').length, 1, 'it exists');
    ranWormholeTransition(assert, 'fade-down');
  });
});

test('tethers can determine context with stacks', function(assert) {
  visit('/docs/stacks');

  click('#animation-with-context-button');
  andThen(() => ranWormholeTransition(assert, 'fade'));

  click('button:contains(Next)');
  andThen(() => ranWormholeTransition(assert, 'to-left'));

  click('button:contains(Back)');
  andThen(() => ranWormholeTransition(assert, 'to-right'));

  click('button:contains(Cancel)');
  andThen(() => ranWormholeTransition(assert, 'fade'));
});

test('routed tethers can determine context with stacks', function(assert) {
  visit('/docs/routed-tethers/step-one');
  andThen(() => ranWormholeTransition(assert, 'fade'));

  visit('/docs/routed-tethers/step-two');
  andThen(() => ranWormholeTransition(assert, 'to-left'));

  visit('/docs/routed-tethers/step-one');
  andThen(() => ranWormholeTransition(assert, 'to-right'));

  visit('/docs');
  andThen(() => ranWormholeTransition(assert, 'fade'));
});

test('clickable overlay responds and has correct class', function(assert) {
  visit('/docs/stacks');

  click('#animation-with-context-button');
  andThen(() => ranWormholeTransition(assert, 'fade'));
  andThen(() => {
    assert.equal(find('.modal-backdrop').length, 1, 'overlay exists');
  });

  click('.modal-backdrop');
  andThen(() => ranWormholeTransition(assert, 'fade'));
});
