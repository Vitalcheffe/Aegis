/**
 * Performance Benchmarks for UKF and IMM
 *
 * Measures actual execution time using performance.now()
 * with warmup cycles and 1000-iteration averages.
 */

import { ukfStep, initialState, defaultProcessNoise, defaultMeasurementNoise } from './ukf';
import { createStandardIMM } from './imm-ukf';
import * as fs from 'fs';

const WARMUP = 100;
const ITERATIONS = 1000;

function bench(name: string, fn: () => void): { name: string; avgMs: number; totalMs: number } {
  // Warmup
  for (let i = 0; i < WARMUP; i++) fn();
  
  // Measure
  const start = performance.now();
  for (let i = 0; i < ITERATIONS; i++) fn();
  const total = performance.now() - start;
  
  return {
    name,
    avgMs: total / ITERATIONS,
    totalMs: total,
  };
}

export function runPerformanceBenchmarks() {
  const dt = 0.1;
  const Q = defaultProcessNoise(dt);
  const R = defaultMeasurementNoise();
  const z = [1.0, 0.5, 0.3];
  
  // A12: UKF single update
  const ukfResult = bench('A12: UKF single update (9-state)', () => {
    let state = initialState();
    state = ukfStep(state, z, dt, Q, R);
  });
  
  // A13: IMM complete cycle (4 models)
  const immResult = bench('A13: IMM complete cycle (4 models)', () => {
    const imm = createStandardIMM();
    imm.step(z, dt);
  });
  
  // A14: 50 targets × GNN + update (simulated — no GNN yet, just 50 UKF steps)
  const multiTargetResult = bench('A14: 50 targets × UKF update', () => {
    const states = Array.from({ length: 50 }, () => initialState());
    for (let i = 0; i < 50; i++) {
      states[i] = ukfStep(states[i], z, dt, Q, R);
    }
  });
  
  console.log('Performance Benchmarks');
  console.log('======================');
  console.log(`Machine: ${process.platform} ${process.arch}`);
  console.log(`Runtime: bun ${Bun.version}`);
  console.log(`Warmup: ${WARMUP} cycles, Measurement: ${ITERATIONS} cycles`);
  console.log('');
  console.log(`${ukfResult.name}: ${ukfResult.avgMs.toFixed(4)} ms/update (total ${ukfResult.totalMs.toFixed(1)}ms)`);
  console.log(`${immResult.name}: ${immResult.avgMs.toFixed(4)} ms/cycle (total ${immResult.totalMs.toFixed(1)}ms)`);
  console.log(`${multiTargetResult.name}: ${multiTargetResult.avgMs.toFixed(4)} ms/cycle (total ${multiTargetResult.totalMs.toFixed(1)}ms)`);
  console.log('');
  console.log('Gate results:');
  console.log(`  A12 (< 1 ms):  ${ukfResult.avgMs < 1.0 ? 'PASS' : 'FAIL'} (${ukfResult.avgMs.toFixed(4)} ms)`);
  console.log(`  A13 (< 5 ms):  ${immResult.avgMs < 5.0 ? 'PASS' : 'FAIL'} (${immResult.avgMs.toFixed(4)} ms)`);
  console.log(`  A14 (< 20 ms): ${multiTargetResult.avgMs < 20.0 ? 'PASS' : 'FAIL'} (${multiTargetResult.avgMs.toFixed(4)} ms)`);
  
  // Save to file
  const output = {
    timestamp: new Date().toISOString(),
    machine: `${process.platform} ${process.arch}`,
    runtime: `bun ${Bun.version}`,
    warmup: WARMUP,
    iterations: ITERATIONS,
    results: [
      { gate: 'A12', name: 'UKF single update', avgMs: ukfResult.avgMs, threshold: 1.0, pass: ukfResult.avgMs < 1.0 },
      { gate: 'A13', name: 'IMM complete cycle', avgMs: immResult.avgMs, threshold: 5.0, pass: immResult.avgMs < 5.0 },
      { gate: 'A14', name: '50 targets UKF update', avgMs: multiTargetResult.avgMs, threshold: 20.0, pass: multiTargetResult.avgMs < 20.0 },
    ],
  };
  
  fs.writeFileSync('data/perf_benchmark.json', JSON.stringify(output, null, 2));
  console.log('\nWrote data/perf_benchmark.json');
  
  return output;
}

// CLI
if (require.main === module) {
  runPerformanceBenchmarks();
}
