# Scope Plan Route: greenfield

Greenfield: decompose the whole MVP from scratch, foundations first. Apply the foundations first sequencing below at Step 4 of `plan.md`, after the build approach is chosen in Step 3.

## Foundations first sequencing (a principle every build approach obeys)

No approach starts a feature slice before the ground it stands on exists (working skeleton before features). Lead with these explicit foundation features (never buried sub tasks), default order below (cheaper foundation precedes what depends on it).

1. **Stack and architecture**: ONE foundation feature, built like any other (a decision box, `Decide the stack (spec)`, then an execution box, `Scaffold from the decision: /istm-develop …`), never two rows. `/istm-architecture` decides the stack; `/istm-develop` scaffolds from it (framework init, dependency install, directory layout, runnable dev server/build). `Needs spec: yes`, tier `Medium`+. The spec records the decision; `/istm-develop` derives scaffold steps at build time. Scaffold only the runnable skeleton and tooling the first slice needs; each later feature installs its own dependencies when built.
2. **Coding standards & tooling**: install the project's chosen lint, format, type checking, and CI tools as part of the development work. Follow existing repository instructions and conventions. `Needs spec: no` unless a material tool or architecture decision remains.
4. **Data model**: explicit, never skipped (`Needs spec: yes`): core entities, relationships, persistence shape. Never fold into another feature or skip; a wrong data model is the most expensive thing to redo.
5. **Walking skeleton slice**: a thin vertical slice wired end to end (DB → API → UI) doing one real thing (e.g. one record created and rendered), proving the stack is connected before feature work. Tier `Medium`; usually leans on the foundation specs, not its own. Under Tracer Bullet it merges with the first real slice (below).

Then the feature slices, ordered and phased per Step 3. Phasing column: `Foundation`, `Skeleton`, the slice/journey (e.g. `Slice 2`), or `Deferred`; Order column: integer build sequence across the whole scope.

Shape the slices exactly as the chosen approach's persona directs (`approaches/<name>.md`, already read in Step 3 of `plan.md`, whose role you have adopted). The approach changes WHAT the slices are, not just labels: every capability as its own fully built feature with `Slice 1 … Slice N` stapled on has NOT honored the approach. Follow the persona's decomposition rule, its first slice or deliverable, its real vs deferred split, and its sequencing, and let its worked example calibrate the shape. The four approaches must yield genuinely different scopes for the same product.

Whatever the approach, most rows do NOT each need their own spec: the early slice rests on the foundational specs (data model, auth), and later slices usually extend a decided pattern. Still apply the invent test per row, but expect far fewer `Needs spec: yes` rows than a flat feature list; nearly every row needing one means you decomposed into full features, slice again.
