/**
 * Prefixes a `/public` asset with the deployment basePath.
 *
 * Next applies `basePath` to routes and its own `/_next/*` output, but NOT to
 * the `src` you hand `next/image`, nor to Metadata `icons` — the framework docs
 * say so outright: "When using the next/image component, you will need to add
 * the basePath in front of src."
 *
 * On GitHub Pages the app is served from `/myhitch-connect/`, so a bare
 * "/logo.png" resolves to the domain root and 404s, while on localhost
 * (basePath "") the same path is correct. Hardcoding the prefix fixes
 * production and breaks local, hence this helper.
 *
 * Reads the same env var as `next.config.ts` so the two cannot drift.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string): string {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalised}`;
}
