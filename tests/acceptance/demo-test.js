import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { findAll, click, visit } from '@ember/test-helpers';

import {
  injectTransitionSpies,
  ranWormholeTransition,
  noTransitionsYet,
} from '../helpers/integration';
import $ from 'jquery';

let app;

module('Acceptance | Demos', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    app = this.owner;

    // Conceptually, integration tests shouldn't be digging around in
    // the container. But animations are slippery, and it's easier to
    // just spy on them to make sure they're being run than to try to
    // observe their behavior more directly.
    injectTransitionSpies(app);
  });

  hooks.afterEach(function () {
    $('.liquid-target-container').remove();
  });

  test('target container is cleaned when empty', async function (assert) {
    await visit('/docs');
    await click('#hello-world-button');
    await click('#hello-world-button');

    assert.strictEqual(
      findAll('.default-liquid-destination .liquid-destination-stack').length,
      0,
      "it's empty"
    );
  });

  test('basic liquid-tether works correctly', async function (assert) {
    assert.expect(3);

    await visit('/docs');
    noTransitionsYet(app, assert);

    await click('#hello-world-button');
    assert.strictEqual(
      findAll('.default-liquid-destination .liquid-wormhole-element').length,
      1,
      'it exists'
    );
    ranWormholeTransition(app, assert, 'fade-down');
  });

  test('tethers can determine context with stacks', async function (assert) {
    assert.expect(4);

    await visit('/docs/stacks');

    await click('#animation-with-context-button');
    ranWormholeTransition(app, assert, 'fade');

    await click('[data-test-next]');
    ranWormholeTransition(app, assert, 'to-left');

    await click('[data-test-back]');
    ranWormholeTransition(app, assert, 'to-right');

    await click('[data-test-cancel]');
    ranWormholeTransition(app, assert, 'fade');
  });

  test('routed tethers can determine context with stacks', async function (assert) {
    assert.expect(4);

    await visit('/docs/routed-tethers/step-one');
    ranWormholeTransition(app, assert, 'fade');

    await visit('/docs/routed-tethers/step-two');
    ranWormholeTransition(app, assert, 'to-left');

    await visit('/docs/routed-tethers/step-one');
    ranWormholeTransition(app, assert, 'to-right');

    await visit('/docs');
    ranWormholeTransition(app, assert, 'fade');
  });

  test('clickable overlay responds and has correct class', async function (assert) {
    assert.expect(3);

    await visit('/docs/stacks');

    await click('#animation-with-context-button');
    ranWormholeTransition(app, assert, 'fade');
    assert.strictEqual(findAll('.modal-backdrop').length, 1, 'overlay exists');

    await click('.modal-backdrop');
    ranWormholeTransition(app, assert, 'fade');
  });
});
