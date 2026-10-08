# Night Parcel Office — Roadmap v0.2 and AI Handover
**Updated:** 2026-10-08 | **Status:** Approved development direction; proposed features not yet implemented.
**Repository:** https://github.com/thomasrawnson/night-parcel-office

## READ FIRST — Current decisions (v0.2)
1. **Portfolio:** friends' prototype preference is Night Parcel Office #1, Personal Effects #2, Anomaly Lab #3. Focus game-development effort on Night Parcel Office; other game concepts paused. This is qualitative feedback, not commercial proof.
2. **Delivery approach:** use **direct Codex** for gameplay development while Pluto Studio Lite is under evaluation; do not block this game's progress on Studio Lite, nor turn NPO into a Lite-building exercise. Reassess later using measured time, cost and QA.
3. **First objective:** make a **three-shift** experience understandable and genuinely fun. Never presume a feature is absent until checking the current repo.
4. **Sequence:** **A:** polish onboarding, readable rules, tactile stamp feedback, informative results, responsive layout and tests; **B1:** amendments + explicit rule precedence + validator, **playtest**; **B2:** inspection with meaningful cost, **playtest**; **B3:** exactly one deterministic consequence chain and minimal versioned save, **external playtest/go-no-go**; **B4:** recurring characters, a five-shift extension and ONE representative art screen only **after** the gate.
5. **No premature scope:** defer full diegetic desk redesign, music/ambience beyond simple stamp effects, equipment upgrades, endless mode, achievements, complicated reputation, full campaign content, storefront engineering and monetisation.
6. **Conditional full-game aspiration:** about **15 hand-crafted shifts / 90 minutes** with a proper ending (hypotheses, not a commitment); abandon the former 25-shift/2–4-hour initial-release ambition unless playtesting supports expansion.
7. **Validation:** thresholds from v0.1 are directional, not statistically meaningful pass/fail rules for 10–20 people. Include some unfamiliar testers. After Shift 3 offer a neutral **“Start Shift 4?”** option without prompting or an observer. Capture actual completion/voluntary continuation, reasons, favourite moment, confusion vs boredom. If <50% reach Shift 3 due chiefly to confusion, fix rule presentation then retest once; if boredom or persistent rule confusion remains, stop or redesign the loop. Continue only when the majority choose to keep playing and can describe a specific enjoyable or understandable moment.
8. **Engineering guardrail:** maintain current routing correctness and Node test coverage, including all 729 sequences; before modifying rule representations, inspect and re-run current tests. Treat intentional overlapping rules with documented unambiguous precedence as valid; flag ties with different outcomes and order-dependent fragile content.
9. **Document maintenance:** below is v0.1 context retained for reference, NOT current accepted scope where it conflicts with this decisions section. Record decisions and actual implementation evidence distinctly.

## Revised execution milestones (authoritative for v0.2)
| Slice | Implement | Validation / exit |
|---|---|---|
| A — core loop | Audit current v6; fix only real gaps in onboarding, rules readability, stamp feedback, report, mobile, tests; minimal stamp sound allowed | 3 coherent shifts; new players can state the rule behind a decision |
| B1 — rule depth | Amendments, rule ordering/priority, content checks with human-readable reasons | All parcels yield defensible deterministic results; test rule complexity alone |
| B2 — inspection choice | Introduce a cost or limited inspections; present tradeoff clearly | Compare player engagement with B1; remove if inspection feels automatic |
| B3 — consequence proof | One scripted mirror/address reversal (or similarly small effect), state flags; minimally save version+reached shift+flags | 3-shift independent test, unsupervised continuation invitation, go/no-go |
| B4 — expand carefully | Recurring character(s), 5 shifts, one polished art screen | Only after B3 evidence supports continuation |
| C — conditional production | ~15 meaningful shifts, ending, focused art/audio and mobile polish | Beta and audience validation; defer peripheral features |

