---
name: image-decomp
version: 2.0
visibility: public
description: >
  Universal image decomposition and analysis skill. Analyzes any image and
  produces a structured report covering visual summary, color palette, style
  tags, artistic references, dynamic custom fields, context-reactive metadata,
  a reverse-engineered generation prompt, and an inferred title.
  Metadata adapts to the image type — digital illustration, photography,
  film/cinematic, 3D render, concept art, etc. No N/A padding.
---

# Image Decomposition Skill v2

## Purpose

Break down any image — illustration, photograph, 3D render, UI screenshot,
concept art, painting, film still — into a rich, structured analysis report.

The output is always a JSON object plus a formatted human-readable report.

**Key principle: the report should feel like it was written BY someone who
deeply knows this specific medium, not a generic checklist filled in.**

---

## Step 1 — Classify the Image First

Before anything else, determine the **Primary Image Type**. This classification
drives which metadata schema to use in Step 7.

| Type ID | Description | Trigger signals |
|---|---|---|
| `DIGITAL_ILLUS` | Digital illustration / game art / visual novel / webtoon | Clean line art, stylized anatomy, game UI context, anime-adjacent |
| `CONCEPT_ART` | Concept art / keyframe / production painting | Loose painterly edges, value-first approach, studio watermark, spec art feel |
| `PHOTOGRAPHY` | Real-world photography | Photographic grain, depth of field, lens bokeh, real-world lighting |
| `FILM_STILL` | Film / TV / cinematic still | Cinematic framing, color grade, recognizable production aesthetic |
| `3D_RENDER` | 3D render / CGI | Subsurface scattering, perfect geometry, render artifacts, PBR materials |
| `TRADITIONAL_ART` | Traditional painting / drawing / print | Physical texture, paper tooth, visible medium (oil, watercolor, ink) |
| `UI_UX` | UI/UX design / app screenshot / interface | Grid systems, component patterns, typographic hierarchy |
| `MIXED_MEDIA` | Mixed / hybrid / unclear | Combine relevant schemas from above |

Record this classification. It determines Step 7.

---

## Step 2 — Color Palette Extraction

Identify 6–12 dominant and accent colors.

Rules:
- Extract actual hex values from visible pixel regions, not approximations
- Include the full value range: darks, mids, lights, accents
- Order by dominance or light-to-dark
- Label each color's role (key light, shadow, accent, skin tone, etc.)

---

## Step 3 — Visual Tags

Generate 8–15 descriptive tags capturing:

- Medium and technique (e.g., `Cel-Shaded`, `Photorealistic`, `Stippling`)
- Style movement (e.g., `Art Nouveau`, `Brutalist`, `Baroque`)
- Subject (e.g., `Portrait`, `Architecture`, `Character Duo`)
- Mood (e.g., `Melancholic`, `Theatrical`, `Energetic`)
- Era or cultural reference (e.g., `JRPG`, `1970s Grain`, `Contemporary`)

Format as: `["Tag One", "Tag Two", ...]`

---

## Step 4 — Artistic References

Identify 6–12 relevant artists, studios, movements, games, or cultural references.

For **digital illustration / game art**, prioritize:
- Named illustrators (e.g., Yusuke Murata, Ilya Kuvshinov, Lois van Baarle)
- Game studios and their art directors (e.g., Vanillaware, Arc System Works, Atlus)
- Specific game titles with similar aesthetic (e.g., Hades, Persona 5, Genshin Impact)
- Anime studios known for visual style (e.g., Ufotable, Trigger, KyoAni)

For **photography**, prioritize:
- Named photographers (e.g., Gregory Crewdson, Viviane Sassen)
- Photographic movements (e.g., New Topographics, Pictorialism)
- Adjacent film or ad campaigns

For **film stills**, prioritize:
- Director and cinematographer
- Named productions or studios
- Color grading influences

For **concept art**, prioritize:
- Named concept artists (e.g., Craig Mullins, Sparth, Eytan Zana)
- Studios or franchises (e.g., Blizzard, Naughty Dog, ILM)

For **traditional art**, prioritize:
- Art movements and named artists
- Cultural and historical context

---

## Step 5 — Technical Summary

Write 3–5 sentences analyzing:

1. The visual language and palette strategy
2. Composition and spatial logic
3. Technique and texture approach
4. Mood, intent, or cultural context
5. Any unique or notable qualities

Aim for the precision of a visual development brief or art direction document.
Write as if briefing an outsource vendor or junior artist who needs to match the style.

---

## Step 6 — Dynamic Custom Fields

Generate 4–8 custom fields specific to THIS image's medium. These should give
a practitioner actionable insight into HOW the image was made.

Use the classification from Step 1 to select relevant fields:

**DIGITAL_ILLUS / CONCEPT_ART:**
- Line Weight Strategy, Shading Model, Depth Layering, Light Source Logic,
  Prop Density, Silhouette Clarity, Narrative Moment Type, Edge Quality,
  Color Temperature Strategy, Value Structure

**PHOTOGRAPHY:**
- ISO Estimate, Depth of Field, Focal Plane, Motion Blur,
  Post-Processing Style, White Balance, Exposure Latitude, Shadow Recovery

