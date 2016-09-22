# Examples

##  Hello World

Below is the basic Hello World example seen on the front page. The template
code is embedded directly in the context of this page, hidden by an
<code>if</code> statement. Toggling that <code>if</code> inserts the element
into the DOM, which triggers the animation.

<div class="example-button-container">
  <button {{action 'toggleHello'}} id="hello-world-button" class="btn btn-primary btn-embossed">
    Hello, World!
  </button>

  {{#if showHello}}
    {{#liquid-tether
      target="#hello-world-button"
      attachment="middle left"
      targetAttachment="middle right"

      class="hello-world"
    }}
      <div id="hello-world-popover" class="popover right">
        <div class="arrow"></div>
        <div class="popover-title">
          Hello!
        </div>
      </div>
    {{/liquid-tether}}
  {{/if}}
</div>

```
{{#liquid-tether
  target="#hello-world-button"
  attachment="middle left"

  class="hello-world"
}}
  <div id="hello-world-popover" class="popover right">
    <div class="arrow"></div>
    <div class="popover-title">
      Hello!
    </div>
  </div>
{{/liquid-tether}}
```

```
this.transition(
  this.hasClass('hello-world'),
  this.use('tether', 'fade-left', { duration: 400, easing: [600, 22] })
);
```

## Test

<div style="height: 200px; overflow: scroll;">
  <div id="something" style="height: 2000px">
    {{#liquid-tether
      target="#something"
      attachment="middle center"
      constraints=exampleConstraints
      class="blue-box"
    }}
      Testing123
    {{/liquid-tether}}
  </div>
</div>

## Animation With Context

This example shows different animations based on context. It uses the index
constraint shorthands to differentiate between transitioning to the first
modal, in between modals, and from the last modal. This way we can animate
without losing spacial context from the perspective of the user (e.g. if a
modal moves out toward the left side using <code>to-left</code>, the in
reverse the modal with move in from the left side using <code>to-right</code>)

<div class="example-button-container">
  <button {{action "openModalDialog"}} id="animation-with-context-button" class="btn btn-primary btn-embossed">
    Open Dialog
  </button>

  {{#if showFirstModalDialog}}
    {{liquid-wormhole stack="modal-backdrop" class="modal-backdrop"}}
    {{#liquid-tether
      stack="modal"
      id="my-modal"
      index=1
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
        <button {{action "closeModalDialog"}} class="btn btn-default btn-embossed">Cancel</button>
        <button {{action "nextModalDialog"}} class="btn btn-primary btn-embossed">Next</button>
      </div>
    {{/liquid-tether}}
  {{/if}}

  {{#if showSecondModalDialog}}
    {{liquid-wormhole stack="modal-backdrop" class="modal-backdrop"}}
    {{#liquid-tether
      stack="modal"
      id="my-modal"
      index=2
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
        <button {{action "prevModalDialog"}} class="btn btn-default btn-embossed">Back</button>
        <button {{action "nextModalDialog"}} class="btn btn-primary btn-embossed">Next</button>
      </div>
    {{/liquid-tether}}
  {{/if}}

  {{#if showThirdModalDialog}}
    {{liquid-wormhole stack="modal-backdrop" class="modal-backdrop"}}
    {{#liquid-tether
      stack="modal"
      id="my-modal"
      index=3
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
        <button {{action "prevModalDialog"}} class="btn btn-default btn-embossed">Back</button>
        <button {{action "closeModalDialog"}} class="btn btn-primary btn-embossed">Finish</button>
      </div>
    {{/liquid-tether}}
  {{/if}}
</div>


<!-- {{#example-pane}}
  <div class="template">
    {{code-snippet name="animation-with-context.hbs"}}
  </div>
  <div class="js">
    {{code-snippet name="animation-with-context.js"}}
  </div>
  <div class="transitions">
    {{code-snippet name="animation-with-context-transitions.js"}}
  </div>
{{/example-pane}}

## Routed Tethers

Oftentimes modals should appear in the context of a route. If that's the case
in your application, it's as simple as creating a route and template with just
a `liquid-tether`.

<div class="example-button-container">
  {{#link-to "examples.step-one" class="btn btn-primary btn-embossed"}}
    Open Routed Modal
  {{/link-to}}

  {{outlet}}
</div>


<!-- {{#example-pane}}
  <div class="template">
    {{code-snippet name="routed-modal.hbs"}}
  </div>
{{/example-pane}} -->

## Moving Modals

All of the standard Liquid Fire animations work with Liquid Tether out of the
box, meaning the `fly-to` animation can be used to animate tethers
around the page!

<!-- <div class="example-button-container">
  <button {{action "openFlytoDialog"}} id="moving-modals" class="btn btn-primary btn-embossed">Open Moving Modal</button>

  {{#if showFirstFlytoDialog}}
    {{liquid-wormhole class="modal-backdrop"}}

    {{#liquid-tether
      stack="flyto"
      index=1

      target="document.body"
      targetModifier="visible"
      attachment="top left"
      targetAttachment="top left"
      offset="-20px -20px"

      class="modal-content"}}
      <div class="modal-header">
        <h4 class="modal-title">Modal Header</h4>
      </div>

      <div class="modal-body">
        <p>Here's a modal!</p>
      </div>

      <div class="modal-footer">
        <button {{action "closeFlytoDialog"}} class="btn btn-default btn-embossed">Cancel</button>
        <button {{action "nextFlytoDialog"}} class="btn btn-primary btn-embossed">Next</button>
      </div>
    {{/liquid-tether}}
  {{/if}}

  {{#if showSecondFlytoDialog}}
    {{#liquid-tether
      stack="flyto"
      index=2

      target="document.body"
      targetModifier="visible"
      attachment="top right"
      targetAttachment="top right"
      offset="-20px 40px"

      class="modal-content"}}
      <div class="modal-header">
        <h4 class="modal-title">Another Modal</h4>
      </div>

      <div class="modal-body">
        <p>
          This modal came in from the right instead of fading. The next modal
          will also slide in from the right, while the previous modal will slide
          in from the left, maintaing spacial context.
        </p>
      </div>

      <div class="modal-footer">
        <button {{action "prevFlytoDialog"}} class="btn btn-default btn-embossed">Back</button>
        <button {{action "nextFlytoDialog"}} class="btn btn-primary btn-embossed">Next</button>
      </div>
    {{/liquid-tether}}
  {{/if}}

  {{#if showThirdFlytoDialog}}
    {{#liquid-tether
      stack="flyto"
      index=3

      target="document.body"
      targetModifier="visible"
      attachment="bottom center"
      targetAttachment="bottom center"
      offset="20px 0"

      class="modal-content"}}
      <div class="modal-header">
        <h4 class="modal-title">Another Modal</h4>
      </div>

      <div class="modal-body">
        <p>
          This is the last modal! It'll fade out when you finish the dialog.
        </p>
      </div>

      <div class="modal-footer">
        <button {{action "prevFlytoDialog"}} class="btn btn-default btn-embossed">Back</button>
        <button {{action "closeFlytoDialog"}} class="btn btn-primary btn-embossed">Finish</button>
      </div>
    {{/liquid-tether}}
  {{/if}}
</div>

<!-- {{#example-pane}}
  <div class="template">
    {{code-snippet name="flyto-dialog.hbs"}}
  </div>
  <div class="js">
    {{code-snippet name="flyto-dialog.js"}}
  </div>
  <div class="transitions">
    {{code-snippet name="flyto-dialog-transitions.js"}}
  </div>
{{/example-pane}}

## Liquid Wormhole


<p>
  There are times when you may want to warp an element up to the body, but
  without the positioning power of Tether (for instance if you simply want to
  position the element using <code>position: fixed;</code>). In those cases, you
  can use the <code>\{{liquid-wormhole}}</code> helper.
</p>

<p>
  Liquid Wormhole works just like Liquid Tether, but without a default
  overlay/tether element. To animate the elements warped by a liquid wormhole,
  use the <code>explode</code> animation helper.
</p>

<p>
  Liquid Wormhole is a dependency of Liquid Tether. You can include it directly
  if you do not need the positioning provided by Tether.js. See the
  <a href="https://github.com/pzuraq/liquid-wormhole">addon's repository</a> for
  more details.
</p>

<div class="example-button-container">
  <button {{action "toggleFlyout"}} id="flyout" class="btn btn-primary btn-embossed">Open Flyout</button>

  {{#if showFlyout}}
    {{liquid-wormhole class=modal-backdrop}}
    {{#liquid-wormhole class="flyout"}}
      <h1>Hey there!</h1>
      <h2>This is a flyout!</h2>

      <p>
        It's been given a fixed position relative to the window, without any of
        the conceptual overhead that comes with tethering.
      </p>

      <div class="fixed-to-bottom">
        This div is easily fixed to the bottom of the screen, no need to worry about
        the target container messing with your positioning!

        <button {{action 'toggleFlyout'}} class="btn btn-primary btn-embossed btn-block">
          Close
        </button>
      </div>
    {{/liquid-wormhole}}
  {{/if}}
</div> -->

<!-- {{#example-pane}}
  <div class="template">
    {{code-snippet name="liquid-wormhole.hbs"}}
  </div>
  <div class="js">
    {{code-snippet name="liquid-wormhole.js"}}
  </div>
  <div class="transitions">
    {{code-snippet name="liquid-wormhole-transitions.js"}}
  </div>
{{/example-pane}} -->
