import Constraint from 'liquid-fire/constraint';

export function target(name) {
  return new Constraint('parentElementClass', (className) => {
    if (className.match('-liquid-target')) {
      const targetName = className.replace('-liquid-target', '');
      return targetName.match(name);
    }
  });
}

export function onOpenTether() {
  return new Constraint('newValue', ({ emptyTarget }) => !emptyTarget);
}

export function onCloseTether() {
  return new Constraint('newValue', ({ emptyTarget }) => emptyTarget);
}
