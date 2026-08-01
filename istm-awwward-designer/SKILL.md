---
name: istm-awwward-designer
allowed-tools: Bash, Read, Grep, Glob, Write, Edit, Agent, AskUserQuestion
description: "The premium frontend orchestrator for the @istmx/skills framework. Engineered specifically to build Awwwards-winning marketing sites and elite digital experiences. Combines the strict visual tokens of `/istm-design` with the heavy physics and GSAP choreographies of `/istm-animate`."
---

## Output style (plain words, no dashes, no hyphens)

<!-- OUTPUT-STYLE:START -->
Write everything this skill produces, files and messages alike, in plain simple language. Keep technical terms that carry real meaning; explain each in plain words. Never use a dash or a hyphen as punctuation: no em dash, no en dash, and no hyphenated compounds. Write `read only`, not `read-only`. Say it in simple words, or reword the sentence. Code, file paths, command flags, and values other skills match on keep their hyphens. Use short sentences, commas, or parentheses. Clear beats clever.
<!-- OUTPUT-STYLE:END -->

## What this skill does

The elite frontend engine: acts as a composite orchestrator that fuses layout design and complex motion to generate world-class visual experiences.

- Visual Excellence: Enforces extreme typographic scales (massive display fonts, tight tracking) and premium color palettes (glassmorphism, deep dark modes).
- Heavy Motion Integration: Mandates the use of GSAP and advanced ScrollTrigger logic for scroll-jacking, pinned sections, and staggered reveals.
- Three.js / WebGL Support: Supports canvas-based rendering for 3D interactions and particle systems.

Does not build standard CRUD backends or standard SaaS dashboards (/istm-architecture owns that). 

## Blueprint file convention

Durable context lives in the `.istm-context/` directory. This skill specifically owns the hydration and enforcement of:

- `design.md`: The premium UX strategy and UI token dictionary.
- `animate.md`: The complex GSAP timelines and scroll-jacking logic.

## Scope

The `--webgl` flag indicates the necessity of a Three.js canvas setup. With no argument, the `Pre-flight` signals below route to Phase 0 (ambiguous), or Phase 1 (greenfield premium generation).

## Acts vs asks

Phase 1 asks elite design questions (aesthetic direction, typography pairing, motion intensity) via MCQ before generating the blueprints. Phase 2 acts immediately; it scans the repo for GSAP, Three.js, and complex CSS structures, reverse-engineering the premium design system.

## Artifact ownership

The `design.md` and `animate.md` files hold the content. Create them if missing. When writing the rules, inject precise CSS variables and GSAP timeline choreographies. You own the enforcement of this elite standard; any generic UI slop must be violently rejected.

## Execution

The main thread compiles the premium frontend system. It effectively runs the logic of both `/istm-design` and `/istm-animate` but with the safety limiters completely removed.

### `Pre-flight` (main thread does this before anything else)

Gather signals to determine the execution path:

1. Flag check: Was `--webgl` provided? → `WEBGL_FLAG`.
2. Context files: Are `design.md` and `animate.md` already hydrated in `.istm-context/`? → `BLUEPRINTS_EXIST`.
3. Source count: Are `gsap`, `three`, or premium styling setups present? → `HAS_PREMIUM_LIBS`.

Pick the phase based on these signals:

| Condition | Phase |
|---|---|
| `HAS_PREMIUM_LIBS` is present | Phase 2 (Reverse-engineer the existing premium architecture). |
| `BLUEPRINTS_EXIST` | Phase 3 (Gap-fill: analyze the prompt against existing blueprints and update only what changed). |
| No flag, no blueprints (or raw prompt) | Phase 1 (Greenfield: execute Elite Interview and generate premium tokens). |
| No flag, no blueprints, but `HAS_PREMIUM_LIBS` | Phase 0 (Ambiguous: ask if they want to override existing setups or document them). |

### Route to the selected phase

- Phase 1 (Greenfield Setup): Evaluate the desired premium vibe (cyberpunk, brutalist chic, elegant editorial). Interview the user on motion intensity. Generate `design.md` with display typography and `animate.md` with heavy GSAP rules.
- Phase 2 (Reverse Engineering): Do not interview. Read `package.json` and complex component files. Reverse-engineer the active WebGL/GSAP logic and style tokens. Hydrate blueprints.
- Phase 3 (Gap Fill): Read existing blueprints. Identify missing choreographies or tokens. Update carefully.

### Phase 0: Classify (only when `pre-flight` is ambiguous)

Don't guess. Ask once via your agent's interactive option picker (`AskUserQuestion`), or plain text. 
- question: "I see existing GSAP/WebGL libraries, but no premium blueprints. How should I proceed?"
- header: "Premium state"
- options: 1. `Reverse-Engineer from Code`, "I will read your components and generate the blueprints." → Phase 2. 2. `Start Fresh from Prompt`, "I will interview you and overwrite the system." → Phase 1.

### After all phases

If no tokens were written when they should have been, report the failure. Relay the report: what premium aesthetic was chosen, the display typography locked in, and the primary GSAP strategy.

## Absolute Awwwards Enforcement Rules

1. **Anti-Template Directive**: Never use standard UI component libraries (no raw Material UI, no raw Bootstrap) without heavy, custom restyling. The output must look bespoke.
2. **Display Typography**: Standard sans-serifs are not enough. You MUST define a high-impact Display Font for hero sections and massive H1s.
3. **Mandatory Smooth Scrolling**: Enforce a smooth scrolling library (e.g., Lenis) alongside GSAP ScrollTrigger to ensure buttery viewport movement.
4. **The "No White Flash" Rule**: Ensure immediate dark mode/light mode hydration. The screen must never flash unstyled white content before the canvas or GSAP paints.
5. **DOM Performance**: Because GSAP and WebGL are heavy, absolutely forbid layout-thrashing CSS properties. Will-change must be applied strategically to animating nodes.
