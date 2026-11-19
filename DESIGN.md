---
name: Grapplehook site
description: The one-page site for the Grapplehook desktop app, where a grapple hook's rope runs down the page and every section hangs off it as a tag.
colors:
  tag: '#ff8a3d'
  tag-hover: '#ff9d5c'
  tag-ink: '#16120d'
  tag-ink-2: '#4a2a12'
  tag-ink-hover: '#2b2219'
  tag-well: 'rgb(22 18 13 / 0.1)'
  ground: '#121110'
  field: '#1e1c19'
  field-2: '#2a2723'
  line: '#3a352f'
  ink: '#efe7da'
  muted: '#a69c8f'
  ok: '#6fd18f'
  bad: '#f0625a'
typography:
  display:
    fontFamily: "'Barlow Condensed', system-ui, sans-serif"
    fontSize: 'clamp(3.5rem, 7.4vw, 6rem)'
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: '-0.02em'
  headline:
    fontFamily: "'Barlow Condensed', system-ui, sans-serif"
    fontSize: 'clamp(2.5rem, 5vw, 4rem)'
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: '-0.01em'
  tag-title:
    fontFamily: "'Barlow Condensed', system-ui, sans-serif"
    fontSize: 'clamp(2.4rem, 4vw, 3.25rem)'
    fontWeight: 700
    lineHeight: 1
    letterSpacing: '-0.01em'
  claim:
    fontFamily: "'Barlow Condensed', system-ui, sans-serif"
    fontSize: '2.6rem'
    fontWeight: 800
    lineHeight: 1
    letterSpacing: '-0.02em'
    fontFeature: 'tnum'
  claim-dark:
    fontFamily: "'Barlow Condensed', system-ui, sans-serif"
    fontSize: '1.86rem'
    fontWeight: 800
    lineHeight: 1
    fontFeature: 'tnum'
  title:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: '1.06rem'
    fontWeight: 700
  body:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: '17px'
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: '0.94rem'
    fontWeight: 400
  label:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: '0.75rem'
    fontWeight: 600
    letterSpacing: '0.1em'
rounded:
  sm: '4px'
  control: '6px'
  sheet: '8px'
  tag: '12px'
spacing:
  xs: '4px'
  sm: '8px'
  md: '16px'
  lg: '24px'
  xl: '32px'
  xxl: '48px'
  section: '96px'
  gutter: '128px'
components:
  button:
    backgroundColor: '{colors.field-2}'
    textColor: '{colors.ink}'
    rounded: '{rounded.control}'
    padding: '0 24px'
    height: '48px'
  button-hover:
    backgroundColor: '{colors.line}'
  button-take:
    backgroundColor: '{colors.tag-ink}'
    textColor: '{colors.tag}'
    rounded: '{rounded.control}'
    padding: '8px 12px'
    height: '56px'
  button-take-hover:
    backgroundColor: '{colors.tag-ink-hover}'
  nav-link:
    textColor: '{colors.muted}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.control}'
    padding: '8px 12px'
  nav-link-hover:
    backgroundColor: '{colors.field-2}'
    textColor: '{colors.ink}'
  download-tag:
    backgroundColor: '{colors.tag}'
    textColor: '{colors.tag-ink}'
    rounded: '{rounded.tag}'
    width: '600px'
  download-stub:
    width: '152px'
    padding: '24px 16px 16px 24px'
  dark-tag:
    backgroundColor: '{colors.field}'
    textColor: '{colors.ink}'
    rounded: '{rounded.sheet}'
    padding: '32px 40px 40px 56px'
    width: '1100px'
  dark-stub:
    width: '160px'
    padding: '32px 16px 16px 24px'
  tab-list:
    backgroundColor: '{colors.ground}'
    rounded: '{rounded.sheet}'
    padding: '4px'
  tab:
    textColor: '{colors.muted}'
    rounded: '{rounded.control}'
    padding: '0 20px'
    height: '40px'
  tab-selected:
    backgroundColor: '{colors.field-2}'
    textColor: '{colors.ink}'
  badge:
    backgroundColor: '{colors.field-2}'
    textColor: '{colors.muted}'
    typography: '{typography.label}'
    rounded: '{rounded.sm}'
    padding: '2px 8px'
---

# Design System: Grapplehook site

