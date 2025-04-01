import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.2Uz_yLxB.js","_app/immutable/chunks/disclose-version.BnVxzX8M.js","_app/immutable/chunks/runtime.CBJxRLJu.js","_app/immutable/chunks/snippet.myEDdOsb.js"];
export const stylesheets = ["_app/immutable/assets/0.DhdfncYM.css"];
export const fonts = ["_app/immutable/assets/onest-cyrillic-wght-normal.DXI_y_WF.woff2","_app/immutable/assets/onest-latin-ext-wght-normal.CnNj8hVb.woff2","_app/immutable/assets/onest-latin-wght-normal.CUIqqgP9.woff2"];
