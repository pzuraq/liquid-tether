/*jshint node: true */
'use strict';

var path = require('path');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'liquid-tether',

  init: function() {
    if (this._super.init) {
      this._super.init.apply(this, arguments);
    }

    // Shim this.import for Engines support
    if (!this.import) {
      // Shim from https://github.com/ember-cli/ember-cli/blob/5d64cfbf1276cf1e3eb88761df4546c891b5efa6/lib/models/addon.js#L387
      this._findHost = function findHostShim() {
        var current = this;
        var app;

        // Keep iterating upward until we don't have a grandparent.
        // Has to do this grandparent check because at some point we hit the project.
        do {
          app = current.app || app;
        } while (current.parent.parent && (current = current.parent));

        return app;
      };
      // Shim from https://github.com/ember-cli/ember-cli/blob/5d64cfbf1276cf1e3eb88761df4546c891b5efa6/lib/models/addon.js#L443
      this.import = function importShim(asset, options) {
        var app = this._findHost();
        app.import(asset, options);
      };
    }
  },

  treeForVendor: function(tree) {
    var tetherPath = path.dirname(require.resolve('tether'));
    var tetherTree = new Funnel(this.treeGenerator(tetherPath), {
      srcDir: '/',
      destDir: 'tether'
    });
    return mergeTrees([tree, tetherTree]);
  },

  included: function(app) {
    this._super.included(app);
    this.import('vendor/tether/tether.js');
  }
};
