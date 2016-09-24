/* global ranWormholeTransition, noTransitionsYet */
import moduleForAcceptance from '../helpers/module-for-acceptance';
import { injectTransitionSpies } from '../helpers/integration';

moduleForAcceptance('Acceptance | Demos', {
  beforeEach() {

    // Conceptually, integration tests shouldn't be digging around in
    // the container. But animations are slippery, and it's easier to
    // just spy on them to make sure they're being run than to try to
    // observe their behavior more directly.
    injectTransitionSpies(this.application);
  }
});

test('target container is cleaned when empty', function() {
  visit('/docs');
  click('#hello-world-button');
  click('#hello-world-button');

  andThen(() => {
    equal(find('.default-liquid-destination .liquid-destination-stack').length, 0, 'it\'s empty');
  });
});

test('basic liquid-tether works correctly', function() {
  visit('/docs');
  noTransitionsYet();

  click('#hello-world-button');
  andThen(() => {
    equal(find('.default-liquid-destination .liquid-wormhole-element').length, 1, 'it exists');
    ranWormholeTransition('fade-down');
  });
});

test('tethers can determine context with stacks', function() {
  visit('/docs/stacks');

  click('#animation-with-context-button');
  andThen(() => ranWormholeTransition('fade'));

  click('button:contains(Next)');
  andThen(() => ranWormholeTransition('to-left'));

  click('button:contains(Back)');
  andThen(() => ranWormholeTransition('to-right'));

  click('button:contains(Cancel)');
  andThen(() => ranWormholeTransition('fade'));
});

test('routed tethers can determine context with stacks', function() {
  visit('/docs/routed-tethers/step-one');
  andThen(() => ranWormholeTransition('fade'));

  visit('/docs/routed-tethers/step-two');
  andThen(() => ranWormholeTransition('to-left'));

  visit('/docs/routed-tethers/step-one');
  andThen(() => ranWormholeTransition('to-right'));

  visit('/docs');
  andThen(() => ranWormholeTransition('fade'));
});

test('clickable overlay responds and has correct class', function() {
  visit('/docs/stacks');

  click('#animation-with-context-button');
  andThen(() => ranWormholeTransition('fade'));
  andThen(() => {
    equal(find('.modal-backdrop').length, 1, 'overlay exists');
  });

  click('.modal-backdrop');
  andThen(() => ranWormholeTransition('fade'));
});
