# Small Tech LLC

The website for Small Tech LLC, a one-person practice spanning A&R, AI training,
personal finance and creative direction.

**Live:** https://somehippie.github.io/small-tech-llc/

## About

A two-page static site built on the "st" flavor of Paolo Bonaccorsi's design
system. The character comes from a mixing desk: a grey faceplate, colour-coded
channel knobs, engraved labels. One typeface, Archivo, does all the work, and
its width axis is the voice: expanded for headlines, condensed for labels and
buttons. Pine is the only accent.

The four practices sit in a ChannelStrip, laid out like channels on a desk, one
soloed at a time. Each practice keeps its own channel colour. The solo bar
sliding in when you pick a channel is the only motion on the page.

The hero photograph is The Orb, a perforated pavilion, shot by Paolo
Bonaccorsi, shown in a framed panel beside the headline with its credit as a
caption. Below the hero, every section shares one grid: the heading in a
narrower left column, the content in the right. Artifacts are ruled entries
in that grid rather than boxed cards.

The Artifacts section links to plain-language guides hosted on claude.ai. Each
card states the date its facts were last checked, so when a guide is revised,
update that date here too. A card tied to one of the four practices carries that
practice's channel colour as a small knob; anything else gets a plain label.

The services page, `services.html`, is the full menu: the specific services
under the two ways of working, direction and coaching. It shares the home page's
masthead, footer, theme switch and stylesheets. Services are ruled entries like
the artifacts and follow the same rule: a practice's knob, or a plain label.

## Interactive layer

Everything below works on GitHub Pages with no server, sends nothing anywhere,
and adds no motion. Without JavaScript the pages read as before: the console and
the brief stay hidden and the plain email button does the job.

| Feature | Where | How it works |
|---|---|---|
| Menu console | `services.html` | Solo a practice or group and search the menu. Words match from their start. The address keeps the filter (`?solo=ai&q=files`), so a filtered menu can be shared. `/` jumps to the search box. "Print this menu" prints what is showing, in the light theme. |
| Ask about this | `services.html` | Each service links to the brief with that service already picked (`index.html?about=credit-cards#contact`). |
| The brief | `index.html#contact` | A few choices and two short answers become an email the visitor reads, then sends from their own app, or copies. Links can pre-fill it: `?about=`, `?practice=`, `?when=`, `?q=`. |
| On-device subject line | the brief | Shows only where Chrome's built-in Summarizer is already on the computer. It never starts the model download, and the text never leaves the browser. |
| Agent tools (WebMCP) | both pages | Feature-detected tools an AI agent in the visitor's browser can call: `small_tech_contact`, `small_tech_services`, and on the home page `small_tech_draft_inquiry`, which fills the brief but never sends. Inert in browsers without WebMCP. |
| Structured data | both pages | schema.org JSON-LD: the business, Paolo, and the service catalog. |
| `llms.txt` | root | A plain summary of the site for AI tools, linked from the footer. |
| `404.html` | root | GitHub Pages serves it for any missing path. |

When you add or rename a service, update four places: the entry in
`services.html` (with its `id="svc-…"` and `data-practice`), its line in the
JSON-LD catalog at the top of `services.html`, the option in the brief's list in
`index.html`, and its line in `llms.txt`.

Two settings depend on where the site lives. `404.html` has
`<base href="/small-tech-llc/">`; change it to `/` if the site moves to its own
domain. WebMCP in Chrome is in an origin trial: to switch it on for every
visitor, register the site's origin for the WebMCP trial in the Chrome Origin
Trials console and add the token to the head of each page as
`<meta http-equiv="origin-trial" content="TOKEN">`.

## Stack

No build step, no dependencies, no framework. Flat files served as-is.

| | |
|---|---|
| Fonts | Archivo with the width axis, via Google Fonts |
| Hosting | GitHub Pages, deployed from `main` at root |
| Theming | Design system tokens (`design/`), light and dark, following the system preference; a switch in the masthead overrides it, remembered in `localStorage` |

## Structure

```
index.html           home page: markup, copy and the brief
services.html        services page: markup, copy and the menu console
404.html             not-found page, served by GitHub Pages for missing paths
design/tokens.css    design system tokens and type classes
design/components.css  st flavor roles, buttons, ChannelStrip
design/components/ChannelStrip/  component notes and example
styles.css           page layout only, no colours or fonts
site.js              ChannelStrip solo, theme switch, screenshot viewer,
                     menu console, the brief, WebMCP tools
llms.txt             plain summary of the site for AI tools
sitemap.xml          the two pages, for search consoles
LICENSE              MIT, scoped to styles.css and site.js only
assets/pavilion.jpg  hero photograph (1200x1200, 249 KB)
assets/*-thumb.webp  artifact thumbnails; the .png beside each is the fallback
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
| `index.html`, `services.html`, `404.html`, `llms.txt` | All rights reserved, Paolo Bonaccorsi. |
| `assets/pavilion.jpg` | All rights reserved, Paolo Bonaccorsi. |

`index.html` and `services.html` stay reserved even though they link to the two
MIT files. They are markup interleaved with copy, and the two are not cleanly
separable, so they do not carry the MIT label.

This repository is public so the site can be served by GitHub Pages. That is not
an invitation to reuse the copy or the photography.
