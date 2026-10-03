# Small Tech LLC site

Static one-page site for Small Tech LLC, Paolo Bonaccorsi's California practice across A&R and artist development, AI training, personal finance coaching, and creative direction. Hosted on GitHub Pages. No build step: `index.html`, `styles.css`, `site.js`, `assets/`, favicons.

## Design system

This site uses the shared Paolo Bonaccorsi design system, "st" flavor.

| Source | Path |
|---|---|
| Local copy (always read this first) | `design/tokens.css`, `design/components.css`, `design/components/ChannelStrip/README.md` |
| Live system (newest version, if this session can open it) | https://claude.ai/artifact/H4iPL8SHr22EAq9nAgy1XC |

The files in design/ are a trimmed copy of the design system containing only this site's flavor. Missing files, missing other-flavor rules and comment differences are intentional. Stop and ask only if a token value or a rule this site uses differs from the live system.

## Rules

Link `design/tokens.css` and `design/components.css` before `styles.css`, and set `data-flavor="st"` on `<body>`. `styles.css` keeps only page layout; it must not define colours or fonts of its own. Load Archivo from Google Fonts with the width axis: `family=Archivo:wdth,wght@62..125,100..900`.

Use only `st-` tokens through the shared roles (`--paper`, `--surface`, `--surface-2`, `--ink`, `--ink-soft`, `--ink-faint`, `--rule`, `--accent`, `--on-accent`). Do not add new colours, fonts, font sizes, spacing values or radii. Use the type classes `st-display` (once per page), `st-h2`, `st-h3`, `st-body`, `st-label`, `st-small`. Width is the voice: expanded headlines, condensed labels; components.css already sets the stretch.

The four practices use the ChannelStrip component (`design/components/ChannelStrip`), one channel each, colour classes `ch-ar`, `ch-ai`, `ch-fin`, `ch-cd`. Keep those colours fixed to those practices everywhere. Channel colours are marks only, never text.

Radius follows meaning: `radius-sm` for buttons and inputs, `radius-md` for channels and panels, `radius-knob` for knobs only. No box shadows.

Motion: the channel solo bar is the only animation on the page. Remove the scroll reveals, the progress bar and anything in `site.js` that only exists to animate.

Buttons use `btn btn-primary` and `btn btn-secondary`, sentence case, labels that name what happens, no arrows.

## Retired patterns, do not reintroduce

Mono eyebrow labels with a dash, uppercase tracked kickers, 01 to 04 numbering, fade-up reveals, the scroll progress bar, the radial gradient wash, the blurred sticky header, Inter, JetBrains Mono.

## Voice

Plain, specific, a little dry; first person singular, sentence case. Keep existing copy unless asked. Never mention Paolo's other businesses on this site.

## Workflow

Before committing, open `index.html` locally and check light and dark at 390px and 1280px widths. Keep keyboard focus visible and respect reduced motion. Do not push without Paolo's go-ahead.
