/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function() {
  var app = new EmberApp({
    snippetPaths: ['tests/dummy/snippets'],
    snippetSearchPaths: ['app', 'tests/dummy/app', 'addon'],
    sassOptions: {
      includePaths: [
        'bower_components/bootstrap-sass/assets/stylesheets',
        'bower_components/flat-ui-sass/vendor/assets/stylesheets'
      ],
      extension: 'scss'
    }
  });

  app.import('vendor/sinon.js', { type: 'test'});

  return app.toTree();
};
