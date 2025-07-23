import sinon from 'sinon';
import { A } from '@ember/array';

import { getContext } from '@ember/test-helpers';

function transitionMap(context) {
  return context.owner.lookup('service:liquid-fire-transitions');
}

function transitionName(name) {
  return sinon.match(function (value) {
    return value.animation ? value.animation.name === name : false;
  }, 'expected transition ' + name);
}

export function setupTransitionTest(hooks) {
  hooks.beforeEach(function (assert) {
    const context = getContext();
    console.log({ context });
    const tmap = transitionMap(context);
    sinon.spy(tmap, 'transitionFor');
    assert.ranTransition = function ranTransition(name) {
      this.ok(
        transitionMap(context).transitionFor.returned(transitionName(name)),
        'expected transition ' + name
      );
    };
    assert.noTransitionsYet = function noTransitionsYet() {
      const tmap = transitionMap(context);
      const ranTransitions = A(tmap.transitionFor.returnValues);
      return !ranTransitions.any(
        (transition) => transition.animation !== tmap.defaultAction()
      );
    };
  });
}

export function classFound(assert, name) {
  assert.dom('.' + name).exists({ count: 1 }, 'found ' + name);
}

function wormholeTransitionName(name) {
  return sinon.match(function (value) {
    if (value.animation && value.animation.name === 'wormhole') {
      return value.animation.args[0].use.name === name;
    }

    return false;
  }, 'expected transition ' + name);
}

export function ranWormholeTransition(app, assert, name) {
  const context = getContext();
  debugger;
  assert.ok(
    transitionMap(context).transitionFor.returned(wormholeTransitionName(name)),
    `expected transition ${name}`
  );
}

export function noTransitionsYet(app, assert) {
  const context = getContext();
  var tmap = transitionMap(context);
  var ranTransitions = A(tmap.transitionFor.returnValues);
  assert.ok(
    !ranTransitions.any(
      (transition) => transition.animation !== tmap.defaultAction()
    ),
    'expected no transitions'
  );
}

export function injectTransitionSpies(app) {
  const context = getContext();
  var tmap = transitionMap(context);
  sinon.spy(tmap, 'transitionFor');
}