**Technical specification for B1:** preserve current “first matching regulation wins” semantics unless an explicit reviewed migration changes them. Represent `id`, `priority/order`, `conditions`, `action`, and reason in validated content. A validator examines all matches; fails zero matches unless explicitly allowed, conflicting top-priority ties and unexpected order sensitivity; permits intentionally prioritised overlaps. Generate results-screen reasons from the same source as routing.

**Technical specification for B3:** a scripted state flag such as `mirrorDeliveredWrongly` applies a declared transform to next-shift content/rules. Rules must not call the story engine. Store a small version-stamped serialisable object, not a premature save architecture; migration framework later when required.

## Immediate development instruction for Codex
Before implementing changes, inspect `index.html`, `parcel-routing.js`, tests and current `git status`. Run `node --test`. Identify which A items already work, explicitly show actual defects/gaps, then complete the **smallest one** on an isolated branch with regression tests. Preserve direct `index.html` play, mobile controls and existing routes; do not refactor unrelated systems. Report tests run, gameplay manual checks still needed, and changed files. Repeat in bounded slices with commits.

## v0.2 decision record
**Accepted 2026-10-08:** independent AI review recommending three-shift gate, B1/B2/B3 decomposition, reduced release scope, minimal early saves, postponed art/audio/monetisation, and real external playtesting. **Refinement:** minimal versioned save lives in B3; B1 and B2 each have standalone playtests; intentional precedence overlaps are permissible. **Superseded v0.1 proposals:** a mandatory five-shift first slice, 25-shift commercial baseline, ambience in A, production art before the gate, and all v0.1 calendar estimates as delivery commitments.

---

## Appendix — Original v0.1 proposal (historical; superseded where inconsistent)

# Night Parcel Office — Product Roadmap & AI Handover
**Date:** 2026-10-08  
**Status:** Planning proposal; not an implementation record  
**Owner:** Pluto Night Labs  
**Repository:** https://github.com/thomasrawnson/night-parcel-office  
**Purpose:** Persistent context for future AI sessions and independent AI review. Review and challenge this proposal before implementing it.

## 1. Why this project is now the priority
Friends ranked the game prototypes: **1. Night Parcel Office, 2. Personal Effects, 3. Anomaly Lab**. These are small-sample qualitative preferences, not commercial validation. Proposed portfolio treatment: put roughly 80–90% of game-development effort into Night Parcel Office; preserve Personal Effects and Anomaly Lab as next candidates. Pause new development on Department 42, Processing the Dead, Dungeon Care Home, How Much?!, End of the World and other game concepts. Non-game products such as UsageGrid have separate priorities. **No portfolio registry/Notion changes were made by this document.**

## 2. Verified baseline vs proposal
**Verified from current repo README (as checked 2026-10-08):** Prototype v6; mobile-focused layout; direct browser entry at `index.html`; `parcel-routing.js` exports `routeParcel(parcel, shiftIndex)` with `{ action, reason }`, first matching active regulation in card order wins; six existing parcels; existing tests cover routing boundaries, activation, scoring, feedback, incidents, progression and **729 decision sequences** using Node's built-in test runner (`node --test`). These automated tests do **not** validate rendering, mobile touch interaction, audio or full browser usability. Historical terminal run reported 3 tests passing, 0 failures, including 729 sequences (2026-10-07). **This handover did not rerun tests or inspect all implementation files.**
**Historical tester feedback:** onboarding insufficient; rules/regulations needed clearer presentation; mismatch between labels and shift regulations; better end-of-shift performance explanations; clearer buttons; music/audio request; mobile action controls previously off screen. Some issues may already be addressed in v6, so verify current behaviour before filing bugs.
**Proposal:** all new feature, schedule, scope and success metrics below. None should be described as already built.

## 3. Product vision
A story-driven, supernatural, darkly comic British night-shift postal sorting puzzle game. Player inspects questionable parcels, checks changing regulations and stamps **DELIVER / RETURN / QUARANTINE**. Mistakes can alter future parcels and shifts. Tone: shabby 1970s bureaucracy, unsettling mysteries, dry office humour. Broad inspiration: Papers, Please / Strange Horticulture, without copying them.

