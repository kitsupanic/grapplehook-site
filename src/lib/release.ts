// Release data from GitHub. Kept free of imports so `node src/lib/release.check.ts` can run it as is.

export const REPO = 'kitsupanic/Grapplehook';
export const REPO_URL = `https://github.com/${REPO}`;
export const RELEASES_URL = `${REPO_URL}/releases/latest`;

export type OS = 'mac' | 'windows' | 'linux';
export const OSES: OS[] = ['mac', 'windows', 'linux'];

export const PLATFORMS: Record<OS, { name: string; detail: string; match: RegExp }> = {
  mac: { name: 'macOS', detail: 'Apple Silicon', match: /\.dmg$/i },
  windows: { name: 'Windows', detail: '64-bit installer', match: /\.exe$/i },
  linux: { name: 'Linux', detail: 'AppImage, x86-64', match: /\.AppImage$/i }
};

export type ReleaseFile = { name: string; url: string; size: number };
export type Release = { version: string; files: Partial<Record<OS, ReleaseFile>> };

type ApiRelease = {
  tag_name?: string;
  assets?: { name: string; browser_download_url: string; size: number }[];
};

export function parseRelease(json: ApiRelease): Release | null {
  if (!json.tag_name || !Array.isArray(json.assets)) return null;
  const files: Release['files'] = {};
  for (const os of OSES) {
    const a = json.assets.find((asset) => PLATFORMS[os].match.test(asset.name));
    if (a) files[os] = { name: a.name, url: a.browser_download_url, size: a.size };
  }
  return { version: json.tag_name.replace(/^v/, ''), files };
}

export async function fetchRelease(f: typeof fetch = fetch): Promise<Release | null> {
  try {
    const res = await f(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: { accept: 'application/vnd.github+json' }
    });
    return res.ok ? parseRelease(await res.json()) : null;
  } catch {
    // Offline or rate-limited: the page falls back to the releases page links.
    return null;
  }
}

export function formatSize(bytes: number): string {
  return `${(bytes / 1_000_000).toFixed(bytes < 10_000_000 ? 1 : 0)} MB`;
}