## Overview

**Creative North Star: "The Rope Line"**

The site lives in the app's Claim Tag world, with the same warm near-black ground, solid unbordered fields, rope-orange stock and near-black print. What the site adds is the rope. An orange grapple hook is caught over the top edge of the page, and a bone rope runs down a fixed left gutter, swaying from side to side between knots. Each section is a dark tag tied to the rope at its eyelet. The download is the one orange tag. It appears twice, at the top of the page and again where the rope ends.

The page is spacious where the app is dense. It uses a 17px reading size, display headlines up to 6rem, and 96px between tags, but it keeps the app's single 8px module, its single label size and its hierarchy by weight. Everything sits right of the gutter. Each tag swings once as it comes into view, and the rope draws itself down the page as you scroll. With reduced motion the rope and tags are shown complete and still.

The materials are literal. The eyelet is a hole punched through to the ground colour. Stubs are perforated with 2×8px dashes, and claim numbers use tabular figures. Ties are dotted strokes running from the rope to an eyelet, and only the live tag's tie is orange.

**Key Characteristics:**

- A bone rope with knots in a fixed left gutter, under an orange grapple hook.
- One orange tag, the download, which rests tilted at -3deg. Every section is a dark `field` tag.
- Perforated stubs with a tabular claim value and one action.
- No shadows, no bordered cards, and dashed `line` rules as the only in-flow dividers.
- An 8px module, one label size, and display type used as tag print.

## Colors

