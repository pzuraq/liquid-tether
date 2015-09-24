import explode from './explode';

export default function tether(tetherUse, overlayUse) {
  const transitions = [];
  transitions.push({
    pick: '.liquid-tether > :first-child',
    use: tetherUse
  });

  if (overlayUse) {
    transitions.unshift({
      pick: '.liquid-tether-overlay',
      use: overlayUse
    });
  }

  return explode.apply(this, transitions);
}
