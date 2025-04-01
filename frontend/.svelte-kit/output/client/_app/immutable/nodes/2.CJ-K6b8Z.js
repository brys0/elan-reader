import { a as append, t as template } from "../chunks/disclose-version.BnVxzX8M.js";
import { f as first_child, s as sibling, n as noop } from "../chunks/runtime.CBJxRLJu.js";
import { s as snippet } from "../chunks/snippet.myEDdOsb.js";
import { F as Fingerprint } from "../chunks/Fingerprint.90OmO2ZZ.js";
var root = template(`<!> <!>`, 1);
function _layout($$anchor, $$props) {
  var fragment = root();
  var node = first_child(fragment);
  Fingerprint(node, { size: 72, weight: "fill", class: "my-8" });
  var node_1 = sibling(node, 2);
  snippet(node_1, () => $$props.children ?? noop);
  append($$anchor, fragment);
}
export {
  _layout as component
};
