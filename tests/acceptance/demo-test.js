/* global ranTetherTransition, ranOverlayTransition, noTransitionsYet */
import { startApp, destroyApp } from '../helpers/app-lifecycle';
import { injectTransitionSpies } from '../helpers/integration';

let app;

module('Acceptance: Demos', {
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

test('target container exists and is empty on load', function() {
  visit('/examples');

  andThen(() => {
    noTransitionsYet();
    equal(find('.liquid-target-container').length, 1, 'it exists');
    equal(find('.liquid-target-container > .liquid-target').length, 0, 'it\'s empty');
  });
});

test('target container is cleaned when empty', function() {
  visit('/examples');
  click('#hello-world-button');
  click('#hello-world-button');

  andThen(() => {
    equal(find('.liquid-target-container > .liquid-target').length, 0, 'it\'s empty');
  });
});

test('basic liquid-tether works correctly', function() {
  visit('/examples');
  noTransitionsYet();

  click('#hello-world-button');
  andThen(() => {
    equal(find('.liquid-target-container .liquid-tether').length, 1, 'it exists');
    ranTetherTransition('fade-left');
  });
});

test('tethers can determine context', function() {
  visit('/examples');

  click('#animation-with-context-button');
  andThen(() => ranTetherTransition('fade'));
  andThen(() => ranOverlayTransition('fade'));

  click(':contains(Next)');
  andThen(() => ranTetherTransition('to-left'));

  click(':contains(Back)');
  andThen(() => ranTetherTransition('to-right'));

  click(':contains(Cancel)');
  andThen(() => ranTetherTransition('fade'));
  andThen(() => ranOverlayTransition('fade'));
});

test('routed tethers can determine context', function() {
  visit('/examples/step-one');
  andThen(() => ranTetherTransition('fade'));
  andThen(() => ranOverlayTransition('fade'));

  visit('/examples/step-two');
  andThen(() => ranTetherTransition('to-left'));

  visit('/examples/step-one');
  andThen(() => ranTetherTransition('to-right'));

  visit('/examples');
  andThen(() => ranTetherTransition('fade'));
  andThen(() => ranOverlayTransition('fade'));
});

test('clickable overlay responds and has correct class', function() {
  visit('/examples');

  click('#animation-with-context-button');
  andThen(() => ranTetherTransition('fade'));
  andThen(() => ranOverlayTransition('fade'));
  andThen(() => {
    equal(find('.liquid-tether-overlay.clickable').length, 1, 'clickable overlay exists');
  });

  click('.liquid-tether-overlay.clickable');
  andThen(() => ranTetherTransition('fade'));
  andThen(() => ranOverlayTransition('fade'));
});
