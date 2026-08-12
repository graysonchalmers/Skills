---
name: image-decomp
visibility: public
description: "Decompose and decode any image: craft (palette, style, refs, regen prompt) + intent (engagement archetypes, Dopamine-Hook + Authenticity-Gap). Analyze, decode, or reverse-engineer any image."
metadata:
  version: "3.0"
---

# Image Decomposition + Intent Engine (VDE) — v3

## What this skill is for

Every image is engineered to do something to whoever looks at it — even a
"candid" phone snap is a set of choices. This skill decomposes an image on
**two axes at once**:

- **CRAFT axis** — *how was this made?* Palette, style lineage, medium,
  technique, references, and a prompt that could regenerate it. (This was v2.)
- **INTENT axis (the VDE engine)** — *what is this trying to do to a viewer,
  and how honest is it about that?* Gaze engineering, element roles, engagement
  archetypes, and two scores: **Dopamine Hook** and **Authenticity Gap**.

The craft axis serves art direction, prompt engineering, and vendor briefs.
The intent axis serves media literacy, content strategy, marketing analysis,
and reading the persuasion architecture of game key-art, ads, and social posts.
One image, both reads.

**Key principle: write like someone who deeply knows THIS specific medium and
can see the strings being pulled — not a generic checklist filled in.**

**Reactivity is the whole game.** Do not run every field on every image. Pick
the depth each axis deserves for *this* image (Step 1 tells you), and omit what
doesn't apply rather than writing "N/A."

---

## Step 1 — Classify the Image + Set the Truth-Claim Flag

Determine the **Primary Image Type**. This drives the metadata schema (Step 8)
*and* how the intent axis behaves.

| Type ID | Description | Trigger signals |
|---|---|---|
| `DIGITAL_ILLUS` | Digital illustration / game art / visual novel / webtoon | Clean line art, stylized anatomy, game UI context, anime-adjacent |
| `CONCEPT_ART` | Concept art / keyframe / production painting | Loose painterly edges, value-first, studio watermark, spec-art feel |
| `PHOTOGRAPHY` | Real-world photography | Photographic grain, depth of field, lens bokeh, real-world lighting |
| `FILM_STILL` | Film / TV / cinematic still | Cinematic framing, color grade, recognizable production aesthetic |
| `3D_RENDER` | 3D render / CGI | Subsurface scattering, perfect geometry, render artifacts, PBR materials |
| `TRADITIONAL_ART` | Traditional painting / drawing / print | Physical texture, paper tooth, visible medium |
| `UI_UX` | UI/UX design / app screenshot / interface | Grid systems, component patterns, typographic hierarchy |
| `SOCIAL_POST` | Social-media image / influencer / lifestyle / meme | Phone-camera look, platform crop (4:5, 9:16), caption/hashtag context, selfie framing |
| `ADVERTISING` | Ad / product hero / campaign key visual | Product hero-lit, logo/copy space, aspirational staging |
| `MIXED_MEDIA` | Mixed / hybrid / unclear | Combine relevant schemas |

Then set the **Truth-Claim Flag** — does this medium implicitly claim to depict
something real that happened?

- **`claims-real`** (PHOTOGRAPHY, most SOCIAL_POST, documentary FILM_STILL): the
  image presents as a real moment. → The **Authenticity Gap** score is
  meaningful and should be computed.
- **`openly-constructed`** (DIGITAL_ILLUS, CONCEPT_ART, 3D_RENDER, most
  ADVERTISING, narrative FILM_STILL, TRADITIONAL_ART, UI_UX): everyone knows
  it's built. → Replace Authenticity Gap with **Construction Transparency**
  (is the intent shown openly, or disguised as something more innocent?), or
  omit if not illuminating.

Record both. They gate Steps 2 and 9.

---

## Step 2 — Compositional Geometry (Intent Layer 1: gaze engineering)

Read how the frame *steers the eye*. This is the mechanical substrate of intent
— before meaning, the composition has already decided where you look first.

Analyze and report:

- **Structure**: Rule of Thirds, Golden Ratio/spiral, central/symmetrical,
  diagonal, triangular, leading lines, framing-within-frame, negative-space push.
- **Primary focal anchor**: what the eye hits first, and *why* (contrast,
  isolation, convergence, face, highest saturation).
