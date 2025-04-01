import "clsx";
import { B as Button } from "../../../chunks/button.js";
function _page($$payload) {
  $$payload.out += `<div class="w-full p-5"><div class="flex justify-center space-x-4"><div class="w-4 h-4 bg-red-500 rounded-full"></div> <div class="w-4 h-4 bg-white/15 rounded-full"></div> <div class="w-4 h-4 bg-white/15 rounded-full"></div></div></div> <h1 class="text-2xl font-thin">Additional Setup Required</h1> <div class="max-w-[75%] font-light mt-4 text-center"><p>Before we can continue we need permissions to access usb devices. <br> <br> Once you're finished, reopen the app.</p></div> `;
  Button($$payload, {
    class: "w-fit my-auto w-[45%] rounded-lg",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Learn How`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
}
export {
  _page as default
};
