import sinon from 'sinon';
import { A } from '@ember/array';

function transitionMap(app) {
  return app.__container__.lookup('service:liquid-fire-transitions');
}

function wormholeTransitionName(name) {
  return sinon.match(function(value) {
    if (value.animation && value.animation.name === 'wormhole') {
      return value.animation.args[0].use.name === name;
    }

    return false;
  }, 'expected transition ' + name);
}

export function ranWormholeTransition(app, assert, name) {
  assert.ok(transitionMap(app).transitionFor.returned(wormholeTransitionName(name)), `expected transition ${name}`);
}

export function noTransitionsYet(app, assert) {
  var tmap = transitionMap(app);
  var ranTransitions = A(tmap.transitionFor.returnValues);
  assert.ok(!ranTransitions.any((transition) => transition.animation !== tmap.defaultAction()), 'expected no transitions');
}

export function injectTransitionSpies(app) {
  var tmap = transitionMap(app);
  sinon.spy(tmap, 'transitionFor');
}
