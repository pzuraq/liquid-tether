import fadeDirection from "./fade-direction";
export default function(opts={}) {
  return fadeDirection.call(this, 'x', 1, 20, opts);
}
