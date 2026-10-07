# Night Parcel Office — Prototype v6

Mobile-friendly layout pass.

## Mobile changes
- Routing buttons stay visible at the bottom of the desk.
- DELIVER / RETURN / QUARANTINE remain side-by-side on phones.
- Onboarding modal scrolls safely on small screens.
- START SHIFT is pinned at the bottom of the onboarding card.
- Parcel height and typography are reduced on narrow screens.
- Rule cards and label fields reflow without horizontal overflow.
- Inspection tools use a compact layout.
- Decorative desk props hide on mobile.
- Results screen reflows for narrow widths.
- Touch targets are larger.

## Run locally

```bash
cd ~/Developer/night-parcel-office
open index.html
```

Or:

```bash
python3 -m http.server 8010
```

## Routing rules and tests

`parcel-routing.js` owns routing decisions and the active regulation cards.
`routeParcel(parcel, shiftIndex)` returns `{ action, reason }` without DOM access
or mutation. The shift index is zero-based: the deceased-recipient rule starts
at index 4 and the impossible-route rule at index 5. First matching regulation
wins in card order; the existing parcels have no conflicting matches.
`directoryStatus` stores the directory fact independently of the printed
`CHECK DIRECTORY` label or whether the player uses the inspection tool.

The browser loads this as a classic script, preserving direct `index.html`
play. Tests load the same implementation with Node's built-in test runner;
no dependency installation is needed:

```bash
node --test
```

Tests cover routing boundaries, regulation activation, the six actual parcels,
and scoring, feedback, incidents and progression across all 729 choice sequences
using a minimal DOM adapter.

Browser and mobile gameplay review remains required. Check a full shift on
desktop and phone, including inspection tools, new regulation cards, correct
and incorrect stamps, animations, audio, results and restart. The automated
adapter does not validate rendering, touch interaction or audio.
