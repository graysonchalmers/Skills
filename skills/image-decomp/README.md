---
name: image-decomp
description: >
  Universal image decomposition and analysis skill. Analyzes any image and
  produces a structured report covering visual summary, color palette, style
  tags, artistic references, dynamic contextual fields, cinematic metadata, a
  reverse-engineered generation prompt, and an inferred title.
---

# Image Decomposition Skill

## Purpose

Break down any image — illustration, photograph, 3D render, UI screenshot, concept art, painting — into a rich, structured analysis report.

The output is always a JSON object plus a formatted human-readable report.

## Core Output Schema

```json
{
  "filmTitle": "string — inferred or descriptive title for the image",
  "technicalSummary": "string — 3–5 sentence visual language analysis",
  "colors": ["#hex", "..."],
  "tags": ["keyword", "..."],
  "artisticReferences": ["Artist or movement", "..."],
  "customFields": [
    { "label": "string", "value": "string" }
  ],
  "metadata": {
    "genre": "",
    "director": "",
    "cinematographer": "",
    "colorDescription": "",
    "aspectRatio": "",
    "lighting": "",
    "lightingType": "",
    "camera": "",
    "lens": "",
    "lensSize": "",
    "filmStock": "",
    "format": "",
    "frameSize": "",
    "shotType": "",
    "shotTime": "",
    "composition": "",
    "interiorExterior": "",
    "locationType": "",
    "set": "",
    "storyLocation": "",
    "filmingLocation": "",
    "timePeriod": "",
    "actors": "",
    "colorist": "",
    "costumeDesigner": "",
    "editor": "",
    "productionDesigner": "",
    "timeOfDay": ""
  },
  "generatedPrompt": "string — reverse-engineered generation prompt for recreating the image"
}
```

## Step-by-Step Procedure

### Step 1 — Initial Image Assessment

Look at the image holistically. Determine:

- **Primary category:** Illustration / Photography / 3D Render / Concept Art / UI/UX / Mixed Media / Other
- **Subject matter:** What is depicted?
- **Medium indicators:** What technique or tool likely created this?
- **Era/period:** When does this appear to be from or inspired by?

Record these answers internally before proceeding.

### Step 2 — Color Palette Extraction

Identify 6–12 dominant and accent colors from the image.

Rules:
- Extract actual hex values, not approximations
- Include the full value range: darks, mids, lights
- Order from lightest to darkest or by dominance
- For monochromatic images, still extract all visible tonal variants

### Step 3 — Visual Tags

Generate 8–15 descriptive tags. These should capture:

- Medium and technique (e.g., `Stippling`, `Photorealistic`, `Cel-Shaded`)
- Style (e.g., `Minimalist`, `Baroque`, `Brutalist`)
- Subject (e.g., `Portrait`, `Architecture`, `Abstract`)
- Mood (e.g., `Melancholic`, `Energetic`)
- Era or movement (e.g., `Art Nouveau`, `Contemporary`)

Format as: `["Tag One", "Tag Two", ...]` — no hashtags in the JSON.

### Step 4 — Artistic References

Identify 6–12 relevant artists, movements, studios, or cultural references.

Think across:
- **Artists:** Named illustrators, painters, photographers
- **Movements:** Surrealism, Bauhaus, Pointillism, etc.
- **Studios/houses:** If applicable (e.g., Studio Ghibli, Moebius's Métal Hurlant)
- **Adjacent references:** Films, games, historical periods that share the aesthetic

### Step 5 — Technical Summary

Write 3–5 sentences analyzing:

1. The visual language and palette strategy
2. Composition and spatial logic
3. Technique and texture approach
4. Mood, intent, or cultural context
5. Any unique or notable qualities

Aim for the precision of a visual development brief or art direction document.

### Step 6 — Dynamic Custom Fields

This is the most image-specific section. Based on the medium and category identified in Step 1, generate 4–8 custom fields that are most relevant to this specific image type.

Examples by category:

**Pen & Ink / Illustration:**
- Stipple Density, Line Weight Range, Crosshatch Angle, Paper Tooth, Ink Saturation

**Photography:**
- ISO Estimate, Depth of Field, Focal Plane, Motion Blur, Post-Processing Style

**3D Render:**
- Render Engine (inferred), Polygon Density, Material Type, HDR/IBL Notes, AA Quality

**Concept Art / Keyframe:**
- Value Structure, Silhouette Clarity, Edge Quality, Color Temperature Strategy, Narrative Moment

**UI/UX:**
- Grid System, Type Hierarchy, Interaction Affordances, Component Language, Motion Implied

**Painting (Digital or Traditional):**
- Brushwork Character, Impasto/Texture, Ground/Background Treatment, Glazing Layers

Use your judgment — the fields should give a practitioner actionable insight into HOW the image was made.

### Step 7 — Cinematic Metadata

Fill all metadata fields using cinematic vocabulary as a universal language for describing images.

Inference rules:
- **genre:** Interpret loosely — "Surreal Still Life", "Documentary Portrait", "Fantasy Environment", "Technical Illustration"
- **director:** If style strongly evokes a specific director, name them; otherwise "Inferred [Style] Style"
- **cinematographer:** Infer from lighting and composition approach
- **camera:** For non-photo, infer the capture or rendering device (e.g., "High-resolution Flatbed Scanner", "Blender Cycles Renderer")
- **lens:** Map to equivalent — e.g., "35mm equivalent", "Macro 60mm equivalent"
- **filmStock:** For non-photo, map to the substrate or render output (e.g., "Cold Press Illustration Board", "32-bit EXR")
- **shotType:** Still Life / Portrait / Landscape / Action / Abstract / etc.
- **frameSize:** Extreme Close-Up / Close-Up / Medium Shot / Wide / etc.
- **composition:** Rule of Thirds / Golden Ratio / Balanced Asymmetry / Central / Dynamic Diagonal / etc.
- For fields that genuinely don't apply, use `"N/A"` not blank

### Step 8 — Reverse-Engineered Generation Prompt

Write a single-paragraph prompt (2–5 sentences) that would recreate this image using a text-to-image model. Include:

- Subject description (what, how many, arrangement)
- Style and technique descriptors
- Key artistic references (2–3 max)
- Lighting and composition notes
- Medium/substrate
- Quality modifiers (resolution, sharpness, etc.)

Format as a single flowing text string optimized for Midjourney, DALL-E, or Stable Diffusion.

### Step 9 — Title

Infer or assign a title. It should:
- Be evocative, not literal
- Sound like a title a thoughtful artist or art director would assign
- Be 2–5 words

## Output Format

Always produce **two outputs**:

### 1. JSON Report

The full structured JSON object matching the schema above. Output in a code block labeled `json`.

### 2. Visual Report

A formatted markdown report with:
- Title as H1
- Color swatches displayed as inline hex codes with labels
- Tags as inline badges
- Artistic references as a comma-separated list
- Technical summary as a paragraph
- Custom fields as a clean table
- Metadata as a two-column table
- Reverse prompt in a blockquote

## Quality Standards

- **Color accuracy:** Don't guess — analyze actual pixel regions
- **Specificity:** "Balanced asymmetry with a primary subject offset 30% left" beats "good composition"
- **Inference confidence:** If inferring (e.g., "likely Procreate brushwork"), note it in the value
- **No hallucination:** Don't invent details not visible in the image
- **Dynamic fields:** Custom fields must be relevant to THIS image, not generic

## Example Use Cases

- Game dev art direction: analyze reference images for style briefs
- AI prompt engineering: extract prompts from existing images
- Art critique and education
- Style matching for outsource vendor briefs
- Personal portfolio documentation
