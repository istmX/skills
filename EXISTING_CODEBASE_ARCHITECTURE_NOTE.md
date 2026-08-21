# 📌 Architectural Note: Greenfield vs. Brownfield Context Differentiation

## The Core Problem
When `/istm-architecture` is executed on an **existing codebase (Brownfield)**, it often behaves as if it is bootstrapping a **brand new project (Greenfield)**. 
- It attempts to interview the user about tech stacks that are already chosen.
- It risks overwriting or contradicting existing architectural patterns, folder conventions, and live database models.
- It generates generic starter templates instead of accurately reverse-engineering the true current state of the application.

---

## The Solution: Two Distinct Operating Tracks

We need an explicit, hard architectural bifurcation between **New Project Context** and **Existing Codebase Context**:

```
                              /istm-architecture
                                      │
                         ┌────────────┴────────────┐
                         ▼                         ▼
               TRACK 1: GREENFIELD       TRACK 2: BROWNFIELD
             (Brand New Project)       (Existing Codebase)
                         │                         │
            • Execute Discovery Gate  • Bypass Interview entirely
            • Interview user for      • Deep scan package.json,
              archetype & features      routers, ORM schemas,
            • Apply Smart Defaults      and UI primitives
            • Scaffold 4 Pillars      • Reverse-engineer 4 Pillars
              from fresh templates      accurately reflecting reality
            • Setup initial styles    • Zero destructive changes
              & directory hierarchy   • Preserve existing patterns
```

---

## Key Requirements for Track 2 (Existing Codebase Context)

1. **Automatic Codebase Ingestion (Token-Efficient)**:
   - Scan structural files first (`package.json`, `tsconfig.json`, `pnpm-lock.yaml`, `prisma/schema.prisma`, `drizzle.config.ts`, `app/layout.tsx`, `tailwind.config.*`).
   - Identify existing UI libraries (e.g. Shadcn, Chakra, Mantine, Tailwind v3/v4).
   - Identify authentication provider (e.g. NextAuth/Auth.js, Supabase, Clerk, Firebase).
   - Identify existing database & ORM (e.g. PostgreSQL + Prisma, MySQL + Drizzle, MongoDB + Mongoose).

2. **Accurate Blueprint Reverse-Engineering**:
   - `architecture.md`: Reflect the **actual** live schema tables, existing API routes, and active server architecture.
   - `design.md`: Extract the **actual** typography classes, color variables in `globals.css`, and existing component directories.
   - `project-overview.md`: Summarize the project's purpose from existing READMEs, packages, and route names.
   - `agents.md`: Lock in the project's **existing** conventions (e.g., if it uses `src/components/`, enforce that instead of forcing root `components/`).

3. **Zero Hallucination & Zero Overwrite**:
   - Never wipe out existing code or force unrequested rewrites.
   - If an existing file has unique patterns, document those patterns as the law for future AI generations.

---

*Status: Queued for implementation in upcoming architecture refinement sprint.*
