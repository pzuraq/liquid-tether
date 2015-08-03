// app/transitions.js
export default function() {
  this.transition(
    target('my-target'),
    toValue(({ step }) => step === 1),
    use('tether', 'fade')
  );
}
