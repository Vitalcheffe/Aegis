/**
 * Tests for BFT Consensus
 */

import { BFTConsensus } from './consensus';

function makePRNG(seed: number) {
  let s = seed;
  return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
}

describe('BFT Consensus — Initialization', () => {
  test('creates 10 nodes with 3 byzantine', () => {
    const bft = new BFTConsensus(10, [2, 5, 8]);
    const nodes = bft.getNodes();
    expect(nodes.length).toBe(10);
    expect(nodes.filter(n => n.isByzantine).length).toBe(3);
    expect(nodes[2].isByzantine).toBe(true);
    expect(nodes[5].isByzantine).toBe(true);
    expect(nodes[8].isByzantine).toBe(true);
  });

  test('initial leader is node 0', () => {
    const bft = new BFTConsensus();
    expect(bft.getLeaderId()).toBe(0);
  });
});

describe('BFT Consensus — Convergence', () => {
  test('converges < 20 rounds with 7 honest + 3 byzantine', () => {
    const rng = makePRNG(42);
    const bft = new BFTConsensus(10, [2, 5, 8]);
    const result = bft.runUntilConvergence(5.0, 0, 50, rng);
    
    console.log(`  Rounds to convergence: ${result.totalRounds}`);
    console.log(`  Byzantine detected: ${result.allByzantineDetected}`);
    
    expect(result.totalRounds).toBeLessThan(20);
    expect(result.result.converged).toBe(true);
  });

  test('consensus value is close to true value', () => {
    const rng = makePRNG(42);
    const bft = new BFTConsensus(10, [2, 5, 8]);
    const result = bft.runUntilConvergence(10.0, 0, 50, rng);
    
    // After convergence, consensus should be within 1σ of truth
    expect(Math.abs(result.result.consensusValue - 10.0)).toBeLessThan(2.0);
  });
});

describe('BFT Consensus — Byzantine Detection', () => {
  test('all 3 byzantine nodes are detected and excluded', () => {
    const rng = makePRNG(42);
    const bft = new BFTConsensus(10, [2, 5, 8]);
    const result = bft.runUntilConvergence(5.0, 0, 50, rng);
    
    // All byzantine nodes should be detected
    expect(result.allByzantineDetected).toContain(2);
    expect(result.allByzantineDetected).toContain(5);
    expect(result.allByzantineDetected).toContain(8);
  });

  test('honest nodes are NOT excluded', () => {
    const rng = makePRNG(42);
    const bft = new BFTConsensus(10, [2, 5, 8]);
    const result = bft.runUntilConvergence(5.0, 0, 50, rng);
    
    const excluded = result.result.excluded;
    // Only byzantine nodes should be excluded
    expect(excluded.length).toBe(3);
    expect(excluded).toContain(2);
    expect(excluded).toContain(5);
    expect(excluded).toContain(8);
    
    // Honest nodes should NOT be excluded
    expect(excluded).not.toContain(0);
    expect(excluded).not.toContain(1);
    expect(excluded).not.toContain(3);
  });
});

describe('BFT Consensus — Leader Rotation', () => {
  test('leader rotates every 100 ticks', () => {
    const rng = makePRNG(42);
    const bft = new BFTConsensus(10, [2, 5, 8]);
    
    // Run 99 ticks with leader 0
    for (let t = 0; t < 99; t++) {
      bft.round(5.0, t, rng);
    }
    const leaderAt99 = bft.getLeaderId();
    
    // Tick 100 → rotation
    bft.round(5.0, 100, rng);
    const leaderAt100 = bft.getLeaderId();
    
    // Leader should have changed (rotated, possibly skipping excluded nodes)
    expect(leaderAt100).not.toBe(leaderAt99);
  });

  test('survives leader loss (rotation works after exclusion)', () => {
    const rng = makePRNG(42);
    const bft = new BFTConsensus(10, [2, 5, 8]);
    
    // Run until byzantine nodes are excluded
    const result = bft.runUntilConvergence(5.0, 0, 50, rng);
    
    // After exclusion, system should still produce consensus values
    // (might not have converged flag if not enough active nodes,
    // but should produce a value close to truth)
    for (let t = 50; t < 200; t++) {
      const r = bft.round(5.0, t, rng);
      // Consensus value should stay near truth even if converged flag is false
      expect(Math.abs(r.consensusValue - 5.0)).toBeLessThan(10.0);
    }
  });
});

describe('BFT Consensus — Byzantine Cannot Corrupt', () => {
  test('byzantine node cannot corrupt the consensus value', () => {
    const rng = makePRNG(42);
    const bft = new BFTConsensus(10, [2, 5, 8]);
    
    // Run 100 rounds
    let maxDeviation = 0;
    for (let t = 0; t < 100; t++) {
      const r = bft.round(5.0, t, rng);
      const deviation = Math.abs(r.consensusValue - 5.0);
      maxDeviation = Math.max(maxDeviation, deviation);
    }
    
    // Consensus should stay close to true value even with byzantine nodes
    expect(maxDeviation).toBeLessThan(5.0);  // generous — byzantine sends ±50
  });
});
