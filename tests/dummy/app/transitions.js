import { target, onOpenTether } from 'liquid-tether';

const options = { duration: 500, easing: [200, 22] };

export default function() {
  this.transition(
    this.hasClass('hello-world'),
    onOpenTether(),
    this.use('tether', 'fade-left', { duration: 400, easing: [600, 22] })
  );

  /* Modal Examples */

  this.transition(
    this.hasClass('modal-content'),
    this.toValue(({ index }) => !index),
    this.use('fade')
  );

  this.transition(
    this.hasClass('modal-content'),
    this.toValue(({ index: newIndex }, { index: oldIndex }) => newIndex > oldIndex),
    this.use('to-left', options),
    this.reverse('to-right', options)
  );

  this.transition(
    this.hasClass('modal-content'),
    this.toValue(({ index }) => index === 1),
    this.use('fade')
  );

  /* Flyto Example */

  this.transition(
    this.hasClass('flyto'),
    this.toValue(({ index }) => !index),
    this.use('to-left', options)
  );

  this.transition(
    this.hasClass('flyto'),
    this.toValue(({ index: newIndex }, { index: oldIndex }) => newIndex > oldIndex),
    this.use('tether', 'fly-to', options),
    this.reverse('tether', 'fly-to', options)
  );

  this.transition(
    this.hasClass('flyto'),
    this.toValue(({ index }) => index === 1),
    this.use('to-right', options)
  );

  /* Flyout Example */

  this.transition(
    this.hasClass('flyout'),
    onOpenTether(),
    this.use('explode', {
      pick: '.flyout',
      use: ['to-left', { duration: 400, easing: [200, 22] }]
    }, {
      pick: '.modal-backdrop',
      use: 'fade'
    }),
    this.reverse('explode', {
      pick: '.flyout',
      use: ['to-right', { duration: 400, easing: [200, 22] }]
    }, {
      pick: '.modal-backdrop',
      use: 'fade'
    })
  );

  /* Scenarios */

  this.transition(
    this.hasClass('component-in-tether'),
    this.use('tether', ['fade', options])
  );

  this.transition(
    this.hasClass(/multiple-[1,3]/),
    this.use('tether', ['fade', options])
  );

  this.transition(
    this.hasClass(/multiple-2/),
    this.use('tether', ['to-up', options])
  );
}
