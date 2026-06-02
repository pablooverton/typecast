# CLAUDE.md — claudetype (project context for AI agents)

## What this is

A static, zero-build site + a set of drop-in `CLAUDE_<TYPE>.md` files. It inverts the usual
"give the AI a personality" pattern: the user's MBTI type is the input, and the output is an
operating manual for how the AI should treat *that user*. Two modes per type:
**satisfaction** (serve the trait's preference) and **growth** (push against the trait's failure mode).

## Architecture (keep it this way)

- `data/types.mjs` — **single source of truth.** All 16 types, both modes.
- `data/render.mjs` — **shared renderer** imported by both the site and the build script, so
  the website's copy output and the committed `types/*.md` can never drift.
- `index.html` + `app.mjs` + `style.css` — zero-build static site; the browser imports the
  same ES modules directly. No bundler, no framework.
- `scripts/build.mjs` — regenerates `types/CLAUDE_<TYPE>.md` from the source of truth.
- `scripts/serve.mjs` — tiny zero-dep local server.

Do not introduce a framework or build step. Keep it dependency-free and statically hostable
(GitHub Pages / pablooverton.com subpath).

## Adding / editing a type

Edit `data/types.mjs`: fill `satisfaction[]` and `growth[]`, set `stub: false`, then
`npm run build`. Directives must be **behavioral and checkable**, not vibes. See
`docs/methodology.md`. For bulk-filling the remaining stubs, use subagents, not an API script.

## Voice

If drafting any public/LinkedIn copy for this project, follow the human-voice rules: no em
dashes, no banned vocabulary, no negative-parallelism, no mechanical headers. Be honest that
this is a useful toy, not science. The honesty is the credibility.
