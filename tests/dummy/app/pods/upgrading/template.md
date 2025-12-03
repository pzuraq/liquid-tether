# Upgrading from Liquid Tether v1

One of the overall goals of Liquid Tether v2 was to simplify the API and bring
it more inline with vanilla Liquid Fire. Several breaking changes have been
made, and this article is meant as a guide to summarize them and describe an
upgrade path.

## Removing the `to` attribute and `target` helper

In v2, the `to` attribute is no longer needed by default, and `target` is not
used to match transitions. You can either change `to` to `stack`, or add it to
your tether's classes. You'll then be able to match it in your transitions
file using `this.matchSelector` or `this.hasClass` respectively.

### Old:
```hbs
{{liquid-tether to="popup"}}
```
```js
this.transition(
  target('popup')
);
```

### New:
```hbs
{{liquid-tether class="popup"}}

<!-- or -->

{{liquid-tether stack="popup"}}
```
```js
this.transition(
  this.hasClass('popup')
);

// or

this.transition(
  this.matchSelector('#popup')
);
```

## Removing `tether` transitions

The `tether` transition is no longer included or necessary. You can now use any
liquid-fire transition as if it were a normal transition:

### Old:
```
this.transition(
  this.use('tether', 'to-left');
)
```

### New:
```
this.transition(
  this.use('to-left');
)
```


## Replacing the `onOpenTether` and `onCloseTether` helpers

The `onOpenTether` and `onCloseTether` helpers are deprecated in favor of
using the standard `toValue`, `fromValue`, and `betweenValues` matcher
functions. Whenever a tether is opening for the first time, the `fromValue`
will be `null`, and whenever a tether is closing, the so will the `toValue`.

### Old:
```js
this.transition(
  onOpenTether()
);

this.transition(
  onCloseTether()
);
```

### New:
```js
this.transition(
  this.toValue(true)
);

this.transition(
  this.toValue(false)
);
```

Note: You may need to guard against objects being `null` if you were checking
properties on your tethers before.

### Old:
```js
this.transition(
  this.toValue((toValue, fromValue) => toValue.index > oldValue.index)
);
```

### New:
```js
this.transition(
  this.toValue((toValue, fromValue) => {
    return toValue && fromValue && toValue.index > oldValue.index;
  })
);
```

## Replacing `toValue` and `fromValue` matchers

Wormholes are no longer directly passed in to their transition matchers.
Instead, the `value` property for a wormhole is passed in. You can move any of
the properties that you had into a `hash` helper and everything should work.
Remember, you may need to perform null checking.

### Old:
```hbs
{{liquid-wormhole index=1}}
```

```js
this.transition(
  this.toValue((toValue, fromValue) => toValue.index > oldValue.index)
);
```

### New:
```hbs
{{liquid-wormhole value=(hash index=1)}}
```

```js
this.transition(
  this.toValue((toValue, fromValue) => {
    return toValue && fromValue && toValue.index > oldValue.index;
  })
);
```

## Replacing `tetherClass`

Classes that are applied to a tether will now work without anything extra, no
need to pass in a `tetherClass` attribute.

### Old:
```
{{liquid-tether tetherClass="modal"}}
```

### New:
```
{{liquid-tether class="modal"}}
```

## Replacing Overlays

Overlays were a feature in Liquid Tether v1, but were always awkward to deal
with. Their animations were tied to their Tether's animation, making it
difficult to have generic overlays, and you could only style them through the
`overlayClass`, and only make them actionable with `onOverlayClick`.

The recommended approach to overlays is to now use a separate `liquid-wormhole`
with your overlay styles, actions, and transitions completely broken out from
your Tethers. This makes your code much cleaner and separates things by concern.

Note: Tethers/Wormholes are applied in-order, so you will need to make sure that
overlays come _before_ the tethers in your templates.

### Old:
```
{{liquid-tether
  to="modal"
  overlayClass="modal-overlay"
  onOverlayClick=this.closeModal
}}
```

```
this.transition(
  target('modal'),
  this.use('tether', 'to-down', 'fade')
);
```

### New:
```
{{liquid-wormhole class="modal-overlay" click=this.closeModal}}
{{liquid-tether class="modal"}}
```

```
this.transition(
  this.hasClass('modal'),
  this.use('to-down')
);

this.transition(
  this.hasClass('modal-overlay'),
  this.use('fade')
);
```
