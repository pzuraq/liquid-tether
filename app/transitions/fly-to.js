import { animate, Promise } from "liquid-fire";

export default function flyTo(opts={}) {
  if (!this.newElement) {
    return Promise.resolve();
  } else if (!this.oldElement) {
    this.newElement.css({visibility: ''});
    return Promise.resolve();
  }

  var oldTarget = this.oldElement.find('.liquid-tether').length ?
                  this.oldElement.find('.liquid-tether').children().eq(0) :
                  this.oldElement;

  var newTarget = this.newElement.find('.liquid-tether').length ?
                  this.newElement.find('.liquid-tether').children().eq(0) :
                  this.newElement;

  var oldOffset = oldTarget.offset();
  var newOffset = newTarget.offset();

  if (opts.movingSide === 'new') {
    let motion = {
      translateX: [0, oldOffset.left - newOffset.left],
      translateY: [0, oldOffset.top - newOffset.top],
      outerWidth: [newTarget.outerWidth(), oldTarget.outerWidth()],
      outerHeight: [newTarget.outerHeight(), oldTarget.outerHeight()]
    };
    oldTarget.css({ visibility: 'hidden' });
    return animate(newTarget, motion, opts);
  } else {
    let motion = {
      translateX: [newOffset.left - oldOffset.left, 0],
      translateY: [newOffset.top - oldOffset.top, 0],
      outerWidth: newTarget.outerWidth(),
      outerHeight: newTarget.outerHeight()
    };

    newTarget.css({ visibility: 'hidden', position: 'absolute' });
    return animate(oldTarget, motion, opts).then(() => {
      this.newElement.css({ visibility: '' })
      newTarget.css({ visibility: '', width: '', height: '', transform: ''});
      oldTarget.css({ width: '', height: '', transform: '', position: ''});
    });
  }
}
