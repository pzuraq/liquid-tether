this.transition(
  target('modal-dialog'),
  this.toValue(({ index: newIndex }, { index: oldIndex }) => newIndex > oldIndex),
  this.use('tether', ['to-left', options]),
  this.reverse('tether', ['to-right', options])
);

this.transition(
  target('modal-dialog'),
  this.toValue(({ index }) => index === 1),
  this.use('tether', 'fade', 'fade')
);

this.transition(
  target('modal-dialog'),
  this.toValue(({ index }) => !index),
  this.use('tether', 'fade', 'fade')
);
