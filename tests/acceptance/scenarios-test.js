import moduleForAcceptance from '../helpers/module-for-acceptance';
import { injectTransitionSpies } from '../helpers/integration';

moduleForAcceptance('Acceptance | Scenarios', {
  beforeEach() {

    // Conceptually, integration tests shouldn't be digging around in
    // the container. But animations are slippery, and it's easier to
    // just spy on them to make sure they're being run than to try to
    // observe their behavior more directly.
    injectTransitionSpies(this.application);
  }
});

test('components are not destroyed until animation has finished', function(assert) {
  visit('/scenarios/component-in-tether');

  andThen(() => {
    find('button:contains(Toggle)').click();
    assert.equal(find('.liquid-wormhole-element').text().trim(), 'testing', 'component markup still exists');
  });
});

test('nested tethers work properly', function(assert) {
  visit('/scenarios/nested-tethers');

  click('button');

  andThen(() => {
    const redbox = find('.red-box');
    const greenbox = find('.green-box');
    const bluebox = find('.blue-box');
    const yellowbox = find('.yellow-box');

    const redboxOffset = redbox.offset();
    const greenboxOffset = greenbox.offset();
    const blueboxOffset = bluebox.offset();
    const yellowboxOffset = yellowbox.offset();

    const greenboxHeight = greenbox.outerHeight();
    const redboxHeight = redbox.outerHeight();
    const blueboxHeight = bluebox.outerHeight();

    assert.ok(withinTolerance(greenboxOffset.top + greenboxHeight, redboxOffset.top), 'redbox vertical pos within tolerance');
    assert.ok(withinTolerance(greenboxOffset.left, redboxOffset.left), 'redbox horizontal pos within tolerance');

    assert.ok(withinTolerance(redboxOffset.top + redboxHeight, blueboxOffset.top), 'bluebox vertical pos within tolerance');
    assert.ok(withinTolerance(redboxOffset.left, blueboxOffset.left), 'bluebox horizontal pos within tolerance');

    assert.ok(withinTolerance(blueboxOffset.top + blueboxHeight, yellowboxOffset.top), 'yellowbox vertical pos within tolerance');
    assert.ok(withinTolerance(blueboxOffset.left, yellowboxOffset.left), 'yellowbox horizontal pos within tolerance');
  });
});

test('stacked tethers only shows one tether at a time', function(assert) {
  visit('/scenarios/multiple-tethers');

  andThen(() => {
    assert.equal(find('.default-liquid-destination').text().trim(), '456');
  });
});

test('destination container has correct class if wormholes are present', function(assert) {
  assert.ok(find('.default-liquid-destination.has-wormholes').length === 0, 'No wormholes class');

  visit('/scenarios/multiple-tethers');

  andThen(() => {
    assert.ok(find('.default-liquid-destination.has-wormholes').length > 0, 'Has wormholes class');
  });
});


function withinTolerance(offset1, offset2) {
  return Math.abs(offset1 - offset2) <= 3;
}
