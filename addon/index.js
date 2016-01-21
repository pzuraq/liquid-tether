import Constraint from 'liquid-fire/constraint';

export function target(name) {
  return new Constraint('parentElementClass', `${name}-liquid-target`);
}

export function onOpenTether() {
  return new Constraint('newValue', ({ emptyTether }) => !emptyTether);
}

export function onCloseTether() {
  return new Constraint('newValue', ({ emptyTether }) => emptyTether);
}
