<!-- The extension at work, as one looping scene: open the hook button's arrow under a video, pick 1080p,
     and the link rides a rope into Grapplehook. Every part runs on one shared 9s clock (--t), so the
     keyframe percentages below are a single timeline; reduced motion freezes it on the finished frame. -->
<script lang="ts">
  import { onMount } from 'svelte';

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

  const QUALITIES = ['Best', '2160p', '1440p', '1080p', '720p'];
</script>

<figure class="send-demo">
  <div
    class="stage"
    class:still
    bind:this={stage}
    style:--state={visible && !paused && !still ? 'running' : 'paused'}
    role="img"
    aria-label="Under a video, next to Like and Share, the Grapplehook button's arrow is opened and 1080p is picked. The link travels to the Grapplehook app, which opens with the video and 1080p already chosen."
  >
    <div class="scene" aria-hidden="true">
      <!-- The browser, with a plain video page. -->
      <div class="browser">
        <div class="chrome">
          <i></i><i></i><i></i>
          <span class="address">youtube.com/watch?v=…</span>
        </div>
        <div class="player">
          <svg class="play" viewBox="0 0 24 24"><path d="M8 5.5v13l10.5-6.5Z" /></svg>
          <span class="scrub"><span></span></span>
        </div>
        <span class="bar title"></span>
        <span class="bar title2"></span>
        <div class="row">
          <span class="avatar"></span>
          <span class="bar channel"></span>
          <span class="chip like">Like</span>
          <span class="chip share">Share</span>
          <span class="pill">
            <span class="send">
              <svg viewBox="0 0 24 24" class="hook">
                <circle cx="12" cy="3.2" r="1.4" />
                <path d="M11.9 4.6c-.2 1.1-.6 1.7-.5 2.4.2.6 2 1.3 2.1 2.7.1 1.2-.7 1.9-1.6 2.2" />
                <g transform="translate(11.8 11.8) rotate(-18)"><path d="M-1.6 -2.4H1.6L3.8 .6V9.6H-3.8V.6Z" /><circle r="1.1" /></g>
              </svg>
              <span class="label-swap"><span class="was">Best</span><span class="now">1080p</span></span>
            </span>
            <span class="more"><svg viewBox="0 0 24 24"><path d="m7 10 5 5 5-5" /></svg></span>
          </span>
        </div>
        <div class="menu">
          <p>Send to Grapplehook</p>
          {#each QUALITIES as q (q)}
            <span class="item" class:pick={q === '1080p'}>
              <svg viewBox="0 0 24 24" class:on={q === 'Best'}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>{q}
            </span>
          {/each}
        </div>
      </div>

      <!-- The rope the link rides, from the button to Grapplehook's link field. -->
      <svg class="rope" viewBox="0 0 100 72" preserveAspectRatio="none">
        <path d="M53 47Q62 2 72 13" pathLength="1" />
      </svg>
      <span class="tag"><i></i></span>

      <!-- Grapplehook, opening with the sent link. -->
      <div class="app">
        <div class="app-bar"><i></i><i></i><i></i><span>Grapplehook</span></div>
        <div class="url"><span class="hint">Paste a video link</span><span class="typed">https://www.youtube.com/watch?v=…</span></div>
        <div class="card">
          <span class="thumb"></span>
          <span class="bar t1"></span>
          <span class="bar t2"></span>
        </div>
        <div class="opt">
          <span>Quality</span>
          <b>1080p</b>
        </div>
        <span class="dl">Download</span>
      </div>

      <svg class="cursor" viewBox="0 0 16 22"><path d="M1 1v17l4.6-4.4 3 6.6 3-1.4-3-6.4H15Z" /></svg>
    </div>
  </div>
  {#if !still}
    <button class="pause" type="button" onclick={() => (paused = !paused)}>
      {paused ? 'Play' : 'Pause'}
    </button>
  {/if}
</figure>

<style>
  .send-demo {
    margin: 32px 0 8px;
  }
  .stage {
    --t: 9s;
    container-type: inline-size;
    border-radius: 8px;
    background: var(--ground);
    overflow: hidden;
  }
  /* One clock for everything; frozen on the finished frame (76%) under reduced motion. */
  .scene :global(*),
  .scene {
    animation-duration: var(--t);
    animation-iteration-count: infinite;
    animation-play-state: var(--state, paused);
    animation-fill-mode: both;
    animation-timing-function: linear;
  }
  .still .scene :global(*) {
    animation-delay: calc(var(--t) * -0.76) !important;
    animation-play-state: paused !important;
  }

  .scene {
    position: relative;
    width: 100cqw;
    height: 72cqw;
    font: 500 1.5cqw/1 system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  }
  .scene > * {
    position: absolute;
  }

  /* ---------- browser + video page ---------- */
  .browser {
    left: 2cqw;
    top: 2cqw;
    width: 60cqw;
    height: 68cqw;
    border-radius: 1.2cqw;
    background: #181818;
    color: #f1f1f1;
    box-shadow: 0 1.5cqw 4cqw rgb(0 0 0 / 0.45);
  }
  .browser > * {
    position: absolute;
  }
  .chrome {
    inset: 0 0 auto;
    height: 4.4cqw;
    display: flex;
    align-items: center;
    gap: 0.7cqw;
    padding: 0 1.4cqw;
    border-bottom: 1px solid #2a2a2a;
  }
  .chrome i,
  .app-bar i {
    width: 1cqw;
    height: 1cqw;
    border-radius: 50%;
    background: #3d3d3d;
  }
  .address {
    margin-left: 1.6cqw;
    padding: 0.8cqw 1.6cqw;
    flex: 1;
    border-radius: 9cqw;
    background: #262626;
    color: #9a9a9a;
    font-size: 1.3cqw;
  }
  .player {
    left: 2cqw;
    top: 6.4cqw;
    width: 56cqw;
    height: 28cqw;
    border-radius: 1cqw;
    background:
      radial-gradient(circle at 70% 38%, #f6c98a 0 6%, transparent 6.5%),
      linear-gradient(170deg, transparent 58%, #26323a 58.5%),
      linear-gradient(195deg, transparent 52%, #33424a 52.5%),
      linear-gradient(#d7895a, #7b4a55 60%, #3a3243);
    overflow: hidden;
  }
  .play {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 5cqw;
    translate: -50% -50%;
    fill: rgb(255 255 255 / 0.9);
  }
  .scrub {
    position: absolute;
    inset: auto 1.4cqw 1.2cqw;
    height: 0.4cqw;
    background: rgb(255 255 255 / 0.25);
  }
  .scrub span {
    display: block;
    width: 34%;
    height: 100%;
    background: #efe7da;
  }
  .bar {
    height: 1.4cqw;
    border-radius: 0.4cqw;
    background: #333;
  }
  .title {
    left: 2cqw;
    top: 36.4cqw;
    width: 40cqw;
    background: #4a4a4a;
  }
  .title2 {
    left: 2cqw;
    top: 39.2cqw;
    width: 24cqw;
    background: #4a4a4a;
  }
  .row {
    left: 2cqw;
    right: 2cqw;
    top: 43cqw;
    height: 4.4cqw;
    display: flex;
    align-items: center;
    gap: 0.8cqw;
  }
  .avatar {
    width: 4cqw;
    height: 4cqw;
    border-radius: 50%;
    background: #5a4a40;
  }
  .channel {
    width: 9cqw;
    margin-right: auto;
  }
  .chip,
  .pill {
    height: 100%;
    display: inline-flex;
    align-items: center;
    border-radius: 9cqw;
    background: #272727;
  }
  .chip {
    padding: 0 1.6cqw;
  }
  .send {
    display: inline-flex;
    align-items: center;
    gap: 0.6cqw;
    height: 100%;
    padding: 0 1.2cqw 0 1cqw;
    border-radius: 9cqw 0 0 9cqw;
  }
  .more {
    position: relative;
    display: inline-flex;
    align-items: center;
    height: 100%;
    padding: 0 0.9cqw 0 0.7cqw;
    border-radius: 0 9cqw 9cqw 0;
    animation-name: more;
  }
  .more::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.8cqw;
    bottom: 0.8cqw;
    width: 1px;
    background: #444;
  }
  .send svg,
  .more svg,
  .item svg {
    width: 2.2cqw;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.75;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .hook {
    color: var(--tag);
  }
  .label-swap {
    display: grid;
  }
  .label-swap > * {
    grid-area: 1 / 1;
  }
  .was {
    animation-name: was;
  }
  .now {
    animation-name: now;
  }

  .menu {
    left: 41cqw;
    top: 48.6cqw;
    width: 17cqw;
    padding: 0.8cqw 0;
    border-radius: 1.2cqw;
    background: #282828;
    box-shadow: 0 0.6cqw 3cqw rgb(0 0 0 / 0.5);
    transform-origin: 85% 0;
    animation-name: menu;
  }
  .menu p {
    padding: 0.4cqw 1.6cqw 0.8cqw;
    color: #aaa;
    font-size: 1.2cqw;
    font-weight: 400;
  }
  .item {
    display: flex;
    align-items: center;
    gap: 1.2cqw;
    height: 2.6cqw;
    padding: 0 1.6cqw 0 1.2cqw;
    font-weight: 400;
  }
  .item svg {
    visibility: hidden;
    stroke-width: 2;
  }
  .item svg.on {
    visibility: visible;
  }
  .item.pick {
    animation-name: pick;
  }

  /* ---------- the rope and the link riding it ---------- */
  .rope {
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  .rope path {
    fill: none;
    stroke: var(--tag);
    stroke-width: 0.35;
    stroke-dasharray: 1;
    vector-effect: none;
    animation-name: rope;
  }
  .tag {
    width: 4.4cqw;
    height: 2.2cqw;
    translate: -50% -50%;
    border-radius: 0.4cqw 0.9cqw 0.9cqw 0.4cqw;
    background: var(--tag);
    box-shadow: 0 0.4cqw 1.2cqw rgb(0 0 0 / 0.45);
    animation-name: ride;
  }
  .tag i {
    position: absolute;
    left: 0.7cqw;
    top: 50%;
    width: 0.7cqw;
    height: 0.7cqw;
    translate: 0 -50%;
    border-radius: 50%;
    background: var(--tag-ink);
  }

  /* ---------- Grapplehook ---------- */
  .app {
    left: 66cqw;
    top: 5cqw;
    width: 32cqw;
    height: 48cqw;
    border: 1px solid var(--line);
    border-radius: 1.2cqw;
    background: var(--ground);
    color: var(--ink);
    box-shadow: 0 1.5cqw 4cqw rgb(0 0 0 / 0.5);
    animation-name: app;
  }
  .app > * {
    position: absolute;
    left: 1.6cqw;
    right: 1.6cqw;
  }
  .app-bar {
    left: 0;
    right: 0;
    top: 0;
    height: 4.4cqw;
    display: flex;
    align-items: center;
    gap: 0.7cqw;
    padding: 0 1.4cqw;
    border-bottom: 1px solid var(--field-2);
  }
  .app-bar span {
    margin-left: 1.2cqw;
    font: 700 1.9cqw/1 var(--display);
  }
  .url {
    top: 6.4cqw;
    height: 4.4cqw;
    display: grid;
    align-items: center;
    padding: 0 1.2cqw;
    border-radius: 0.8cqw;
    background: var(--field);
    box-shadow: inset 0 0 0 1px var(--line);
    overflow: hidden;
    animation-name: field;
  }
  .url span {
    grid-area: 1 / 1;
    white-space: nowrap;
  }
  .typed {
    font: 1.3cqw var(--mono);
    animation-name: type;
  }
  .hint {
    color: var(--muted);
    animation-name: hint;
  }
  .card {
    top: 13cqw;
    height: 20cqw;
    border-radius: 1cqw;
    background: var(--field);
    overflow: hidden;
    animation-name: card;
  }
  .card > * {
    position: absolute;
  }
  .thumb {
    inset: 0 0 auto;
    height: 12.8cqw;
    background:
      radial-gradient(circle at 70% 38%, #f6c98a 0 6%, transparent 6.5%),
      linear-gradient(170deg, transparent 58%, #26323a 58.5%),
      linear-gradient(195deg, transparent 52%, #33424a 52.5%),
      linear-gradient(#d7895a, #7b4a55 60%, #3a3243);
  }
  .card .bar {
    left: 1.4cqw;
    background: var(--field-2);
  }
  .t1 {
    top: 14.4cqw;
    width: 22cqw;
  }
  .t2 {
    top: 17cqw;
    width: 12cqw;
  }
  .opt {
    top: 35cqw;
    height: 4.4cqw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.2cqw;
    border-radius: 0.8cqw;
    background: var(--field);
    color: var(--muted);
    animation-name: card;
  }
  .opt b {
    padding: 0.5cqw 1cqw;
    border-radius: 0.5cqw;
    color: var(--ink);
    animation-name: quality;
  }
  .dl {
    top: 41.4cqw;
    height: 4.4cqw;
    display: grid;
    place-items: center;
    border-radius: 0.8cqw;
    background: var(--tag);
    color: var(--tag-ink);
    font: 700 1.9cqw/1 var(--display);
    animation-name: card;
  }

  .cursor {
    left: 0;
    top: 0;
    width: 2.2cqw;
    fill: #fff;
    stroke: #111;
    stroke-width: 1.2;
    stroke-linejoin: round;
    filter: drop-shadow(0 0.3cqw 0.4cqw rgb(0 0 0 / 0.5));
    transform-origin: 0 0;
    animation-name: cursor;
  }

  /* ---------- the timeline (9s): idle · open arrow · pick 1080p · ride · Grapplehook fills · hold · reset ---------- */
  @keyframes cursor {
    0%,
    8% {
      translate: 40cqw 26cqw;
      scale: 1;
      animation-timing-function: cubic-bezier(0.6, 0, 0.2, 1);
    }
    20% {
      translate: 57.6cqw 45.6cqw;
      scale: 1;
    }
    21.5% {
      scale: 0.82;
    }
    23% {
      translate: 57.6cqw 45.6cqw;
      scale: 1;
      animation-timing-function: cubic-bezier(0.6, 0, 0.2, 1);
    }
    32% {
      translate: 46cqw 60.6cqw;
      scale: 1;
    }
    35% {
      scale: 0.82;
    }
    37% {
      translate: 46cqw 60.6cqw;
      scale: 1;
      animation-timing-function: cubic-bezier(0.3, 0, 0.2, 1);
    }
    50%,
    90% {
      translate: 42cqw 50cqw;
      scale: 1;
      animation-timing-function: cubic-bezier(0.6, 0, 0.2, 1);
    }
    100% {
      translate: 40cqw 26cqw;
    }
  }
  @keyframes more {
    0%,
    19% {
      background: transparent;
    }
    20%,
    37% {
      background: #3f3f3f;
    }
    39%,
    100% {
      background: transparent;
    }
  }
  @keyframes menu {
    0%,
    21.5% {
      opacity: 0;
      scale: 0.96;
      visibility: hidden;
    }
    24%,
    36.5% {
      opacity: 1;
      scale: 1;
      visibility: visible;
    }
    38.5%,
    100% {
      opacity: 0;
      scale: 0.98;
      visibility: hidden;
    }
  }
  @keyframes pick {
    0%,
    30% {
      background: transparent;
    }
    31.5%,
    37% {
      background: #3f3f3f;
    }
    38%,
    100% {
      background: transparent;
    }
  }
  @keyframes was {
    0%,
    37% {
      opacity: 1;
      translate: 0 0;
    }
    39%,
    91% {
      opacity: 0;
      translate: 0 -0.8cqw;
    }
    94%,
    100% {
      opacity: 1;
      translate: 0 0;
    }
  }
  @keyframes now {
    0%,
    37% {
      opacity: 0;
      translate: 0 0.8cqw;
    }
    39%,
    91% {
      opacity: 1;
      translate: 0 0;
    }
    94%,
    100% {
      opacity: 0;
      translate: 0 0.8cqw;
    }
  }
  @keyframes rope {
    0%,
    38% {
      stroke-dashoffset: 1;
      opacity: 1;
    }
    55% {
      stroke-dashoffset: 0;
      opacity: 1;
    }
    62% {
      stroke-dashoffset: 0;
      opacity: 0.35;
    }
    90% {
      stroke-dashoffset: 0;
      opacity: 0.35;
    }
    96%,
    100% {
      stroke-dashoffset: 0;
      opacity: 0;
    }
  }
  /* Points on the rope's curve (M53 47 Q62 2 72 13) at t = 0, .2, .4, .6, .8, 1. */
  @keyframes ride {
    0%,
    38% {
      left: 53cqw;
      top: 47cqw;
      opacity: 0;
      rotate: -40deg;
    }
    39% {
      left: 53cqw;
      top: 47cqw;
      opacity: 1;
      rotate: -40deg;
      animation-timing-function: ease-in;
    }
    42.2% {
      left: 56.6cqw;
      top: 31.2cqw;
      rotate: -62deg;
    }
    45.4% {
      left: 60.4cqw;
      top: 20cqw;
      rotate: -50deg;
    }
    48.6% {
      left: 64.2cqw;
      top: 13.2cqw;
      rotate: -18deg;
    }
    51.8% {
      left: 68cqw;
      top: 10.8cqw;
      rotate: 8deg;
      animation-timing-function: ease-out;
    }
    55% {
      left: 72cqw;
      top: 13cqw;
      opacity: 1;
      rotate: 30deg;
    }
    58%,
    100% {
      left: 72cqw;
      top: 13cqw;
      opacity: 0;
      rotate: 30deg;
    }
  }
  @keyframes app {
    0%,
    48% {
      translate: 0 0;
    }
    52% {
      translate: 0 -0.6cqw;
    }
    56%,
    100% {
      translate: 0 0;
    }
  }
  @keyframes field {
    0%,
    54% {
      box-shadow: inset 0 0 0 1px var(--line);
    }
    56%,
    66% {
      box-shadow: inset 0 0 0 2px var(--tag);
    }
    70%,
    100% {
      box-shadow: inset 0 0 0 1px var(--line);
    }
  }
  @keyframes type {
    0%,
    56% {
      clip-path: inset(0 100% 0 0);
      opacity: 1;
    }
    63%,
    90% {
      clip-path: inset(0 0 0 0);
      opacity: 1;
    }
    95%,
    100% {
      clip-path: inset(0 0 0 0);
      opacity: 0;
    }
  }
  @keyframes hint {
    0%,
    55% {
      opacity: 1;
    }
    56%,
    95% {
      opacity: 0;
    }
    98%,
    100% {
      opacity: 1;
    }
  }
  @keyframes card {
    0%,
    62% {
      opacity: 0;
      translate: 0 1.2cqw;
      animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
    }
    70%,
    90% {
      opacity: 1;
      translate: 0 0;
    }
    95%,
    100% {
      opacity: 0;
      translate: 0 0;
    }
  }
  @keyframes quality {
    0%,
    68% {
      background: transparent;
      color: var(--ink);
    }
    71%,
    90% {
      background: var(--tag);
      color: var(--tag-ink);
    }
    95%,
    100% {
      background: transparent;
      color: var(--ink);
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
