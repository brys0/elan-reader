export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["Inter-Medium.ttf","favicon.png","style.css","svelte.svg","wails.png"]),
	mimeTypes: {".ttf":"font/ttf",".png":"image/png",".css":"text/css",".svg":"image/svg+xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.BrTEdjP9.js","app":"_app/immutable/entry/app.88iZEbhl.js","imports":["_app/immutable/entry/start.BrTEdjP9.js","_app/immutable/chunks/entry.DmHIyL5r.js","_app/immutable/chunks/runtime.CBJxRLJu.js","_app/immutable/chunks/index.C4UdWAqn.js","_app/immutable/entry/app.88iZEbhl.js","_app/immutable/chunks/runtime.CBJxRLJu.js","_app/immutable/chunks/render.XfyIEkgs.js","_app/immutable/chunks/store.CCDr3v7r.js","_app/immutable/chunks/index.C4UdWAqn.js","_app/immutable/chunks/disclose-version.BnVxzX8M.js","_app/immutable/chunks/props.Dhcya68o.js","_app/immutable/chunks/this.Df2858Gm.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
