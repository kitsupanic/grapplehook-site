---
version: 1
slug: "src-routes-page-svelte"
primary_target: "src/routes/+page.svelte"
related_targets: ["src/lib"]
---

Scope: grapplehook.app, the one-page site for the Grapplehook desktop app (src/routes/+page.svelte and src/lib/*), plus a 404 page. Mode: Persuade.

Audience: anyone with a video link who wants the file, including people who would never open a terminal. Action: download the installer for their OS from the latest GitHub release. Proof on hand: the app's real flow (README demo animation), the real release files, the MIT source. No testimonials, counts or screenshots of other people's videos may be invented.

Must cover: pitch and Download (OS-detected, other platforms beside it), how it works (paste, pick, collect), Tools in plain words (Managed vs System), first-launch help per OS (macOS is signed and notarized from 0.3.1; Windows is unsigned), the rights note, open source / MIT / build from source.

## Direction contract

THESIS: The grapple hook's rope runs down the page and every section is a tag hanging off it; the first tag it catches is your download. Refuses the split hero with a device screenshot over a row of feature cards.

OWN-WORLD: The app's Claim Tag world. Warm near-black ground #121110, solid fields #1e1c19, a bone #efe7da rope, rope-orange #ff8a3d tag stock printed in ink #16120d only on the one live tag (the download), dark tags for everything else. Barlow Condensed for headlines and tag print, system sans for reading. Eyelets, dashed perforated stubs, tabular claim numbers, dashed orange tie lines from rope to tag. 8px module, no bordered cards.

STORY: The visitor reads "Hook the video. Keep the file.", sees the orange tag already set to their computer and presses Download on its stub. Scrolling, the rope leads past dark tags: the three steps with the app at work, Tools explained, first-launch help for their OS, the rights note, the source. The page ends with the hook holding the download tag again.

FIRST VIEWPORT: Hook mark top-left drops a bone rope that winds down the left edge of the whole page. Wordmark, then a two-line Barlow headline at display scale across the middle; one subline under it. On the right, the orange download tag hangs tilted off the rope by a dashed orange tie: OS-specific title, file name and size printed on it; perforated stub with claim no. (the version) and Download. "Also for Windows and Linux" links under the subline. Small nav top right.

FORM: The Rope Line, 7 of 7 on my ordered list. seed:6824b441438a18d4. Signature interaction: the rope draws itself down the page as you scroll and each tag swings once into place as the rope reaches it; reduced motion shows everything still.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Build note: "Also for Windows and Linux" sits under the download tag, not the subline, because it changes with the detected platform and is rendered by the tag itself (one source of truth per variant).
