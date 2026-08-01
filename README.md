# @istmx/skills

**Context-as-a-Service (CaaS) for AI Coding Agents.**

Most AI coding assistants (Cursor, Windsurf, Claude Code, Gemini) fail at building large-scale applications because they lose context. They hallucinate tech stacks, write generic "AI slop," and forget your UI tokens.

`@istmx/skills` solves this. It hijacks your AI agent's harness (like `.cursorrules` or `GEMINI.md`) and injects an **Elite Orchestration Engine**. It forces your AI to write strict modular blueprints before it ever touches a line of code.

## 🚀 Installation

Run the CLI inside the root of your project:

```bash
npx @istmx/skills init
```

The CLI will automatically detect your IDE (Cursor, Windsurf, Gemini Antigravity, Roo Code, etc.) and inject the master orchestrator.

## 🧠 The Core Orchestrators

When you run `init`, you can choose a core "God Mode" skill to inject into your IDE:

- **`/istm` (Universal NLP Router)**: The master brain. You can just type `/istm I need a new auth feature` and it will automatically route your AI to the exact right workflow skill to build it.
- **`/istm-architecture` (Full Stack App)**: Forces the AI to interview you, establish the 4 Pillars of Truth (`project-overview.md`, `architecture.md`, `design.md`, `agents.md`), and ensure a perfect full-stack environment.
- **`/istm-awwward-designer` (Premium Frontend Engine)**: Builds Awwwards-winning marketing sites. Explicitly enforces GSAP, Lenis physics, strict typography scaling, and WebGL, forbidding standard generic UI components.
- **`/istm-system-design` (Backend & APIs)**: The backend brain. Generates strict database schemas, API routes, and ORM setups.

## 🛠️ Workflow Tools (Day-to-Day Execution)

Once initialized, your IDE's slash command menu will be populated with specialized workflow skills. Instead of just chatting with your AI, use these commands to execute highly deterministic tasks:

- **`/istm-craft`**: Give it a feature idea. It reads your `.istm-context/` blueprints and writes a strict technical spec.
- **`/istm-develop`**: The execution engine. It reads the specs from `/istm-craft` and actually writes the code.
- **`/istm-debug`**: Did you hit a massive wall? This skill hunts down root causes and maintains an `error-memory.md` log so the AI never makes the same mistake twice.
- **`/istm-audit`**: Checks your codebase for tech debt, unused variables, and architectural drift.

## 📁 How It Works (The `.istm-context` Pattern)

We believe in **Blueprint Centralization**. 
When your AI runs an orchestrator, it will generate a `.istm-context/` folder. This folder becomes the single source of truth for your entire app. 

Every single time you ask your AI to build a new feature, it is forced to read `.istm-context/design.md` (to get the colors and UI tokens) and `.istm-context/architecture.md` (to get the tech stack) before it generates code.

## 🤝 Open Source

We are open-sourcing the basic UI and context skills to end the era of generic AI code. Let's build software that feels human again.

**Author:** Aryan
**License:** MIT
