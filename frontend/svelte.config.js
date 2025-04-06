import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from "@sveltejs/adapter-static";
import path from "node:path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess({ script: true }),
  kit: {
    adapter: adapter({
      pages: "dist",
      assets: "dist",
      fallback: undefined,
      precompress: false,
      strict: false,
    }),
    alias: {
      $shadcn: path.resolve("./src/lib/components/ui"),
      $elan: path.resolve("./src/lib/components"),
      $bindings: path.resolve(
        "./bindings/github.com/brys0/elan-reader/driverservice",
      ),
      $bindingsdriver: path.resolve(
        "./bindings/github.com/brys0/elan-driver-go/elan",
      ),
      $types: path.resolve("./src/lib/types"),
    },
  },
};

export default config;
