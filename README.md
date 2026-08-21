<div align="center">
  <h1>@istmx/skills</h1>
  <p><b>The Elite Agentic Orchestration & Enterprise SDLC Engine</b></p>
  <p><i>Transform Claude Code, Cursor, Windsurf, and Gemini into senior-level architects, design engineers, and autonomous QA testers.</i></p>
  <br/>
  <a href="https://istmx.dpdns.org">Website</a> • <a href="https://istmx.dpdns.org/docs">Documentation</a> • <a href="https://github.com/istmX/skills">GitHub</a> • <a href="https://www.npmjs.com/package/@istmx/skills">npm</a>
</div>

<br/>

Most AI coding assistants fail at scale. They generate lazy 2-section "AI slop", lose context in large codebases, leave broken `// TODO` placeholders, hallucinate invalid architectures, and destroy existing design systems.

`@istmx/skills` is a deterministic, stack-agnostic **Agentic Operating System** designed to supercharge CLI-based agents like **Claude Code** and modern IDEs (Cursor, Windsurf, Gemini). It enforces strict architectural boundaries, provides 70+ production-grade design presets, runs automated headless browser QA testing, and applies senior-developer efficiency ladders before touching a line of code.

---

## ⚡ Quick Start

Initialize or upgrade `@istmx/skills` in your project root:

```bash
npx @istmx/skills init
```

The CLI automatically detects your environment—optimizing for **Claude Code**, **Cursor**, **Windsurf**, **Gemini**, **Cline**, and **Roo Code**—and injects the universal router, core orchestrators, and enterprise workflow suite directly into your harness rulebook.

---

## 🧠 Master Router & Core Orchestrators (Day-Zero)

These master brains structure your entire application. They are **100% Stack Agnostic**—adapting seamlessly across Web (React, Next.js, Vue, Nuxt, SvelteKit), Mobile (iOS SwiftUI, Android Jetpack Compose, React Native, Expo, Flutter), and Backend (Node, Bun, FastAPI, Go, Rust).

### 👑 The Apex Router
* **`/istm <prompt>`** — *Universal NLP Router & Master Orchestrator*
  * Evaluates your prompt, classifies domain intent, and automatically delegates execution to the optimal skill.
  * **Example**:
    ```bash
    > /istm build me a real-time crypto exchange with live charts and dark mode
    ```

### 🏛️ The 4 Pillars of Architecture
* **`/istm-architecture`** — *2-Track Full-Stack Architecture Engine*
  * **Track 1 (Greenfield)**: Executes the Discovery Gate, interviews you to resolve unknown requirements, applies Smart Defaults, and scaffolds the 4 Pillars of Truth (`agents.md`, `architecture.md`, `design.md`, `project-overview.md`).
  * **Track 2 (Brownfield / Existing Codebase)**: Zero-interrogation mode. Automatically scans `package.json`, runtime frameworks, live ORM schemas, and router trees to faithfully reverse-engineer the architecture with zero destructive overwrites.
  * **Examples**:
    ```bash
    # Greenfield project from prompt
    > /istm-architecture design an enterprise B2B SaaS platform with team permissions

    # Reverse-engineer an existing codebase
    > /istm-architecture --codebase
    ```

* **`/istm-design`** — *70+ Production Brand Presets, Archetypes & Image-to-Code*
  * Reverse-engineers design systems from URLs or screenshots into precise tokens, and loads battle-tested brand blueprints (`linear`, `stripe`, `apple`, `vercel`, `supabase`, `porsche`, `claude`, etc.).
  * **Examples**:
    ```bash
    # Apply Linear's exact near-black palette & typography
    > /istm-design --preset=linear

    # Build a landing page with Stripe's banking-grade tokens
    > /istm-design build a billing settings page using preset stripe
    ```

* **`/istm-awwward-designer`** — *Awwwards-Winning Visual Universes*
  * Constructs cinematic frontend experiences powered by the Paint Pipeline. Integrates WebGL, Canvas, custom shaders, and Awwwards-level interactive layouts.
  * **Example**:
    ```bash
    > /istm-awwward-designer build a 3D interactive hardware showcase with smooth scrolling
    ```

* **`/istm-animate`** — *Design Engineering & Spring Physics Engine*
  * Identifies motion opportunities and injects physics-based micro-interactions, spring curves (`stiffness: 100, damping: 20`), and hardware-accelerated transforms.
  * **Example**:
    ```bash
    > /istm-animate add tactile magnetic hover physics and entry staggers to hero components
    ```