**Design pillars:** understandable within ~60 seconds; escalating *fair* rule interactions; meaningful decisions; strong stamping/inspection tactility; humour and recurring characters; persistent consequences; short ~5–8 minute shifts; full narrative arc. Story-driven puzzle campaign first; procedural replayability second.

**Core loop:** begin shift → read/amend regulations → inspect parcels → choose stamp → get immediate understandable feedback → see incidents/consequences → receive meaningful shift report → save and progress.

## 4. Roadmap and gates
Indicative part-time scope only, not commitments:
1. **Phase 1 Core polish (1–2 weeks):** onboarding, rule clarity, feedback, results, audio baseline, mobile, difficulty and tests. Gate: new players understand without outside help; stamp reasoning is clear; >=70% voluntarily start another shift (hypothesis).
2. **Phase 2 Vertical slice (2–3 weeks):** five shifts, inspection tradeoffs, persistent incidents, characters, chapter framing, cohesive visual direction. Gate: independent testing before full production; target >=70% complete Shift 3, >=60% voluntarily continue afterwards (hypotheses).
3. **Phase 3 Campaign/progression (3–4 weeks):** story structure, save/reload, selective unlocks and consequences.
4. **Phase 4 Art/audio production (2–4 weeks):** polished desk, parcel assets, stamps, UI, ambient effects and audio settings; can overlap other phases.
5. **Phase 5 Full content/replayability (4–6 weeks):** up to five chapters / 25 shifts, validation of content, optional endless mode and challenges.
6. **Phase 6 Beta/release preparation (2–3 weeks):** mobile/desktop usability, accessibility, balancing, browser/packaging, store assets.
**High-level ambition:** ~3–5 months part-time for a focused first paid release, conditional on slice success. Avoid making dates promises. Prefer reducing campaign to ~20 polished shifts if necessary rather than shipping 25 repetitive ones.

### Proposed five-shift vertical slice
| Shift | Title | New lesson / feature |
|---|---|---|
| 1 | Welcome to the Night Shift | Tutorial; ordinary rules, labels and stamping |
| 2 | Special Deliveries | Combining conditions and clear rule precedence |
| 3 | Unusual Contents | Inspection and suspicious contents; meaningful cost/limit |
| 4 | The Complaints Department | First returning character; mistake consequences/dispute |
| 5 | Management Inspection | Mid-shift amendment, audit/event, small narrative reveal |

Each shift should introduce approximately one substantial mechanic. Prove the entire short game loop with ~20–30 minutes of play. Do not generate ambiguous/impossible puzzle states. Design exact conditions and precedence before content production.

## 5. Candidate systems — ranked
**Must prove in slice:**
- **Readable regulation engine:** base rule, weight, destination, combined conditions; later exceptions, priorities, temporary amendments. Difficulty should be driven by interactions, not text overload.
- **Tactile stamps:** substantial DELIVER/RETURN/QUARANTINE feedback, clear selected action and unique audio, accessible controls.
- **Inspection mechanic:** optional inspection can reveal label/content inconsistencies but has a cost, limited uses or meaningful tradeoff; avoid always exposing the correct answer.
- **Persistent consequences:** e.g., incorrectly delivering cursed mirror leads to reversed addresses in future shift; customer complaints/changed conditions follow earlier decisions. Script and test these deterministically.
- **Recurring characters/story:** Mrs Graves (letters to deceased spouse), Mr Holloway (suspicious trader), department inspector, unknown sender. Names are drafts, not canon. Light branching and an overarching mystery.
- **End-of-shift report:** accuracy, reasons for mistakes, incidents, grade, clearly explained consequences and continuation prompt.
- **Save/resume:** preserve campaign choices and avoid breaking old saves after releases.

**Medium, only after slice:** equipment upgrades (lamp/inspection gloves/scanner/binder), special events (power cut, postal strike, ghost infestation, emergency delivery, regulation audit), environmental reactions. Use sparse economy; never make purchases mandatory to solve puzzles.

**Defer/optional:** procedurally generated endless shifts, achievements, speed challenges, multiple reputation meters, elaborate office management, large branching narrative. Test seedable procedural cases for logical consistency before shipping them.

