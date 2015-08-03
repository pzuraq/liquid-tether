/* global sinon */
import Ember from 'ember';

function transitionMap(app) {
  return app.__container__.lookup('service:liquid-fire-transitions');
}

function transitionName(name) {
  return sinon.match(function(value) {
    return value.animation ? value.animation.name === name : false;
  }, 'expected transition ' + name);
}

function tetherTransitionName(name) {
  return sinon.match(function(value) {
    if (value.animation) {
      return Array.isArray(value.animation.args[0]) ? value.animation.args[0][0] === name : value.animation.args[0] === name;
    }
  }, 'expected transition ' + name);
}

function overlayTransitionName(name) {
  return sinon.match(function(value) {
    if (value.animation) {
      return Array.isArray(value.animation.args[1]) ? value.animation.args[1][0] === name : value.animation.args[1] === name;
    }
  }, 'expected transition ' + name);
}

Ember.Test.registerHelper(
  'ranTransition',
  function(app, name) {
    ok(transitionMap(app).transitionFor.returned(transitionName(name)), `expected transition ${name}`);
  });

Ember.Test.registerHelper(
  'ranTetherTransition',
  function(app, name) {
    ok(transitionMap(app).transitionFor.returned(tetherTransitionName(name)), `expected transition ${name}`);
  }
);

Ember.Test.registerHelper(
  'ranOverlayTransition',
  function(app, name) {
    ok(transitionMap(app).transitionFor.returned(overlayTransitionName(name)), `expected transition ${name}`);
  }
);

Ember.Test.registerHelper(
  'noTransitionsYet',
  function(app) {
    var tmap = transitionMap(app);
    var ranTransitions = Ember.A(tmap.transitionFor.returnValues);
    ok(!ranTransitions.any((transition) => transition.animation !== tmap.defaultAction()), 'expected no transitions');
  }
);

export function injectTransitionSpies(app) {
  var tmap = transitionMap(app);
  sinon.spy(tmap, 'transitionFor');
}


export function classFound(name) {
  equal(find('.'+name).length, 1, 'found ' + name);
}

export function clickWithoutWaiting(selector, text) {
  // The runloop ensures that all the synchronous action happens, but
  // we don't wait around for async stuff. This is used to test
  // animation interruptions, for example.
  Ember.run(() => {
    find(selector).filter(function() {
      return $(this).text() === text;
    }).click();
  });
}
