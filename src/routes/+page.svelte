<script lang="ts">
  import { onMount } from 'svelte';
  import DownloadTag from '#lib/DownloadTag.svelte';
  import FirstLaunch from '#lib/FirstLaunch.svelte';
  import Rope from '#lib/Rope.svelte';
  import Steps from '#lib/Steps.svelte';
  import { REPO_URL, fetchRelease } from '#lib/release.ts';

  let { data } = $props();
  // Prerendered at build time; refreshed here so a new release shows up without a redeploy.
  // svelte-ignore state_referenced_locally
  let release = $state(data.release);
  let host = $state<HTMLElement>();

  onMount(async () => {
    const fresh = await fetchRelease();
    if (fresh) release = fresh;
  });

  const SITE = 'https://grapplehook.kitsupanic.com';
  const DESC =
    'Paste a video link, pick a quality, get the file. A free desktop app for macOS, Windows and Linux that runs yt-dlp and ffmpeg for you.';
</script>

<svelte:head>
  <title>Grapplehook: paste a link, get the file</title>
  <meta name="description" content={DESC} />
  <link rel="canonical" href="{SITE}/" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{SITE}/" />
  <meta property="og:title" content="Grapplehook" />
  <meta property="og:description" content={DESC} />
  <meta property="og:image" content="{SITE}/og.png" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="page" bind:this={host}>
  {#if host}<Rope {host} />{/if}

  <header class="hang top">
    <a class="mark" href="/" aria-label="Grapplehook home">grapplehook</a>
    <nav aria-label="Sections">
      <a href="#how">How it works</a>
      <a href="#tools">Tools</a>
      <a href="#first-launch">First launch</a>
      <a href="#source">Source</a>
    </nav>
  </header>

  <main>
    <section class="hang hero" aria-labelledby="hero-title">
      <div class="pitch">
        <h1 id="hero-title">Hook the video.<br />Keep the file.</h1>
        <p class="sub">
          Paste a link, pick a quality, download. Grapplehook runs yt-dlp and ffmpeg for you, so you never touch a
          terminal.
        </p>
      </div>
      <div class="get">
        <DownloadTag {release} id="get" />
      </div>
    </section>

    <section class="hang sec" id="how" aria-labelledby="how-title">
      <div class="dtag swing" data-tie>
        <span class="eyelet" aria-hidden="true"></span>
        <div class="dtag-body">
          <h2 id="how-title">Three steps. No terminal.</h2>
          <div class="how">
            <Steps />
            <figure class="demo">
              <img
                src="/demo.svg"
                width="760"
                height="512"
                loading="lazy"
                alt="Grapplehook at work: a link is pasted, the video's tag appears, Download is pressed, and the download moves through downloading and converting to .mp4 until it is done."
              />
            </figure>
          </div>
        </div>
        <div class="dtag-stub">
          <div>
            <p class="label">Steps</p>
            <p class="claim">3</p>
          </div>
          <a class="btn" href="#get">Download</a>
        </div>
      </div>
    </section>

    <section class="hang sec" id="tools" aria-labelledby="tools-title">
      <div class="dtag swing" data-tie>
        <span class="eyelet" aria-hidden="true"></span>
        <div class="dtag-body">
          <h2 id="tools-title">It sets itself up.</h2>
          <p class="lede">
            Grapplehook does its work with a few free programs. It calls them Tools. You never have to install them by
            hand.
          </p>
          <div class="pair">
            <div>
              <h3>Missing one? It gets its own. <span class="badge">Managed Tool</span></h3>
              <p>
                Say yes, and Grapplehook downloads its own copy, checks it against a published checksum, and keeps it in
                its own folder. You can update or delete these copies any time.
              </p>
            </div>
            <div>
              <h3>Already have one? It uses yours. <span class="badge">System Tool</span></h3>
              <p>If yt-dlp or ffmpeg is already on your computer, Grapplehook uses that copy and never changes it.</p>
            </div>
          </div>
          <table class="tools">
            <caption class="sr-only">The Tools Grapplehook runs</caption>
            <tbody>
              <tr><th scope="row">yt-dlp</th><td>finds and downloads the video</td><td>Required</td></tr>
              <tr><th scope="row">ffmpeg</th><td>joins sound and picture, converts to .mp4</td><td>Required</td></tr>
              <tr><th scope="row">ffprobe</th><td>reads the video's details</td><td>Required</td></tr>
              <tr><th scope="row">aria2c</th><td>makes downloads faster</td><td class="opt">Optional</td></tr>
            </tbody>
          </table>
        </div>
        <div class="dtag-stub">
          <div>
            <p class="label">Tools</p>
            <p class="claim">4</p>
          </div>
          <a class="btn" href="{REPO_URL}#tools">Licenses</a>
        </div>
      </div>
    </section>

    <section class="hang sec" id="first-launch" aria-labelledby="fl-title">
      <div class="dtag swing" data-tie>
        <span class="eyelet" aria-hidden="true"></span>
        <div class="dtag-body">
          <h2 id="fl-title">The first open takes one extra click.</h2>
          <p class="lede">
            The builds aren't code-signed yet, so your computer warns you the first time. That's expected, and it only
            happens once.
          </p>
          <div class="fl"><FirstLaunch /></div>
        </div>
      </div>
    </section>

    <section class="hang sec note" aria-label="Before you download">
      <div class="dtag swing" data-tie>
        <span class="eyelet" aria-hidden="true"></span>
        <div class="dtag-body">
          <p>
            <b>Only download what you have the right to.</b> Downloading from YouTube is governed by YouTube's Terms of
            Service and by copyright law.
          </p>
        </div>
      </div>
    </section>

    <section class="hang sec" id="source" aria-labelledby="source-title">
      <div class="dtag swing" data-tie>
        <span class="eyelet" aria-hidden="true"></span>
        <div class="dtag-body">
          <h2 id="source-title">Free, and open to read.</h2>
          <p class="lede">
            Grapplehook is MIT-licensed and built with Tauri and Svelte. Read the code, build it yourself, or tell us what
            broke. yt-dlp, ffmpeg and aria2c keep their own licenses.
          </p>
          <ul class="links">
            <li><a href={REPO_URL}>Source on GitHub</a></li>
            <li><a href="{REPO_URL}#build-from-source">Build from source</a></li>
            <li><a href="{REPO_URL}/issues/new/choose">Report a problem</a></li>
            <li><a href="{REPO_URL}/blob/main/LICENSE">MIT license</a></li>
          </ul>
        </div>
        <div class="dtag-stub">
          <div>
            <p class="label">License</p>
            <p class="claim">MIT</p>
          </div>
          <a class="btn" href={REPO_URL}>View source</a>
        </div>
      </div>
    </section>

    <section class="hang close" aria-labelledby="close-title">
      <h2 id="close-title">Got a link waiting?</h2>
      <DownloadTag {release} />
    </section>
  </main>

  <footer class="hang foot">
    <p>
      Grapplehook{release ? ` ${release.version}` : ''} · <a href="{REPO_URL}/releases">All releases</a> ·
      <a href={REPO_URL}>GitHub</a> · MIT license
    </p>
  </footer>
</div>

<style>
  .page {
    position: relative;
  }

  .top {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    min-height: 80px;
  }
  .mark {
    font: 700 1.6rem/1 var(--display);
    color: var(--ink);
    text-decoration: none;
    letter-spacing: -0.01em;
  }
  nav {
    display: flex;
    gap: 4px;
  }
  nav a {
    padding: 8px 12px;
    border-radius: 6px;
    color: var(--muted);
    font-size: 0.94rem;
    font-weight: 600;
    text-decoration: none;
    transition:
      background 120ms ease-out,
      color 120ms ease-out;
  }
  nav a:hover {
    background: var(--field-2);
    color: var(--ink);
  }

  main {
    position: relative;
    z-index: 1;
  }

  .hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 560px);
    grid-template-areas: 'pitch get';
    align-items: start;
    column-gap: 48px;
    /* The tag's eyelet (half its height down) lines up with the gap under the headline. */
    --h1: clamp(3.5rem, 7.4vw, 6rem);
    padding-top: clamp(48px, 9vh, 112px);
    padding-bottom: 128px;
  }
  h1 {
    font-size: var(--h1, clamp(3.5rem, 7.4vw, 6rem));
    line-height: 0.9;
    letter-spacing: -0.02em;
  }
  .sub {
    margin-top: 64px;
    max-width: 40ch;
    font-size: 1.19rem;
    color: var(--muted);
  }
  .pitch {
    grid-area: pitch;
  }
  .get {
    grid-area: get;
    margin-top: calc(var(--h1) * 1.8 + 32px - 100px);
  }

  .sec {
    padding-bottom: 96px;
  }
  .sec .dtag {
    max-width: 1100px;
  }

  h3 {
    margin: 0 0 8px;
    font-size: 1.06rem;
    font-weight: 700;
  }

  .how {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr);
    gap: 40px;
    align-items: start;
  }
  .pair p {
    color: var(--muted);
  }
  .demo img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  .pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 32px 0;
  }
  .pair > div {
    padding-right: 32px;
  }
  .pair > div + div {
    padding: 0 0 0 32px;
    border-left: 1px dashed var(--line);
  }
  .tools {
    width: 100%;
    border-collapse: collapse;
  }
  .tools th,
  .tools td {
    padding: 12px 16px 12px 0;
    text-align: left;
    border-top: 1px solid var(--field-2);
  }
  .tools th {
    width: 9rem;
    font: 600 0.94rem var(--mono);
  }
  .tools td {
    color: var(--muted);
  }
  .tools td:last-child {
    width: 1%;
    white-space: nowrap;
    color: var(--ink);
    font-size: 0.88rem;
    font-weight: 600;
  }
  .tools td.opt {
    color: var(--muted);
  }

  .fl {
    margin-top: 24px;
  }
  .badge {
    display: inline-block;
    margin-left: 4px;
    padding: 2px 8px;
    border-radius: 4px;
    background: var(--field-2);
    color: var(--muted);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    vertical-align: 2px;
  }
  .note .dtag {
    max-width: 720px;
  }
  .note .dtag-body {
    padding-top: 32px;
    padding-bottom: 32px;
  }
  .note p {
    color: var(--muted);
  }
  .note b {
    color: var(--ink);
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 32px;
    margin-top: 24px;
    padding: 0;
    list-style: none;
    font-weight: 600;
  }

  .close {
    display: grid;
    gap: 40px;
    padding-top: 32px;
    padding-bottom: 128px;
  }
  .close h2 {
    font-size: clamp(3rem, 6vw, 5rem);
    letter-spacing: -0.02em;
  }

  .foot {
    position: relative;
    z-index: 1;
    padding-bottom: 48px;
    color: var(--muted);
    font-size: 0.88rem;
  }

  @media (max-width: 1080px) {
    .hero {
      grid-template-columns: 1fr;
      grid-template-areas: "pitch" "get";
      row-gap: 56px;
    }
    .get {
      margin-top: 0;
    }
    .sub {
      margin-top: 32px;
    }
    .how {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 720px) {
    .top {
      flex-wrap: wrap;
      min-height: 72px;
      padding-top: 16px;
    }
    nav {
      margin-left: -8px;
      gap: 0;
    }
    nav a {
      padding: 8px;
      font-size: 0.88rem;
    }
    .hero {
      padding-top: 24px;
      padding-bottom: 80px;
    }
    .sec {
      padding-bottom: 64px;
    }
    .pair {
      grid-template-columns: 1fr;
      gap: 24px;
    }
    .pair > div,
    .pair > div + div {
      padding: 0;
      border: 0;
    }
    .pair > div + div {
      padding-top: 24px;
      border-top: 1px dashed var(--line);
    }
    .tools tr {
      display: grid;
      grid-template-columns: 1fr auto;
      padding: 12px 0;
      border-top: 1px solid var(--field-2);
    }
    .tools th,
    .tools td {
      padding: 0;
      border: 0;
      width: auto;
    }
    .tools td:nth-child(2) {
      grid-column: 1 / -1;
      grid-row: 2;
      margin-top: 4px;
    }
    .tools td:last-child {
      grid-column: 2;
      grid-row: 1;
      width: auto;
    }
  }
</style>
