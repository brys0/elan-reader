import "clsx";
function _layout($$payload, $$props) {
  let { children } = $$props;
  $$payload.out += `<div class="bg-background h-[100dvh] w-full flex justify-top items-center flex-col">`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
}
export {
  _layout as default
};
