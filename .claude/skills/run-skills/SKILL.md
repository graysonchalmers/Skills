---
name: run-skills
version: 1.0
description: >
  Validate, lint, and check the skill definitions in this repo, and sync them
  to GitHub. Use whenever you want to run the skills validator, verify a
  SKILL.md is well-formed before committing, add or update a skill in the
  skills/ folder, or push skill changes to GitHub. Covers the repo's GitHub
  workflow gotchas (default branch is not `main`; MCP writes 404 on unpushed
  branches). Triggers on: "validate the skills", "lint my skills", "check
  SKILL.md", "run the skills validator", "add a new skill", "update the skills
  folder", "push skills to GitHub", "sync my skills".
---

# run-skills

This repo is a **library of skill definitions** (`skills/<name>/SKILL.md`), not
a launchable app. There is nothing to boot or screenshot. The way you "run" it
is to **validate** that every skill is well-formed enough for Claude to load —
and then sync changes to GitHub. The driver is
[`validate.mjs`](validate.mjs); this file is its man page.

> All paths below are relative to the **repo root** (`Skills/`).

## Prerequisites

Node only — the validator uses pure Node built-ins, **no `npm install`, no
dependencies**. This container has `node v22.22.2`. Verify:

```bash
node --version
```

## Run (agent path) — validate the skills

The primary action. Lint every `skills/*/SKILL.md`:

```bash
node .claude/skills/run-skills/validate.mjs
```

Expected on a healthy repo (exit code `0`):

```
✓ ok  art-brief v2.2
✓ ok  image-decomp v2.0

2 skill(s) checked
```

**Exit code is the contract:** `0` = all valid, `1` = at least one skill has a
blocking error. Wire it into a pre-push check or CI.

What it enforces per skill:

| Level | Check |
|---|---|
| **error** | Frontmatter present (`---` … `---`) |
| **error** | `name:` present **and** equal to the directory name |
| **error** | `description:` present (Claude scans it to auto-load the skill) |
| **error** | Every `references/…` path mentioned in the file exists on disk |
| warn | `version:` present (recommended) |
| warn | `description` ≥ 40 chars (short = weak auto-load matching) |
| warn | Body has an `# H1` heading |

## Direct invocation — validate any directory

Point it at a different folder of `*/SKILL.md` skills (used to prove it catches
breakage — see Gotchas):

```bash
node .claude/skills/run-skills/validate.mjs /path/to/some/skills-dir
```

## GitHub sync — push skill changes

GitHub access in these web sessions works two ways, **both verified**:

- **Local git** (`git push`) — the normal path. Use it.
- **GitHub MCP** (`mcp__github__*`) — reads any branch; writes require the
  branch to **already exist on the remote**.

Standard sync of your work branch:

```bash
git add -A
git commit -m "your message"
git push -u origin claude/github-skill-access-ba3tcj
```

Confirm what's actually on the remote at any time:

```bash
git ls-remote --heads origin
```

To get the blob SHA an MCP `create_or_update_file` call needs:

```bash
git rev-parse <branch>:<path/to/file>
```

## Gotchas (battle scars from this repo)

- **The default branch is NOT `main`.** It is
  `claude/add-image-decomp-skill-zTCeE`. Check with
  `git ls-remote --symref origin HEAD`. Don't assume `main`/`master` exists —
  in this repo it doesn't.
- **MCP writes 404 on a branch that was never pushed.** If
  `mcp__github__create_or_update_file` returns
  `404 Branch <name> not found`, the branch exists only locally. Fix it by
  pushing first (`git push -u origin <branch>`), *then* the MCP write
  succeeds. This 404 looks like a permissions failure but isn't — it's a
  missing remote branch.
- **Stale remote-tracking refs lie.** `git branch -a` can show
  `remotes/origin/<branch>` for a branch that isn't really on the remote.
  Trust `git ls-remote --heads origin` (a live query), not the local cache.
- **Folded YAML descriptions.** Skills here write `description: >` as a
  multi-line folded scalar. The validator flattens those to one line before
  length-checking — don't "fix" a description into a single physical line just
  to satisfy a linter; the folded form is correct.

## Adding or updating a skill

1. Create `skills/<name>/SKILL.md` with frontmatter: `name` (== folder name),
   `version`, `description` (rich, with trigger verbs).
2. Put any support files under `skills/<name>/references/` and reference them
   as `references/<file>` from the SKILL.md.
3. Run the validator until it's `✓ ok` with no errors.
4. Add the skill to the table in the repo `README.md`.
5. Commit and push (see GitHub sync above).

## Troubleshooting

| Symptom | Fix |
|---|---|
| `✗ no skills found` | You ran it from the wrong place, or the target dir has no `*/SKILL.md`. Run from the repo root. |
| `references missing file: …` | The SKILL.md mentions a `references/…` path that isn't on disk. Create the file or fix the path. |
| `frontmatter name "x" != directory "y"` | Rename the folder or the `name:` so they match — the folder name is the slash command. |
| MCP write `404 Branch … not found` | `git push -u origin <branch>` first, then retry the MCP call. |
