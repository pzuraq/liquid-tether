# Modals made easy

  ```
    <button {{action 'toggleHello'}} id="hello-world-button">
      Hello, World!
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

<div class="6 columns">
  <div class="example-button-container">
    <button {{action 'toggleHello'}} id="hello-world-button" class="btn btn-primary btn-embossed">
      Hello, World!
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
</div>
