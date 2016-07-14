/* global ranTetherTransition */
import { startApp, destroyApp } from '../helpers/app-lifecycle';
import { injectTransitionSpies } from '../helpers/integration';

let app;

module('Acceptance: Scenarios', {
  setup: function() {
    app = startApp();

    // Conceptually, integration tests shouldn't be digging around in
    // the container. But animations are slippery, and it's easier to
    // just spy on them to make sure they're being run than to try to
    // observe their behavior more directly.
    injectTransitionSpies(app);
  },

  teardown: function() {
    destroyApp(app);
  }
});

test('components are not destroyed until animation has finished', function() {
  visit('/scenarios/component-in-tether');

  andThen(() => {
    find('button:contains(Toggle)').click();
    equal(find('.velocity-animating').text().trim(), 'testing', 'component markup still exists');
  });
});

test('nested tethers work properly', function() {
  visit('/scenarios/nested-tethers');

  andThen(() => {
    const redbox = find('.red-box');
    const greenbox = find('.green-box');
    const bluebox = find('.blue-box');

    const redboxOffset = redbox.offset();
    const greenboxOffset = greenbox.offset();
    const blueboxOffset = bluebox.offset();

    const greenboxHeight = greenbox.outerHeight();
    const redboxHeight = redbox.outerHeight();
    const redboxWidth = redbox.outerWidth();

    ok(withinTolerance(greenboxOffset.top + greenboxHeight, redboxOffset.top), 'redbox vertical pos within tolerance');
    ok(withinTolerance(greenboxOffset.left, redboxOffset.left), 'redbox horizontal pos within tolerance');

    ok(withinTolerance(redboxOffset.top + redboxHeight, blueboxOffset.top), 'bluebox vertical pos within tolerance');
    ok(withinTolerance(redboxOffset.left + redboxWidth, blueboxOffset.left), 'bluebox horizontal pos within tolerance');
  });
});

test('target only shows one tether at a time', function() {
  visit('/scenarios/multiple-tethers');

  andThen(() => {
    equal(find('.liquid-target-container').text().trim(), '456');
  });
});

test('container has correct class if targets are present', function() {
  ok(find('.liquid-target-container.has-targets').length === 0, 'No targets class');

  visit('/scenarios/multiple-tethers');

  andThen(() => {
    ok(find('.liquid-target-container.has-targets').length > 0, 'Has targets class');
  });
});

test('multiple targets can use the same animation via regex', function() {
  visit('/scenarios/multiple-targets-same-animation');

  andThen(() => ranTetherTransition('fade'));
  click('.second-tether');
  andThen(() => ranTetherTransition('to-up'));
  click('.third-tether');
  andThen(() => ranTetherTransition('fade'));
});


function withinTolerance(offset1, offset2) {
  return Math.abs(offset1 - offset2) <= 3;
}
