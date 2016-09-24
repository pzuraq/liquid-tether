import fadeDirection from './fade-direction';
export default function(opts={}) {
  return fadeDirection.call(this, 'y', 1, opts, opts.offset);
}
