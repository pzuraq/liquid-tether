export default function() {
  this.transition(
    this.hasClass('modal-outlet'),
    this.toValue((toValue) => {
      return toValue.index === 0;
    }),
    this.use('fade'),
    this.reverse('fade')
  );

  this.transition(
    this.hasClass('modal-outlet'),
    this.toValue((toValue, fromValue) => {
      return toValue.index > fromValue.index;
    }),
    this.use('fly-to'),
    this.reverse('fly-to')
  );

  this.transition(
    this.hasClass('liquid-tether'),
    this.use('fade-up')
  );
}
