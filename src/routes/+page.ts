import { fetchRelease } from '#lib/release.ts';

// Runs at build time (prerender); the page refreshes it in the browser too.
export const load = async ({ fetch }) => ({ release: await fetchRelease(fetch) });
