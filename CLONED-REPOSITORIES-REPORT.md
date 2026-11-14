# Cloned Reference Repositories Report

This report covers the two repositories cloned into the ignored `.research-upstream/` directory. It reviews their structure and usefulness as references for future ISTMX skills. No upstream content has been copied into ISTMX.

## 1. System Design Primer

**Repository:** [donnemartin/system-design-primer](https://github.com/donnemartin/system-design-primer)  
**Local clone:** `.research-upstream/system-design-primer`  
**Pinned clone commit:** `ae9bbd7`  
**License:** CC BY 4.0

### What it contains

This is a broad system-design learning resource, centered on scalability concepts, tradeoffs, diagrams, study guidance, and worked interview questions. Its README organizes topics from performance and availability through databases, caching, queues, and distributed systems.

### How to clone it

```sh
git clone --depth 1 https://github.com/donnemartin/system-design-primer.git
```

The clone is the way to use the material locally. The repository does not provide an agent `SKILL.md` or a skill-install command. Treat it as source material for study and future authoring, not as an installable skill or a production architecture recipe.

### What could inform an ISTMX skill

- Organize system-design topics into a navigable reference library.
- Explain architectural options through tradeoffs and failure cases.
- Use worked examples and diagrams to make abstract distributed-system concepts concrete.
- Keep reference material separate from a short task-facing skill entry point.

### Limits to keep in mind

- It is strongly oriented toward learning and system-design interviews. Its example solutions should not automatically become production defaults.
- It is much broader than the current ISTMX backend system-design skill; extracting topics without a clear trigger could make the skill expensive to load.
- Adapted material must follow CC BY 4.0 attribution requirements. Keep the upstream license and attribution with any reused content.

## 2. Paul Graham skill example

**Repository:** [lonexreb/claude-skill-paul-graham](https://github.com/lonexreb/claude-skill-paul-graham)  
**Local clone:** `.research-upstream/claude-skill-paul-graham`  
**Pinned clone commit:** `b4d095c`  
**License:** MIT for the repository's code and structure. Paul Graham's essays remain copyrighted by their author.

This is an unofficial community project, not Paul Graham's own repository.

### What it contains

The skill is located at `skills/paul-graham/`. A central `SKILL.md` describes when the agent should use it and maps user intent to small topical files under `references/`. The topics include startup ideas, founders, growth, fundraising, product, high agency, and mental models. An index and source list support discovery and attribution.

### Install the cloned skill for Claude Code

The upstream README documents user-level and project-level installation. Since the repository is already cloned in this workspace, copy its skill folder directly.

User-level install, available across projects:

```sh
mkdir -p ~/.claude/skills
cp -r .research-upstream/claude-skill-paul-graham/skills/paul-graham ~/.claude/skills/
```

Project-level install, available only in the current project:

```sh
mkdir -p .claude/skills
cp -r .research-upstream/claude-skill-paul-graham/skills/paul-graham .claude/skills/
```

The upstream README also documents cloning the repository first, then copying from `skills/paul-graham/`. These examples target Claude Code. Confirm each other agent's skill directory and discovery rules before installing there.

### What could inform ISTMX skill structure

- Keep the main `SKILL.md` focused on activation, task routing, and response expectations.
- Load only the topic reference relevant to the current request.
- Use a small topic index instead of putting every reference into the main instruction file.
- Make triggers and exclusions explicit so proactive activation stays scoped.

### Limits to keep in mind

- Its startup-advice subject is outside ISTMX's current engineering focus; its structure is more relevant than its content.
- The skill describes proactive activation specifically for Claude Code. Trigger behavior should not be assumed identical across agents.
- Essays are copyrighted. The repository's MIT license does not grant rights to republish Paul Graham's essays. Keep any quotes within the project's stated excerpt limits, link to canonical essays, and preserve its attribution notices.

## Review summary

| Reference | Best use in our next design discussion | Avoid |
|---|---|---|
| System Design Primer | Topic coverage, tradeoff explanations, diagrams, and examples for backend system-design references. | Installing it as a skill or adopting interview answers as production architecture defaults. |
| Paul Graham skill | Entry-point size, intent-to-reference mapping, topic file organization, and trigger/exclusion wording. | Treating it as Paul Graham-authored or importing its startup content into engineering skills. |

The most transferable pattern is a concise skill entry point that chooses and reads a focused reference only when the task calls for it. The next step can be to compare that pattern against ISTMX skill overlaps and decide which engineering domains should share a skill folder. No new ISTMX skills have been created in this pass.
