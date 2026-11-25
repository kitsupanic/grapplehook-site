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

<!-- impeccable:design-map -->
Name: Grapplehook site
Colors: primary: tag #ff8a3d; neutral: ground #121110; state: ok #6fd18f; primary: tag-hover #ff9d5c; primary: tag-ink #16120d; primary: tag-ink-2 #4a2a12; primary: tag-ink-hover #2b2219 (+7 more in the sidecar)
Fonts: Barlow Condensed (display, headline, tag-title, claim, claim-dark); system-ui (title, body, body-sm, label)
Spacing: xs 4px, sm 8px, md 16px, lg 24px, xl 32px, xxl 48px, section 96px, gutter 128px
Radius: sm 4px, control 6px, sheet 8px, tag 12px
North Star: "The Rope Line"
Rules:
- The Live Stock Rule. Solid orange fill is used only for the download tag.
- The Printed-On Rule. Inside the orange tag nothing uses neutral colours.
- The Bone Rope Rule. The rope and its knots are bone.
- The One Label Rule. There is exactly one tracked-caps size (0.75rem/600/0.1em).
- The Tabular Numbers Rule. Claim values, file sizes and step numerals use tabular figures.
- The Tag Print Rule. Barlow Condensed is used only for headings, the wordmark, claim values and step numerals.
- The Solid Field Rule. Tags and controls are solid fills, with no borders or shadows.
Don't:
- Don't put a solid orange fill on anything but the download tag.
- Don't draw shadows or borders on tags.
- Don't add a second label size, or tracked caps floating above a headline.
- Don't set running text, links, buttons or nav in Barlow Condensed.
- Don't colour the rope or the dark-tag ties orange.
- Don't let a tag swing more than once, or swing tall dark tags on phones.
Do:
- Do hang every new section as a dark tag right of the gutter, with an eyelet and `data-tie`, so the rope knots it in.
- Do give a dark tag a stub only when it has a real value to claim and one action.
- Do keep every gap, padding and size on the 8px module (4px for tight internal gaps only).
- Do print in `tag-ink` / `tag-ink-2` on orange stock, and switch focus and selection to ink there.
- Do let each tag swing once, and show everything still under reduced motion.
- Do use the 0.75rem tracked-caps label only to name a field or a stub value.
Map: static/fonts/
Full: .impeccable/design-full.md (read a section when you need its detail)