**FILM_STILL:**
- Color Grade Style, Grain Structure, Anamorphic Characteristics,
  Practical vs CG, Production Design Era, Wardrobe Period

**3D_RENDER:**
- Render Engine (inferred), Material System, Lighting Rig Type,
  AA Quality, Subsurface Scattering Visibility, Texture Resolution Estimate,
  Polygon Density Inference

**TRADITIONAL_ART:**
- Brushwork Character, Impasto/Texture, Ground Treatment,
  Glazing Layers, Medium (inferred), Paper/Substrate

**UI_UX:**
- Grid System, Type Hierarchy, Interaction Affordances,
  Component Language, Motion Implied, Design System Affinity

---

## Step 7 — Context-Reactive Metadata

**This is the most important change from v1. Do NOT fill a fixed template.**

Use the classification from Step 1 to select the appropriate metadata schema below.
Only include fields that are **genuinely applicable and observable**. Omit fields
that don't apply rather than writing "N/A".

---

### Schema A — DIGITAL_ILLUS / Game Art / Visual Novel

Focus on: software pipeline, stylistic lineage, game genre fit, character design language.

```json
{
  "imageType": "Digital Illustration",
  "genre": "e.g. Fantasy RPG / Visual Novel / Mobile Game UI",
  "likelySoftware": "e.g. Clip Studio Paint (inferred from brush texture)",
  "gameComps": ["Title 1 — reason", "Title 2 — reason"],
  "characterDesignLanguage": "e.g. Anime-adjacent, stylized proportions, expressive silhouette",
  "illustratorComps": ["Artist name — specific similarity", "..."],
  "productionContext": "e.g. Likely game cutscene art / UI banner / card illustration",
  "colorPaletteStrategy": "e.g. Split-complementary warm/cool, desaturated BG push",
  "compositionType": "e.g. Dynamic diagonal, FG/MG/BG depth staging",
  "frameSize": "e.g. Medium Shot / Bust / Full Body",
  "aspectRatio": "e.g. 16:9 (widescreen game banner)",
  "timePeriod": "e.g. Fantasy Renaissance",
  "interiorExterior": "Interior / Exterior",
  "locationType": "e.g. Alchemist's Study"
}
```

---

### Schema B — CONCEPT_ART / Production Painting

Focus on: value structure, narrative stage, production context.

```json
{
  "imageType": "Concept Art / Production Painting",
  "genre": "e.g. Environment Keyframe / Character Sheet / Prop Design",
  "productionStage": "e.g. Pre-production exploratory / Final approved look",
  "studio_franchise": "e.g. Inferred Marvel Studios visual language",
  "conceptArtistComps": ["Artist name — similarity", "..."],
  "valueStructure": "e.g. Rim-lit silhouette against atmospheric mid-ground",
  "edgeQuality": "e.g. Lost edges in shadow, found edges on primary focal point",
  "narrativeMoment": "e.g. Pre-battle anticipation",
  "colorTemperatureStrategy": "e.g. Cool ambient, warm accent on hero",
  "compositionType": "...",
  "frameSize": "...",
  "timePeriod": "...",
  "interiorExterior": "..."
}
```

---

### Schema C — PHOTOGRAPHY

Focus on: camera system, lens, light, post-processing.

```json
{
  "imageType": "Photography",
  "genre": "e.g. Editorial Portrait / Street / Architectural",
  "camera": "e.g. Sony A7R IV (inferred from DR and resolution)",
  "lens": "e.g. 85mm f/1.4 (inferred from compression and bokeh)",
  "aperture": "e.g. f/2.0 (inferred from depth of field)",
  "isoEstimate": "e.g. ISO 400–800 (inferred from grain structure)",
  "lightingSetup": "e.g. Single key window light + silver reflector fill",
  "lightingType": "Natural / Studio / Mixed",
  "postProcessingStyle": "e.g. Desaturated shadows, lifted blacks, warm highlights",
  "filmStockAffinity": "e.g. Kodak Portra 400 aesthetic",
  "depthOfField": "e.g. Shallow, ~30cm focal plane",
  "shotType": "Portrait / Street / Landscape / etc.",
  "frameSize": "Close-Up / Medium Shot / Wide / etc.",
  "compositionType": "...",
  "timeOfDay": "...",
  "interiorExterior": "...",
  "photographerComps": ["Name — similarity", "..."]
}
```

---

### Schema D — FILM_STILL / Cinematic

Only use this schema when the image is clearly from a film, TV show, or shot
with cinematic intent (color grade, production design, clear narrative staging).

