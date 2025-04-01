const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["../nodes/0.2Uz_yLxB.js","../chunks/disclose-version.BnVxzX8M.js","../chunks/runtime.CBJxRLJu.js","../chunks/snippet.myEDdOsb.js","../assets/0.DhdfncYM.css","../nodes/1.B98FR3Dm.js","../chunks/legacy.CRxsDwQP.js","../chunks/render.XfyIEkgs.js","../chunks/store.CCDr3v7r.js","../chunks/index.C4UdWAqn.js","../chunks/entry.DmHIyL5r.js","../nodes/2.CJ-K6b8Z.js","../chunks/Fingerprint.90OmO2ZZ.js","../chunks/props.Dhcya68o.js","../chunks/attributes.DOBhFXXZ.js","../chunks/context.MLZNEWcM.js","../nodes/3.DN_GK5d9.js","../chunks/button.mQ6lZBht.js","../chunks/this.Df2858Gm.js","../nodes/4.Dgj9gx4q.js","../nodes/5.ClJn0NZ8.js"])))=>i.map(i=>d[i]);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _events, _instance;
import { B as hydrating, l as hydrate_next, M as block, N as EFFECT_TRANSPARENT, A as branch, m as hydrate_node, T as pause_effect, g as get, a4 as LEGACY_PROPS, $ as set, as as flushSync, ai as define_property, a8 as mutable_source, D as component_context, at as lifecycle_outside_component, a1 as legacy_mode_flag, ab as user_effect, J as untrack, p as push, aa as user_pre_effect, au as state, u as user_derived, f as first_child, s as sibling, b as pop, av as tick, c as child, r as reset, t as template_effect } from "../chunks/runtime.CBJxRLJu.js";
import { h as hydrate, m as mount, u as unmount, s as set_text } from "../chunks/render.XfyIEkgs.js";
import { a as append, t as template, c as comment, b as text } from "../chunks/disclose-version.BnVxzX8M.js";
import { p as prop, i as if_block } from "../chunks/props.Dhcya68o.js";
import { b as bind_this } from "../chunks/this.Df2858Gm.js";
function component(node, get_component, render_fn) {
  if (hydrating) {
    hydrate_next();
  }
  var anchor = node;
  var component2;
  var effect;
  block(() => {
    if (component2 === (component2 = get_component())) return;
    if (effect) {
      pause_effect(effect);
      effect = null;
    }
    if (component2) {
      effect = branch(() => render_fn(anchor, component2));
    }
  }, EFFECT_TRANSPARENT);
  if (hydrating) {
    anchor = hydrate_node;
  }
}
function asClassComponent(component2) {
  return class extends Svelte4Component {
    /** @param {any} options */
    constructor(options) {
      super({
        component: component2,
        ...options
      });
    }
  };
}
class Svelte4Component {
  /**
   * @param {ComponentConstructorOptions & {
   *  component: any;
   * }} options
   */
  constructor(options) {
    /** @type {any} */
    __privateAdd(this, _events);
    /** @type {Record<string, any>} */
    __privateAdd(this, _instance);
    var _a;
    var sources = /* @__PURE__ */ new Map();
    var add_source = (key, value) => {
      var s = mutable_source(value);
      sources.set(key, s);
      return s;
    };
    const props = new Proxy(
      { ...options.props || {}, $$events: {} },
      {
        get(target, prop2) {
          return get(sources.get(prop2) ?? add_source(prop2, Reflect.get(target, prop2)));
        },
        has(target, prop2) {
          if (prop2 === LEGACY_PROPS) return true;
          get(sources.get(prop2) ?? add_source(prop2, Reflect.get(target, prop2)));
          return Reflect.has(target, prop2);
        },
        set(target, prop2, value) {
          set(sources.get(prop2) ?? add_source(prop2, value), value);
          return Reflect.set(target, prop2, value);
        }
      }
    );
    __privateSet(this, _instance, (options.hydrate ? hydrate : mount)(options.component, {
      target: options.target,
      anchor: options.anchor,
      props,
      context: options.context,
      intro: options.intro ?? false,
      recover: options.recover
    }));
    if (!((_a = options == null ? void 0 : options.props) == null ? void 0 : _a.$$host) || options.sync === false) {
      flushSync();
    }
    __privateSet(this, _events, props.$$events);
    for (const key of Object.keys(__privateGet(this, _instance))) {
      if (key === "$set" || key === "$destroy" || key === "$on") continue;
      define_property(this, key, {
        get() {
          return __privateGet(this, _instance)[key];
        },
        /** @param {any} value */
        set(value) {
          __privateGet(this, _instance)[key] = value;
        },
        enumerable: true
      });
    }
    __privateGet(this, _instance).$set = /** @param {Record<string, any>} next */
    (next) => {
      Object.assign(props, next);
    };
    __privateGet(this, _instance).$destroy = () => {
      unmount(__privateGet(this, _instance));
    };
  }
  /** @param {Record<string, any>} props */
  $set(props) {
    __privateGet(this, _instance).$set(props);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(event, callback) {
    __privateGet(this, _events)[event] = __privateGet(this, _events)[event] || [];
    const cb = (...args) => callback.call(this, ...args);
    __privateGet(this, _events)[event].push(cb);
    return () => {
      __privateGet(this, _events)[event] = __privateGet(this, _events)[event].filter(
        /** @param {any} fn */
        (fn) => fn !== cb
      );
    };
  }
  $destroy() {
    __privateGet(this, _instance).$destroy();
  }
}
_events = new WeakMap();
_instance = new WeakMap();
function onMount(fn) {
  if (component_context === null) {
    lifecycle_outside_component();
  }
  if (legacy_mode_flag && component_context.l !== null) {
    init_update_callbacks(component_context).m.push(fn);
  } else {
    user_effect(() => {
      const cleanup = untrack(fn);
      if (typeof cleanup === "function") return (
        /** @type {() => void} */
        cleanup
      );
    });
  }
}
function init_update_callbacks(context) {
  var l = (
    /** @type {ComponentContextLegacy} */
    context.l
  );
  return l.u ?? (l.u = { a: [], b: [], m: [] });
}
const scriptRel = "modulepreload";
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    const links = document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep, importerUrl);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        const isBaseRelative = !!importerUrl;
        if (isBaseRelative) {
          for (let i = links.length - 1; i >= 0; i--) {
            const link2 = links[i];
            if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
              return;
            }
          }
        } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const matchers = {};
