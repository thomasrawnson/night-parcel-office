# AI Skills and MCP Register

This register tracks meaningful AI-assistance usage for Night Parcel Office and identifies candidates that may later be shared with Personal Effects, Anomaly Lab, or other Pluto Night Labs games. It records evidence, not assumed benefits. No shared skills repository exists yet.

## A. Skills

### game-design-review

- **File:** `.agents/skills/game-design-review/SKILL.md`
- **Purpose:** Challenge gameplay ideas before implementation and recommend the smallest player-centred option.
- **Projects using it:** Night Parcel Office.
- **Development tasks invoked:** None yet; created by NPO-SETUP-01.
- **Observed benefits:** Not yet evaluated.
- **Problems or limitations:** Requires real playtest evidence for claims about enjoyment or retention.
- **Token efficiency:** Not measured.
- **Reusability:** Under Evaluation.
- **Shared skill candidate:** Under Evaluation.

### gameplay-validation

- **File:** `.agents/skills/gameplay-validation/SKILL.md`
- **Purpose:** Validate deterministic gameplay logic, feedback, progression, regression safety, and browser/mobile behaviour.
- **Projects using it:** Night Parcel Office.
- **Development tasks invoked:** None yet; created by NPO-SETUP-01.
- **Observed benefits:** Not yet evaluated.
- **Problems or limitations:** Automated checks cannot replace human playtesting or physical-device review.
- **Token efficiency:** Not measured.
- **Reusability:** Under Evaluation.
- **Shared skill candidate:** Under Evaluation.

## B. MCP tools

Availability was verified from the Codex session on 2026-10-08 with minimal read-only probes. No MCP configuration was changed.

### Playwright

- **Purpose:** Browser interaction, onboarding and regulation checks, routing actions, screenshots, console errors, accessibility basics, and desktop/mobile viewports.
- **Availability:** Available; the Playwright MCP responded to a browser-tab query.
- **Development tasks used:** Availability verification for NPO-SETUP-01 only.
- **Observed benefits:** Confirmed browser automation can be used in later gameplay tasks.
- **Limitations:** Not used for gameplay validation in this setup task; automation is not human playtesting or a physical-device check.
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
