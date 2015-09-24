export function initialize(instance) {
  const liquidTargetContainer = instance.container.lookup('component:liquid-target-container');

  liquidTargetContainer.appendTo(instance.rootElement);
}

export default {
  name: 'liquid-target-container',
  initialize: initialize
};