- **Gaze path**: the order the eye travels (e.g., "face → product in hand →
  logo bottom-right"). This is the intended reading sequence.
- **Depth staging**: foreground / midground / background separation and how
  depth is manufactured (atmospheric perspective, DoF, overlap, scale).
- **Approximate anchor coordinates**: give normalized `[x, y]` in 0–1 space
  (0,0 = top-left; 1,1 = bottom-right) for the 2–4 key anchors.

**Honesty about precision:** these coordinates are *visually estimated*, not
pixel-measured. Say so. They're for "the hero sits upper-left third," not
survey-grade geometry. If the user needs exact pixels, that's an OpenCV job,
not this skill.

---

## Step 3 — Color Palette Extraction

Identify 6–12 dominant and accent colors.

- Extract actual hex values from visible pixel regions, not approximations.
- Include the full range: darks, mids, lights, accents.
- Order by dominance or light-to-dark.
- Label each color's role (key light, shadow, accent, skin tone, brand color).

Note any **palette-as-persuasion** move: warm skin against cool background to
make a person "pop," brand-color saturation spikes, teal-orange grade for
cinematic gloss, desaturation for "authentic/documentary" coding.

---

## Step 4 — Semantic Element-Utility Map (Intent Layer 2: what each thing is doing)

Don't just detect objects — classify each meaningful element by the **job it
does in the image's argument**. This is the bridge from "what's here" to "why."

For each notable element, assign a role:

| Role | What it does | Examples |
|---|---|---|
| `PROTAGONIST` | The subject the viewer is meant to identify with or desire | Hero character, the influencer, the model |
| `SUPPORTING` | Secondary figures/objects that frame the protagonist | Sidekick, crowd, hands in frame |
| `PROP_FUNCTIONAL` | Objects doing literal narrative work | Weapon, tool, the product being sold |
| `STATUS_MARKER` | Signals wealth, taste, belonging, achievement | Luxury logo, trophy, exotic locale, curated shelf |
| `ATMOSPHERE` | Sets mood, not literal meaning | Fog, bokeh lights, lens flare, weather |
| `STYLE_MARKER` | Signals a subculture, era, or aesthetic in-group | Retro grain, specific fashion, genre iconography |
| `TRUST_CUE` | Signals authenticity/credibility | "Messy" detail, clinical white, expert setting, natural light |

Report as a compact list: `element — role — what it's persuading toward`.
Only include elements that actually carry weight. A photo of one face may have
three entries; a busy ad may have ten.

---

## Step 5 — Visual Tags

8–15 descriptive tags across: medium/technique (`Cel-Shaded`, `Photorealistic`),
style movement (`Art Nouveau`, `Brutalist`), subject (`Portrait`, `Character
Duo`), mood (`Melancholic`, `Energetic`), era/culture (`JRPG`, `1970s Grain`).
Format: `["Tag One", "Tag Two", ...]`.

---

## Step 6 — Artistic References

6–12 relevant artists, studios, movements, games, films, photographers, or
campaigns, **each with a reason** (say WHY it's comparable). Prioritize by type:

- **DIGITAL_ILLUS / game art**: named illustrators, studios + art directors,
  specific game titles, anime studios.
- **CONCEPT_ART**: named concept artists, studios/franchises.
- **PHOTOGRAPHY**: named photographers, movements, adjacent campaigns.
- **FILM_STILL**: director + cinematographer, productions, grade influences.
- **SOCIAL_POST / ADVERTISING**: comparable creators, brand campaigns,
  platform-native aesthetics (e.g., "that soft-flash night-out look").
- **TRADITIONAL_ART**: movements, named artists, historical context.

---

## Step 7 — Technical Summary

3–5 sentences: (1) visual language & palette strategy, (2) composition & spatial
logic, (3) technique & texture, (4) mood/intent/cultural context, (5) notable
qualities. Aim for the precision of a vis-dev brief. Write as if briefing an
outsource vendor or junior artist who needs to match it.

---

## Step 8 — Dynamic Custom Fields + Context-Reactive Metadata

Generate 4–8 medium-specific custom fields that give a practitioner actionable
insight into HOW the image was made, then fill the **reactive metadata schema**
for the Step-1 type. Only include genuinely observable fields; omit rather than
"N/A." The full per-type schemas (DIGITAL_ILLUS, CONCEPT_ART, PHOTOGRAPHY,
FILM_STILL, 3D_RENDER, TRADITIONAL_ART, UI_UX, SOCIAL_POST, ADVERTISING) live in
`references/metadata-schemas.md` — read it and use the matching one.

---

## Step 9 — Intent & Engagement Decode (VDE Layer 3: the engine)

This is the heart of v3. Answer: **what is this image trying to do to the
viewer, by what mechanism, and how honest is it about it?**

### 9a. Archetype identification

Match the image against the **engagement archetype library** in
`references/intent-archetypes.md` (read it). Identify the 1–4 archetypes in play
and give each a **confidence 0.0–1.0**. Archetypes span both worlds — a game
key-art's "Power Fantasy" and an influencer post's "Aspirational Flex" are the
same library. The library is extensible; if a real pattern isn't listed, name it
and describe its signals rather than forcing a bad fit.

Report each as: `Archetype — confidence — the specific signals in THIS image
that trigger it`.

### 9b. Dopamine Hook Score (0–100)

How hard is this image engineered for immediate attention capture? Score it and
justify from observable mechanics:

- Direct eye contact / face salience (+)
- Implied motion or a frozen "peak action" moment (+)
- Curiosity gap / pattern-interrupt / "wait, what?" (+)
- Saturation, contrast, or luminance spike vs. surroundings (+)
- Sexual, threat, or food/wealth salience (+)
- Text hook / number / arrow / emoji overlay (+, common in thumbnails)

Band it: **0–30 low / quiet**, **31–60 moderate**, **61–85 high / engineered**,
**86–100 maximum / hook-maxed**. Give the number, the band, and the 2–4 biggest
contributors.

### 9c. Authenticity Gap  *(reactive — Truth-Claim Flag)*

**If `claims-real`:** score 0–100 the distance between what the image *presents
as* (spontaneous, real, unposed) and what it *is* (constructed, staged,
retouched, styled). Evidence: posing that reads as candid, "invisible" studio
light dressed as natural, retouching, impossible-luck framing, a caption that
oversells. **Low gap** = honest/candid; **high gap** = curated performing as
spontaneous. Name the tells.

**If `openly-constructed`:** skip the gap; instead give a one-line
**Construction Transparency** read — is the intent worn openly (obvious ad,
obvious hero shot) or disguised as something more innocent (native-ad mimicry,
"organic" product placement, astroturfed authenticity)?

### 9d. Viewer-effect summary

2–4 sentences in plain language: who this is aimed at, the feeling it's built to
produce, the action it's nudging toward, and your honest read of the gap between
its surface and its purpose. This is the payload — write it like you're teaching
someone to see it too.

---

## Step 10 — Reverse-Engineered Generation Prompt

A single-paragraph prompt (2–5 sentences) to recreate the image in a
text-to-image model: subject (what/how many/arrangement), style & technique,
2–3 key references, lighting & composition, medium/substrate, quality modifiers.
One flowing string, tuned for Midjourney / DALL·E / Stable Diffusion.

---

## Step 11 — Title

Infer an evocative (not literal) title a thoughtful art director would assign;
2–5 words.

---

## Output Format

Always produce TWO outputs.

### 1. JSON Report

```json
{
  "title": "...",
  "imageType": "...",
  "truthClaim": "claims-real | openly-constructed",
  "technicalSummary": "...",
  "compositionGeometry": {
    "structure": "e.g. Rule of Thirds + leading lines",
    "focalAnchor": "what the eye hits first + why",
    "gazePath": ["face", "product", "logo"],
    "depthStaging": "FG/MG/BG description",
    "anchors": [{ "label": "hero face", "xy": [0.33, 0.28], "estimated": true }]
  },
  "colors": [{ "hex": "#XXXXXX", "role": "label" }],
  "elementUtility": [
    { "element": "...", "role": "PROTAGONIST", "persuadesToward": "..." }
  ],
  "tags": ["..."],
  "artisticReferences": ["Name — why"],
  "customFields": [{ "label": "...", "value": "..." }],
  "metadata": { },
  "intent": {
    "archetypes": [
      { "name": "Aspirational Flex", "confidence": 0.8, "signals": "..." }
    ],
    "dopamineHookScore": { "score": 0, "band": "low|moderate|high|maximum", "drivers": ["..."] },
    "authenticityGap": { "score": 0, "tells": ["..."] },
    "constructionTransparency": "only if openly-constructed; else omit",
    "viewerEffect": "..."
  },
  "generatedPrompt": "..."
}
```

Include `authenticityGap` **or** `constructionTransparency`, not both — whichever
the Truth-Claim Flag selected.

### 2. Visual Report (markdown)

1. **Title** as H1
2. **Image Type + Truth-Claim** called out (e.g., `Social Post — claims-real`)
3. **Technical Summary** — paragraph
4. **Composition & Gaze** — structure, focal anchor, gaze path, depth (anchors as a small list)
5. **Artistic References** — comma-separated, each with a WHY
6. **Generated Prompt** — blockquote
7. **Tags** — inline badges
8. **Color Palette** — inline hex codes with role labels
9. **Element-Utility Map** — clean table (element / role / persuades toward)
10. **Custom Fields** — table
11. **Metadata** — two-column table, only populated fields
12. **🎯 Intent Decode** — archetypes (with confidence), Dopamine Hook Score (number + band + drivers), Authenticity Gap *or* Construction Transparency, and the viewer-effect summary. Put this section last and make it the strongest — it's what v3 adds.

---

## Quality Standards

- **No N/A padding.** Omit inapplicable fields. Every shown field adds value.
- **Reactive, not templated.** Metadata AND intent must reflect the actual image
  type. Don't run Authenticity Gap on a knight in oil paint; don't skip it on a
  "candid" influencer selfie.
- **Color accuracy.** Analyze actual pixel regions, not approximations.
- **Specificity beats vibes.** "Primary subject offset 30% left, rim-lit against
  atmospheric mid-ground" beats "good composition." "Direct eye contact + red
  saturation spike drive the hook" beats "engaging."
- **Confidence, honestly.** Mark inferences ("likely Clip Studio brushwork";
  "~0.6 confidence on the Thirst archetype"). Never invent unseen detail.
- **Intent read is descriptive, not moralizing.** Decode the mechanism plainly.
  Persuasion isn't automatically sinister — a game key-art SHOULD sell a power
  fantasy. Name the technique; let the reader judge.

---

## Example Use Cases

- Game art direction: read a competitor's key-art power fantasy before briefing
- Marketing/content strategy: decode why an ad or thumbnail converts
- Media literacy: teach someone to see staging in a "candid" post
- AI prompt engineering: extract a regeneration prompt
- Outsource vendor briefs: match a target aesthetic with specificity
- Portfolio/reference documentation
