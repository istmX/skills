---
name: istm-architecture
description: Analyze a software project, identify its stack and constraints, and plan a maintainable architecture.
---

# Software Architecture

Use this skill to plan a new software system or understand an existing codebase. Do not implement application features unless asked.

## Existing projects

1. Inspect the repository instructions and relevant project files. Read `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md` when present and relevant.
2. Detect languages, frameworks, package managers, database and ORM, deployment setup, and existing architectural patterns from source and configuration files.
3. Treat the repository's working conventions as constraints. Do not propose a replacement stack or structure without a clear reason.
4. Summarize the current architecture, important boundaries, risks, and unanswered questions. Separate observed facts from recommendations.

## New projects

1. Clarify only decisions that materially change the architecture, such as product constraints, scale, data sensitivity, integrations, and deployment environment.
2. Recommend the simplest stack and architecture that meet the stated needs. Prefer established patterns and avoid premature microservices, queues, caches, and abstraction layers.
3. Describe the main components, their responsibilities, data flow, persistence, external dependencies, and deployment shape.
4. Record the plan in `architecture.md` only when the user requests a written artifact or the project convention calls for one. Do not create a proprietary context directory or overwrite existing project instructions.

## Principles

- Follow the conventions of the chosen framework and repository.
- Keep boundaries clear and dependencies directional.
- Consider reliability, security, operability, and testing alongside feature requirements.
- Explain tradeoffs and distinguish required decisions from optional future choices.
- Use current official documentation when framework behavior or version-specific guidance may have changed.
