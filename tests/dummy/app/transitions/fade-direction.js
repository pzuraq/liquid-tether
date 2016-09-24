import { isAnimating, finish, timeSpent, animate, stop } from 'liquid-fire';

export default function fade(dimension, direction, opts, offset=20) {
  const oldParams = { opacity: 0 },
        newParams = { opacity: [(opts.maxOpacity || 1), 0] },
        fadingElement = findFadingElement(this);

  let outOpts = opts,
      firstStep;

  if (dimension.toLowerCase() === 'x') {
    oldParams.translateX = `${(direction * offset)}px`;
    newParams.translateX = ['0px', `${(direction * offset)}px`];
  } else {
    oldParams.translateY = `${(direction * offset)}px`;
    newParams.translateY = ['0px', `${(direction * offset)}px`];
  }

  if (fadingElement) {
    // We still have some older version that is in the process of
    // fading out, so out first step is waiting for it to finish.
    firstStep = finish(fadingElement, 'fade-out');
  } else {
    if (isAnimating(this.oldElement, 'fade-in')) {
      // if the previous view is partially faded in, scale its
      // fade-out duration appropriately.
      outOpts = { duration: timeSpent(this.oldElement, 'fade-in') };
    }
    stop(this.oldElement);
    firstStep = animate(this.oldElement, oldParams, outOpts, 'fade-out');
  }
  return firstStep.then(() => {
    return animate(this.newElement, newParams, opts, 'fade-in');
  });
}

function findFadingElement(context) {
  for (var i = 0; i < context.older.length; i++) {
    var entry = context.older[i];
    if (isAnimating(entry.element, 'fade-out')) {
      return entry.element;
    }
  }
  if (isAnimating(context.oldElement, 'fade-out')) {
    return context.oldElement;
  }
}
