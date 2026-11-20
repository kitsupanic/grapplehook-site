<!--
  The three steps, with the app's routing strip (prepare, download, convert, saved).
  Scrolling through the list runs the "download": the strip fills and the steps light in turn,
  and it ends green on Saved. Without JS or with reduced motion it shows the finished state.
-->
<script lang="ts">
  import { onMount } from 'svelte';

  const STAGES = ['Preparing', 'Downloading', 'Converting to .mp4', 'Saved'];
  // Step n lights once the run reaches this point.
  const LIGHT_AT = [0, 0.4, 0.72];

  let list = $state<HTMLElement>();
  let armed = $state(false);
  let p = $state(1);

  // The first three segments fill across the run; the fourth (saved) fills at the end, as in the app.
  const q = $derived(Math.min(1, p / 0.92));
  const done = $derived(p >= 1);
  const fill = (i: number) => (i === 3 ? (done ? 1 : 0) : Math.max(0, Math.min(1, q * 3 - i)));
  const stage = $derived(done ? 3 : Math.min(2, Math.floor(q * 3)));
  const pct = $derived(Math.round(fill(stage) * 100));

  onMount(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !list) return;
    const el = list;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const start = innerHeight * 0.85; // run starts when the list's top reaches 85% down the screen
      const end = innerHeight * 0.55; // and finishes when its bottom reaches 55%
      p = Math.max(0, Math.min(1, (start - r.top) / (start - end + r.height)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    armed = true;
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
    };
  });
</script>

<div class="run" class:armed class:done bind:this={list}>
  <div class="status" aria-hidden="true">
    <span class="stage">{STAGES[stage]}</span>
    {#if !done}<span class="pct">{pct}%</span>{/if}
  </div>
  <div class="strip" aria-hidden="true">
    {#each STAGES as s, i (s)}
      <span class="seg"><span class="bar" style:transform="scaleX({fill(i)})"></span></span>
    {/each}
  </div>

  <ol class="steps">
    <li class:on={p >= LIGHT_AT[0] && p > 0}>
      <h3>Paste the link</h3>
      <p>The paste button reads it from your clipboard. You see the video's picture, title and length first.</p>
    </li>
    <li class:on={p >= LIGHT_AT[1]}>
      <h3>Pick what you get</h3>
      <p>Any quality, or just the sound. Choose the folder and the file name. Turn it into an .mp4 if you like.</p>
    </li>
    <li class:on={p >= LIGHT_AT[2]}>
      <h3>Collect the file</h3>
      <p>Each download shows its stage, size, speed and time left. Run several at once, and cancel any of them.</p>
    </li>
  </ol>
</div>

<style>
  .status {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    font-size: 0.88rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: var(--tag);
    transition: color 300ms ease-out;
  }
  .pct {
    color: var(--muted);
  }
  .strip {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    margin: 8px 0 28px;
  }
  .seg {
    height: 6px;
    border-radius: 1px;
    background: var(--field-2);
    overflow: hidden;
  }
  .bar {
    display: block;
    height: 100%;
    background: var(--tag);
    transform-origin: left;
    transition:
      background-color 300ms ease-out,
      transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .done .status {
    color: var(--ok);
  }
  .done .bar {
    background: var(--ok);
  }

  .steps {
    padding: 0;
    list-style: none;
    counter-reset: step;
  }
  li {
    counter-increment: step;
    display: grid;
    grid-template-columns: 56px 1fr;
    padding: 20px 0;
    border-top: 1px dashed var(--line);
    transition: opacity 400ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  li:first-child {
    padding-top: 0;
    border-top: 0;
  }
  li::before {
    content: counter(step, decimal-leading-zero);
    grid-row: span 2;
    font: 800 1.86rem/1 var(--display);
    color: var(--tag);
    font-variant-numeric: tabular-nums;
    transition: color 400ms ease-out;
  }
  li p {
    color: var(--muted);
  }
  /* Dimmed only while the run is live (JS on, full motion); otherwise every step shows lit. */
  .armed li:not(.on) {
    opacity: 0.38;
  }
  .armed li:not(.on)::before {
    color: var(--muted);
  }
</style>
