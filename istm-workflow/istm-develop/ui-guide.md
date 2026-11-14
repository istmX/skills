# Frontend implementation guide

Use this guide for frontend tasks such as components, pages, forms, and client-side behavior. Follow the project's existing framework, component patterns, styling conventions, and repository instructions. Do not introduce a new design system or styling library as part of implementation.

## Inspect before editing

- Read relevant project instructions and the files that implement nearby features.
- Identify the framework, routing approach, component library, styling method, and test commands from the repository.
- Reuse existing components and utilities when they fit. Keep changes within the established structure.
- If the task depends on a provided specification, screenshot, or design file, implement the requested behavior and details without creating additional design artifacts.

## Implement

- Use semantic HTML and native controls where appropriate.
- Support keyboard operation, visible focus, accessible names, and meaningful error messages.
- Preserve responsive behavior and existing theme support.
- Handle loading, empty, success, and error states when the feature has those states.
- Keep state and side effects close to the feature that owns them.
- Avoid unrelated visual or structural changes.

## Verify

- Run the relevant checks available in the repository when requested or required by the task.
- Inspect the changed code for broken imports, missing states, and accessibility issues.
- Report what changed and which checks were run.
