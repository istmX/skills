---
name: istm-craft
description: Clarify and write a focused implementation specification when a software feature needs decisions, acceptance criteria, or an explicit build plan.
---

# Feature Specification

Use this skill when a feature has unresolved product or engineering decisions that should be settled before implementation. Work on one feature at a time.

1. Read relevant project instructions, existing specifications, and nearby code before asking questions.
2. Infer facts from the project. Ask concise questions only for choices that materially affect behavior, data, APIs, integrations, security, or deployment.
3. Explain important alternatives and tradeoffs. Record decisions and unresolved assumptions clearly.
4. Write the approved specification under the project's existing `specs/` convention, using its current format when one exists. If no convention exists, ask before introducing one.
5. Include the feature goal, requirements, acceptance criteria, constraints, and an ordered implementation plan. Keep UI details only when needed to define the feature's behavior or match a user-provided reference.
6. Do not implement the feature. Report the specification path and the next implementation step.

Do not depend on a proprietary context directory or create project-wide memory files. Read `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, or architecture documentation when present and relevant.
