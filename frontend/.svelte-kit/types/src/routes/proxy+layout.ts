// @ts-nocheck
import type { LayoutLoad } from "./$types";
export const prerender = true;
export const ssr = false;

export const load = ({ url }: Parameters<LayoutLoad>[0]) => {
  const { pathname } = url;

  return {
    pathname,
  };
};
