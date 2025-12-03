Oftentimes modals should appear in the context of a route. If that's the case
in your application, it's as simple as creating a route and template with just
a `liquid-tether`.

<div class="example-button-container">
  <LinkTo @route="docs.routed-tethers.step-one" class="btn btn-primary btn-embossed">
    Open Routed Tether
  </LinkTo>

{{outlet}}

</div>

```
<LinkTo @route="docs.routed-tethers.step-one">
  Open Routed Tether
</LinkTo>

{{outlet}}
```

```
<!-- step-one.hbs -->
{{#liquid-tether
  stack="modal-dialog"
  index=1

  target="document.body"
  targetModifier="visible"
  attachment="middle center"
}}
  ...
{{/liquid-tether}}
```

```
<!-- step-two.hbs -->
{{#liquid-tether
  stack="modal-dialog"
  index=2

  target="document.body"
  targetModifier="visible"
  attachment="middle center"
}}
  ...
{{/liquid-tether}}
```

```
this.transition(
  this.matchSelector('#modal-backdrop'),
  this.toValue((toValue, fromValue) => toValue === null || fromValue === null),
  this.use('fade')
);

this.transition(
  this.matchSelector('#modal-dialog'),
  this.toValue((toValue, fromValue) => toValue === null || fromValue === null),
  this.use('fade')
);

this.transition(
  this.matchSelector('#modal-dialog'),
  this.toValue((toValue, fromValue) => {
    return toValue && fromValue && toValue.index > fromValue.index;
  }),
  this.use('to-left', options),
  this.reverse('to-right', options)
);

```
