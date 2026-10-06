# Night Parcel Office — Prototype v5

Onboarding + rule/label consistency pass.

## Changes

### Onboarding
- Short start-of-shift briefing popup.
- Explains the core loop: CHECK → INSPECT → STAMP.
- Defines DELIVER / RETURN / QUARANTINE.
- Includes a “Don't show this briefing next time” option.
- Adds a permanent `? HOW TO PLAY` button.
- First parcel highlights the exact fields that match its regulation.

### Fairer rule matching
Parcel labels and regulations now use the same vocabulary:
- WEIGHT
- HANDLING
- L-17
- ORIGIN
- CONTENTS
- RECIPIENT STATUS
- ROUTE STATUS

The turned-over side is now extra flavour/evidence rather than hiding information that should have been on the main label.

### Dynamic regulations
- `DECEASED RECIPIENT` regulation appears before Edith Vale's parcel.
- `IMPOSSIBLE ROUTE` regulation appears before the final parcel.
- This makes scored decisions explicitly supported by visible rules.

### Retained from v4
- Immediate correct/incorrect feedback.
- Improved results screen and parcel-by-parcel review.
- Procedural background music with mute toggle.
- Visual parcel interactions and absurdity.

## Run

```bash
cd ~/Developer/night-parcel-office
open index.html
```

Or:

```bash
cd ~/Developer/night-parcel-office
python3 -m http.server 8010
```