## 6. Proposed campaign
First-playthrough goal **2–4 hours** across perhaps 5 chapters / 25 shifts:
1. First Night (~5 shifts): basics;
2. Strange Deliveries (~5): inspections and exemptions;
3. Departmental Problems (~5): incidents/characters;
4. The Missing Parcels (~5): mystery and consequences;
5. Final Inspection (~5): payoff and ending.
This is an upper target, not a content commitment. Narrative and content density matter more than volume. Optional endless/challenges only after a complete ending works.

## 7. Visual identity and sound
**Working art brief:** haunted, shabby 1970s British postal sorting office; worn desk, yellowed paperwork, ink, muted green/rust/brown, warm lamp against dark shelves, uncanny moving parcels and occasional shadows. Prefer immersive/diegetic desk interactions over rectangular software-dashboard panels.
- Centre: visually varied parcel/envelope/crate with legible label and inspection zoom.
- Side: physical regulation binder, pinned amendments; optional tools on desk.
- Bottom: three large, tactile, mobile-friendly stamps.
- Background: shelves, clock, conveyor, notices, subtle supernatural motion.
- **Explore three mock-up directions before committing:** haunted atmospheric, exaggerated absurd bureaucracy, compact retro/pixel supernatural. Preferred initial direction is haunted + comedic.
- Implement first a reusable asset system; don't commission unique artwork for hundreds of parcels.
- Audio: rubber stamps, paper, typing, printer/memo, ambience (rain, fluorescent hum, clock), subtle music, independent sound/music settings and mute.
- Prioritise readability, keyboard/touch, reduced motion, responsive layout and performance over decorative detail.

## 8. Technical strategy
Keep the existing browser implementation unless evidence supports migrating engines. Separate **rules, state, content, presentation**. Author parcels/regulations/stories as structured data (JSON/TS), with schema checks. Retain `parcel-routing.js` as single source of truth or safely refactor with compatibility tests. Proposed validator asserts:
- each parcel has an unambiguous correct action and explainable reason under a specified regulation snapshot;
- precedence/exception logic is deterministic and known;
- every scripted shift is solvable; outcomes and chained incidents are reproducible;
- save-state migrations are validated;
- tests cover UI, mobile touch and audio in addition to Node logic.
Suggested hosting: existing Cloudflare Pages for browser distribution. Use direct Codex for exploratory game-feel and artwork iteration; trial Pluto Studio Lite on bounded rule-engine, content-validation and test tasks. Track time, tokens, costs, revisions and QA. Do not let tooling improvements distract from the game. **Studio Lite's own Trial 3/4 evaluation is distinct from product roadmap.**

## 9. Test plan / product gate
Recruit ~10–20 testers, including new players. Proposed **hypotheses, not industry benchmarks**: 90% tutorial completion, 85% first shift completion, 70% start Shift 2, 70% finish Shift 3, 60% voluntarily continue after Shift 3, 90% understand why wrong, <20% report severe mechanic confusion, 60% express interest in a longer game. Collect actual sample sizes and breakdowns. Ask **“What was your favourite moment?”** and **“Where did you get bored or confused?”**. Measure optional continuation separately from coerced/click-through progression. Review observations rather than only averages.

## 10. Commercial approach — explicitly last
No monetisation build during first vertical-slice work. Proposed hypothesis: free 5-shift demo hosted on Pluto Night Labs; later paid complete campaign on itch.io and potentially Steam if market interest warrants it; perhaps £4.99–£6.99, subject to current comparable-market pricing and willingness-to-pay tests. Avoid ads, subscription and consumable monetisation in a narrative/puzzle game. Steam fees, event dates, storefront regulations and taxes must be reconfirmed before operational decisions. Gross revenue arithmetic is not a sales forecast. A completed first commercial product and paying-customer signal matter more than early projections.

