---
name: istm
allowed-tools: Bash, Read, Grep, Glob, Write, Edit, Agent, AskUserQuestion
description: "The God Mode master command for the @istmx/skills ecosystem. This is the root orchestrator that imports, spins up, and routes all other specialized skills (/istm-architecture, /istm-design, /istm-awwward-designer). It acts as the ultimate AI harness controller."
---

## Output style (plain words, no dashes, no hyphens)

<!-- OUTPUT-STYLE:START -->
Write everything this skill produces, files and messages alike, in plain simple language. Keep technical terms that carry real meaning; explain each in plain words. Never use a dash or a hyphen as punctuation: no em dash, no en dash, and no hyphenated compounds. Write `read only`, not `read-only`. Say it in simple words, or reword the sentence. Code, file paths, command flags, and values other skills match on keep their hyphens. Use short sentences, commas, or parentheses. Clear beats clever.
<!-- OUTPUT-STYLE:END -->

## What this skill does

The apex router: listens to the user's ultimate goal and dynamically orchestrates the correct sub-skills to build the environment. 

- Omni-Routing: Understands if the user is trying to build a standard SaaS, a premium Awwwards site, or just a backend API, and routes execution to the correct specialized orchestrator.
- Global Context Aggregation: Ensures that all 4 Pillars (`agents.md`, `architecture.md`, `design.md`, `project-overview.md`) and any specialized files (`animate.md`) are generated in harmony.
- The Self-Destruct Bootstrap: Acts as the initial installer that consumes the user's raw prompt, builds the `.istm-context/`, and then overwrites itself into the AI harness rulebook (e.g., `.cursorrules`).

Does not write the blueprints itself; it delegates to the sub-skills (e.g., delegates UI logic to `/istm-design`).

## Scope

The `/istm` command is the universal entry point. It accepts any raw prompt.

## Acts vs asks

It asks one Master Question to determine the project archetype, then immediately delegates execution to the appropriate sub-skill. 

## Execution

The main thread acts as a dispatcher. 

### `Pre-flight` (main thread does this before anything else)

Gather signals to determine the archetype:

1. Flag check: Was a specific archetype requested? (e.g., `--type=saas`, `--type=premium`).
2. Source count: Analyze `package.json` to detect if the project leans towards a standard build or a premium build.

### Route to the selected phase

- Phase 1 (Standard Web App / SaaS): Delegate entirely to `/istm-architecture`. It will handle the standard 4 Pillars without heavy GSAP.
- Phase 2 (Premium / Marketing / Awwwards): Delegate to `/istm-awwward-designer` and `/istm-system-design`. It will build the 4 Pillars with heavy GSAP and WebGL support.
- Phase 3 (Backend Only): Delegate to `/istm-system-design`. It will bypass UI rules and focus purely on schema and APIs.
- Phase 4 (UI Design Only): Delegate to `/istm-design` and `/istm-animate`. It will bypass database logic and focus purely on the visual tokens.

### Phase 0: Classify (only when `pre-flight` is ambiguous)

Don't guess. Ask once via your agent's interactive option picker (`AskUserQuestion`), or plain text. 
- question: "I am the master @istmx/skills orchestrator. What type of project are we building today?"
- header: "Project Archetype"
- options: 1. `Standard SaaS / Web App`, "Stable, fast, relational DB, standard UI motion." → Delegate to `/istm-architecture`. 2. `Premium Marketing Site`, "GSAP, WebGL, high-end display typography." → Delegate to `/istm-awwward-designer`. 3. `Backend API Only`, "Schemas, routes, no UI." → Delegate to `/istm-system-design`.

### After all phases

**CRITICAL SELF-DESTRUCT RULE**: Once the delegated sub-skills have completed their work and fully hydrated the `.istm-context/` directory, this Master Orchestrator MUST write the finished `agents.md` rulebook directly to the root harness file (e.g., `.cursorrules`, `CLAUDE.md`, `GEMINI.md`), overwriting this very script. 
