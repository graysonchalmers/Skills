# Context-Reactive Metadata Schemas

Pick the ONE schema matching the Step-1 classification. Only include fields that
are genuinely applicable and observable. Omit fields that don't apply rather than
writing "N/A." For `MIXED_MEDIA`, combine relevant fields from two schemas.

## Table of contents
- Schema A — DIGITAL_ILLUS / Game Art / Visual Novel
- Schema B — CONCEPT_ART / Production Painting
- Schema C — PHOTOGRAPHY
- Schema D — FILM_STILL / Cinematic
- Schema E — 3D_RENDER / CGI
- Schema F — TRADITIONAL_ART
- Schema G — UI_UX
- Schema H — SOCIAL_POST / Influencer / Lifestyle
- Schema I — ADVERTISING / Campaign Key Visual

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
  "edgeQuality": "e.g. Lost edges in shadow, found edges on focal point",
  "narrativeMoment": "e.g. Pre-battle anticipation",
  "colorTemperatureStrategy": "e.g. Cool ambient, warm accent on hero",
  "compositionType": "...",
  "frameSize": "...",
  "timePeriod": "...",
  "interiorExterior": "..."
}
```

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

### Schema D — FILM_STILL / Cinematic
Only when clearly from a film/TV or shot with cinematic intent.
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

### Schema G — UI_UX
```json
{
  "imageType": "UI / UX Design",
  "platform": "e.g. iOS / Web dashboard / Game HUD",
  "gridSystem": "e.g. 8pt grid, 12-column",
  "typeHierarchy": "e.g. Display / H1 / body / caption, strong scale contrast",
  "componentLanguage": "e.g. Material 3 / custom neumorphic / glassmorphism",
  "designSystemAffinity": "e.g. Apple HIG / Fluent / bespoke",
  "interactionAffordances": "e.g. Clear tap targets, implied swipe, hover states",
  "motionImplied": "e.g. Parallax hero, spring transitions suggested",
  "informationDensity": "e.g. Dense data table vs. airy marketing page"
}
```

### Schema H — SOCIAL_POST / Influencer / Lifestyle
Focus on: platform, persona, staging, and the caption/hashtag relationship.
```json
{
  "imageType": "Social Post",
  "platform": "e.g. Instagram feed (4:5) / TikTok cover (9:16) / X",
  "personaArchetype": "e.g. Aspirational-relatable lifestyle creator",
  "stagingLevel": "e.g. High — 'candid' but clearly art-directed",
  "captionRelationship": "e.g. Caption claims spontaneity the image contradicts",
  "lightingType": "Natural / Ring light / Golden hour / Mixed",
  "postProcessingStyle": "e.g. Warm VSCO grade, skin smoothing, teal shadows",
  "propStrategy": "e.g. Coffee + laptop + plant = productive-cozy signaling",
  "shotType": "Selfie / Mirror / 3rd-person 'candid' / Flat-lay",
  "frameSize": "Close-Up / Medium / Wide",
  "locationType": "e.g. Curated home / café / travel destination",
  "creatorComps": ["Handle or archetype — reason", "..."]
}
```

### Schema I — ADVERTISING / Campaign Key Visual
Focus on: product hierarchy, brand cues, promise, and call-to-action logic.
```json
{
  "imageType": "Advertising",
  "adFormat": "e.g. Product hero / Lifestyle spot / OOH billboard / Social ad",
  "productHierarchy": "e.g. Product occupies focal third, hero-lit vs. muted context",
  "brandCues": "e.g. Brand red saturation spike, logo bottom-right, proprietary type",
  "corePromise": "e.g. 'This makes you the effortless-cool person'",
  "copySpace": "e.g. Negative space upper-left reserved for headline",
  "callToActionLogic": "e.g. Gaze path ends on logo + implied 'buy'",
  "lightingSetup": "e.g. Rim + soft key, glossy specular on product",
  "aspirationTarget": "e.g. Late-20s urban professional",
  "campaignComps": ["Brand/campaign — reason", "..."]
}
```
