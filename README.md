# claudetype

**Your personality, flipped into an operating manual for your AI.**

Everyone else makes the AI *have* a personality ("act like an ENFP"). claudetype does the inverse: your personality is the **input**, and the AI's behavior **toward you** is the output. Pick your type, pick a mode, get a drop-in `CLAUDE.md`.

Two modes:

- **Satisfaction mode** configures the AI to your type's preferences. It feels great. It flatters you.
- **Growth mode** configures the AI to push against your type's known failure modes. It's less comfortable. It argues with you.

A horoscope flatters you. Growth mode does the opposite.

## Use it

1. Open the site (or browse [`types/`](./types) and grab your file directly).
2. Pick your type, pick a mode.
3. Copy into your project's `CLAUDE.md`, or paste into ChatGPT/Claude custom instructions.

The output is plain markdown and works with any model. The `CLAUDE.md` filename is just the friendly Claude Code convention.

## How it actually works

MBTI is the friendly front door. Under the hood, each type maps to a **Big Five** profile, and the directives are written against that profile's well-documented failure modes (e.g. low Conscientiousness → unfinished projects → growth mode forces a deadline; high Openness → analysis paralysis → growth mode forces a ship decision).

This is **a starting posture, not a personality transplant.** Trait-conditioning tends to wash out over long sessions. Re-paste if the AI drifts. The honesty is the point: this is useful, not science.

## Develop it

Single source of truth is [`data/types.mjs`](./data/types.mjs). The site and the generated files share one renderer ([`data/render.mjs`](./data/render.mjs)), so they can't drift.

```bash
npm run serve   # local preview at http://localhost:5173 (no build step)
npm run build   # regenerate types/CLAUDE_<TYPE>.md from data/types.mjs
```

To add or finish a type: fill `satisfaction[]` and `growth[]`, flip `stub: false`, run `npm run build`.

## Status

INTJ and ENFP are complete as exemplars. The other 14 are stubs (structure in place, directives TODO). See [`docs/methodology.md`](./docs/methodology.md) for how directives are derived.

## License

MIT
