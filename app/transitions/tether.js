import explode from './explode';

export default function tether(transition, options = {}) {
  return explode.apply(this, [{
    pick: '.liquid-tether-element > :first-child',
    use: [transition, options]
  }]);
}
