import { onOpenTether } from 'liquid-tether';

const options = { duration: 500, easing: [200, 22] };

export default function() {
  this.transition(
    this.hasClass('hello-world'),
    this.use('fade-left', { duration: 400, easing: [600, 22] })
  );

  /* Modal Examples */

  this.transition(
    this.matchSelector('#my-modal'),
    this.toValue((toValue, fromValue) => toValue === null || fromValue === null),
    this.use('fade')
  );

  this.transition(
    this.matchSelector('#my-modal'),
    this.toValue((toValue, fromValue) => toValue && fromValue && toValue.index > fromValue.index),
    this.use('to-left', options),
    this.reverse('to-right', options)
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

  this.transition(
    this.hasClass('orange-box'),
    this.use('to-left', { duration: 400, easing: [200, 16] })
  );
}
