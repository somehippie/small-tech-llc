# Small Tech LLC

The website for Small Tech LLC, a one-person practice spanning A&R, AI training,
personal finance and creative direction.

**Live:** https://somehippie.github.io/small-tech-llc/

## About

A single-page static site built on the "st" flavor of Paolo Bonaccorsi's design
system. The character comes from a mixing desk: a grey faceplate, colour-coded
channel knobs, engraved labels. One typeface, Archivo, does all the work, and
its width axis is the voice: expanded for headlines, condensed for labels and
buttons. Pine is the only accent.

The four practices sit in a ChannelStrip, laid out like channels on a desk, one
soloed at a time. Each practice keeps its own channel colour. The solo bar
sliding in when you pick a channel is the only motion on the page.

The hero photograph is a perforated parametric pavilion, shot by Paolo
Bonaccorsi, shown in a framed panel beside the headline.

## Stack

No build step, no dependencies, no framework. Flat files served as-is.

| | |
|---|---|
| Fonts | Archivo with the width axis, via Google Fonts |
| Hosting | GitHub Pages, deployed from `main` at root |
| Theming | Design system tokens (`design/`), light and dark, following the system preference |

## Structure

```
index.html           markup and copy
design/tokens.css    design system tokens and type classes
design/components.css  st flavor roles, buttons, ChannelStrip
design/components/ChannelStrip/  component notes and example
styles.css           page layout only, no colours or fonts
site.js              ChannelStrip solo toggle
LICENSE              MIT, scoped to styles.css and site.js only
assets/pavilion.jpg  hero photograph (1200x1200, 249 KB)
```

## Local development

Open `index.html` in a browser. That is the whole workflow.

To check it over HTTP instead of `file://`, which matters if you are testing
relative asset paths:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Deploying

Pages rebuilds automatically on every push to `main`. A deploy takes roughly
thirty seconds. The CDN caches for ten minutes, so hard-refresh when verifying a
change.

## Accessibility

Every text colour is checked against its background. All values meet WCAG AA at
minimum, and most reach AAA. Dark surfaces sit at or above the `#121212` floor
recommended for dark themes, which avoids the halation that pure black causes
under off-white text.

## Rights

Licensing is split by file.

| | |
|---|---|
| `styles.css`, `site.js` | **MIT License.** See [LICENSE](LICENSE). Reuse freely. |
| `index.html` | All rights reserved, Paolo Bonaccorsi. |
| `assets/pavilion.jpg` | All rights reserved, Paolo Bonaccorsi. |

`index.html` stays reserved even though it links to the two MIT files. It is
markup interleaved with copy, and the two are not cleanly separable, so it does
not carry the MIT label.

This repository is public so the site can be served by GitHub Pages. That is not
an invitation to reuse the copy or the photography.
