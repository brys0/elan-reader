import "clsx";
import { F as Fingerprint } from "../../../chunks/Fingerprint.js";
function _layout($$payload, $$props) {
  let { children } = $$props;
  Fingerprint($$payload, { size: 72, weight: "fill", class: "my-8" });
  $$payload.out += `<!----> `;
  children?.($$payload);
  $$payload.out += `<!---->`;
}
export {
  _layout as default
};