```json
{
  "imageType": "Film / Cinematic Still",
  "genre": "e.g. Sci-Fi Thriller / Period Drama",
  "director": "e.g. Denis Villeneuve (inferred from compositional restraint)",
  "cinematographer": "e.g. Roger Deakins style (inferred from light quality)",
  "colorGrade": "e.g. Teal-orange complementary, crushed blacks",
  "camera": "e.g. ARRI Alexa (inferred from highlight rolloff)",
  "lens": "e.g. Anamorphic (inferred from bokeh oval and flare character)",
  "aspectRatio": "e.g. 2.39:1 Anamorphic",
  "grainStructure": "e.g. Fine grain, likely 35mm scan or digital grain overlay",
  "productionDesignEra": "e.g. 1970s period accurate",
  "wardrobe": "e.g. Contemporary utilitarian",
  "shotType": "Two-Shot / OTS / Wide Establishing / etc.",
  "frameSize": "Close-Up / Medium Shot / Wide / etc.",
  "compositionType": "...",
  "timeOfDay": "...",
  "interiorExterior": "...",
  "storyLocation": "...",
  "productionComps": ["Film title — reason", "..."]
}
```

---

### Schema E — 3D_RENDER / CGI

```json
{
  "imageType": "3D Render / CGI",
  "renderEngine": "e.g. Unreal Engine 5 (inferred from Lumen GI and Nanite detail)",
  "lightingRig": "e.g. HDRI + 3-point practical simulation",
  "materialSystem": "e.g. PBR metalness/roughness workflow",
  "subsurfaceScattering": "e.g. Visible on skin — medium SSS radius",
  "aaQuality": "e.g. High — no visible aliasing artifacts",
  "textureResolutionEstimate": "e.g. 4K textures on primary asset",
  "polygonDensity": "e.g. High poly — no faceting visible at this resolution",
  "postProcessing": "e.g. Bloom, depth of field, lens distortion applied",
  "shotType": "...",
  "compositionType": "...",
  "frameSize": "...",
  "renderComps": ["Game/Film title — reason", "..."]
}
```

---

### Schema F — TRADITIONAL_ART

```json
{
  "imageType": "Traditional Art",
  "medium": "e.g. Oil on canvas (inferred from impasto and color opacity)",
  "substrate": "e.g. Cold press watercolor paper / Linen canvas",
  "brushworkCharacter": "e.g. Gestural, wet-on-wet, visible bristle marks",
  "glazingLayers": "e.g. Multiple — deep shadow transparency suggests 3+ passes",
  "texture": "e.g. Heavy impasto on highlights, smooth ground in shadow",
  "inkSaturation": "if applicable",
  "paperTooth": "if applicable",
  "movementAffinity": "e.g. Post-Impressionist color theory with Baroque composition",
  "artistComps": ["Name — reason", "..."],
  "compositionType": "...",
  "frameSize": "...",
  "timePeriod": "..."
}
```

---

## Step 8 — Reverse-Engineered Generation Prompt

Write a single-paragraph prompt (2–5 sentences) that would recreate this image
using a text-to-image model. Include:

- Subject description (what, how many, arrangement)
- Style and technique descriptors
- Key artistic references (2–3 max)
- Lighting and composition notes
- Medium/substrate
- Quality modifiers (resolution, sharpness, etc.)

Format as a single flowing text string optimized for Midjourney, DALL-E, or
Stable Diffusion.

---

## Step 9 — Title

Infer or assign a title. It should:
- Be evocative, not literal
- Sound like a title a thoughtful artist or art director would assign
- Be 2–5 words

---

## Output Format

Always produce TWO outputs:

### 1. JSON Report

The full structured JSON matching the appropriate schema from Step 7.
Output in a code block labeled `json`.

Core wrapper (always present):

```json
{
  "title": "...",
  "imageType": "...",
  "technicalSummary": "...",
  "artisticReferences": ["..."],
  "generatedPrompt": "...",
  "tags": ["..."],
  "colors": [{ "hex": "#XXXXXX", "role": "label" }],
  "customFields": [{ "label": "...", "value": "..." }],
  "metadata": { }
}
```

### 2. Visual Report

A formatted markdown report in this order:

1. **Title** as H1
2. **Image Type** called out clearly (e.g., `Digital Illustration — Game Art`)
3. **Technical Summary** as a paragraph
4. **Artistic References** as a comma-separated list (with specificity — say WHY)
5. **Generated Prompt** in a blockquote
6. **Tags** as inline badges
7. **Color Palette** — swatches as inline hex codes with role labels
8. **Custom Fields** as a clean table
9. **Metadata** as a two-column table (only populated fields, no N/A rows)

---

## Quality Standards

- **No N/A padding**: Omit fields that don't apply. Every field shown should add value.
- **Color accuracy**: Analyze actual pixel regions, not approximations
- **Specificity**: "Balanced asymmetry, primary subject offset 30% left" beats "good composition"
- **Inference confidence**: Note when inferring (e.g., "likely Clip Studio Paint brushwork")
- **No hallucination**: Don't invent details not visible in the image
- **Dynamic fields**: Custom fields must be relevant to THIS specific image
- **Reactive metadata**: The metadata section must reflect the actual image type,
  not a default film template applied to everything

---

## Example Use Cases

- Game dev art direction: analyze reference images for style briefs
- AI prompt engineering: extract prompts from existing images
- Art critique and education
- Style matching for outsource vendor briefs
- Personal portfolio documentation
- Identifying comparable games/artists for a target aesthetic
