this.transition(
  target('flyto-dialog'),
  this.toValue(({ index }) => !index),
  this.use('tether', ['to-left', options], 'fade')
);

this.transition(
  target('flyto-dialog'),
  this.toValue(({ index: newIndex }, { index: oldIndex }) => newIndex > oldIndex),
  this.use('tether', ['fly-to', options]),
  this.reverse('tether', ['fly-to', options])
);

this.transition(
  target('flyto-dialog'),
  this.toValue(({ index }) => index === 1),
  this.use('tether', ['to-right', options], 'fade')
);