* **`/istm-system-design`** — *Backend Architect, Database Schemas & APIs*
  * Generates production-ready database schemas (Prisma, Drizzle, SQL), strict Zod validation pipelines, and type-safe server actions.
  * **Example**:
    ```bash
    > /istm-system-design create a multi-tenant PostgreSQL schema with role-based access control
    ```

---

## 🛠️ Enterprise Workflow Suite (Day-to-Day)

Stop chatting blindly with your AI. Use these deterministic commands to execute safe, heavily-guarded daily development:

| Command | Role | Description & Example Prompt |
|---|---|---|
| **`/istm-craft`** | Feature Architect | Enforces **One-Spec-At-A-Time** planning.<br/>`> /istm-craft spec out the Stripe subscription checkout modal` |
| **`/istm-develop`** | Execution Engine | Builds production code with anti-laziness gates and Git guardrails.<br/>`> /istm-develop implement the checkout modal from spec 0001` |
| **`/istm-debug`** | Root-Cause Investigator | Employs the **7-Rung Efficiency Ladder** & Grep-All-Callers tracing.<br/>`> /istm-debug session token drops during WebSocket reconnection` |
| **`/istm-qa`** | Automated Browser QA | Automated headless browser testing (Playwright) across responsive viewports.<br/>`> /istm-qa test the pricing table on mobile 375px and desktop 1440px` |
| **`/istm-cso`** | Security Officer | Deep scans API routes and dependencies for auth leaks and injection risks.<br/>`> /istm-cso scan authentication middleware and database queries` |
| **`/istm-gain`** | Performance Optimizer | Profiles bundle sizes, renders, and Largest Contentful Paint (LCP).<br/>`> /istm-gain optimize client bundle and lazy-load heavy chart dependencies` |
| **`/istm-debt`** | Debt Harvester | Harvests deliberate shortcuts into structured `ISTM-DEBT.md` ledgers.<br/>`> /istm-debt generate a debt ledger for all deferred optimizations` |
| **`/istm-review`** | Code Reviewer | Rigorous pre-merge code review and diff inspection.<br/>`> /istm-review audit the auth pull request for edge cases and regressions` |
| **`/istm-ship`** | Release Engine | Verifies tests, runs QA, and drafts production PRs and changelogs.<br/>`> /istm-ship run test suites, verify browser QA, and draft a release PR` |
| **`/istm-autoplan`** | Sprint Planner | Multi-stage autonomous sprint planning and work queue breakdown.<br/>`> /istm-autoplan break down Q3 roadmap milestones into actionable tasks` |
| **`/istm-test`** | Test Generator | Generates comprehensive unit, integration, and E2E test suites.<br/>`> /istm-test write Vitest integration tests for the checkout webhook` |

---

## 🎨 70+ Production Design Presets (`--preset=<name>`)

Never start a design system from scratch or let AI guess your styles. `@istmx/skills` includes **70+ reverse-engineered, production-grade Design System blueprints** extracted from the world's most iconic digital products.

### ⚙️ How It Works Under the Hood:
1. **Curated Blueprint Library**: Every preset in `istm-design/presets/<name>/DESIGN.md` contains the exact color tokens (canvas, surfaces, ink, borders), typography hierarchy (font stacks, sizes, negative letter-spacing), motion physics (spring curves, damping, duration), and component radius rules.
2. **Instant Token Compilation**: When you pass `--preset=<name>` (or name a brand in your prompt), the AI instantly loads those tokens and locks them into your project's `.istm-context/design.md`.
3. **Deterministic UI Code**: Every component generated by `/istm-design` or `/istm-develop` strictly uses these tokens with clean Tailwind v4 semantic classes (`bg-background`, `text-foreground`, `border-border`), ensuring a 100% faithful aesthetic with zero AI slop.

### 🌟 Popular Presets Matrix:

| Domain | Popular Presets (`--preset=<name>`) | Signature Aesthetic |
|---|---|---|
| **Developer Tools** | `linear`, `vercel`, `supabase`, `raycast`, `posthog`, `warp` | Near-black canvases, lavender/emerald accents, negative-tracking type, dense UIs |
| **Fintech & Banking** | `stripe`, `wise`, `coinbase`, `binance`, `revolut` | Slate blue foundations, high-contrast typography, precision 4px radius inputs |
| **AI & RAG Platforms** | `claude`, `cursor`, `cohere`, `mistral`, `ollama`, `xai` | Warm paper / deep dark surfaces, terminal monospace, thinking-model layouts |
| **Productivity & Canvas**| `figma`, `notion`, `framer`, `miro`, `airtable`, `cal` | Clean white/charcoal canvases, flexible grid systems, fluid micro-interactions |
| **Luxury & Automotive** | `porsche`, `ferrari`, `bugatti`, `lamborghini`, `bmw-m` | Ultra-deep black surfaces, high-contrast metallic accents, cinematic typography |
| **Consumer & Lifestyle** | `apple`, `airbnb`, `spotify`, `shopify`, `nike`, `uber` | Refined spatial padding, SF Pro / circular fonts, hardware-accelerated transitions |

