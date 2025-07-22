import $ from 'jquery';
import { run } from '@ember/runloop';
import Application from '../../app';
import config from '../../config/environment';

export default startApp;

export function startApp(attrs) {
  let attributes = { ...config.APP };
  attributes.autoboot = true;
  attributes = { ...attributes, ...attrs }; // use defaults, but you can override;

  return run(() => {
    let application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
    return application;
  });
}

export function destroyApp(app) {
  run(app, 'destroy');
  $('.liquid-target-container').remove();
}
