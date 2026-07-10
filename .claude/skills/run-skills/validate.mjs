#!/usr/bin/env node
// validate.mjs — lint every skill in this repo's skills/ folder.
//
// This repo is a *library of skill definitions*, not a launchable app, so the
// "driver" is a validator: it exercises the real artifacts (the SKILL.md files)
// and reports whether each one is well-formed enough to load as a Claude skill.
//
// Usage:
//   node .claude/skills/run-skills/validate.mjs              # validate ./skills
//   node .claude/skills/run-skills/validate.mjs <dir>        # validate <dir>/*/SKILL.md
//
// Exit code 0 = all valid, 1 = at least one skill has an error.
// Pure Node built-ins — no npm install, no dependencies.

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname, basename, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the skills root: arg, or repo-root/skills relative to this file.
const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..", "..", ".."); // .claude/skills/run-skills -> repo root
const skillsRoot = resolve(process.argv[2] ?? join(repoRoot, "skills"));

const RESET = "\x1b[0m", RED = "\x1b[31m", YEL = "\x1b[33m", GRN = "\x1b[32m", DIM = "\x1b[2m";

/**
 * Parse just enough of the YAML frontmatter to validate it. We only need the
 * top-level scalar keys (name, version) and whether description exists — so a
 * full YAML parser (and its dependency) is overkill. Handles `key: value` and
 * folded/block scalars (`key: >` or `key: |`) spanning multiple indented lines.
 */
function parseFrontmatter(text) {
  if (!text.startsWith("---")) return { ok: false, keys: {}, raw: "" };
  const end = text.indexOf("\n---", 3);
  if (end === -1) return { ok: false, keys: {}, raw: "" };
  const raw = text.slice(text.indexOf("\n") + 1, end);
  const keys = {};
  const lines = raw.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const m = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line); // top-level key (no indent)
    if (!m) continue;
    let [, key, val] = m;
    if (val === ">" || val === "|" || val === ">-" || val === "|-") {
      // Folded/block scalar: gather following indented lines.
      const buf = [];
      while (i + 1 < lines.length && (lines[i + 1] === "" || /^\s+/.test(lines[i + 1]))) {
        buf.push(lines[++i].trim());
      }
      val = buf.join(" ").trim();
    }
    keys[key] = val;
  }
  return { ok: true, keys, raw };
}

function findSkillDirs(root) {
  if (!existsSync(root)) return [];
  return readdirSync(root)
    .map((name) => join(root, name))
    .filter((p) => {
      try { return statSync(p).isDirectory() && existsSync(join(p, "SKILL.md")); }
      catch { return false; }
    });
}

function validateSkill(dir) {
  const errors = [];
  const warnings = [];
  const dirName = basename(dir);
  const skillPath = join(dir, "SKILL.md");
  const text = readFileSync(skillPath, "utf8");

  const { ok, keys } = parseFrontmatter(text);
  if (!ok) {
    errors.push("no valid YAML frontmatter (must open and close with `---`)");
    return { dirName, errors, warnings, keys };
  }

  // name — required, must match directory
  if (!keys.name) {
    errors.push("frontmatter missing `name:`");
  } else if (keys.name !== dirName) {
    errors.push(`frontmatter name "${keys.name}" != directory "${dirName}"`);
  }

  // description — required (this is what Claude scans to auto-load the skill)
  if (!keys.description) {
    errors.push("frontmatter missing `description:` (skill won't auto-load without it)");
  } else if (keys.description.length < 40) {
    warnings.push(`description is short (${keys.description.length} chars) — weak auto-load matching`);
  }

  // version — recommended
  if (!keys.version) {
    warnings.push("no `version:` in frontmatter (recommended)");
  }

  // body must have an H1
  const body = text.slice(text.indexOf("\n---", 3) + 4);
  if (!/^#\s+\S/m.test(body)) {
    warnings.push("body has no H1 (`# Title`) heading");
  }

  // referenced references/ files must exist on disk
  const refMatches = [...text.matchAll(/\breferences\/[A-Za-z0-9._\/-]+/g)];
  const seen = new Set();
  for (const [ref] of refMatches) {
    if (seen.has(ref)) continue;
    seen.add(ref);
    if (!existsSync(join(dir, ref))) {
      errors.push(`references missing file: ${ref}`);
    }
  }

  return { dirName, errors, warnings, keys };
}

// ---- run ----
console.log(`${DIM}validating skills in ${skillsRoot}${RESET}\n`);
const dirs = findSkillDirs(skillsRoot);
if (dirs.length === 0) {
  console.log(`${RED}✗ no skills found (looked for */SKILL.md under ${skillsRoot})${RESET}`);
  process.exit(1);
}

let hadError = false;
for (const dir of dirs) {
  const { dirName, errors, warnings, keys } = validateSkill(dir);
  const badge = errors.length ? `${RED}✗ FAIL${RESET}` : `${GRN}✓ ok${RESET}`;
  const ver = keys.version ? `${DIM}v${keys.version}${RESET}` : "";
  console.log(`${badge}  ${dirName} ${ver}`);
  for (const e of errors) console.log(`      ${RED}error:${RESET} ${e}`);
  for (const w of warnings) console.log(`      ${YEL}warn:${RESET}  ${w}`);
  if (errors.length) hadError = true;
}

console.log(`\n${DIM}${dirs.length} skill(s) checked${RESET}`);
process.exit(hadError ? 1 : 0);
