# Skills

A collection of structured skills for use with AI assistants. Each skill lives in its own folder under `skills/` with a dedicated README defining its purpose, procedure, and output format.

## Skills

| Skill | Description |
|-------|-------------|
| [image-decomp](skills/image-decomp/) | Universal image decomposition and analysis — color palette, style tags, cinematic metadata, and a reverse-engineered generation prompt |
| [art-brief](skills/art-brief/) | Composes vendor-ready art briefs from any inputs: text descriptions, reference images, project context, IP references, or rough sketches. Outputs an Art Direction Document, Vendor Brief, and model-specific generation prompts for any asset type — characters, environments, props, creatures, key art, or physical fabrication |

## Structure

```
skills/
  <skill-name>/
    SKILL.md              ← skill definition, procedure, and output schema
    references/           ← supporting reference files (schemas, examples, etc.)
```
