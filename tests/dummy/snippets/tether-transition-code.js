this.use('explode', {
  pick: '.liquid-tether > :first-child',
  use: tetherTransition
}, {
  pick: '.liquid-tether-overlay',
  use: overlayTransition
});
