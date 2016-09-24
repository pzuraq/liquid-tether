If you need to have more fine grained control over the location that your Tether's
are attached to, you can create a custom `liquid-destination`. By
default all `liquid-tether`s are rendered to the `default` destination. You can
replace this destination, or create a new one and send wormholes to it using the `to`
property:

```
<!-- Replaces the default liquid-destination -->
{{liquid-destination}}

<!-- Adds a new liquid-destination named "my-destination" -->
{{liquid-destination name="my-destination"}}

...

<!-- Appends to the default destination above -->
{{liquid-tether}}

<!-- Appends to the named destination above -->
{{liquid-tether to="my-destination"}}
```
