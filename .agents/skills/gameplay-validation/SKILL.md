---
name: gameplay-validation
description: Validate Night Parcel Office gameplay changes for deterministic routing, progression, feedback, content correctness, regression safety, and desktop/mobile behaviour.
---

# Gameplay Validation

Preserve existing functionality unless a change is explicitly approved. Inspect the affected rules, state, content, presentation, and tests before choosing validation.

Validate as applicable:

- parcel routing, regulation precedence, and correct-decision calculation;
- scoring, penalties, shift progression, incidents, and consequences;
- save-state correctness when saves are introduced;
- player feedback and explanations against the actual routing result;
- content validity and difficulty consistency;
- regression coverage, browser interactions, and mobile layout.

Maintain coverage of all 729 currently tested routing decision sequences. Treat documented intentional precedence as valid; flag conflicting equal-priority outcomes, unexplained order dependence, or genuinely ambiguous results. Add focused tests for new gameplay mechanics.

Run relevant Node tests. Use Playwright when available for browser interaction and desktop/mobile layout checks. Browser automation does not prove human playtesting, game feel, touch-device behaviour, or audio quality.

## Output

Report:

- Systems changed
- Risks identified
- Tests executed
- Test results
- Browser validation performed
- Remaining manual checks
- Regression concerns
