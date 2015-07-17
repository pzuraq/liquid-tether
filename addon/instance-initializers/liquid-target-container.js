export function initialize(instance) {
  const liquidTargetContainer = instance.container.lookupFactory('component:liquid-target-container').create();

  liquidTargetContainer.append();

  instance.container.lookup('service:liquid-target').addDefaultTarget('liquid-tether');
}

export default {
  name: 'liquid-target-container',
  initialize: initialize
};
