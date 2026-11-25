<!-- The first launch, acted out for one platform as a looping scene beside its steps. Same rules as
     SendDemo: one shared clock (--t) per scene so the keyframe percentages read as a single timeline, it
     only runs while on screen, it can be paused, and reduced motion holds it still on the finished frame. -->
<script lang="ts">
  import { onMount } from 'svelte';
  import type { OS } from './release.ts';

  let { os }: { os: OS } = $props();

  let stage = $state<HTMLElement>();
  let visible = $state(false);
  let paused = $state(false);
  let still = $state(false);

  onMount(() => {
    still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.35 });
    io.observe(stage!);
    return () => io.disconnect();
  });

  const LABELS: Record<OS, string> = {
    mac: 'Grapplehook is dragged from the disk image into Applications. On first open, macOS asks whether to open an app downloaded from the internet, Open is clicked, and Grapplehook opens.',
    windows:
      'Windows shows "Windows protected your PC". More info is clicked, which shows Run anyway; Run anyway is clicked and the Grapplehook installer runs to the end.',
    linux:
      'In a terminal, chmod +x Grapplehook*.AppImage is typed, then ./Grapplehook*.AppImage, and Grapplehook opens.',
  };
</script>

{#snippet hook()}
  <svg viewBox="0 0 24 24" class="hook">
    <circle cx="12" cy="3.2" r="1.4" />
    <path d="M11.9 4.6c-.2 1.1-.6 1.7-.5 2.4.2.6 2 1.3 2.1 2.7.1 1.2-.7 1.9-1.6 2.2" />
    <g transform="translate(11.8 11.8) rotate(-18)"><path d="M-1.6 -2.4H1.6L3.8 .6V9.6H-3.8V.6Z" /><circle r="1.1" /></g>
  </svg>
{/snippet}

{#snippet app()}
  <div class="app">
    <div class="bar"><i></i><i></i><i></i><span>Grapplehook</span></div>
    <div class="field">Paste a video link</div>
    <span class="line l1"></span>
    <span class="line l2"></span>
    <span class="go">Download</span>
  </div>
{/snippet}

{#snippet cursor()}
  <svg class="cursor" viewBox="0 0 16 22"><path d="M1 1v17l4.6-4.4 3 6.6 3-1.4-3-6.4H15Z" /></svg>
{/snippet}

<figure class="launch-demo">
  <div
    class="stage"
    class:still
    bind:this={stage}
    style:--state={visible && !paused && !still ? 'running' : 'paused'}
    role="img"
    aria-label={LABELS[os]}
  >
    {#key os}
      <div class="scene {os}" aria-hidden="true">
        {#if os === 'mac'}
          <div class="window dmg">
            <div class="bar"><i></i><i></i><i></i><span>Grapplehook</span></div>
          </div>
          <div class="tile icon">{@render hook()}</div>
          <span class="caption c-app">Grapplehook</span>
          <svg class="arrow" viewBox="0 0 40 10"><path d="M1 5h36m-5-4 5 4-5 4" /></svg>
          <div class="tile folder">
            <svg viewBox="0 0 24 24"><path d="M2.5 6.5a2 2 0 0 1 2-2h4.6l2 2.2h8.4a2 2 0 0 1 2 2v9.8a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z" /></svg>
          </div>
          <span class="caption c-folder">Applications</span>
          <div class="tile ghost">{@render hook()}</div>

          <div class="dialog">
            <div class="d-icon">{@render hook()}</div>
            <p class="d-title">"Grapplehook" is an app downloaded from the internet.</p>
            <p class="d-sub">Are you sure you want to open it?</p>
            <span class="btn-s cancel">Cancel</span>
            <span class="btn-s open">Open</span>
          </div>
          {@render app()}
          {@render cursor()}
        {:else if os === 'windows'}
          <div class="smart">
            <p class="s-title">Windows protected your PC</p>
            <span class="s-bar b1"></span>
            <span class="s-bar b2"></span>
            <span class="s-more">More info</span>
            <p class="s-row r1"><span>App:</span>Grapplehook_x64-setup.exe</p>
            <p class="s-row r2"><span>Publisher:</span>Unknown publisher</p>
            <span class="s-btn run">Run anyway</span>
            <span class="s-btn dont">Don't run</span>
          </div>
          <div class="window setup">
            <div class="bar"><span>Grapplehook Setup</span></div>
            <p class="st-text working">Installing Grapplehook…</p>
            <p class="st-text done">Grapplehook is installed.</p>
            <span class="track"><span class="fill"></span></span>
          </div>
          {@render cursor()}
        {:else}
          <div class="window term">
            <div class="bar"><i></i><i></i><i></i><span>Terminal</span></div>
            <p class="cmd k1"><b>$</b><span class="typed">chmod +x Grapplehook*.AppImage</span></p>
            <p class="cmd k2"><b>$</b><span class="typed">./Grapplehook*.AppImage</span></p>
          </div>
          {@render app()}
        {/if}
      </div>
    {/key}
  </div>
  {#if !still}
    <button class="pause" type="button" onclick={() => (paused = !paused)}>
      {paused ? 'Play' : 'Pause'}
    </button>
  {/if}
</figure>

<style>
  .launch-demo {
    margin: 0;
  }
  .stage {
    --t: 9s;
    container-type: inline-size;
    border-radius: 8px;
    background: var(--ground);
    overflow: hidden;
  }
  .scene :global(*),
  .scene {
    animation-duration: var(--t);
    animation-iteration-count: infinite;
    animation-play-state: var(--state, paused);
    animation-fill-mode: both;
    animation-timing-function: linear;
  }
  /* Reduced motion: hold each scene on the frame where Grapplehook is open (installed, on Windows). */
  .still .scene :global(*) {
    animation-delay: calc(var(--t) * -0.84) !important;
    animation-play-state: paused !important;
  }

  .scene {
    position: relative;
    width: 100cqw;
    height: 80cqw;
    color: var(--ink);
    font: 500 2.6cqw/1.3 system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  }
  .scene > :global(*) {
    position: absolute;
  }
  .scene p {
    margin: 0;
  }

  /* ---------- shared parts ---------- */
  .window {
    border-radius: 1.6cqw;
    background: var(--field);
    box-shadow: 0 1.5cqw 4cqw rgb(0 0 0 / 0.45);
  }
  .bar {
    display: flex;
    align-items: center;
    gap: 1cqw;
    height: 6cqw;
    padding: 0 2cqw;
    border-bottom: 1px solid var(--field-2);
  }
  .bar i {
    width: 1.4cqw;
    height: 1.4cqw;
    border-radius: 50%;
    background: var(--line);
  }
  .bar span {
    margin-left: 1.2cqw;
    color: var(--muted);
    font-size: 2.2cqw;
  }
  .hook {
    width: 62%;
    fill: none;
    stroke: var(--tag);
    stroke-width: 1.6;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .cursor {
    left: 0;
    top: 0;
    width: 3.6cqw;
    fill: #fff;
    stroke: #111;
    stroke-width: 1.2;
    stroke-linejoin: round;
    filter: drop-shadow(0 0.4cqw 0.5cqw rgb(0 0 0 / 0.5));
    transform-origin: 0 0;
  }

  /* Grapplehook, open at last (mac and linux). */
  .app {
    left: 30cqw;
    top: 18cqw;
    width: 62cqw;
    height: 52cqw;
    border: 1px solid var(--line);
    border-radius: 1.6cqw;
    background: var(--ground);
    box-shadow: 0 1.5cqw 4cqw rgb(0 0 0 / 0.55);
    animation-name: app-in;
  }
  .app > * {
    position: absolute;
    left: 3cqw;
    right: 3cqw;
  }
  .app .bar {
    left: 0;
    right: 0;
    top: 0;
  }
  .app .bar span {
    color: var(--ink);
    font: 700 2.8cqw/1 var(--display);
  }
  .app .field {
    top: 10cqw;
    height: 7cqw;
    display: flex;
    align-items: center;
    padding: 0 2cqw;
    border-radius: 1cqw;
    background: var(--field);
    color: var(--muted);
  }
  .app .line {
    height: 2.2cqw;
    border-radius: 0.6cqw;
    background: var(--field-2);
  }
  .app .l1 {
    top: 22cqw;
    right: 20cqw;
  }
  .app .l2 {
    top: 27cqw;
    right: 34cqw;
  }
  .app .go {
    top: 37cqw;
    height: 7cqw;
    display: grid;
    place-items: center;
    border-radius: 1cqw;
    background: var(--tag);
    color: var(--tag-ink);
    font: 700 3cqw/1 var(--display);
  }

  /* ---------- macOS: drag to Applications, then Open ---------- */
  .dmg {
    left: 4cqw;
    top: 6cqw;
    width: 92cqw;
    height: 50cqw;
    animation-name: dim;
  }
  .tile {
    width: 18cqw;
    height: 18cqw;
    display: grid;
    place-items: center;
    border-radius: 3.6cqw;
    background: var(--ground);
  }
  .icon {
    left: 20cqw;
    top: 20cqw;
    animation-name: dim;
  }
  .folder {
    left: 62cqw;
    top: 20cqw;
    animation-name: folder;
  }
  .folder svg {
    width: 64%;
    fill: var(--line);
    animation-name: folder-ink;
  }
  .caption {
    top: 41cqw;
    width: 26cqw;
    text-align: center;
    color: var(--muted);
    font-size: 2.2cqw;
    animation-name: dim;
  }
  .c-app {
    left: 16cqw;
  }
  .c-folder {
    left: 58cqw;
  }
  .arrow {
    left: 42cqw;
    top: 27cqw;
    width: 16cqw;
    fill: none;
    stroke: var(--line);
    stroke-width: 1.4;
    stroke-linecap: round;
    stroke-linejoin: round;
    animation-name: dim;
  }
  .ghost {
    left: 20cqw;
    top: 20cqw;
    background: var(--field-2);
    animation-name: ghost;
  }
  .dialog {
    left: 18cqw;
    top: 22cqw;
    width: 64cqw;
    height: 48cqw;
    border-radius: 2cqw;
    background: var(--field-2);
    box-shadow: 0 2cqw 5cqw rgb(0 0 0 / 0.55);
    text-align: center;
    animation-name: dialog;
  }
  .dialog > * {
    position: absolute;
    left: 5cqw;
    right: 5cqw;
  }
  .d-icon {
    left: 27cqw;
    right: auto;
    top: 4cqw;
    width: 10cqw;
    height: 10cqw;
    display: grid;
    place-items: center;
    border-radius: 2.4cqw;
    background: var(--ground);
  }
  .d-title {
    top: 17cqw;
    font-weight: 600;
  }
  .d-sub {
    top: 28cqw;
    color: var(--muted);
    font-size: 2.3cqw;
  }
  .btn-s {
    top: 36cqw;
    width: 25cqw;
    height: 7cqw;
    display: grid;
    place-items: center;
    border-radius: 1.2cqw;
    background: var(--line);
    font-weight: 600;
  }
  .cancel {
    left: 5cqw;
    right: auto;
  }
  .open {
    left: auto;
    right: 5cqw;
    background: var(--ink);
    color: var(--ground);
    animation-name: press-open;
  }
  .mac .cursor {
    animation-name: mac-cursor;
  }

  /* 9s: point · press · drag · drop · ask · Open · Grapplehook opens · hold · reset */
  @keyframes mac-cursor {
    0%,
    6% {
      translate: 52cqw 72cqw;
      scale: 1;
      animation-timing-function: cubic-bezier(0.6, 0, 0.2, 1);
    }
    16% {
      translate: 30cqw 31cqw;
      scale: 1;
    }
    18% {
      translate: 30cqw 31cqw;
      scale: 0.85;
      animation-timing-function: cubic-bezier(0.5, 0, 0.3, 1);
    }
    36% {
      translate: 72cqw 31cqw;
      scale: 0.85;
    }
    38% {
      translate: 72cqw 31cqw;
      scale: 1;
    }
    46% {
      translate: 72cqw 31cqw;
      scale: 1;
      animation-timing-function: cubic-bezier(0.6, 0, 0.2, 1);
    }
    56% {
      translate: 70cqw 61cqw;
      scale: 1;
    }
    58% {
      translate: 70cqw 61cqw;
      scale: 0.85;
    }
    60% {
      translate: 70cqw 61cqw;
      scale: 1;
      animation-timing-function: cubic-bezier(0.3, 0, 0.2, 1);
    }
    70%,
    92% {
      translate: 94cqw 76cqw;
      scale: 1;
      animation-timing-function: cubic-bezier(0.6, 0, 0.2, 1);
    }
    100% {
      translate: 52cqw 72cqw;
    }
  }
  @keyframes ghost {
    0%,
    18% {
      opacity: 0;
      translate: 0 0;
      scale: 1;
      animation-timing-function: cubic-bezier(0.5, 0, 0.3, 1);
    }
    19% {
      opacity: 0.9;
      translate: 0 0;
      scale: 1;
      animation-timing-function: cubic-bezier(0.5, 0, 0.3, 1);
    }
    36% {
      opacity: 0.9;
      translate: 42cqw 0;
      scale: 1;
    }
    40%,
    100% {
      opacity: 0;
      translate: 42cqw 0;
      scale: 0.5;
    }
  }
  @keyframes folder {
    0%,
    33% {
      background: var(--ground);
    }
    36%,
    42% {
      background: var(--field-2);
    }
    46%,
    100% {
      background: var(--ground);
    }
  }
  @keyframes folder-ink {
    0%,
    37% {
      fill: var(--line);
    }
    39%,
    92% {
      fill: var(--ink);
    }
    97%,
    100% {
      fill: var(--line);
    }
  }
  @keyframes dim {
    0%,
    42% {
      opacity: 1;
    }
    46%,
    92% {
      opacity: 0.3;
    }
    97%,
    100% {
      opacity: 1;
    }
  }
  @keyframes dialog {
    0%,
    42% {
      opacity: 0;
      scale: 0.96;
      visibility: hidden;
      animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
    }
    46%,
    61% {
      opacity: 1;
      scale: 1;
      visibility: visible;
    }
    64%,
    100% {
      opacity: 0;
      scale: 0.98;
      visibility: hidden;
    }
  }
  @keyframes press-open {
    0%,
    57% {
      background: var(--ink);
    }
    58%,
    60% {
      background: var(--muted);
    }
    61%,
    100% {
      background: var(--ink);
    }
  }
  @keyframes app-in {
    0%,
    64% {
      opacity: 0;
      translate: 0 2cqw;
      visibility: hidden;
      animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
    }
    70%,
    92% {
      opacity: 1;
      translate: 0 0;
      visibility: visible;
    }
    97%,
    100% {
      opacity: 0;
      translate: 0 0;
      visibility: hidden;
    }
  }

  /* ---------- Windows: More info · Run anyway · installer ---------- */
  .smart {
    left: 4cqw;
    top: 5cqw;
    width: 92cqw;
    height: 70cqw;
    border-radius: 1.2cqw;
    background: #24496b;
    color: #fff;
    box-shadow: 0 1.5cqw 4cqw rgb(0 0 0 / 0.45);
    animation-name: smart;
  }
  .smart > * {
    position: absolute;
    left: 6cqw;
  }
  .s-title {
    top: 7cqw;
    font-size: 4.6cqw;
    font-weight: 600;
    line-height: 1.1;
  }
  .s-bar {
    height: 2cqw;
    border-radius: 0.6cqw;
    background: rgb(255 255 255 / 0.28);
  }
  .b1 {
    top: 18cqw;
    width: 70cqw;
  }
  .b2 {
    top: 22.5cqw;
    width: 52cqw;
  }
  .s-more {
    top: 28cqw;
    text-decoration: underline;
    text-underline-offset: 0.4cqw;
    animation-name: s-more;
  }
  .s-row {
    font-size: 2.4cqw;
    animation-name: details;
  }
  .s-row span {
    display: inline-block;
    width: 14cqw;
    color: rgb(255 255 255 / 0.7);
  }
  .r1 {
    top: 36cqw;
  }
  .r2 {
    top: 41cqw;
  }
  .s-btn {
    top: 57cqw;
    width: 24cqw;
    height: 7cqw;
    display: grid;
    place-items: center;
    border-radius: 0.6cqw;
    background: rgb(255 255 255 / 0.16);
    font-size: 2.4cqw;
  }
  .run {
    left: 36cqw;
    animation-name: run;
  }
  .dont {
    left: 63cqw;
  }
  .setup {
    left: 12cqw;
    top: 16cqw;
    width: 76cqw;
    height: 44cqw;
    animation-name: setup;
  }
  .setup > * {
    position: absolute;
    left: 5cqw;
    right: 5cqw;
  }
  .setup .bar {
    left: 0;
    right: 0;
    top: 0;
  }
  .setup .bar span {
    margin-left: 0;
  }
  .st-text {
    top: 14cqw;
  }
  .working {
    animation-name: working;
  }
  .done {
    color: var(--ok);
    font-weight: 600;
    animation-name: done;
  }
  .track {
    top: 26cqw;
    height: 2.4cqw;
    border-radius: 2cqw;
    background: var(--ground);
    overflow: hidden;
  }
  .fill {
    display: block;
    height: 100%;
    border-radius: 2cqw;
    background: var(--ok);
    transform-origin: 0 50%;
    animation-name: progress;
  }
  .windows .cursor {
    animation-name: win-cursor;
  }

  /* 9s: point · More info · details · Run anyway · installer fills · installed · hold · reset */
  @keyframes win-cursor {
    0%,
    6% {
      translate: 60cqw 74cqw;
      scale: 1;
      animation-timing-function: cubic-bezier(0.6, 0, 0.2, 1);
    }
    18% {
      translate: 17cqw 34.6cqw;
      scale: 1;
    }
    20% {
      translate: 17cqw 34.6cqw;
      scale: 0.85;
    }
    22% {
      translate: 17cqw 34.6cqw;
      scale: 1;
    }
    30% {
      translate: 17cqw 34.6cqw;
      scale: 1;
      animation-timing-function: cubic-bezier(0.6, 0, 0.2, 1);
    }
    40% {
      translate: 52cqw 66cqw;
      scale: 1;
    }
    42% {
      translate: 52cqw 66cqw;
      scale: 0.85;
    }
    44% {
      translate: 52cqw 66cqw;
      scale: 1;
      animation-timing-function: cubic-bezier(0.3, 0, 0.2, 1);
    }
    54%,
    92% {
      translate: 94cqw 76cqw;
      scale: 1;
      animation-timing-function: cubic-bezier(0.6, 0, 0.2, 1);
    }
    100% {
      translate: 60cqw 74cqw;
    }
  }
  @keyframes s-more {
    0%,
    21% {
      opacity: 1;
    }
    23%,
    100% {
      opacity: 0;
    }
  }
  @keyframes details {
    0%,
    22% {
      opacity: 0;
      translate: 0 1cqw;
      animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
    }
    27%,
    100% {
      opacity: 1;
      translate: 0 0;
    }
  }
  @keyframes run {
    0%,
    22% {
      opacity: 0;
      background: rgb(255 255 255 / 0.16);
    }
    27%,
    41% {
      opacity: 1;
      background: rgb(255 255 255 / 0.16);
    }
    42%,
    44% {
      opacity: 1;
      background: rgb(255 255 255 / 0.34);
    }
    45%,
    100% {
      opacity: 1;
      background: rgb(255 255 255 / 0.16);
    }
  }
  @keyframes smart {
    0%,
    45% {
      opacity: 1;
      scale: 1;
      visibility: visible;
    }
    49%,
    95% {
      opacity: 0;
      scale: 0.98;
      visibility: hidden;
    }
    99%,
    100% {
      opacity: 1;
      scale: 1;
      visibility: visible;
    }
  }
  @keyframes setup {
    0%,
    48% {
      opacity: 0;
      translate: 0 2cqw;
      visibility: hidden;
      animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
    }
    54%,
    92% {
      opacity: 1;
      translate: 0 0;
      visibility: visible;
    }
    96%,
    100% {
      opacity: 0;
      translate: 0 0;
      visibility: hidden;
    }
  }
  @keyframes progress {
    0%,
    55% {
      scale: 0 1;
      animation-timing-function: cubic-bezier(0.4, 0, 0.3, 1);
    }
    76%,
    100% {
      scale: 1 1;
    }
  }
  @keyframes working {
    0%,
    76% {
      opacity: 1;
    }
    78%,
    100% {
      opacity: 0;
    }
  }
  @keyframes done {
    0%,
    77% {
      opacity: 0;
    }
    79%,
    100% {
      opacity: 1;
    }
  }

  /* ---------- Linux: two commands, then Grapplehook ---------- */
  .term {
    left: 4cqw;
    top: 6cqw;
    width: 92cqw;
    height: 50cqw;
    background: #0c0b0a;
    animation-name: term-dim;
  }
  .term .bar {
    border-bottom-color: var(--field);
  }
  .cmd {
    position: absolute;
    left: 4cqw;
    right: 4cqw;
    display: flex;
    gap: 1.6cqw;
    font: 2.8cqw/1 var(--mono);
    white-space: nowrap;
  }
  .cmd b {
    color: var(--ok);
    font-weight: 600;
  }
  .k1 {
    top: 12cqw;
  }
  .k2 {
    top: 19cqw;
    animation-name: line2;
  }
  .typed {
    overflow: hidden;
  }
  .k1 .typed {
    animation-name: type1;
  }
  .k2 .typed {
    animation-name: type2;
  }
  .linux .app {
    animation-name: app-in;
  }

  /* 9s: type chmod · enter · type run · enter · Grapplehook opens · hold · reset */
  @keyframes type1 {
    0%,
    6% {
      clip-path: inset(0 100% 0 0);
      animation-timing-function: steps(30, end);
    }
    26%,
    100% {
      clip-path: inset(0 0 0 0);
    }
  }
  @keyframes term-dim {
    0%,
    58% {
      opacity: 1;
    }
    64%,
    92% {
      opacity: 0.3;
    }
    97%,
    100% {
      opacity: 1;
    }
  }
  @keyframes line2 {
    0%,
    30% {
      opacity: 0;
    }
    31%,
    100% {
      opacity: 1;
    }
  }
  @keyframes type2 {
    0%,
    34% {
      clip-path: inset(0 100% 0 0);
      animation-timing-function: steps(23, end);
    }
    50%,
    100% {
      clip-path: inset(0 0 0 0);
    }
  }

  .pause {
    display: block;
    margin: 8px 0 0 auto;
    padding: 4px 8px;
    border: 0;
    border-radius: 4px;
    background: none;
    color: var(--muted);
    font: 600 0.82rem var(--sans);
    cursor: pointer;
  }
  .pause:hover {
    color: var(--ink);
    background: var(--field-2);
  }
</style>
