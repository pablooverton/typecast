# Methodology — how the directives are derived

## The polarity

Most "AI personality" work makes the *model* adopt traits. claudetype inverts it: the
user's type is the input, and the directive set governs the AI's behavior *toward the user*.

## MBTI is a skin; Big Five is the engine

MBTI is widely treated as pseudoscience, but it's a recognizable, low-friction front door
("I'm an INTJ" is shareable; "I'm O+ C+ E- A- N-" is not). So each MBTI type is mapped to a
Big Five (OCEAN) profile, and directives are written against that profile.

Rough mapping used (skin → engine):

| MBTI axis | Big Five lever |
|-----------|----------------|
| N (intuition) | high Openness |
| J (judging)   | high Conscientiousness |
| E (extraversion) | high Extraversion |
| F (feeling)   | high Agreeableness |
| T (thinking)  | low Agreeableness (skeptical/critical) |
| Turbulent     | high Neuroticism |

This mapping is lossy and deliberately so. The directives matter, not the taxonomy.

## Two modes from one trait

For each trait, the **preference** and the **failure mode** are two sides of the same coin:

| Trait (high) | Satisfaction (serve the preference) | Growth (push the failure mode) |
|---|---|---|
| Openness | explore options, ideas, framings | force a ship/decision; stop adding rigor |
| Conscientiousness | checklists, structure, decisions | loosen rigidity; steelman the new option |
| Extraversion | match energy, riff, brainstorm | redirect hype into one concrete action |
| Agreeableness | warmth, context, tradeoff framing | name the conflict being avoided |
| low Agreeableness | terse, evidence-first, no padding | surface the human factor that was skipped |
| Neuroticism | reassurance, low-pressure framing | separate the catastrophe from the fact |

Satisfaction = what you *want*. Growth = what you *need*.

## Honest limits

- Trait-conditioning often washes out across long sessions. Treat the output as a starting
  posture; re-paste if the model drifts.
- Self-typed MBTI is noisy. The growth-mode value doesn't depend on the type being *correct* —
  if the failure mode doesn't apply to you, you'll feel the friction is wrong and ignore it.
- This is a useful toy, not a validated instrument. That framing is intentional.

## Writing a good type

For each type, write 5–6 directives per mode. Make them **behavioral and checkable**
("if I've asked for more options twice, refuse"), not vibes ("be supportive"). Satisfaction
directives describe delivery style; growth directives describe interventions the AI should
make against the specific blind spot.
