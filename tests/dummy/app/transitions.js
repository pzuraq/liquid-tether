const options = { duration: 800, easing: [200, 22] };

export default function () {
  this.transition(
    this.hasClass('hello-world'),
    this.use('fade-down', { duration: 400, easing: [600, 22] })
  );

  /* Modal Docs */

  this.transition(
    this.matchSelector('#modal-backdrop'),
    this.toValue(
      (toValue, fromValue) => toValue === null || fromValue === null
    ),
    this.use('fade')
  );

  this.transition(
    this.matchSelector('#modal-dialog'),
    this.toValue(
      (toValue, fromValue) => toValue === null || fromValue === null
    ),
    this.use('fade')
  );

  this.transition(
    this.matchSelector('#modal-dialog'),
    this.toValue(
      (toValue, fromValue) => toValue && fromValue && toValue > fromValue
    ),
    this.use('to-left', options),
    this.reverse('to-right', options)
  );

  /* Dynamic Targets Example */

  this.transition(
    this.hasClass('tour'),
    this.toValue(
      (toValue, fromValue) => toValue === null || fromValue === null
    ),
    this.use('fade')
  );

  this.transition(this.hasClass('tour'), this.use('fly-to'));

  /* Scenarios */

  this.transition(
    this.hasClass('component-in-tether'),
    this.use('fade', options)
  );

  this.transition(
    this.hasClass('orange-box'),
    this.use('to-left', { duration: 400, easing: [200, 16] })
  );
}
