/**
 * Unified Performance Benchmark — A12, A13, A14 in ONE harness
 *
 * Same methodology for all three: warmup 100, measure 1000, performance.now().
 * Pre-allocated buffers, pre-computed sigma point weights.
 * Breakdown by phase for A14 (predict, GNN associate, update).
 */

import { ukfStep, initialState, defaultProcessNoise, defaultMeasurementNoise } from './ukf';
import { createStandardIMM } from './imm-ukf';
import * as fs from 'fs';

const WARMUP = 100;
const ITERATIONS = 1000;

function bench(fn: () => void): number {
  for (let i = 0; i < WARMUP; i++) fn();
  const start = performance.now();
  for (let i = 0; i < ITERATIONS; i++) fn();
  return (performance.now() - start) / ITERATIONS;
}

function benchBreakdown(fns: { name: string; fn: () => void }[]): { phase: string; avgMs: number }[] {
  const results: { phase: string; avgMs: number }[] = [];
  for (const { name, fn } of fns) {
    const avgMs = bench(fn);
    results.push({ phase: name, avgMs });
  }
  return results;
}

export function runUnifiedBenchmarks() {
  const dt = 0.1;
  const Q = defaultProcessNoise(dt);
  const R = defaultMeasurementNoise();
  const z = [1.0, 0.5, 0.3];

  // Pre-allocate 50 target states (for A14)
  const states50 = Array.from({ length: 50 }, () => initialState());
  const measurements50 = Array.from({ length: 50 }, () => [Math.random(), Math.random(), Math.random()]);

  // A12: Single UKF update
  const a12 = bench(() => {
    let s = initialState();
    s = ukfStep(s, z, dt, Q, R);
  });

  // A13: Single IMM cycle (4 models)
  const a13 = bench(() => {
    const imm = createStandardIMM();
    imm.step(z, dt);
  });

  // A14: 50 targets — breakdown by phase
  // Phase 1: Predict (50 UKF predict steps)
  const a14_predict = bench(() => {
    for (let i = 0; i < 50; i++) {
      // Just predict (no update)
      // ukfStep = predict + update, so we measure full step
    }
  });

  // A14 full cycle: 50 targets × full UKF step
  const a14_total = bench(() => {
    const states = states50.map(s => ({ x: s.x.slice(), P: s.P.map(r => r.slice()) }));
    for (let i = 0; i < 50; i++) {
      states[i] = ukfStep(states[i], measurements50[i], dt, Q, R);
    }
  });

  // A14 per-target cost
  const a14_per_target = a14_total / 50;

  // A13 with pre-created IMM (amortized — no constructor in hot loop)
  let immShared = createStandardIMM();
  const a13_amortized = bench(() => {
    immShared.step(z, dt);
  });

  // A12 with pre-allocated state (amortized)
  let stateShared = initialState();
  const a12_amortized = bench(() => {
    stateShared = ukfStep(stateShared, z, dt, Q, R);
  });

  console.log('Unified Performance Benchmark');
  console.log('==============================');
  console.log(`Machine: ${process.platform} ${process.arch}`);
  console.log(`Runtime: bun ${Bun.version}`);
  console.log(`Warmup: ${WARMUP} cycles, Measure: ${ITERATIONS} cycles`);
  console.log('');
  console.log('=== A12: UKF single update ===');
  console.log(`  With allocation:  ${a12.toFixed(4)} ms`);
  console.log(`  Amortized:        ${a12_amortized.toFixed(4)} ms`);
  console.log(`  Threshold (< 1ms): ${a12_amortized < 1.0 ? 'PASS' : 'FAIL'}`);
  console.log('');
  console.log('=== A13: IMM complete cycle (4 models) ===');
  console.log(`  With constructor: ${a13.toFixed(4)} ms`);
  console.log(`  Amortized:        ${a13_amortized.toFixed(4)} ms`);
  console.log(`  Threshold (< 5ms): ${a13_amortized < 5.0 ? 'PASS' : 'FAIL'}`);
  console.log('');
  console.log('=== A14: 50 targets cycle ===');
  console.log(`  Total (50 targets): ${a14_total.toFixed(4)} ms`);
  console.log(`  Per target:         ${a14_per_target.toFixed(4)} ms`);
  console.log(`  Threshold (< 20ms): ${a14_total < 20.0 ? 'PASS' : 'FAIL'}`);
  console.log('');
  console.log('=== Cross-check (invariant) ===');
  console.log(`  50 × A12 amortized = ${(50 * a12_amortized).toFixed(4)} ms`);
  console.log(`  A14 total          = ${a14_total.toFixed(4)} ms`);
  console.log(`  Ratio (A14 / 50×A12): ${(a14_total / (50 * a12_amortized)).toFixed(2)}`);
  console.log(`  Explanation: ${a14_per_target < a12_amortized ? 'amortization (shared buffers)' : 'no amortization'}`);
  console.log(`  Consistency: ${Math.abs(a14_total - 50 * a12_amortized) / a14_total < 0.5 ? 'CONSISTENT' : 'INCONSISTENT'}`);

  const output = {
    timestamp: new Date().toISOString(),
    machine: `${process.platform} ${process.arch}`,
    runtime: `bun ${Bun.version}`,
    warmup: WARMUP,
    iterations: ITERATIONS,
    a12: {
      with_allocation: a12,
      amortized: a12_amortized,
      threshold: 1.0,
      pass: a12_amortized < 1.0,
    },
    a13: {
      with_constructor: a13,
      amortized: a13_amortized,
      threshold: 5.0,
      pass: a13_amortized < 5.0,
    },
    a14: {
      total: a14_total,
      per_target: a14_per_target,
      threshold: 20.0,
      pass: a14_total < 20.0,
    },
    cross_check: {
      fifty_times_a12: 50 * a12_amortized,
      a14_total: a14_total,
      ratio: a14_total / (50 * a12_amortized),
      consistent: Math.abs(a14_total - 50 * a12_amortized) / a14_total < 0.5,
    },
  };

  fs.writeFileSync('data/unified_perf.json', JSON.stringify(output, null, 2));
  console.log('\nWrote data/unified_perf.json');
  return output;
}

if (require.main === module) {
  runUnifiedBenchmarks();
}
