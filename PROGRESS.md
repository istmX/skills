# @istmx/skills Progress Record

This document tracks the massive architectural work completed to build the ultimate AI coding agent orchestrator.

## Phase 1: The "Impeccable" Context Engine
- **Master Orchestrator (`SKILL.md`)**: Rewrote the entire root architecture skill to act as a self-consuming bootstrap. It evaluates raw prompts, executes a Discovery Gate, and orchestrates the generation of 4 foundational pillars.
- **The 4 Pillars**: Created highly structured templates for `.istm-context/`:
  - `agents.md`: The 250-line rulebook and progress memory loops.
  - `project-overview.md`: Business logic and core features.
  - `architecture.md`: System design and API flows.
  - `design.md`: The UX strategy, motion logic, and UI principles.
- **Aesthetic Enforcement**: Hardcoded strict rules forbidding emojis and forcing the AI to pause for asset uploads, ensuring premium visual output.

## Phase 2: The CLI Installer (`bin/cli.js`)
- **Multi-Tier Harness Detection**: The CLI smartly detects the user's IDE via `process.env.TERM_PROGRAM` or directory scanning (`.cursor`, `.claude`, `.gemini`, `.cline`).
- **Pure Installer Mode**: The CLI was stripped of redundant interactive questions. It now acts as a silent dropper that prepares the environment for the AI to take over.
- **The Self-Destruct Loop**: 
  - The CLI drops the Master Orchestrator at the root (named after the IDE harness).
  - It drops the blank `agents.md` rulebook into `.istm-context/`.
  - The Orchestrator instructs the AI to interview the user, hydrate `agents.md`, and then overwrite the root Orchestrator file with the finished rulebook.

## Phase 3: The 1-2 Punch Workflow (`istm-craft`)
- Separated "Day Zero" architecture (`istm-architecture`) from "Day-to-Day" feature building.
- Renamed the bloated JSM `architect` skill to `istm-craft`.
- Gutted the 29,000-byte JSM file and replaced it with a lean, targeted skill that strictly reads `.istm-context/` blueprints before designing new features in `docs/specs/`.

## Next Steps
- Continue refactoring the remaining `istm-workflow` commands (like `/audit`, `/develop`, `/debug`) to integrate perfectly with the `.istm-context/` system.
