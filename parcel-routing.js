// Classic script + CommonJS keeps direct file:// play and dependency-free Node tests.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ParcelRouting = factory();
})(globalThis, function () {
  'use strict';

  // First matching regulation wins, in the order shown on the desk.
  // Existing parcels never match conflicting regulations.
  const regulations = [
    {
      from: 0, c: 'heavy', t: 'HEAVY',
      f: 'WEIGHT > 8 kg + HANDLING = STANDARD → RETURN',
      matches: p => parseFloat(p.weight) > 8 && p.handling === 'STANDARD',
      action: 'RETURN', reason: 'WEIGHT > 8 kg and HANDLING = STANDARD.'
    },
    {
      from: 0, c: 'live', t: 'LIVE CARGO',
      f: 'CONTENTS = LIVE + L-17 = MISSING → QUARANTINE',
      matches: p => p.contents === 'LIVE' && p.l17 === 'MISSING',
      action: 'QUARANTINE', reason: 'CONTENTS = LIVE and L-17 = MISSING.'
    },
    {
      from: 0, c: 'mirror', t: 'SECTOR 7 MIRROR',
      f: 'ORIGIN = SECTOR 7 + CONTENTS = REFLECTIVE → QUARANTINE',
      matches: p => p.origin === 'SECTOR 7' && p.contents === 'REFLECTIVE',
      action: 'QUARANTINE', reason: 'ORIGIN = SECTOR 7 and CONTENTS = REFLECTIVE.'
    },
    {
      from: 4, c: 'dead new-rule', t: 'DECEASED RECIPIENT',
      f: 'RECIPIENT STATUS = DECEASED → RETURN',
      matches: p => (p.directoryStatus || p.recipientStatus) === 'DECEASED',
      action: 'RETURN', reason: 'RECIPIENT STATUS = DECEASED.'
    },
    {
      from: 5, c: 'route new-rule', t: 'IMPOSSIBLE ROUTE',
      f: 'ROUTE STATUS = IMPOSSIBLE → QUARANTINE',
      matches: p => p.routeStatus === 'IMPOSSIBLE',
      action: 'QUARANTINE', reason: 'ROUTE STATUS = IMPOSSIBLE.'
    }
  ];

  // shiftIndex is the zero-based position in the shift, not a parcel ID.
  function activeRegulations(shiftIndex) {
    return regulations.filter(r => shiftIndex >= r.from).map(({ c, t, f }) => ({ c, t, f }));
  }

  // directoryStatus holds the known directory fact independently of whether
  // the player has inspected it; recipientStatus remains the printed label.
  function routeParcel(parcel, shiftIndex) {
    const rule = regulations.find(r => shiftIndex >= r.from && r.matches(parcel));
    if (rule) return { action: rule.action, reason: rule.reason };
    let reason = 'No current regulation blocks delivery.';
    if (parcel.contents === 'LIVE' && parcel.l17 === 'PRESENT') {
      reason = 'CONTENTS = LIVE, but L-17 = PRESENT, so no rule blocks delivery.';
    } else if (parcel.handling === 'INTERNAL' && parcel.contents === 'DOCUMENTS') {
      reason = 'No current regulation blocks this INTERNAL document.';
    }
    return { action: 'DELIVER', reason };
  }

  return { activeRegulations, routeParcel };
});
