// app/transitions.js
export default function() {
  this.transition(
    target('my-target'),
    this.toValue(({ step }) => step === 1),
    this.use('tether', 'fade')
  );
}
