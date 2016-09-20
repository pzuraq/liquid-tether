import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('basics');
  this.route('examples', function() {
    this.route('step-one');
    this.route('step-two');
  });
  this.route('scenarios', function() {
    this.route('multiple-tethers');
    this.route('component-in-tether');
    this.route('nested-tethers');
    this.route('multiple-targets-same-animation');
  });
});

export default Router;
