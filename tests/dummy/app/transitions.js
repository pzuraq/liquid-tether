import { target } from 'liquid-tether';

const options = {
  duration: 1500,
  easing: 'easeInOutQuint'
};

export default function() {
  this.transition(
    target('hello-world'),
    this.use('tether', ['fade-left', { duration: 400, easing: [600, 22] }])
  );

  /* Modal Examples */

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

  /* Flyto Example */

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

  /* Flyout Example */

  this.transition(
    target('flyout'),
    this.toValue(({ index }) => index === 1),
    this.use('explode', {
      pick: '.flyout',
      use: ['to-left', options]
    }, {
      pick: '.modal-backdrop',
      use: 'fade'
    }),
    this.reverse('explode', {
      pick: '.flyout',
      use: ['to-right', options]
    }, {
      pick: '.modal-backdrop',
      use: 'fade'
    })
  );

  /* Scenarios */

  this.transition(
    target('component-in-tether'),
    this.use('tether', ['fade', options])
  );
}
