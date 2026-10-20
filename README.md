# Venado Infrastructure — Homepage (HTML/CSS/JS)

Design stage only. Standalone HTML5 / CSS3 / vanilla JS, no build step, no
Tailwind, no framework. Written to convert cleanly to WordPress later: one
semantic section per block of the positioning brief, no inline styles beyond a
handful of spacing utilities, all copy in the markup.

Workflow: **positioning brief → HTML/CSS/JS → client review → WordPress.**

The site has one job: **get Venado onto bid lists.** Every call to action on the
page is *Add Us To Your Bid List* — header, hero, capabilities, equipment,
projects, bid-ready section and final CTA. There is no "Learn More" anywhere.

## Files

| File | What it is |
|---|---|
| `index.html` | The page. One `<section>` per block of the brief. |
| `css/style.css` | All styling. Tokens, base, primitives, the technical language, then one numbered block per section, then responsive and motion. |
| `js/main.js` | Sticky header, scroll progress, mobile drawer, active-section nav, scroll reveals, bid-form validation, footer year. |
| `img/brand/` | The supplied Venado logo files, copied unmodified from the Restoration build. |
| `img/` | Photography. See below. |
| `.claude/serve.js` | Dependency-free static server: `node .claude/serve.js`, then `http://localhost:4202`. |

## Relationship to Venado Commercial and Restoration

Same design system, same tokens, same components. The palette is sampled from
the Venado logo file, not chosen: `#1C2B1C` from the VENADO wordmark, `#CFB26A`
from the division line, and the antler's own gold rebuilt as the `--foil`
gradient. Type is Fraunces / Archivo / IBM Plex Mono. Header, nav, buttons,
eyebrows, thin rules, reveal timing, family band and footer are shared.

What Infrastructure does differently, on purpose:

| | Commercial | Restoration | Infrastructure |
|---|---|---|---|
| Posture | Build / Execute / Deliver | Respond / Restore / Turn Over | Price / Perform / Prove |
| Ground | dark bands lead | paper leads | **graphite is the field, paper blocks are drawing sheets laid on it** |
| Voice | sans with mono captions | sans, phone as display type | **monospace is the working voice — anything an estimator reads off a sheet is set in mono** |
| Signature device | the schedule rail | the recovery track | **the sequence rail** — one unbroken rule down three full-width strata, 01 dirt / 02 utilities / 03 concrete, in the order the work is built |
| Second device | — | the contract comparison | **the quantity board** — six measured fields with real units and openly unset values |
| Projects | a staircase grid | before/after sliders | **record sheets** — scope, quantity, units, size, work performed |
| Contact | form-led | phone-led | **bid-invitation-led** — seven fields, scope picked not typed |

Three Infrastructure-only tokens (`--slate`, `--slate-2`, `--slate-3`) sit
alongside the brand greens so the technical surfaces read as aggregate and
concrete rather than as luxury. They are neutral against the forest, not a
second palette.

### The technical language

A drawing-sheet vocabulary runs through the page, built as reusable
components so it survives the WordPress conversion:

- `.tblock` — a sheet title block (hero corner, and the head of the bid form)
- `.dim` — a dimension line: witness ticks, runs, and a label sitting on the line
- `.ticks` — a station/chainage rule
- `.grid-bg` — the faint blueprint ruling on dark bands
- `.unit` — a unit chip (CY, LF, SF, Tons)
- `.annot` — a corner callout in survey voice
- `.dn` — **the DATA NOTE placeholder** (see below)

> **Do not put `mask-image` back on `.grid-bg`.** A masked overlay that tall
> promotes a compositing layer that Chrome then fails to raster, which blanks
> every section painted underneath it. The grid is kept low enough in alpha
> that it needs no fade, and it always ends on a section boundary, so there is
> no cut edge to hide.

### The logo

`img/brand/venado-antler-logo.png` is the supplied antler mark, used as-is:
header lockup, hero watermark, final-CTA watermark, footer lockup, favicon. It
is never redrawn, recoloured or stretched. There is no Infrastructure lockup
file yet, so the wordmark is typeset **VENADO / INFRASTRUCTURE** in the same
construction as the Commercial and Restoration lockups (Fraunces caps over a
champagne mono division line). `img/brand/venado-logo.png` is the Venado
**Partners** lockup and appears once, in the family band, where it belongs — it
is never used as the Infrastructure brand. Replace the typeset lockup with a
real Infrastructure lockup file if and when one exists.

