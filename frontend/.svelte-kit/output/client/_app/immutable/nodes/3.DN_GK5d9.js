import { a as append, t as template, b as text } from "../chunks/disclose-version.BnVxzX8M.js";
import "../chunks/legacy.CRxsDwQP.js";
import { s as sibling, c as child, a as next, r as reset } from "../chunks/runtime.CBJxRLJu.js";
import { F as Fingerprint } from "../chunks/Fingerprint.90OmO2ZZ.js";
import { B as Button } from "../chunks/button.mQ6lZBht.js";
var root = template(`<div class="h-full flex justify-center items-center gap-4 flex-col"><!> <h1 class="text-2xl font-thin">Welcome to Elan Reader</h1>  <a href="/onboard/select-device"><!></a></div>`);
function _page($$anchor) {
  var div = root();
  var node = child(div);
  Fingerprint(node, { size: 72, weight: "fill" });
  var a = sibling(node, 4);
  var node_1 = child(a);
  Button(node_1, {
    class: "w-fit mt-8 rounded-xl bg-blue-400 hover:bg-blue-400/85",
    children: ($$anchor2, $$slotProps) => {
      next();
      var text$1 = text("Get Started");
      append($$anchor2, text$1);
    },
    $$slots: { default: true }
  });
  reset(a);
  reset(div);
  append($$anchor, div);
}
export {
  _page as component
};