var root_7 = template(`<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>`);
var root$1 = template(`<!> <!>`, 1);
function Root($$anchor, $$props) {
  push($$props, true);
  let components = prop($$props, "components", 23, () => []), data_0 = prop($$props, "data_0", 3, null), data_1 = prop($$props, "data_1", 3, null), data_2 = prop($$props, "data_2", 3, null);
  {
    user_pre_effect(() => $$props.stores.page.set($$props.page));
  }
  user_effect(() => {
    $$props.stores;
    $$props.page;
    $$props.constructors;
    components();
    $$props.form;
    data_0();
    data_1();
    data_2();
    $$props.stores.page.notify();
  });
  let mounted = state(false);
  let navigated = state(false);
  let title = state(null);
  onMount(() => {
    const unsubscribe = $$props.stores.page.subscribe(() => {
      if (get(mounted)) {
        set(navigated, true);
        tick().then(() => {
          set(title, document.title || "untitled page", true);
        });
      }
    });
    set(mounted, true);
    return unsubscribe;
  });
  const Pyramid_2 = user_derived(() => $$props.constructors[2]);
  var fragment = root$1();
  var node = first_child(fragment);
  {
    var consequent_1 = ($$anchor2) => {
      var fragment_1 = comment();
      const Pyramid_0 = user_derived(() => $$props.constructors[0]);
      var node_1 = first_child(fragment_1);
      component(node_1, () => get(Pyramid_0), ($$anchor3, $$component) => {
        bind_this(
          $$component($$anchor3, {
            get data() {
              return data_0();
            },
            get form() {
              return $$props.form;
            },
            children: ($$anchor4, $$slotProps) => {
              var fragment_2 = comment();
              var node_2 = first_child(fragment_2);
              {
                var consequent = ($$anchor5) => {
                  var fragment_3 = comment();
                  const Pyramid_1 = user_derived(() => $$props.constructors[1]);
                  var node_3 = first_child(fragment_3);
                  component(node_3, () => get(Pyramid_1), ($$anchor6, $$component2) => {
                    bind_this(
                      $$component2($$anchor6, {
                        get data() {
                          return data_1();
                        },
                        get form() {
                          return $$props.form;
                        },
                        children: ($$anchor7, $$slotProps2) => {
                          var fragment_4 = comment();
                          var node_4 = first_child(fragment_4);
                          component(node_4, () => get(Pyramid_2), ($$anchor8, $$component3) => {
                            bind_this(
                              $$component3($$anchor8, {
                                get data() {
                                  return data_2();
                                },
                                get form() {
                                  return $$props.form;
                                }
                              }),
                              ($$value) => components()[2] = $$value,
                              () => {
                                var _a;
                                return (_a = components()) == null ? void 0 : _a[2];
                              }
                            );
                          });
                          append($$anchor7, fragment_4);
                        },
                        $$slots: { default: true }
                      }),
                      ($$value) => components()[1] = $$value,
                      () => {
                        var _a;
                        return (_a = components()) == null ? void 0 : _a[1];
                      }
                    );
                  });
                  append($$anchor5, fragment_3);
                };
                var alternate = ($$anchor5) => {
                  var fragment_5 = comment();
                  const Pyramid_1 = user_derived(() => $$props.constructors[1]);
                  var node_5 = first_child(fragment_5);
                  component(node_5, () => get(Pyramid_1), ($$anchor6, $$component2) => {
                    bind_this(
                      $$component2($$anchor6, {
                        get data() {
                          return data_1();
                        },
                        get form() {
                          return $$props.form;
                        }
                      }),
                      ($$value) => components()[1] = $$value,
                      () => {
                        var _a;
                        return (_a = components()) == null ? void 0 : _a[1];
                      }
                    );
                  });
                  append($$anchor5, fragment_5);
                };
                if_block(node_2, ($$render) => {
                  if ($$props.constructors[2]) $$render(consequent);
                  else $$render(alternate, false);
                });
              }
              append($$anchor4, fragment_2);
            },
            $$slots: { default: true }
          }),
          ($$value) => components()[0] = $$value,
          () => {
            var _a;
            return (_a = components()) == null ? void 0 : _a[0];
          }
        );
      });
      append($$anchor2, fragment_1);
    };
    var alternate_1 = ($$anchor2) => {
      var fragment_6 = comment();
      const Pyramid_0 = user_derived(() => $$props.constructors[0]);
      var node_6 = first_child(fragment_6);
      component(node_6, () => get(Pyramid_0), ($$anchor3, $$component) => {
        bind_this(
          $$component($$anchor3, {
            get data() {
              return data_0();
            },
            get form() {
              return $$props.form;
            }
          }),
          ($$value) => components()[0] = $$value,
          () => {
            var _a;
            return (_a = components()) == null ? void 0 : _a[0];
          }
        );
      });
      append($$anchor2, fragment_6);
    };
    if_block(node, ($$render) => {
      if ($$props.constructors[1]) $$render(consequent_1);
      else $$render(alternate_1, false);
    });
  }
  var node_7 = sibling(node, 2);
  {
    var consequent_3 = ($$anchor2) => {
      var div = root_7();
      var node_8 = child(div);
      {
        var consequent_2 = ($$anchor3) => {
          var text$1 = text();
          template_effect(() => set_text(text$1, get(title)));
          append($$anchor3, text$1);
        };
        if_block(node_8, ($$render) => {
          if (get(navigated)) $$render(consequent_2);
        });
      }
      reset(div);
      append($$anchor2, div);
    };
    if_block(node_7, ($$render) => {
      if (get(mounted)) $$render(consequent_3);
    });
  }
  append($$anchor, fragment);
  pop();
}
const root = asClassComponent(Root);
const nodes = [
  () => __vitePreload(() => import("../nodes/0.2Uz_yLxB.js"), true ? __vite__mapDeps([0,1,2,3,4]) : void 0, import.meta.url),
  () => __vitePreload(() => import("../nodes/1.B98FR3Dm.js"), true ? __vite__mapDeps([5,1,2,6,7,8,9,10]) : void 0, import.meta.url),
  () => __vitePreload(() => import("../nodes/2.CJ-K6b8Z.js"), true ? __vite__mapDeps([11,1,2,3,12,13,8,9,14,15]) : void 0, import.meta.url),
  () => __vitePreload(() => import("../nodes/3.DN_GK5d9.js"), true ? __vite__mapDeps([16,1,2,6,12,13,8,9,3,14,15,17,18]) : void 0, import.meta.url),
  () => __vitePreload(() => import("../nodes/4.Dgj9gx4q.js"), true ? __vite__mapDeps([19,1,2,6,13,8,9,3,14,15,17,18,7]) : void 0, import.meta.url),
  () => __vitePreload(() => import("../nodes/5.ClJn0NZ8.js"), true ? __vite__mapDeps([20,1,2,6,17,13,8,9,3,14,18]) : void 0, import.meta.url)
];
const server_loads = [];
const dictionary = {
  "/": [3],
  "/onboard-error-ex": [5],
  "/onboard/select-device": [4, [2]]
};
const hooks = {
  handleError: ({ error }) => {
    console.error(error);
  },
  reroute: () => {
  }
};
export {
  dictionary,
  hooks,
  matchers,
  nodes,
  root,
  server_loads
};
