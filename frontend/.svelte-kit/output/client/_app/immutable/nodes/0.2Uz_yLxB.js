import { a as append, t as template } from "../chunks/disclose-version.BnVxzX8M.js";
import { n as noop, c as child, r as reset } from "../chunks/runtime.CBJxRLJu.js";
import { s as snippet } from "../chunks/snippet.myEDdOsb.js";
const prerender = true;
const ssr = false;
const _layout$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  prerender,
  ssr
}, Symbol.toStringTag, { value: "Module" }));
var root = template(`<div class="bg-background h-[100dvh] w-full flex justify-top items-center flex-col"><!></div>`);
function _layout($$anchor, $$props) {
  var div = root();
  var node = child(div);
  snippet(node, () => $$props.children ?? noop);
  reset(div);
  append($$anchor, div);
}
export {
  _layout as component,
  _layout$1 as universal
};
