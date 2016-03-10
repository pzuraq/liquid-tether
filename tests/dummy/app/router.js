import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
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
  });
});

export default Router;
