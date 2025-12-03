At times you may want to animate between different tethers - for a complicated
modal flow, or an onboarding sequence, or something else. You can do this by
specifying a stack name with the `stack` property. New tethers will be pushed onto
an existing stack, and only the most recent tether will be showing. When matching in
`toValue`, `fromValue`, or `betweenValues`, the `value` property of both the
previous tether on the stack and the next one will be passed in. You can pass in
any value you want in the property and match based on that.

The stack name will be applied as the id to the tethers, allow you to match them using
the `matchSelector` helper from liquid-fire.

<div class="example-button-container">
  <button {{on "click" this.openModalDialog}} id="animation-with-context-button" class="btn btn-primary btn-embossed">
    Open Dialog
  </button>
  {{#if this.showFirstModalDialog}}
    {{liquid-wormhole stack="modal-backdrop" class="modal-backdrop"}}
    {{#liquid-tether
      stack="modal-dialog"
      value=1
      target="document.body"
      targetModifier="visible"
      attachment="middle center"
      class="modal-content"
    }}
      <div class="modal-header">
        <h4 class="modal-title">Modal Header</h4>
      </div>
      <div class="modal-body">
        Here's a modal!
      </div>
      <div class="modal-footer">
        <button
          {{on "click" this.closeModalDialog}}
          class="btn btn-default btn-embossed"
          data-test-cancel
        >
          Cancel
        </button>
        <button
          {{on "click" this.nextModalDialog}}
          class="btn btn-primary btn-embossed"
          data-test-next
        >
          Next
        </button>
      </div>
    {{/liquid-tether}}
  {{/if}}
  {{#if this.showSecondModalDialog}}
    {{liquid-wormhole stack="modal-backdrop" class="modal-backdrop"}}
    {{#liquid-tether
      stack="modal-dialog"
      value=2
      target="document.body"
      targetModifier="visible"
      attachment="middle center"
      class="modal-content"
    }}
      <div class="modal-header">
        <h4 class="modal-title">Another Modal</h4>
      </div>
      <div class="modal-body">
        This modal came in from the right instead of fading. The next modal
        will also slide in from the right, while the previous modal will slide
        in from the left, maintaing spacial context.
      </div>
      <div class="modal-footer">
        <button
          {{on "click" this.prevModalDialog}}
          class="btn btn-default btn-embossed"
          data-test-back
        >
          Back
        </button>
        <button
          {{on "click" this.nextModalDialog}}
          class="btn btn-primary btn-embossed"
          data-test-next
        >
          Next
        </button>
      </div>
    {{/liquid-tether}}
  {{/if}}
  {{#if this.showThirdModalDialog}}
    {{liquid-wormhole stack="modal-backdrop" class="modal-backdrop"}}
    {{#liquid-tether
      stack="modal-dialog"
      value=3
      target="document.body"
      targetModifier="visible"
      attachment="middle center"
      class="modal-content"
    }}
      <div class="modal-header">
        <h4 class="modal-title">Another Modal</h4>
      </div>
      <div class="modal-body">
        This is the last modal! It'll fade out when you finish the dialog.
      </div>
      <div class="modal-footer">
        <button
          {{on "click" this.prevModalDialog}}
          class="btn btn-default btn-embossed"
          data-test-back
        >
          Back
        </button>
        <button
          {{on "click" this.closeModalDialog}}
          class="btn btn-primary btn-embossed"
          data-test-finish
        >
          Finish
        </button>
      </div>
    {{/liquid-tether}}
  {{/if}}
</div>

```
<button {{on "click" this.openModalDialog}}>
  Open Dialog
</button>

{{#if this.showFirstModalDialog}}
  {{liquid-wormhole stack="modal-backdrop" class="modal-backdrop"}}
  {{#liquid-tether
    stack="modal-dialog"
    value=1

    target="document.body"
    targetModifier="visible"
    attachment="middle center"

    class="modal-content"
  }}
    ...
  {{/liquid-tether}}
{{/if}}

{{#if this.showSecondModalDialog}}
  {{liquid-wormhole stack="modal-backdrop" class="modal-backdrop"}}
  {{#liquid-tether
    stack="modal-dialog"
    value=2

    target="document.body"
    targetModifier="visible"
    attachment="middle center"

    class="modal-content"
  }}
    ...
  {{/liquid-tether}}
{{/if}}

{{#if this.showThirdModalDialog}}
  {{liquid-wormhole stack="modal-backdrop" class="modal-backdrop"}}
  {{#liquid-tether
    stack="modal-dialog"
    value=3

    target="document.body"
    targetModifier="visible"
    attachment="middle center"

    class="modal-content"
  }}
    ...
  {{/liquid-tether}}
{{/if}}
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
  this.toValue((toValue, fromValue) => return toValue && fromValue && toValue > fromValue),
  this.use('to-left', options),
  this.reverse('to-right', options)
);
```
