export default function() {
  this.transition(
    this.hasClass('liquid-tether'),
    this.use('fade-up')
  );

  this.transition(
    this.hasClass('ui-modal'),
    this.toValue((toValue) => {
      return toValue.index === 0;
    }),
    this.use('fade'),
    this.reverse('fade')
  );

  this.transition(
    this.hasClass('ui-modal'),
    this.toValue((toValue, fromValue) => {
      return toValue.index > fromValue.index;
    }),
    this.use('to-up'),
    this.reverse('to-down')
  );


}
