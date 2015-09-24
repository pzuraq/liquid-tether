import Constraint from 'liquid-fire/constraint';

export function target(name) {
  return new Constraint('parentElementClass', `${name}-liquid-target`);
}
