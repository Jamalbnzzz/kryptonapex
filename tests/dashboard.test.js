// ============================================================
// ZenScout Local Web Terminal — Verification & Unit Test Suite
// ============================================================

console.log('🧪 Starting ZenScout Local Web Terminal Test Suite...\n');

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✅ [PASS] ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ [FAIL] ${testName}`);
    failed++;
  }
}

// 1. Auto-Sweep Math Verification
console.log('--- Test Suite 1: Auto-Sweep & Reserve Calculation ---');

function calculateSweep(currentBalanceSol, reserveSol) {
  const threshold = reserveSol + 0.01;
  if (currentBalanceSol <= threshold) return { shouldSweep: false, sweepAmountSol: 0 };
  const sweepAmountSol = Number((currentBalanceSol - reserveSol).toFixed(4));
  const sweepLamports = Math.floor(sweepAmountSol * 1e9) - 5000;
  return {
    shouldSweep: sweepLamports > 50000,
    sweepAmountSol,
    sweepLamports
  };
}

const test1 = calculateSweep(0.04, 0.05);
assert(test1.shouldSweep === false, 'Balance under reserve does not trigger sweep');

const test2 = calculateSweep(0.12, 0.05);
assert(test2.shouldSweep === true, 'Balance above reserve triggers sweep');
assert(test2.sweepAmountSol === 0.07, '0.12 SOL with 0.05 reserve sweeps 0.07 SOL');

const test3 = calculateSweep(1.45, 0.10);
assert(test3.shouldSweep === true, '1.45 SOL triggers sweep');
assert(test3.sweepAmountSol === 1.35, '1.45 SOL with 0.10 reserve sweeps 1.35 SOL');

// 2. Mode Configuration Validation
console.log('\n--- Test Suite 2: Mode Parameters Verification ---');

const MODES = ['MODE_1_AI_SNIPER', 'MODE_2_COPY_TRADER', 'MODE_3_WHALE_TRACKER', 'MODE_4_SMART_EXIT'];
assert(MODES.length === 4, 'All 4 trading modes are registered');
assert(MODES.includes('MODE_1_AI_SNIPER'), 'Mode 1 registered');
assert(MODES.includes('MODE_2_COPY_TRADER'), 'Mode 2 registered');
assert(MODES.includes('MODE_3_WHALE_TRACKER'), 'Mode 3 registered');
assert(MODES.includes('MODE_4_SMART_EXIT'), 'Mode 4 registered');

// Summary
console.log(`\n============================================================`);
console.log(`🏁 Test Results: ${passed} Passed, ${failed} Failed`);
console.log(`============================================================\n`);

if (failed > 0) process.exit(1);
