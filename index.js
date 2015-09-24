/*jshint node: true */
'use strict';

var path = require('path');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'liquid-tether',

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

    if (app.import) {
      this.importDependencies(app);
    }
  },

  importDependencies: function(app) {
    app.import('vendor/tether/tether.js');
  }
};
