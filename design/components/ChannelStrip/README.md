# ChannelStrip

Small Tech's four practices laid out like channels on a mixing desk, one soloed at a time.

This replaces the old numbered card grid. The practices are not a sequence, so they get colour-coded channels instead of 01 to 04. Each channel keeps its colour everywhere it appears: on the site, on thumbnails, on a slide.

| Channel | Class | Colour token |
|---|---|---|
| A&R | `ch-ar` | `st-ch-ar` |
| AI training | `ch-ai` | `st-ch-ai` |
| Personal finance | `ch-fin` | `st-ch-fin` |
| Creative direction | `ch-cd` | `st-ch-cd` (the brand pine) |

Markup: a `.channels` wrapper with `role="group"` holding four `<button class="channel ch-…" aria-pressed>` elements, each containing `.head` (a `.knob` and a `.name`), a `.title` and a `.desc`. The consumer supplies the copy and toggles `aria-pressed` so exactly one is true.

The soloed channel shows its colour as a 4px bar across the top edge and drops to `st-surface-2`. That bar sliding in is the only motion on a Small Tech page, and it answers a click. The channel colours are marks, never text; the name stays in `st-ink-soft`. On narrow screens the four stack into rows.
