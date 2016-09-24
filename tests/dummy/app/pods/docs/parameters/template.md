Below is a listing of all of the parameters that the liquid-tether components
will accept as attributes.

## `liquid-tether` Parameters

<table class="table">
  <thead>
    <tr>
      <th>key</th>
      <th>type</th>
      <th>value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`target`</td>
      <td>String</td>
      <td>
        <strong>\*\*Required\*\*</strong>
        The selector of the element that the tether will be positioned relative to.
      </td>
    </tr>
    <tr>
      <td>`attachment`</td>
      <td>String</td>
      <td>
        <strong>\*\*Required\*\*</strong>
        The attachment point on the tethered element
      </td>
    </tr>
    <tr>
      <td>`targetAttachment`</td>
      <td>String</td>
      <td>
        The attachment point on the targeted element
      </td>
    </tr>
    <tr>
      <td>`offset`</td>
      <td>String</td>
      <td>
        Offset relative to the attachment point on the tethered element.
      </td>
    </tr>
    <tr>
      <td>`targetOffset`</td>
      <td>String</td>
      <td>
        Offset relative to the attachment point on the targeted element.
      </td>
    </tr>
    <tr>
      <td>`targetModifier`</td>
      <td>String</td>
      <td>
        Modifies the attachment to the targeted element. See the
        [Tether.js](http://tether.io/) documentation for more details.
      </td>
    </tr>
    <tr>
      <td>`constraints`</td>
      <td>Array</td>
      <td>
        An array of constraints that control how the element responds to its
        surroundings. See the [Tether.js](http://tether.io/) documentation for
        more details.
      </td>
    </tr>
    <tr>
      <td>`optimizations`</td>
      <td>String</td>
      <td>
        Enables or disables Tether.js optimizations. See the [Tether.js](http://tether.io/) documentation for
        more details.
      </td>
    </tr>
    <tr>
      <td>`classPrefix`</td>
      <td>String</td>
      <td>
         The prefix placed at the beginning of the default classes, defaults to 'tether'.
      </td>
    </tr>
    <tr>
      <td>`stack`</td>
      <td>String</td>
      <td>
        The name of the stack that the tether will be a part of. Defaults to a
        unique ID.
      </td>
    </tr>
    <tr>
      <td>`value`</td>
      <td>Any</td>
      <td>
        The value that will be passed on to the Liquid Fire transition matchers. Defaults to `true`.
      </td>
    </tr>
    <tr>
      <td>`send`</td>
      <td>Component Name or Helper</td>
      <td>
        A component that will be rendered and tethered.
      </td>
    </tr>
    <tr>
      <td>`click`</td>
      <td>Action Name or Helper</td>
      <td>
        An action that will trigger when the tether is clicked.
      </td>
    </tr>
    <tr>
      <td>`to`</td>
      <td>String</td>
      <td>
        The name of the `liquid-destination` that the component will be appended to.
        Defaults to 'default'.
      </td>
    </tr>
  </tbody>
</table>

## `liquid-destination` Parameters
<table class="table">
  <thead>
    <tr>
      <th>key</th>
      <th>type</th>
      <th>value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`name`</td>
      <td>String</td>
      <td>
        The name of the destination. Defaults to 'default'.
      </td>
    </tr>
  </tbody>
</table>
