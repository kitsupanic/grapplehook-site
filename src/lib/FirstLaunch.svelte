<!-- First-launch help for the unsigned builds, one tab per platform; opens on the visitor's own. -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { OSES, PLATFORMS, RELEASES_URL, type OS } from './release.ts';

  let current = $state<OS>('mac');
  const tabs: HTMLButtonElement[] = [];

  onMount(() => {
    const os = document.documentElement.dataset.os as OS | undefined;
    if (os && OSES.includes(os)) current = os;
  });

  function onKey(e: KeyboardEvent) {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    const next = OSES[(OSES.indexOf(current) + step + OSES.length) % OSES.length];
    current = next;
    tabs[OSES.indexOf(next)]?.focus();
  }
</script>

<div class="tabs" role="tablist" aria-label="Your platform" tabindex="-1" onkeydown={onKey}>
  {#each OSES as os, i (os)}
    <button
      bind:this={tabs[i]}
      role="tab"
      id="tab-{os}"
      aria-controls="panel-{os}"
      aria-selected={current === os}
      tabindex={current === os ? 0 : -1}
      onclick={() => (current = os)}>{PLATFORMS[os].name}</button
    >
  {/each}
</div>

<div class="panel" role="tabpanel" id="panel-mac" aria-labelledby="tab-mac" hidden={current !== 'mac'}>
  <p class="why">Apple can't check Grapplehook yet, so macOS stops the first launch.</p>
  <ol>
    <li>Open the <code>.dmg</code> and drag <b>Grapplehook</b> into <b>Applications</b>.</li>
    <li>Open it once. macOS blocks it. That's fine.</li>
    <li>Go to <b>System Settings → Privacy &amp; Security</b>, scroll down, click <b>Open Anyway</b> and confirm.</li>
  </ol>
  <p class="more">
    If macOS says the app <i>is damaged and can't be opened</i>, clear the flag it puts on downloads, in Terminal:
  </p>
  <pre><code>xattr -cr /Applications/Grapplehook.app</code></pre>
</div>

<div class="panel" role="tabpanel" id="panel-windows" aria-labelledby="tab-windows" hidden={current !== 'windows'}>
  <p class="why">The installer isn't signed yet, so SmartScreen shows <i>Windows protected your PC</i>.</p>
  <ol>
    <li>Click <b>More info</b>.</li>
    <li>Click <b>Run anyway</b>.</li>
  </ol>
  <p class="more">Your browser may flag the download too: choose <b>Keep</b> or <b>Keep anyway</b>.</p>
</div>

<div class="panel" role="tabpanel" id="panel-linux" aria-labelledby="tab-linux" hidden={current !== 'linux'}>
  <p class="why">No signing here. Make the AppImage runnable, then open it:</p>
  <pre><code>chmod +x Grapplehook*.AppImage
./Grapplehook*.AppImage</code></pre>
  <p class="more">
    A FUSE error on newer distros (Ubuntu 24.04 and later)? Install <code>libfuse2t64</code>, or run it with
    <code>--appimage-extract-and-run</code>.
  </p>
</div>

<p class="verify">
  Want to check the file? Every download's SHA-256 is listed on the <a href={RELEASES_URL}>release page</a>.
</p>

<style>
  .tabs {
    display: flex;
    gap: 4px;
    margin-bottom: 24px;
    padding: 4px;
    width: fit-content;
    max-width: 100%;
    border-radius: 8px;
    background: var(--ground);
  }
  [role='tab'] {
    min-height: 40px;
    padding: 0 20px;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: var(--muted);
    font: 600 0.94rem var(--sans);
    cursor: pointer;
    transition:
      background 120ms ease-out,
      color 120ms ease-out;
  }
  [role='tab']:hover {
    color: var(--ink);
  }
  [role='tab'][aria-selected='true'] {
    background: var(--field-2);
    color: var(--ink);
  }
  @media (max-width: 720px) {
    .tabs {
      width: 100%;
    }
    [role='tab'] {
      flex: 1;
      padding: 0 12px;
    }
  }
  .why {
    font-weight: 600;
    margin-bottom: 16px;
  }
  ol {
    padding: 0;
    list-style: none;
    counter-reset: step;
    display: grid;
    gap: 12px;
    max-width: 62ch;
  }
  li {
    counter-increment: step;
    position: relative;
    padding-left: 32px;
  }
  li::before {
    position: absolute;
    left: 0;
    content: counter(step);
    font: 800 1.25rem/1.3 var(--display);
    color: var(--tag);
    font-variant-numeric: tabular-nums;
  }
  .more {
    margin-top: 20px;
    max-width: 62ch;
    color: var(--muted);
  }
  pre {
    margin: 12px 0 0;
    padding: 16px 20px;
    border-radius: 6px;
    background: var(--ground);
    overflow-x: auto;
    line-height: 1.7;
  }
  .verify {
    margin-top: 32px;
    padding-top: 20px;
    border-top: 1px dashed var(--line);
    color: var(--muted);
    font-size: 0.94rem;
  }
</style>
