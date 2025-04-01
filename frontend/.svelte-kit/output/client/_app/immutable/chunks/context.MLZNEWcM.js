import { E as hasContext, F as getContext } from "./runtime.CBJxRLJu.js";
let contextKey = Symbol("phosphor-svelte");
function getIconContext() {
  if (hasContext(contextKey)) {
    return getContext(contextKey);
  }
  return {};
}
export {
  getIconContext as g
};
