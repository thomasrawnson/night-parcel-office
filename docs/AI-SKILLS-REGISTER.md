# AI Skills and MCP Register

This register tracks meaningful AI-assistance usage for Night Parcel Office and identifies candidates that may later be shared with Personal Effects, Anomaly Lab, or other Pluto Night Labs games. It records evidence, not assumed benefits. No shared skills repository exists yet.

## A. Skills

### game-design-review

- **File:** `.agents/skills/game-design-review/SKILL.md`
- **Purpose:** Challenge gameplay ideas before implementation and recommend the smallest player-centred option.
- **Projects using it:** Night Parcel Office.
- **Development tasks invoked:** NPO-AUDIT-01 gameplay and UX audit.
- **Observed benefits:** Kept recommendations within Milestone A and separated confirmed interaction defects from subjective design risks.
- **Problems or limitations:** Requires real playtest evidence for claims about enjoyment or retention.
- **Token efficiency:** Not measured.
- **Reusability:** Under Evaluation.
- **Shared skill candidate:** Under Evaluation.

### gameplay-validation

- **File:** `.agents/skills/gameplay-validation/SKILL.md`
- **Purpose:** Validate deterministic gameplay logic, feedback, progression, regression safety, and browser/mobile behaviour.
- **Projects using it:** Night Parcel Office.
- **Development tasks invoked:** NPO-AUDIT-01 gameplay and UX audit.
- **Observed benefits:** Structured routing, feedback, regression, desktop, and mobile evidence without treating automation as human playtesting.
- **Problems or limitations:** Automated checks cannot replace human playtesting or physical-device review.
- **Token efficiency:** Not measured.
- **Reusability:** Under Evaluation.
- **Shared skill candidate:** Under Evaluation.

## B. MCP tools

Availability was verified from the Codex session on 2026-10-08 with minimal read-only probes. No MCP configuration was changed.

### Playwright

- **Purpose:** Browser interaction, onboarding and regulation checks, routing actions, screenshots, console errors, accessibility basics, and desktop/mobile viewports.
- **Availability:** Available; the Playwright MCP responded to a browser-tab query.
- **Development tasks used:** Availability verification for NPO-SETUP-01; desktop/mobile gameplay audit for NPO-AUDIT-01.
- **Observed benefits:** Exercised the full routing loop and exposed that mobile shift completion retains the previous scroll position, hiding the top of the results report.
- **Limitations:** Browser automation is not human playtesting, a physical-device check, or evidence of game feel or audio quality.
- **Reuse for future games:** Yes, when browser behaviour or layout needs validation.

### Context7

- **Purpose:** Retrieve current external library, framework, SDK, API, CLI, or cloud-service documentation.
- **Availability:** Available; the Context7 MCP resolved a public Node.js documentation source.
- **Development tasks used:** Availability verification for NPO-SETUP-01 only.
- **Observed benefits:** Confirmed current documentation lookup is accessible.
- **Limitations:** Unnecessary for simple local JavaScript/CSS changes; queries use context and may access an external service.
- **Reuse for future games:** Yes, only when current external documentation is needed.

### GitHub

- **Purpose:** Remote repository inspection and issue or pull-request operations.
- **Availability:** Available; the GitHub connector completed a read-only repository request.
- **Development tasks used:** Availability verification for NPO-SETUP-01 only.
- **Observed benefits:** Confirmed remote operations are accessible when required.
- **Limitations:** Routine work should use local Git; mutations still require task scope and approval.
- **Reuse for future games:** Yes, when remote repository work is needed.

## Recording future use

After a substantive development task, update only the entries for skills or MCP tools actually used. Record the task, evidence-backed benefit or limitation, measurable token impact if available, and any change to reuse status. Do not invent improvements, and skip register churn for trivial use.

## Usage log

- **NPO-AUDIT-01 (2026-10-08):** Task requested Codex 5.6 Sol with medium reasoning; runtime model confirmation was not exposed. Used `game-design-review`, `gameplay-validation`, and Playwright. Context7 and GitHub were not used. Time and token usage were not measurable.
- **NPO-A-01 (2026-10-08):** Task requested Codex 5.6 Sol with low reasoning; runtime model confirmation was not exposed. Used `gameplay-validation` and Playwright to verify one-scroll results positioning, accessible focus, reduced-motion behaviour, full-report scrolling, and restart at mobile and desktop sizes. Time and token usage were not measurable.
- **NPO-A-02 (2026-10-08):** Used `game-design-review` to constrain a three-shift proposal to nine parcels and existing Milestone A mechanics, and `gameplay-validation` to preserve first-match routing, late-rule activation, and 729-sequence coverage. No MCP was used; time and token usage were not measurable.
- **NPO-A-03 (2026-10-08):** Used `gameplay-validation` and Playwright to preserve the original 729 decision sequences while verifying nine planned outcomes, rule-card alignment, shift resets/transitions, results focus, replay, and all three shifts at desktop and mobile sizes. Runtime model/reasoning and time/token usage were not exposed.
- **NPO-A-04 (2026-10-08):** Used `game-design-review`, `gameplay-validation`, and Playwright to keep shift briefings concise and non-spoilery, prevent repeated onboarding, and verify results, modal focus, replay, and responsive layout across all three shifts. Low reasoning was requested; runtime model and time/token usage were not exposed.
