# @istmx/skills

Engineering focused skills for AI coding agents. The collection covers software architecture, backend system design, feature planning and implementation, debugging, testing, code review, security, and release work.

## Install

Run the installer from the project where you want to use the skills:

```sh
npx @istmx/skills
```

Choose an agent integration and select the skills to install. The installer copies the selected skill folders into the agent's local skills directory. It does not edit existing instruction files or create a project context directory.

## Skills

Top level skills:

- `istm-architecture`: analyze a project and plan its software architecture.
- `istm-system-design`: plan backend systems, databases, schemas, APIs, security, and infrastructure.

Workflow skills live in `istm-workflow/`. Each folder with a `SKILL.md` can be installed independently. Browse the folders for feature scoping, implementation, debugging, testing, security review, code review, documentation, and release workflows.

## Project guidance

Skills use existing project instructions and conventions when relevant, including `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, and architecture documentation.

## Contributing

Please review [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing. See [LICENSE](LICENSE) for licensing terms.
