If you'd rather send a component than use a block template, you can set the
`send` property to either a component name or helper:

<div class="example-button-container">
  <button {{on "click" this.toggleHello}} id="hello-world-button" class="btn btn-primary btn-embossed">
    Press Me
  </button>
  {{#if this.showHello}}
    {{liquid-tether
      send="hello-component"
      target="#hello-world-button"
      attachment="middle left"
      targetAttachment="middle right"
      class="hello-world"
    }}
  {{/if}}
</div>

```
<button {{on "click" this.toggleHello}}>
  Press Me
</button>

{{#if this.showHello}}
  {{liquid-tether
    send="hello-component"
    target="#hello-world-button"
    attachment="middle left"
    targetAttachment="middle right"
    class="hello-world"
  }}
{{/if}}
```
