// app/transitions.js
export default function() {
  this.transition(
    target('my-target'),
    onOpenTether(),
    this.use('tether', 'to-up'),
    this.reverse('tether', 'to-down')
  );
}