## 11. Proposed tasks and priority
| ID | Slice | Priority | Milestone |
|---|---|---|---|
| NPO-01 | Interactive onboarding | Critical | A |
| NPO-02 | Regulations readability/explanations | Critical | A |
| NPO-03 | Stamp + inspection feedback | Critical | A |
| NPO-04 | Results/performance report | High | A |
| NPO-05 | Baseline sound and ambient audio | High | A |
| NPO-06 | Mobile/desktop usability | High | A |
| NPO-07 | Three-shift difficulty balance | Critical | A |
| NPO-08 | Logic and regression tests | Critical | A |
| NPO-09 | Story / returning character framework | High | B |
| NPO-10 | Meaningful inspection choice | Critical | B |
| NPO-11 | Persistent consequences | Critical | B |
| NPO-12 | Regulations and amendments | Critical | B |
| NPO-13 | Five coherent shifts | Critical | B |
| NPO-14 | Save and resume | High | B |
| NPO-15 | First cohesive visual pass | High | B |
| NPO-16 | External vertical-slice playtest | Critical | B |
| NPO-17 | Chapter progression framework | Critical | C |
| NPO-18 | Story and character content | Critical | C |
| NPO-19 | Full campaign, up to 25 shifts | Critical | C |
| NPO-20 | Small equipment upgrades | Medium | C, optional |
| NPO-21 | Full visual asset/animation pass | High | C |
| NPO-22 | Full audio/mix/settings | High | C |
| NPO-23 | Endless mode | Medium | C, deferrable |
| NPO-24 | Challenges/achievements | Low | C, deferrable |
| NPO-25 | Save compatibility/migrations | Critical | C |
| NPO-26 | Accessibility and performance | High | C |
| NPO-27 | Beta balancing and regression | Critical | C |
| NPO-28 | Store/release preparation | High | C |

These are **proposed IDs**, not verified records in Studio/Notion task registries. Before importing, reconcile existing task IDs and avoid duplicates.

## 12. Risks / guardrails
1. Rule bloat and ambiguity → introduce one mechanic at a time; test every generated/saved state.
2. Repetitive parcels → story callbacks and genuinely new decisions, not only more labels.
3. Overlong art pass → approve one polished representative screen and reusable asset pipeline.
4. Scope creep → hold endless/upgrades/achievements until vertical slice proves demand.
5. Studio Lite engineering consuming game time → benchmark against direct Codex; prioritize shipping.
6. Misreading friends' top-3 vote as broad market validation → external testers and willingness-to-pay check.

## 13. Questions for independent AI reviewer
- What is the **smallest vertical slice** that can test whether players want a full game?
- Is the feature order right? Are inspection and persistent consequences too much for the next milestone?
- How should regulation precedence and ambiguity be represented/formally validated?
- What technical debt or constraints are visible in current repo that may invalidate these estimates?
- How should scripted story consequences coexist with rule-based deterministic outcomes?
- Can 2–4 hours be achieved without repetitive filler at Pluto Night Labs' current development capacity?
- What art approach gives the highest visual impact per engineering hour and remains mobile-friendly?
- Which scope items should be cut or postponed?
- What evidence should trigger go/no-go after five shifts?

## 14. Next steps for a new chat / agent
1. Read this document and the repo `README.md`; inspect current `index.html`, `parcel-routing.js` and tests. Avoid assuming prior bugs are still present.
2. Run `node --test` and manually test desktop/mobile; record baseline. Do not falsely claim a test run from this document.
3. Conduct a **critical roadmap review** (challenge assumptions, scope and sequencing) before accepting tasks as final.
4. Specify and lock the **five-shift vertical-slice design**: exact rules, parcel set, inspection cost, consequence chain, story beats, clear pass/fail gates.
5. Produce three same-screen art-direction mock-ups and choose one before extensive graphics refactoring.
6. Reconcile proposals with existing Night Parcel Office / Pluto Studio / Notion tasks; only then import/implement.
7. Keep implementation changes in bounded slices with tests, commit messages and a current handover update after every milestone.

## 15. Revision convention
Treat this as an **initial roadmap proposal (v0.1)**. On later changes, add dated decision records (accepted / changed / rejected), update current implementation evidence and tests separately, and retain unresolved questions. Do not convert proposed dates or metrics into facts.
