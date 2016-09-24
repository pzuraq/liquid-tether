Liquid Tether v2 allows you to animate your components using the standard
Liquid Fire DSL. Just add a `liquid-tether` component to your app, give it a
class, and add animations in your `transitions.js` file.

By default, `liquid-tether` components will render near the root of the
document, in a container that is positioned absolutely and that has the width
and height of the window. This container is meant to be used for UI components
such as popups, modals, tooltips - things that do not work in the normal
document flow. When choosing and building your animations, it's helpful to
think as though you are animating the entire window frame at once.

If you want to warp elements somewhere else, consider
{{#link-to "docs.destinations"}}creating a custom liquid-destination{{/link-to}}

<div class="example-button-container">
  <button {{action 'toggleHello'}} id="hello-world-button" class="btn btn-primary btn-embossed">
    Give it a shot!
  </button>
  {{#if showHello}}
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
  {{/if}}
</div>

```hbs
<button {{action 'toggleHello'}}>
  Give it a shot!
</button>

{{#if showHello}}
  {{#liquid-tether
    target="#hello-world-button"
    attachment="middle left"

    class="hello-world"
  }}
    ...
  {{/liquid-tether}}
{{/if}}
```

```js
this.transition(
  this.hasClass('hello-world'),
  this.use('fade')
);
```