This is the app palette unchanged: a warm charcoal ramp, one brand orange, and two state colours (`ok` and `bad` are kept as tokens, though the site doesn't currently use them).

### Primary

- **Rope Orange** (`tag`): the download tag's stock, the grapple hook, the live tie, links, focus rings, the caret, text selection, and the numerals of ordered steps.
- **Warm Rope Hover** (`tag-hover`): reserved for the app's primary button. The site has no orange button.
- **Print Ink** (`tag-ink`): everything printed on the download tag: title, values, the 2px head rule, dashed segment dividers, the perforation, the Download button fill, and selection and focus inside the tag.
- **Faded Print** (`tag-ink-2`): labels on the download tag.
- **Stub Button Hover** (`tag-ink-hover`): hover for the ink Download button.

### Neutral

- **Ground** (`ground`): the page. It shows through every eyelet and every dark-tag perforation, and it is the inset well behind the first-launch tabs and code blocks.
- **Field** (`field`): the stock of every dark section tag.
- **Raised Field** (`field-2`): default buttons, the selected tab, badges, nav hover, and solid row rules in the Tools table.
- **Line** (`line`): button hover, the 2px head rule on dark tags, dashed in-tag dividers, and the scrollbar.
- **Bone** (`ink`): primary text, the rope and its knots.
- **Dust** (`muted`): secondary text, ledes, nav links, labels on dark stubs, and the dotted ties of dark tags.

### Named Rules

**The Live Stock Rule.** Solid orange fill is used only for the download tag. Orange as text or stroke marks something live or ordered: links, focus, the hook, the live tie, and step numerals. It is never used as a decorative fill.

**The Printed-On Rule.** Inside the orange tag nothing uses neutral colours. Text, rules, perforation, button and focus outline are all `tag-ink` / `tag-ink-2`, and selection inverts to ink on orange.

**The Bone Rope Rule.** The rope and its knots are bone. Only the hook and the tie to the live tag are orange. Dark tags tie on with a muted dotted line.

## Typography

**Display Font:** Barlow Condensed 700/800 (SIL OFL 1.1), self-hosted woff2 in `static/fonts/`, with 700 preloaded
**Body Font:** system-ui (with -apple-system, Segoe UI, sans-serif)
**Label/Mono Font:** ui-monospace (SF Mono, Menlo, Consolas), used for tool names and code

**Character:** A condensed grotesque printed onto tags: every heading is a tag's title, and every claim value is printed on a stub. Reading, links and controls stay in plain system sans.

### Hierarchy

- **Display** (Barlow 700, clamp 3.5–6rem, 0.9, -0.02em): the hero headline only. The closing headline is a smaller step (clamp 3–5rem) and the 404 uses clamp 3–5rem at 7vw.
- **Headline** (Barlow 700, clamp 2.5–4rem, 0.95, -0.01em, balanced): each dark tag's title, set over a 2px `line` rule.
- **Tag title** (Barlow 700, clamp 2.4–3.25rem, 1): "For macOS" on the download tag, set over a 2px ink rule.
- **Claim** (Barlow 800, 2.6rem, tabular; 2rem at ≤720px): the version on the download stub. **Claim dark** (1.86rem) is the count on dark stubs and the size of the two-digit step numerals. First-launch step numerals are 1.25rem.
- **Title** (system 700, 1.06rem): h3 subheads inside tags.
- **Body** (system 400, 17px, 1.55): running text. Ledes are 1.06rem, muted and at most 62ch. The hero subline is 1.19rem at most 40ch.
- **Body small** (0.94rem / 0.88rem): nav (600), tabs (600), helper lines, and footer and table status (0.88rem).
- **Label** (600, 0.75rem, 0.1em, uppercase): field and stub labels ("File", "Size", "Claim no.", "Steps"). Badges use the same size at 0.04em tracking with no uppercase.

### Named Rules

**The One Label Rule.** There is exactly one tracked-caps size (0.75rem/600/0.1em). It names a field or the value on a stub, and it never floats above a headline.

**The Tabular Numbers Rule.** Claim values, file sizes and step numerals use tabular figures.

**The Tag Print Rule.** Barlow Condensed is used only for headings, the wordmark, claim values and step numerals. Running text, links, buttons, tabs and nav use system sans.

## Layout

Everything is on the 8px module (4px only for tight internal gaps). The page is one column, max 1360px wide. Content is indented by `--gutter` (128px; 44px at ≤720px), and the rope hangs at `--rope-x` (64px; 20px at ≤720px). Right padding is 48px (16px on mobile). The header is a 80px row with the wordmark on the left and section nav on the right.

The hero is a two-column grid (a flexible pitch column and a download tag up to 560px, with a 48px gap). The tag is dropped so that its eyelet lines up under the headline. Dark tags are capped at 1100px (the rights note at 720px), with 96px between them (64px on mobile). The closing section stacks a headline over the second download tag with a 40px gap.

There are two breakpoints:

- **1080px:** the hero and the How-it-works grid (steps beside the demo, 1fr / 1.35fr) collapse to one column.
- **720px:** the gutter and rope narrow, tags stack their stubs under the body with a horizontal perforation, two-column pairs stack with a dashed top rule, Tools table rows reflow into a two-row grid, and the nav wraps under the wordmark.

The rope is an absolutely positioned SVG behind `main`. It is drawn from the measured eyelet of every `[data-tie]` element, so layout changes move the knots with the tags.

## Elevation & Depth

The site is completely flat. There are no overlays, so the app's overlay lift doesn't appear. Depth comes from the tonal step from `ground` to `field` to `field-2`, from the orange stock, and from physical cues: the punched eyelet, the perforation, and the download tag's resting tilt.

### Named Rules

**The Solid Field Rule.** Tags and controls are solid fills, with no borders or shadows. Dividers inside a tag are dashed 1px `line` rules (solid 1px `field-2` between table rows), plus one 2px head rule under each title.

## Shapes

Corners are small and practical. Controls are 6px, badges 4px, the tab well and the demo image 8px. Tags are asymmetric, with their softer corners on the eyelet side: 12px 6px 6px 12px on the download tag and 8px 4px 4px 8px on dark tags. The eyelet is a ground-coloured circle, 18px on the download tag (centred vertically) and 16px on dark tags (48px from the top). Perforations are a repeating 2×8px half-filled gradient on the stub's leading edge, in ink on orange and ground on dark tags. At ≤720px they turn horizontal (8×2px) along the stub's top. The grapple is a 6px orange stroke: an eye ring, a shank, and an arc with two solid barbs over the page edge. The rope is a 5px round-capped bone stroke (3.5px on mobile), knots are 5px-radius bone dots, and ties are 2px dotted strokes (dash 2, gap 6). The live tie is 3px and orange.

## Components

### Buttons

Quiet, solid and squat, one step larger than the app's.

- **Shape:** 6px corners, 48px tall, 0 24px padding, system 600 at 1rem.
- **Default:** `field-2` fill with bone text. Hover is `line`, with a 120ms ease-out background transition. Inside dark stubs it is 8px 12px and 0.94rem. On the 404 page it is the only action.
- **Take (Download):** ink fill with orange text, 56px tall, 700 at 1.06rem, filling the download stub's width (up to 220px on mobile). Hover is `tag-ink-hover`.
- **Focus:** 2px `tag` outline offset 2px. Inside the orange tag it is `tag-ink`.

### Navigation

The wordmark is "grapplehook" in Barlow 700 at 1.6rem, in bone. The nav links are muted, 0.94rem/600, with 8px 12px padding and 6px corners, and on hover they get a `field-2` well and bone text. Nav links sit 4px apart. On mobile the padding drops to 8px, there is no gap, and the row wraps under the wordmark.

### Badges

0.75rem/600 at 0.04em tracking, 2px 8px padding, 4px corners, `field-2` fill and muted text, set inline after an h3 ("Managed Tool", "System Tool").

### First-launch tabs

A segmented control in a `ground` well (4px padding, 8px corners, 4px gaps). Tabs are 40px tall, transparent and muted, and the selected tab is `field-2` with bone text. It opens on the visitor's own OS, and arrow keys move between tabs. On mobile it spans the full width with equal tabs. Panels hold ordered steps with orange Barlow numerals and `ground` code wells (6px corners, 16px 20px padding). A dashed-ruled helper line closes the panel.

### The Download Tag (signature)

The one orange tag, rendered once per OS (macOS, Windows, Linux) plus a variant listing every platform for phones and unknown devices. `html[data-os]`, set before first paint, shows the matching variant, so there is a single source of truth per variant. The body (24px 24px 24px 48px) has a "For {OS}" tag title over a 2px ink rule, then a row of segments separated by dashed ink lines (File, Size), each with a faded label and a 700 value. The perforated stub has 152px and holds "Claim no.", the version, and the Take button. The tag rests at -3deg (-1deg on mobile) and pivots on its eyelet. Under the tag a muted 0.94rem line links the other platforms. It can be up to 600px wide.

### The Dark Tag (section)

Every section is a `field` tag with an eyelet and a `data-tie` knot. The body (32px 40px 40px 56px; 24px 20px 28px 40px on mobile) has a headline over a 2px `line` rule. The perforated stub (160px) is optional. A section gets one only when it has a count or value to claim, such as "Steps 3", "Tools 4" or "License MIT", plus a default button. Sections without one (First launch, the rights note) hang as a body alone.

### Rope, ties and knots (signature)

The SVG rope sways between knots with an amplitude of 12% of each drop, capped at 0.6× the gutter. It ends 96px below the last knot. As you scroll, a stroke-dash reveal draws it to 90% of the viewport height, and it shows in full at the page bottom. Knots and ties fade in over 300ms as the rope reaches them.

### Swing

The `.swing` class runs a damped pendulum once when the tag enters view (2.2s; amplitude +1, -0.55, +0.28, -0.1, eased with `cubic-bezier(0.37, 0, 0.63, 1)` at each turn), around the tag's resting angle. The download tag swings 7deg and dark tags 1.2deg. Dark tags don't swing at ≤720px, because a tall tag would swing off screen. Reduced motion disables the swing and the rope draw, and turns off smooth scrolling.

## Do's and Don'ts

### Do:

- **Do** hang every new section as a dark tag right of the gutter, with an eyelet and `data-tie`, so the rope knots it in.
- **Do** give a dark tag a stub only when it has a real value to claim and one action.
- **Do** keep every gap, padding and size on the 8px module (4px for tight internal gaps only).
- **Do** print in `tag-ink` / `tag-ink-2` on orange stock, and switch focus and selection to ink there.
- **Do** let each tag swing once, and show everything still under reduced motion.
- **Do** use the 0.75rem tracked-caps label only to name a field or a stub value.

### Don't:

- **Don't** put a solid orange fill on anything but the download tag.
- **Don't** draw shadows or borders on tags. Dividers inside a tag are dashed `line` rules.
- **Don't** add a second label size, or tracked caps floating above a headline.
- **Don't** set running text, links, buttons or nav in Barlow Condensed.
- **Don't** colour the rope or the dark-tag ties orange. Orange belongs to the hook and the live tie.
- **Don't** let a tag swing more than once, or swing tall dark tags on phones.
