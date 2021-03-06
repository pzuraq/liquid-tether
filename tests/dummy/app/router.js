import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('docs', function() {
    this.route('parameters');
    this.route('stacks');
    this.route('routed-tethers', function() {
      this.route('step-one');
      this.route('step-two');
    });
    this.route('dynamic-targets');
    this.route('destinations');
    this.route('components');
  });
  this.route('upgrading');
  this.route('scenarios', function() {
    this.route('multiple-tethers');
    this.route('component-in-tether');
    this.route('nested-tethers');
  });
});

export default Router;
