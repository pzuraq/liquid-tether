import { module, test } from 'qunit';

import { injectTransitionSpies } from '../helpers/integration';

import { setupApplicationTest } from 'ember-qunit';
import { find, findAll, click, visit } from '@ember/test-helpers';
import $ from 'jquery';

let app;

module('Acceptance | Scenarios', function (hooks) {
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

  test('components are not destroyed until animation has finished', async function (assert) {
    await visit('/scenarios/component-in-tether');

    find('[data-test-toggle]').click();
    assert.equal(
      find('.liquid-wormhole-element').textContent.trim(),
      'testing',
      'component markup still exists'
    );
  });

  test('nested tethers work properly', async function (assert) {
    await visit('/scenarios/nested-tethers');

    await click('button');

    const redbox = find('.red-box').getBoundingClientRect();
    const greenbox = find('.green-box').getBoundingClientRect();
    const bluebox = find('.blue-box').getBoundingClientRect();
    const yellowbox = find('.yellow-box').getBoundingClientRect();

    assert.ok(
      withinTolerance(greenbox.top + greenbox.height, redbox.top),
      'redbox vertical pos within tolerance'
    );
    assert.ok(
      withinTolerance(greenbox.left, redbox.left),
      'redbox horizontal pos within tolerance'
    );

    assert.ok(
      withinTolerance(redbox.top + redbox.height, bluebox.top),
      'bluebox vertical pos within tolerance'
    );
    assert.ok(
      withinTolerance(redbox.left, bluebox.left),
      'bluebox horizontal pos within tolerance'
    );

    assert.ok(
      withinTolerance(bluebox.top + bluebox.height, yellowbox.top),
      'yellowbox vertical pos within tolerance'
    );
    assert.ok(
      withinTolerance(bluebox.left, yellowbox.left),
      'yellowbox horizontal pos within tolerance'
    );
  });

  test('stacked tethers only shows one tether at a time', async function (assert) {
    await visit('/scenarios/multiple-tethers');

    assert.equal(find('.default-liquid-destination').textContent.trim(), '456');
  });

  test('destination container has correct class if wormholes are present', async function (assert) {
    assert.strictEqual(
      findAll('.default-liquid-destination.has-wormholes').length,
      0,
      'No wormholes class'
    );

    await visit('/scenarios/multiple-tethers');

    assert.ok(
      findAll('.default-liquid-destination.has-wormholes').length > 0,
      'Has wormholes class'
    );
  });

  function withinTolerance(offset1, offset2) {
    return Math.abs(offset1 - offset2) <= 3;
  }
});
