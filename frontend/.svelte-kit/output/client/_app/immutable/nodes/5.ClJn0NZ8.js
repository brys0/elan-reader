import { a as append, t as template, b as text } from "../chunks/disclose-version.BnVxzX8M.js";
import "../chunks/legacy.CRxsDwQP.js";
import { s as sibling, f as first_child, a as next } from "../chunks/runtime.CBJxRLJu.js";
import { B as Button } from "../chunks/button.mQ6lZBht.js";
var root = template(`<div class="w-full p-5"><div class="flex justify-center space-x-4"><div class="w-4 h-4 bg-red-500 rounded-full"></div> <div class="w-4 h-4 bg-white/15 rounded-full"></div> <div class="w-4 h-4 bg-white/15 rounded-full"></div></div></div> <h1 class="text-2xl font-thin">Additional Setup Required</h1> <div class="max-w-[75%] font-light mt-4 text-center"><p>Before we can continue we need permissions to access usb devices. <br> <br> Once you're finished, reopen the app.</p></div> <!>`, 1);
function _page($$anchor) {
  var fragment = root();
  var node = sibling(first_child(fragment), 6);
  Button(node, {
    class: "w-fit my-auto w-[45%] rounded-lg",
    children: ($$anchor2, $$slotProps) => {
      next();
      var text$1 = text("Learn How");
      append($$anchor2, text$1);
    },
    $$slots: { default: true }
  });
  append($$anchor, fragment);
}
export {
  _page as component
};
