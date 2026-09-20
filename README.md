# Small Tech LLC

The website for Small Tech LLC, a one-person practice spanning A&R, AI training,
personal finance and creative direction.

**Live:** https://somehippie.github.io/small-tech-llc/

## About

A single-page static site. The design follows the neo-grotesque convention of
contemporary architecture practices: Archivo set tight for display, Inter for
body text, a near-monochrome blue-grey palette with pine as the only accent.

The hero photograph is a perforated parametric pavilion, shot by Paolo
Bonaccorsi, sitting behind a theme-aware scrim so the headline keeps contrast in
both light and dark modes.

## Stack

No build step, no dependencies, no framework. One HTML file with inline CSS and
JavaScript, plus one image.

| | |
|---|---|
| Fonts | Archivo, Inter, JetBrains Mono, via Google Fonts |
| Hosting | GitHub Pages, deployed from `main` at root |
| Theming | CSS custom properties, light and dark, following the system preference |

## Structure

```
index.html           entire site: markup, styles, scripts
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

Copyright Paolo Bonaccorsi. All rights reserved.

This repository is public so the site can be served by GitHub Pages. That is not
an invitation to reuse the design, copy or photography.
