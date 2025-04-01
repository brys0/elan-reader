import { a as append, t as template } from "../chunks/disclose-version.BnVxzX8M.js";
import "../chunks/legacy.CRxsDwQP.js";
import { aa as user_pre_effect, ab as user_effect, D as component_context, J as untrack, ac as run, ad as run_all, g as get, ae as deep_read_state, a5 as derived, p as push, f as first_child, t as template_effect, b as pop, s as sibling, c as child, r as reset } from "../chunks/runtime.CBJxRLJu.js";
import { s as set_text } from "../chunks/render.XfyIEkgs.js";
import { s as setup_stores, b as store_get } from "../chunks/store.CCDr3v7r.js";
import { s as stores } from "../chunks/entry.DmHIyL5r.js";
function init(immutable = false) {
  const context = (
    /** @type {ComponentContextLegacy} */
    component_context
  );
  const callbacks = context.l.u;
  if (!callbacks) return;
  let props = () => deep_read_state(context.s);
  if (immutable) {
    let version = 0;
    let prev = (
      /** @type {Record<string, any>} */
      {}
    );
    const d = derived(() => {
      let changed = false;
      const props2 = context.s;
      for (const key in props2) {
        if (props2[key] !== prev[key]) {
          prev[key] = props2[key];
          changed = true;
        }
      }
      if (changed) version++;
      return version;
    });
    props = () => get(d);
  }
  if (callbacks.b.length) {
    user_pre_effect(() => {
      observe_all(context, props);
      run_all(callbacks.b);
    });
  }
  user_effect(() => {
    const fns = untrack(() => callbacks.m.map(run));
    return () => {
      for (const fn of fns) {
        if (typeof fn === "function") {
          fn();
        }
      }
    };
  });
  if (callbacks.a.length) {
    user_effect(() => {
      observe_all(context, props);
      run_all(callbacks.a);
    });
  }
}
function observe_all(context, props) {
  if (context.l.s) {
    for (const signal of context.l.s) get(signal);
  }
  props();
}
const getStores = () => {
  const stores$1 = stores;
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
var root = template(`<h1> </h1> <p> </p>`, 1);
function Error$1($$anchor, $$props) {
  push($$props, false);
  const [$$stores, $$cleanup] = setup_stores();
  const $page = () => store_get(page, "$page", $$stores);
  init();
  var fragment = root();
  var h1 = first_child(fragment);
  var text = child(h1, true);
  reset(h1);
  var p = sibling(h1, 2);
  var text_1 = child(p, true);
  reset(p);
  template_effect(() => {
    var _a;
    set_text(text, $page().status);
    set_text(text_1, (_a = $page().error) == null ? void 0 : _a.message);
  });
  append($$anchor, fragment);
  pop();
  $$cleanup();
}
export {
  Error$1 as component
};
