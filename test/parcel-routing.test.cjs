const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const { routeParcel, activeRegulations } = require('../parcel-routing.js');

const ordinary = { weight: '1 kg', handling: 'STANDARD', contents: 'PERSONAL', origin: 'LOCAL', l17: '—' };
test('routing thresholds, conjunctions and shift amendments', () => {
  const cases = [
    [{}, 0, 'DELIVER'],
    [{ weight: '8 kg' }, 0, 'DELIVER'],
    [{ weight: '8.01 kg' }, 0, 'RETURN'],
    [{ weight: '11.2 kg', handling: 'PRIORITY' }, 0, 'DELIVER'],
    [{ weight: '?' }, 0, 'DELIVER'],
    [{ contents: 'LIVE', l17: 'MISSING' }, 0, 'QUARANTINE'],
    [{ contents: 'LIVE', l17: 'PRESENT' }, 0, 'DELIVER'],
    [{ l17: 'MISSING' }, 0, 'DELIVER'],
    [{ origin: 'SECTOR 7', contents: 'REFLECTIVE' }, 0, 'QUARANTINE'],
    [{ origin: 'SECTOR 7' }, 0, 'DELIVER'],
    [{ contents: 'REFLECTIVE' }, 0, 'DELIVER'],
    [{ recipientStatus: 'CHECK DIRECTORY', directoryStatus: 'DECEASED' }, 3, 'DELIVER'],
    [{ recipientStatus: 'CHECK DIRECTORY', directoryStatus: 'DECEASED' }, 4, 'RETURN'],
    [{ recipientStatus: 'DECEASED' }, 4, 'RETURN'],
    [{ recipientStatus: 'ACTIVE' }, 4, 'DELIVER'],
    [{ routeStatus: 'IMPOSSIBLE' }, 4, 'DELIVER'],
    [{ routeStatus: 'IMPOSSIBLE' }, 5, 'QUARANTINE'],
    [{ routeStatus: 'POSSIBLE' }, 5, 'DELIVER'],
    [{ weight: '9 kg', contents: 'LIVE', l17: 'MISSING' }, 5, 'RETURN']
  ];
  for (const [fields, shift, expected] of cases) {
    const parcel = Object.freeze({ ...ordinary, ...fields });
    const first = routeParcel(parcel, shift);
    assert.equal(first.action, expected, JSON.stringify([fields, shift]));
    assert.deepEqual(routeParcel(parcel, shift), first);
  }
  assert.deepEqual([0, 3, 4, 5].map(i => activeRegulations(i).length), [3, 3, 4, 5]);
  const cards = activeRegulations(5);
  cards[0].t = 'changed';
  assert.equal(activeRegulations(5)[0].t, 'HEAVY');
});

const html = readFileSync(new URL('../index.html', `file://${__filename}`), 'utf8');
const browserRules = readFileSync(new URL('../parcel-routing.js', `file://${__filename}`), 'utf8');
const gameScript = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const expected = ['RETURN', 'DELIVER', 'QUARANTINE', 'DELIVER', 'RETURN', 'QUARANTINE'];
const reasons = [
  'WEIGHT > 8 kg and HANDLING = STANDARD.',
  'CONTENTS = LIVE, but L-17 = PRESENT, so no rule blocks delivery.',
  'ORIGIN = SECTOR 7 and CONTENTS = REFLECTIVE.',
  'No current regulation blocks this INTERNAL document.',
  'RECIPIENT STATUS = DECEASED.',
  'ROUTE STATUS = IMPOSSIBLE.'
];

// Minimal DOM adapter exercises the real game script, not browser rendering.
function game() {
  const elements = new Map();
  const timers = [];
  const element = selector => {
    if (!elements.has(selector)) elements.set(selector, {
      style: {}, classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
      addEventListener() {}, setAttribute() {}, focus() {}, innerHTML: '', textContent: ''
    });
    return elements.get(selector);
  };
  const context = vm.createContext({
    document: { querySelector: element, querySelectorAll: () => [], addEventListener() {} },
    window: {}, localStorage: { getItem: () => null },
    setTimeout(fn, delay) { if (delay === 460 || delay === 420) timers.push(fn); },
    clearTimeout() {}, setInterval() {}
  });
  vm.runInContext(browserRules, context);
  vm.runInContext(gameScript, context);
  return {
    run: code => vm.runInContext(code, context),
    element,
    advance() { while (timers.length) timers.shift()(); }
  };
}

test('browser loads the shared rules and actual parcels retain every answer and reason', () => {
  assert.ok(html.indexOf('<script src="parcel-routing.js"></script>') < html.indexOf('<script>'));
  const g = game();
  const decisions = JSON.parse(g.run('JSON.stringify(parcels.map((p,i)=>routeParcel(p,i)))'));
  assert.deepEqual(decisions, expected.map((action, i) => ({ action, reason: reasons[i] })));
  assert.equal(g.run('parcels.some(p=>Object.hasOwn(p,"correct"))'), false);
  // Verify scoring consumes the module result, rather than a second implementation.
  g.run("parcels[0].weight='1 kg'; choose('DELIVER')");
  assert.equal(g.run('state.errors'), 0);
  assert.match(g.element('#routingFeedback').textContent, /Correct routing/);
});

test('all 729 routing sequences preserve scoring, feedback, incidents and shift progression', () => {
  const actions = ['DELIVER', 'RETURN', 'QUARANTINE'];
  for (let sequence = 0; sequence < 3 ** 6; sequence++) {
    const g = game();
    let code = sequence;
    let errors = 0;
    const chosen = [];
    for (let i = 0; i < 6; i++) {
      const action = actions[code % 3]; code = Math.floor(code / 3);
      chosen.push(action);
      const correct = action === expected[i];
      if (!correct) errors++;
      g.run(`choose('${action}')`);
      assert.equal(g.element('#routingFeedback').textContent, correct
        ? `✓ Correct routing — ${reasons[i]}`
        : `✕ Routing error — expected ${expected[i]}. ${reasons[i]}`);
      g.run(`choose('${action}')`); // Locked during the animation.
      assert.equal(g.run('state.processed'), i + 1);
      g.advance();
      assert.equal(g.run('state.i'), i + 1);
      assert.equal(g.run('state.errors'), errors);
    }
    const state = JSON.parse(g.run('JSON.stringify(state)'));
    assert.deepEqual(state.history.map(h => h.expected), expected);
    assert.deepEqual(state.history.map(h => h.reason), reasons);
    for (const action of actions) assert.equal(state[action.toLowerCase()], chosen.filter(a => a === action).length);
    assert.equal(state.nibbles, chosen[1] === 'QUARANTINE');
    assert.equal(state.mirror, chosen[2] === 'DELIVER');
    assert.equal(state.edith, chosen[4]);
    assert.equal(state.final, chosen[5]);
    assert.equal(state.complaints.length, Number(state.nibbles));
    assert.equal(state.inc.length, 1 + Number(state.nibbles) + Number(state.mirror));
    assert.equal(g.element('#game').style.display, 'none');
    assert.ok(g.element('#summary').innerHTML.includes(`${Math.round((6-errors)/6*100)}%`));
  }
});
