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

## Validating & maintaining skills

A `run-skills` tooling skill lives at `.claude/skills/run-skills/`. It bundles a
zero-dependency validator plus the repo's GitHub sync workflow. Lint every
skill before committing (exit `0` = all valid, `1` = a blocking error):

```bash
node .claude/skills/run-skills/validate.mjs
```

It checks each `skills/*/SKILL.md` for valid frontmatter, a `name` matching its
folder, a present `description`, and that referenced `references/` files exist.
See `.claude/skills/run-skills/SKILL.md` for the full workflow, including the
GitHub gotchas (the default branch is not `main`; MCP writes 404 on branches
that haven't been pushed yet).