## The data rule — what is still needed from Venado

**Nothing on this page invents a client fact.** Every unsupplied value renders
through `.dn`, which draws it in brackets, in monospace, with an amber warning
tick and a dotted rule, so a placeholder cannot be mistaken for a claim. There
are **50** of them. No certification, bonding, response-time, safety-record or
capability claim is made anywhere, and the three capabilities carry only the
scope items named in the brief.

Still to supply:

| Where | What |
|---|---|
| Hero title block | market / region served |
| Quantities board | six values: earthwork CY, utilities LF, concrete SF/CY, curb LF, aggregate tons, typical project size |
| Equipment schedule | makes/models and counts for six classes: excavation, grading, hauling, compaction, concrete, support |
| Typical project size | site area, contract value, duration, market |
| Capabilities cut sheet | the actual PDF (`venado-infrastructure-capabilities.pdf`) |
| Projects 01–03 | name, scope, quantity, units, project size, duration |
| Bid invitation + footer | estimating email, phone, office address |

**The cut sheet is deliberately not a download.** No file exists yet, so the
plate states the filename it will have, marks it unsupplied, and the action
requests it via the bid form instead of linking to a 404. When the real PDF
arrives, drop it in and swap `Request The Cut Sheet` for a real download link.

The projects section also currently shows the same three work-chip
combinations (all three / dirt+utilities / dirt+concrete) as illustrative
structure — set these to whatever each real project actually was.

## The image set

Placeholder photography from [Unsplash](https://unsplash.com/license), free for
commercial use. Every file is **downloaded and served locally** — nothing is
hotlinked — cropped to its slot's ratio and re-encoded. The set is ~4.7 MB and
only `hero-sitework.jpg` is eager; everything below the fold is `loading="lazy"`.

| File | Ratio | Where it goes |
|---|---|---|
| `hero-sitework.jpg` | ~5:3 | hero — an active commercial sitework package |
| `cap/cap-01-dirt.jpg` | 4:3 | 01 Dirt — a motor grader cutting subgrade |
| `cap/cap-02-utilities.jpg` | 4:3 | 02 Utilities — an open trench with crew |
| `cap/cap-03-concrete.jpg` | 4:3 | 03 Concrete — a crew screeding a slab |
| `quantities-aerial.jpg` | 16:9 | Quantities — a graded corridor shot straight down |
| `equipment-fleet.jpg` | 5:2 | Equipment — owned iron staged on site |
| `proj/proj-01…03.jpg` | 4:3 | the three project records |
| `sitework-strip.jpg` | 3:2 | Sitework First, Building Next |
| `cta-site.jpg` | 5:3 | final CTA — excavators at dusk |

These are stand-ins for Venado's own work. Swap any file for a real project
shot at the same ratio and nothing reflows; update the `width`/`height`
attributes in `index.html` to the new pixel size so the browser still reserves
the right box.

**Deliberately avoided:** generic construction-template imagery, cartoonish
graphics, high-vis orange and yellow as a colour scheme, and any photograph of
a finished building standing in for sitework. Every image shows work being
performed.

## QA

Checked at 1440 / 1280 / 1024 / 768 / 620 / 480 / 390 / 375 / 320. Zero console
messages, zero horizontal overflow at every width, no dead anchors, no missing
`alt`, exactly one `h1`, and no fake downloads. Mobile priority order matches
the brief: mark, bid CTA, hero positioning, three capabilities, equipment,
projects, invitation form.

**QA gotcha on this machine:** the in-app Browser pane is often hidden, so
`document.hidden` is true — IntersectionObserver reveals never fire, CSS
transitions freeze, `requestAnimationFrame` never resolves (do not `await` it),
and pane screenshots look broken when the page is fine. Capture with headless
Chrome instead, through an **iframe harness** — a `file://` page holding an
`<iframe>` sized to the target width pointed at `http://localhost:4202/#anchor`.
The iframe keeps `100svh` honest (a tall `--window-size` otherwise inflates the
hero to the full window height) and sidesteps Chrome's ~500px minimum window
width, so phone widths capture correctly. Add
`--force-prefers-reduced-motion` so reveals render, and
`--run-all-compositor-stages-before-draw` so the page finishes painting.
