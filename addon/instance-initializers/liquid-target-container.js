export function initialize(instance) {
  const liquidTargetContainer = instance.container.lookupFactory('component:liquid-target-container').create();

  liquidTargetContainer.appendTo(instance.rootElement);
}

export default {
  name: 'liquid-target-container',
  initialize: initialize
};
