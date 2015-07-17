import { stop, animate, Promise, isAnimating, finish } from "liquid-fire";

export default function moveOver(dimension, direction, opts) {
  var oldParams = {},
      newParams = {},
      firstStep,
      property,
      measure;

  if (dimension.toLowerCase() === 'x') {
    property = 'translateX';
    measure = 'width';
  } else {
    property = 'translateY';
    measure = 'height';
  }

  if (isAnimating(this.oldElement, 'moving-in')) {
    firstStep = finish(this.oldElement, 'moving-in');
  } else {
    stop(this.oldElement);
    firstStep = Promise.resolve();
  }

  return firstStep.then(() => {
    var bigger = biggestSize(this, measure);
    oldParams[property] = (bigger * direction) + 'px';
    newParams[property] = ["0px", (-1 * bigger * direction) + 'px'];

    return Promise.all([
      animate(this.oldElement, oldParams, opts),
      animate(this.newElement, newParams, opts, 'moving-in')
    ]);
  });
}

function biggestSize(context, dimension) {
  let sizes = [], maxSize, minSize, isInTarget;

  if (context.newElement) {
    sizes.push(parseInt(context.newElement.css(dimension), 10));
    sizes.push(parseInt(context.newElement.parent().css(dimension), 10));
  }
  if (context.oldElement) {
    sizes.push(parseInt(context.oldElement.css(dimension), 10));
    sizes.push(parseInt(context.oldElement.parent().css(dimension), 10));
  }

  maxSize = Math.max.apply(null, sizes);

  minSize = Math.min.apply(null, sizes);
  isInTarget = (context.newElement && context.newElement.closest('.liquid-target').length) ||
               (context.oldElement && context.oldElement.closest('.liquid-target').length);

  if (maxSize === 0 || (isInTarget && minSize === 0)) {
    if (dimension === 'height') {
      maxSize = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    } else {
      maxSize =  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }
  }
  return maxSize;
}
