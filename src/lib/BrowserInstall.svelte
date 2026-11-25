<!-- Where to get the extension, one slot per browser family, recessed into the dark tag like the stub's
     well. Firefox installs it straight from Firefox Add-ons; Chromium browsers go through Foxified first. -->
<script lang="ts">
  import BrowserIcon from '#lib/BrowserIcon.svelte';

  let { amoUrl, foxifiedUrl, byHandUrl }: { amoUrl: string; foxifiedUrl: string; byHandUrl: string } = $props();
</script>

<div class="slots">
  <div class="slot">
    <div class="marks">
      <BrowserIcon name="firefox" size={40} />
    </div>
    <div class="text">
      <h3>Firefox</h3>
      <p>Version 121 or later. One click on Firefox Add-ons.</p>
    </div>
    <div class="acts">
      <a class="btn" href={amoUrl} target="_blank" rel="noopener">Add to Firefox</a>
    </div>
  </div>

  <div class="slot">
    <div class="marks four">
      <BrowserIcon name="chrome" size={24} />
      <BrowserIcon name="edge" size={24} />
      <BrowserIcon name="brave" size={24} />
      <BrowserIcon name="arc" size={24} />
    </div>
    <div class="text">
      <h3>Chrome, Edge, Brave, Arc</h3>
      <p>
        Two steps. <a href={foxifiedUrl} target="_blank" rel="noopener">Foxified</a> is a free extension that runs Firefox add-ons, so add it first,
        then add Grapplehook through it.
      </p>
    </div>
    <ol class="acts">
      <li>
        <a class="btn step" href={foxifiedUrl} target="_blank" rel="noopener"><span class="n">1</span><span class="go">Get Foxified</span></a>
      </li>
      <li>
        <a class="btn step" href={amoUrl} target="_blank" rel="noopener"><span class="n">2</span><span class="go">Add Grapplehook</span></a>
      </li>
    </ol>
  </div>
</div>
<p class="alt">Rather not use Foxified? <a href={byHandUrl} target="_blank" rel="noopener">Load it by hand</a>.</p>

<style>
  .slots {
    display: grid;
    gap: 8px;
    margin: 32px 0 0;
  }
  .slot {
    display: grid;
    grid-template-columns: 64px minmax(0, 1fr) auto;
    gap: 24px;
    align-items: center;
    padding: 24px;
    border-radius: 8px;
    background: var(--ground);
  }
  .marks {
    display: grid;
    place-items: center;
    width: 64px;
    height: 64px;
    border-radius: 8px;
    background: var(--field);
    color: var(--ink);
  }
  .marks.four {
    grid-template-columns: repeat(2, 24px);
    place-content: center;
    gap: 6px;
  }
  h3 {
    margin: 0 0 4px;
  }
  .text p {
    margin: 0;
    color: var(--muted);
    max-width: 52ch;
  }
  .acts {
    display: grid;
    gap: 8px;
    width: 16rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .acts .btn {
    width: 100%;
  }
  /* A numbered step reads like a claim stub: the numeral sits behind a perforation inside the button. */
  .step {
    padding: 0;
    gap: 0;
  }
  .step .n {
    align-self: stretch;
    display: grid;
    place-items: center;
    width: 48px;
    border-right: 2px dashed var(--ground);
    color: var(--tag);
    font: 700 1.375rem var(--display);
    font-variant-numeric: tabular-nums;
  }
  .step .go {
    flex: 1;
    padding: 0 24px 0 16px;
    text-align: center;
    white-space: nowrap;
  }
  .alt {
    margin: 16px 0 24px;
    color: var(--muted);
  }

  @media (max-width: 720px) {
    .slot {
      grid-template-columns: minmax(0, 1fr);
      gap: 16px;
      padding: 20px;
    }
    .acts {
      width: auto;
    }
    .step .go {
      padding: 0 16px 0 12px;
    }
  }
</style>
