# Night Parcel Office Agent Guide

## Project identity

- Night Parcel Office is a supernatural postal-sorting puzzle game with story-driven gameplay and dark British office humour (shabby 1970s bureaucracy, dry tone, British spelling).
- Core actions are `DELIVER`, `RETURN`, and `QUARANTINE`.
- Prioritise enjoyable, clear gameplay and short, understandable sessions over feature quantity.
- Character names and story beats in the handover are drafts, not canon.

## Commands

- Run tests: `node --test`
- Run the game: open `index.html` directly (no build step)

## Key files

- `parcel-routing.js`: routing rules; single source of truth for correct outcomes (`routeParcel(parcel, shiftIndex)` returns `{ action, reason }`; first matching active regulation wins).
- `index.html`: UI and game flow.
- Tests: Node test suite covering routing boundaries, activation, scoring, feedback, incidents, progression and the 729 decision sequences.

Confirm paths against the repo before relying on this list.

## Source of truth

- Follow `docs/NIGHT-PARCEL-OFFICE-ROADMAP-HANDOVER.md`, specifically the **"READ FIRST — Current decisions (v0.2)"** section and the **revised execution milestones** table.
- The v0.1 appendix is historical. Where it conflicts with v0.2, v0.2 wins. Do not use v0.1 task IDs (NPO-01 to NPO-28) or milestone labels.
- Current focus is Milestone A. Do not implement B1 or later without explicit approval.
- Inspect current behaviour before assuming a feature or defect is present.

## Hard rules

- Do not duplicate routing logic in UI code. Results-screen reasons must come from the same source as routing.
- Never create parcels or regulation sets with an ambiguous or unsolvable answer.
- Do not edit or remove existing tests just to make them pass. If expected behaviour must change, explain why and make it an explicit, reviewed update.
- Keep the game playable straight from the browser unless a build step is approved.
- Before changing rule representations, inspect the code and run `node --test` first to record a baseline.

## Development principles

- Make small, independently testable changes on an isolated branch and preserve working systems.
- Prefer simple, maintainable solutions; challenge complexity that does not improve the core loop.
- Avoid unnecessary dependencies, large refactors, and unrelated cleanup.
- Maintain desktop and mobile compatibility.

## When unsure

- If the roadmap conflicts with the code, or a task needs a design decision, stop and ask rather than choosing.
- If a task would touch deferred scope (diegetic desk redesign, music/ambience, equipment, endless mode, achievements, reputation systems, storefront, monetisation), stop and ask.

## Testing

- Run relevant automated tests after changes and preserve routing behaviour and regression coverage.
- Never claim a test passed unless it was run.
- Distinguish automated, browser, mobile, and human playtesting evidence.
- Report remaining validation requirements; never describe automation as human playtesting.

## MCP usage

- Use Playwright for browser interactions, desktop/mobile layout, screenshots, console errors, and basic accessibility checks.
- Use Context7 only when current external library, framework, SDK, API, CLI, or cloud-service documentation is needed, not for simple JavaScript or CSS work.
- Use GitHub MCP for remote repository, issue, and pull-request operations; prefer local Git for routine development.
- Prefer existing local tools, use only the MCP needed, and avoid unnecessary token consumption.

## Skills

- Project skills live under `.agents/skills/`. Read a `SKILL.md` only if it is relevant to the task.
- Log skill or MCP use in `docs/AI-SKILLS-REGISTER.md` only when it materially changed the outcome; skip trivial entries.

## Delivery

- Keep the report short: changes, changed files, tests run and results, remaining checks, risks.
- Recommend the next small task within the approved milestone.
- Do not commit, merge, push, or deploy without explicit approval.
