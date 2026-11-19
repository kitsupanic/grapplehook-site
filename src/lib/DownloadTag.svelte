<!--
  The one live (orange) tag: the download. It renders a variant per platform plus one for
  unknown devices; app.html sets html[data-os] before paint and CSS shows the matching one.
-->
<script lang="ts">
  import { OSES, PLATFORMS, RELEASES_URL, formatSize, type OS, type Release } from './release.ts';

  let { release, id }: { release: Release | null; id?: string } = $props();

  const others = (os: OS) => OSES.filter((o) => o !== os);
  const href = (os: OS) => release?.files[os]?.url ?? RELEASES_URL;
</script>

<div class="wrap" {id}>
  <div class="tag swing" data-tie="live">
    <span class="eyelet" aria-hidden="true"></span>

    {#each OSES as os (os)}
      {@const file = release?.files[os]}
      <div class="v v-{os}">
        <div class="body">
          <p class="title">For {PLATFORMS[os].name}</p>
          <div class="segs">
            <div class="seg">
              <p class="lbl">File</p>
              <p class="val">{file?.name ?? `${PLATFORMS[os].detail}, latest release`}</p>
            </div>
            {#if file}
              <div class="seg narrow">
                <p class="lbl">Size</p>
                <p class="val num">{formatSize(file.size)}</p>
              </div>
            {/if}
          </div>
        </div>
        <div class="stub">
          <div>
            <p class="lbl">Claim no.</p>
            <p class="claim">{release?.version ?? 'latest'}</p>
          </div>
          <a class="take" href={href(os)}>Download<span class="sr-only"> for {PLATFORMS[os].name}</span></a>
        </div>
      </div>
    {/each}

    <div class="v v-any">
      <div class="body">
        <p class="title">For your computer</p>
        <div class="segs">
          {#each OSES as os (os)}
            <div class="seg">
              <p class="lbl">{PLATFORMS[os].detail}</p>
              <a class="val pick" href={href(os)}>{PLATFORMS[os].name}</a>
            </div>
          {/each}
        </div>
      </div>
      <div class="stub">
        <div>
          <p class="lbl">Claim no.</p>
          <p class="claim">{release?.version ?? 'latest'}</p>
        </div>
        <a class="take" href={RELEASES_URL}>All downloads</a>
      </div>
    </div>
  </div>

  {#each OSES as os (os)}
    <p class="also v v-{os}">
      Also for
      {#each others(os) as o, i (o)}{#if i}{' and '}{/if}<a href={href(o)}>{PLATFORMS[o].name}</a>{/each}.
      {#if os === 'mac'}Apple Silicon only; on an Intel Mac, <a href="#source">build it from source</a>.{/if}
    </p>
  {/each}
  <p class="also v v-any">A desktop app: get it on the computer you download videos to.</p>
</div>

<style>
  .wrap {
    position: relative;
    max-width: 600px;
  }

  .tag {
    --rest: -3deg;
    position: relative;
    display: flex;
    background: var(--tag);
    color: var(--tag-ink);
    border-radius: 12px 6px 6px 12px;
    transform: rotate(var(--rest));
    transform-origin: 23px 50%;
  }
  .tag ::selection {
    background: var(--tag-ink);
    color: var(--tag);
  }

  .eyelet {
    position: absolute;
    left: 14px;
    top: 50%;
    width: 18px;
    height: 18px;
    margin-top: -9px;
    border-radius: 50%;
    background: var(--ground);
  }

  .v {
    display: none;
  }
  .v-any {
    display: contents;
  }
  :global(html[data-os]) .v-any {
    display: none;
  }
  :global(html[data-os='mac']) .v-mac,
  :global(html[data-os='windows']) .v-windows,
  :global(html[data-os='linux']) .v-linux {
    display: contents;
  }
  p.v-any,
  :global(html[data-os='mac']) p.v-mac,
  :global(html[data-os='windows']) p.v-windows,
  :global(html[data-os='linux']) p.v-linux {
    display: block;
  }

  .body {
    flex: 1;
    min-width: 0;
    padding: 24px 24px 24px 48px;
  }
  .lbl {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--tag-ink-2);
  }
  .title {
    font: 700 clamp(2.4rem, 4vw, 3.25rem) / 1 var(--display);
    letter-spacing: -0.01em;
    margin: 0 0 16px;
    padding-bottom: 16px;
    border-bottom: 2px solid var(--tag-ink);
  }
  .segs {
    display: flex;
    flex-wrap: wrap;
  }
  .seg {
    flex: 1 1 0;
    min-width: 0;
    padding: 0 16px;
    border-left: 1px dashed var(--tag-ink);
  }
  .seg:first-child {
    padding-left: 0;
    border-left: 0;
  }
  .seg.narrow {
    flex: 0 0 auto;
  }
  .val {
    margin-top: 4px;
    font-weight: 700;
    font-size: 0.88rem;
    overflow-wrap: anywhere;
  }
  .num,
  .claim {
    font-variant-numeric: tabular-nums;
  }
  a.pick {
    display: inline-block;
    color: var(--tag-ink);
    text-decoration: underline;
    text-decoration-thickness: 2px;
  }
  .tag :focus-visible {
    outline-color: var(--tag-ink);
  }

  .stub {
    flex: 0 0 152px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 24px;
    padding: 24px 16px 16px 24px;
    background: linear-gradient(var(--tag-ink) 50%, transparent 0) left top / 2px 8px repeat-y;
  }
  .claim {
    font: 800 2.6rem/1 var(--display);
    letter-spacing: -0.02em;
    margin-top: 4px;
  }
  .take {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 56px;
    padding: 8px 12px;
    border-radius: 6px;
    background: var(--tag-ink);
    color: var(--tag);
    font-weight: 700;
    font-size: 1.06rem;
    text-align: center;
    text-decoration: none;
    transition: background 120ms ease-out;
  }
  .take:hover {
    background: var(--tag-ink-hover);
  }

  .also {
    margin: 32px 0 0 8px;
    color: var(--muted);
    font-size: 0.94rem;
  }

  @media (max-width: 720px) {
    .tag {
      --rest: -1deg;
      flex-direction: column;
    }
    .eyelet {
      top: 28px;
    }
    .tag {
      transform-origin: 23px 37px;
    }
    .body {
      padding: 20px 20px 20px 44px;
    }
    .stub {
      flex: none;
      flex-direction: row;
      align-items: center;
      padding: 16px 16px 16px 44px;
      background: linear-gradient(90deg, var(--tag-ink) 50%, transparent 0) left top / 8px 2px repeat-x;
    }
    .take {
      flex: 1;
      max-width: 220px;
    }
    .claim {
      font-size: 2rem;
    }
    .seg {
      flex-basis: 100%;
      padding: 8px 0 0;
      border-left: 0;
    }
    .seg + .seg {
      border-top: 1px dashed var(--tag-ink);
      margin-top: 8px;
    }
    .seg.narrow {
      flex-basis: 100%;
    }
    .also {
      margin-top: 24px;
    }
  }
</style>
