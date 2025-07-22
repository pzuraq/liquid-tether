You can change a tether's parameters dynamically and have it animate between
different states. This allows you to build onboarding components, generic modal
dialogs, and more incredibly easily.

<div class="row">
  <div class="col-xs-4">
    <div id="feature1" class="feature-example">
      <span class="fa fa-gear"></span>
    </div>
  </div>
  <div class="col-xs-4">
    <div id="feature2" class="feature-example">
      <span class="fa fa-life-ring"></span>
    </div>
  </div>
  <div class="col-xs-4">
    <div id="feature3" class="feature-example">
      <span class="fa fa-magic"></span>
    </div>
  </div>
  {{#liquid-tether
    target=this.currentStep.target
    attachment="top center"
    offset="60 0"
    class="tour"
  }}
    <div id="hello-world-popover" class="popover bottom">
      <div class="arrow"></div>
      <div class="popover-title">
        {{this.currentStep.text}}
      </div>
      <div class="popover-content">
        <a {{action "prevStep"}}>
          Back!
        </a>
        <a {{action "nextStep"}}>
          Next!
        </a>
      </div>
    </div>
  {{/liquid-tether}}
</div>

```
<div id="feature1">
  ...
</div>
<div id="feature2">
  ...
</div>
<div id="feature3">
  ...
</div>

{{#liquid-tether
  target=this.currentStep.target
  attachment="top center"
  offset="60 0"
  class="tour"
}}

  ...

  <a {{action "prevStep"}}>
    Back!
  </a>
  <a {{action "nextStep"}}>
    Next!
  </a>
{{/liquid-tether}}
```
