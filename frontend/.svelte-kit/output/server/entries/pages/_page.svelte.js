import "clsx";
import { F as Fingerprint } from "../../chunks/Fingerprint.js";
import { B as Button } from "../../chunks/button.js";
function _page($$payload) {
  $$payload.out += `<div class="h-full flex justify-center items-center gap-4 flex-col">`;
  Fingerprint($$payload, { size: 72, weight: "fill" });
  $$payload.out += `<!----> <h1 class="text-2xl font-thin">Welcome to Elan Reader</h1>  <a href="/onboard/select-device">`;
  Button($$payload, {
    class: "w-fit mt-8 rounded-xl bg-blue-400 hover:bg-blue-400/85",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Get Started`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></a></div>`;
}
export {
  _page as default
};
