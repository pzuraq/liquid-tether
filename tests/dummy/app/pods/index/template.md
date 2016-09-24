<div class="front-page-container-1">
  <span class="lead">
    Liquid-Fire meets Ember-Tether
  </span>
</div>
<div class="front-page-container-2">
  <button {{action 'toggleHello'}} id="hello-world-button" class="btn btn-primary btn-embossed">
    Try Me
  </button>
  {{#if showHello}}
    {{#liquid-tether
      target="#hello-world-button"
      attachment="top center"
      class="hello-world"
    }}
      <div id="hello-world-popover" class="popover bottom">
        <div class="arrow"></div>
        <div class="popover-title">
          Hello, World!
        </div>
      </div>
    {{/liquid-tether}}
  {{/if}}
</div>

```
{{#liquid-tether
  target="#hello-world-button"
  attachment="top center"
  class="hello-world"
}}
  Hello, World
{{/liquid-tether}}
```
```
this.transition(
  this.hasClass('hello-world'),
  this.use('fade')
)
```

Liquid Tether combines [Tether.js](http://tether.io/) with
[Liquid Fire](http://ember-animation.github.io/liquid-fire/) to make animating
your modals, popups, tooltips, and more easy. Just add `liquid-tether`s to your
templates and transitions to your transition map and you're on your way!
