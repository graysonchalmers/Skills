# 🧭 Session Handoff — Skills

_Last updated: 2026-08-01 (CT)_

## 🎯 Current state
This repo is a **library of skill definitions** for AI assistants (`skills/<name>/SKILL.md`),
not a runnable app. Two content skills live here: **image-decomp** (v2.0) and **art-brief**
(v2.2). As of this session it also has a **tooling skill** — `run-skills` — with a working,
zero-dependency validator and a documented GitHub sync workflow. GitHub access from web
sessions is confirmed working in both directions (local `git` + GitHub MCP).

## 📌 Where we stopped
`run-skills` skill is built, validated, committed (`5b15200`), and **pushed** to the work
branch `claude/github-skill-access-ba3tcj`. The work branch is clean and matches canonical
content + the new skill. It has **not** been merged to the default branch.

## ▶️ Next concrete step
**Decide where `run-skills` should land.** Recommended: open a PR (or fast-forward) from
`claude/github-skill-access-ba3tcj` → the default branch `claude/add-image-decomp-skill-zTCeE`
so the tooling is on the canonical line.
- _Alt A:_ Leave it on the work branch for now — zero risk, but the validator/README updates
  aren't on the default branch yet.
- _Alt B:_ First normalize the repo's default branch to a real `main` (see open questions),
  then merge there — cleaner long-term, more upfront work.

## ❓ Open questions
- **Default branch is `claude/add-image-decomp-skill-zTCeE`, not `main`.** Intentional, or
  should we rename/establish a proper `main`? Everything downstream (PRs, MCP writes) is
  simpler with a conventional default.
- **Scope of "update all our stuff":** was the intent just to validate/sync existing skills
  (done), or also to substantively revise image-decomp / art-brief content? Left their
  creative content untouched on purpose — confirm if edits were wanted.
- Should the validator run in CI (GitHub Action on push) rather than only on-demand?

## 🗂️ Changed this session
- **Branch:** `claude/github-skill-access-ba3tcj` · **Commit:** `5b15200` (pushed)
- **Files added:** `.claude/skills/run-skills/validate.mjs`,
  `.claude/skills/run-skills/SKILL.md`; **edited:** `README.md`
- **Decisions (+ why):**
  - Treated the repo as a **library**, so the "run" driver is a **validator**, not an app
    launcher — there's no GUI/server to drive here.
  - Validator uses **pure Node built-ins** (no `npm install`) to keep it dependency-free and
    instantly runnable in any session.
  - Cleaned throwaway GitHub-access test commits off the branch with `--force-with-lease`
    (they were net no-op test noise from this session, not real history).

---

## 🕓 Session log
### 2026-08-01 — Diagnosed GitHub access + built the run-skills validator skill
- Confirmed Claude skills vs MCP servers distinction: the "GitHub skill" the user wanted is
  the **GitHub MCP server**, already connected here (two instances: `github` +
  `Github_Cusotm_Oauth`). Nothing to install for web sessions.
- Full end-to-end GitHub test: identity ✓, read ✓, `git push` write ✓, MCP write ✓.
- **Root-caused the recurring "issue":** MCP `create_or_update_file` returns
  `404 Branch not found` when the branch was never pushed to the remote. Looks like a
  permissions failure; it's a missing remote branch. Fix: `git push -u origin <branch>` first.
- Also found: repo's **default branch is not `main`** (`claude/add-image-decomp-skill-zTCeE`),
  and local `git branch -a` showed a **stale remote-tracking ref** that didn't exist remotely.
- Built `.claude/skills/run-skills/` — `validate.mjs` (lints frontmatter, name==dir,
  description present, referenced `references/` files exist; exit 0/1) + `SKILL.md` documenting
  the validator and the GitHub gotchas. Proved it against the 2 real skills (pass) and 4
  deliberately broken skills (all caught). Committed `5b15200`, pushed via force-with-lease.
