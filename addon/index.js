import Constraint from 'liquid-fire/constraint';

export function target(name) {
  return new Constraint('parentElementClass', `${name}`);
}


export function onOpenTether() {
  return new Constraint('newValue', (value) => value !== null);
}

export function onCloseTether() {
  return new Constraint('newValue', (value) => value === null);
}
