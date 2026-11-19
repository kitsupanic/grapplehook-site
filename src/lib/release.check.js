// @ts-nocheck: a plain Node script; release.ts carries the types.
// Self-check for release.ts, run by `pnpm check` (Node strips the types from release.ts).
import assert from 'node:assert/strict';
import { formatSize, parseRelease } from './release.ts';

const asset = (name, size = 1) => ({ name, browser_download_url: `https://x/${name}`, size });

const r = parseRelease({
  tag_name: 'v0.2.2',
  assets: [
    asset('Grapplehook_0.2.2_aarch64.dmg', 9_400_000),
    asset('Grapplehook_0.2.2_amd64.AppImage'),
    asset('Grapplehook_0.2.2_x64-setup.exe'),
    asset('latest.json')
  ]
});
assert.ok(r);
assert.equal(r.version, '0.2.2');
assert.equal(r.files.mac?.name, 'Grapplehook_0.2.2_aarch64.dmg');
assert.equal(r.files.windows?.name, 'Grapplehook_0.2.2_x64-setup.exe');
assert.equal(r.files.linux?.name, 'Grapplehook_0.2.2_amd64.AppImage');

const partial = parseRelease({ tag_name: '1.0.0', assets: [asset('a.dmg')] });
assert.equal(partial?.files.linux, undefined);
assert.equal(parseRelease({ message: 'API rate limit exceeded' }), null);

assert.equal(formatSize(9_400_000), '9.4 MB');
assert.equal(formatSize(84_200_000), '84 MB');

console.log('release.check: ok');