### 💡 Example Usages:

```bash
# 1. Direct Flag Usage: Instantly load Linear's exact tokens into .istm-context/design.md
> /istm-design --preset=linear

# 2. Direct Flag Usage: Scaffold a Stripe-style checkout with banking-grade tokens
> /istm-design --preset=stripe

# 3. Conversational Prompt: Build a page directly with a preset aesthetic
> /istm-design build a modern developer dashboard using preset supabase

# 4. Conversational Prompt: Create a luxury landing page using preset porsche
> /istm-design create a sleek product showcase using preset porsche
```

*(You can also browse the full catalog anytime in [`istm-design/presets/catalog.md`](istm-design/presets/catalog.md)).*

---

## 🛡️ The 7 Root Anti-Slop Architectural Laws

Every skill in `@istmx/skills` mathematically enforces these 7 core standards:

1. **Landing Page Narrative Arc Law**: Lazy 2-section outputs (Hero + Footer only) are strictly banned. Every full-page experience must construct a complete 5–8 section journey (*Hero → Social Proof → Bento Feature Showcase → Live Interactive Universe → Deep Dive → Testimonials → Pricing → FAQ → God-Tier Footer*).
2. **Mandatory Pre-Flight Token Ingestion Gate**: Motion and UI engines MUST read `.istm-context/design.md` tokens before generating code.
3. **Modern Tailwind v4 Semantic Standard**: Strictly forbids ugly inline arbitrary variables like `bg-[var(--background)]`. Mandates clean first-class semantic tokens (`bg-background`, `text-foreground`, `border-border`, `bg-muted`, `bg-card`).
4. **Primitive Reuse Priority (Shadcn UI)**: Reusable atoms (Buttons, Inputs, Dialogs, Tooltips, Sheets) MUST be reused from `@/components/ui/` instead of raw unaccessible `<div>` and `<button>` hacks.
5. **Stack-Idiomatic Structure & Live Research Gate**: Respects native framework conventions without artificial nesting. Live web/doc lookups are executed for bleeding-edge frameworks.
6. **Compiler-Grade TypeScript**: Zero `any` tolerance. Strict domain interfaces, discriminated unions, and Zod inference required on all inputs.
7. **Clean Code & Anti-Laziness Law**: Code must be self-documenting (no noise comments) and full-fidelity (zero placeholder `// TODO` comments or truncated outputs).

---

## 📁 The `.istm-context` 4 Pillars of Truth

When an orchestrator runs, it centralizes all knowledge into `.istm-context/`:

```
.istm-context/
├── agents.md             # Operational brain, memory rules, and coding standards
├── architecture.md       # Database schemas, API routes, and backend architecture
├── design.md             # UI tokens, color palette, typography scale, motion specs
├── project-overview.md   # Business logic, product requirements, and user journeys
├── specs/                # Atomic, feature-specific implementation specifications
└── docs/                 # Cached documentation from live web lookups
```

Before generating a line of code, every agent reads this directory, guaranteeing 100% architectural alignment and zero hallucinations.

---

## 🤝 Contributing & Community

We are building the definitive open-source AI orchestration engine to end the era of generic AI code scaffolding.

- ⭐️ **Star the repo** to support the project.
- 🐛 **Report Issues** or suggest new framework adapters.
- 💻 **Submit Pull Requests** to expand our design presets or workflow tools.

Please review our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

**Author:** Aryan  
**License:** [MIT License](LICENSE)

---
<!-- SEO Metadata (DO NOT REMOVE) -->
<!-- 
Keywords: Claude Code skills, Claude Code agents, Claude Code vs Cursor, AI coding agent framework, open source agentic skills, enterprise SDLC AI, automated browser QA, playwright AI testing, linear design system, stripe design tokens, tailwind v4 semantic tokens, shadcn ui agent, cursor rules, .cursorrules alternative, AGENTS.md standard, full stack AI architecture, Next.js 15 AI agent, headless browser testing agent, security audit AI agent, agentic workflow tools
-->
