<!--
  The rope: a grapple hook caught on the top edge of the page, its rope winding down the left
  gutter through a knot at every tag ([data-tie]). It draws itself as you scroll; tags marked
  .swing swing once when they come into view. Reduced motion shows the whole rope, still.
-->
<script lang="ts">
  import { onMount } from 'svelte';

  let { host }: { host: HTMLElement } = $props();

  type Tie = { x: number; y: number; live: boolean };
  let w = $state(0);
  let h = $state(0);
  let x = $state(64);
  let ties = $state<Tie[]>([]);
  let rope = $state('');
  let path = $state<SVGPathElement>();
  let len = $state(0);
  let drawn = $state(1);

  const EYE = 44;
  // Tine half-width: 26px, narrower when the rope sits close to the left edge (phones).
  const span = $derived(Math.min(26, x - 10));
  let still = false;

  function layout() {
    if (!host?.isConnected) return;
    const box = host.getBoundingClientRect();
    w = box.width;
    h = host.scrollHeight;
    x = parseFloat(getComputedStyle(host).getPropertyValue('--rope-x')) || 64;
    ties = [...host.querySelectorAll<HTMLElement>('[data-tie]')].map((el) => {
      const eye = (el.querySelector('[class*="eyelet"]') ?? el).getBoundingClientRect();
      return {
        x: eye.left + eye.width / 2 - box.left,
        y: eye.top + eye.height / 2 - box.top,
        live: el.dataset.tie === 'live'
      };
    });
    let y0 = EYE + 10;
    let d = `M ${x} ${y0}`;
    let sign = 1;
    const sway = (to: number) => {
      const dy = to - y0;
      const amp = Math.min(dy * 0.12, x * 0.6);
      d += ` C ${x + sign * amp} ${y0 + dy / 3} ${x - sign * amp} ${y0 + (2 * dy) / 3} ${x} ${to}`;
      sign = -sign;
      y0 = to;
    };
    for (const t of ties) sway(t.y);
    sway(Math.min(y0 + 96, h - 8));
    rope = d;
    requestAnimationFrame(() => {
      len = path?.getTotalLength() ?? 0;
      progress();
    });
  }

  function progress() {
    if (!host?.isConnected) return; // a queued frame can outlive the component
    if (still) {
      drawn = 1;
      return;
    }
    // At the very bottom the whole rope shows, however tall the window.
    if (scrollY + innerHeight >= document.documentElement.scrollHeight - 2) {
      drawn = 1;
      return;
    }
    const top = host.getBoundingClientRect().top + scrollY;
    const reach = scrollY + innerHeight * 0.9 - top;
    drawn = Math.max(0, Math.min(1, reach / h));
  }

  onMount(() => {
    still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ro = new ResizeObserver(() => layout());
    ro.observe(host);
    layout();
    document.fonts?.ready.then(layout);

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(progress);
    };
    if (!still) addEventListener('scroll', onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -15% 0px' }
    );
    if (!still) {
      // Arms the print-in (app.css); without this class every tag's contents simply show.
      document.documentElement.classList.add('motion');
      host.querySelectorAll('.swing').forEach((el) => io.observe(el));
    }

    return () => {
      ro.disconnect();
      io.disconnect();
      removeEventListener('scroll', onScroll);
    };
  });
</script>

<svg class="rope" width={w} height={h} aria-hidden="true">
  {#if rope}
    {#each ties as t, i (i)}
      <path
        class="tie"
        class:live={t.live}
        d="M {x} {t.y} Q {(x + t.x) / 2} {t.y + Math.min(32, (t.x - x) * 0.06)} {t.x} {t.y}"
        style:opacity={drawn * h >= t.y ? 1 : 0}
      />
    {/each}
    <path
      bind:this={path}
      class="line"
      d={rope}
      stroke-dasharray={len || undefined}
      stroke-dashoffset={len ? len * (1 - drawn) : undefined}
    />
    {#each ties as t, i (i)}
      <circle class="knot" cx={x} cy={t.y} r="5" style:opacity={drawn * h >= t.y ? 1 : 0} />
    {/each}
  {/if}
  <!-- The grapple: two barbed tines, kept inside the page's top and left edges. -->
  <g class="hook">
    <path d="M {x} {EYE - 10} V 8 M {x - span} 20 C {x - span} 2 {x + span} 2 {x + span} 20" />
    <path class="barb" d="M {x - span} 27 l -5 -7 h 10 z M {x + span} 27 l -5 -7 h 10 z" />
    <circle cx={x} cy={EYE} r="10" />
  </g>
</svg>

<style>
  .rope {
    position: absolute;
    inset: 0 auto auto 0;
    pointer-events: none;
    overflow: visible;
  }
  .line,
  .hook path,
  .hook circle {
    fill: none;
    stroke: var(--ink);
    stroke-width: 5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .hook path,
  .hook circle {
    stroke: var(--tag);
  }
  .hook path {
    stroke-width: 6;
  }
  .hook .barb {
    fill: var(--tag);
    stroke-width: 2;
  }
  .tie {
    fill: none;
    stroke: var(--muted);
    stroke-width: 2;
    stroke-dasharray: 2 6;
    stroke-linecap: round;
    transition: opacity 300ms ease-out;
  }
  .tie.live {
    stroke: var(--tag);
    stroke-width: 3;
  }
  .knot {
    fill: var(--ink);
    transition: opacity 300ms ease-out;
  }
  @media (max-width: 720px) {
    .line {
      stroke-width: 3.5;
    }
    .knot {
      r: 4;
    }
  }
</style>
