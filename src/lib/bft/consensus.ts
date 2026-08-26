// BFT consensus — simplified PBFT, 10 nodes, 3 byzantine

// Types

export interface Node {
  id: number;
  isByzantine: boolean;
  measurement: number;
  excluded: boolean;
  exclusionTick: number;
  deviationCount: number;
}

export interface ConsensusResult {
  consensusValue: number;
  rounds: number;
  byzantineDetected: number[];
  leaderId: number;
  excluded: number[];
  converged: boolean;
}

// PBFT Consensus

export class BFTConsensus {
  private nodes: Node[];
  private f: number;  // max byzantine nodes (n >= 3f+1 → n=10, f=3)
  private n: number;
  private leaderRotationInterval: number = 100;
  private exclusionDuration: number = 100;
  private currentLeader: number = 0;
  private tick: number = 0;

  constructor(n: number = 10, byzantineIndices: number[] = [2, 5, 8]) {
    this.n = n;
    this.f = Math.floor((n - 1) / 3);  // n=10 → f=3
    this.nodes = [];
    for (let i = 0; i < n; i++) {
      this.nodes.push({
        id: i,
        isByzantine: byzantineIndices.includes(i),
        measurement: 0,
        excluded: false,
        exclusionTick: -1,
        deviationCount: 0,
      });
    }
  }

  // Run one consensus round with the given true value.
// Byzantine nodes send random values.
  round(trueValue: number, tick: number, rng: () => number): ConsensusResult {
    this.tick = tick;

    // Leader rotation
    if (tick > 0 && tick % this.leaderRotationInterval === 0) {
      this.currentLeader = (this.currentLeader + 1) % this.n;
      // Skip excluded nodes
      while (this.nodes[this.currentLeader].excluded) {
        this.currentLeader = (this.currentLeader + 1) % this.n;
      }
    }

    // Re-enable excluded nodes after exclusion period
    for (const node of this.nodes) {
      if (node.excluded && tick - node.exclusionTick >= this.exclusionDuration) {
        node.excluded = false;
        node.deviationCount = 0;
      }
    }

    // Phase 1: Each node generates its measurement
    const measurements: number[] = [];
    const activeNodes = this.nodes.filter(n => !n.excluded);
    
    for (const node of activeNodes) {
      if (node.isByzantine) {
        // Byzantine: send a random value far from truth
        node.measurement = trueValue + (rng() - 0.5) * 100;
      } else {
        // Honest: send true value + small noise
        node.measurement = trueValue + (rng() - 0.5) * 2;
      }
      measurements.push(node.measurement);
    }

    // Phase 2: Prepare — compute median and detect deviations
    const sorted = measurements.slice().sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    
    // Compute standard deviation of honest-looking measurements
    const residuals = measurements.map(m => Math.abs(m - median));
    const sortedResiduals = residuals.slice().sort((a, b) => a - b);
    const medianResidual = sortedResiduals[Math.floor(sortedResiduals.length / 2)];
    const sigma = Math.max(medianResidual * 1.4826, 0.1);  // MAD-based σ estimate

    // Detect byzantine nodes (3σ deviation for 3 consecutive rounds)
    const byzantineDetected: number[] = [];
    for (const node of activeNodes) {
      const deviation = Math.abs(node.measurement - median);
      if (deviation > 3 * sigma) {
        node.deviationCount++;
        if (node.deviationCount >= 3) {
          node.excluded = true;
          node.exclusionTick = tick;
          byzantineDetected.push(node.id);
        }
      } else {
        node.deviationCount = Math.max(0, node.deviationCount - 1);
      }
    }

    // Phase 3: Commit — weighted average of non-deviating nodes
    const goodMeasurements = activeNodes
      .filter(n => !n.excluded && Math.abs(n.measurement - median) <= 3 * sigma)
      .map(n => n.measurement);
    
    const consensusValue = goodMeasurements.length > 0
      ? goodMeasurements.reduce((s, v) => s + v, 0) / goodMeasurements.length
      : median;

    const excluded = this.nodes.filter(n => n.excluded).map(n => n.id);
    
    return {
      consensusValue,
      rounds: 1,
      byzantineDetected,
      leaderId: this.currentLeader,
      excluded,
      converged: goodMeasurements.length >= 2 * this.f + 1,
    };
  }

  // Run multiple rounds until consensus converges.
  runUntilConvergence(
    trueValue: number,
    startTick: number,
    maxRounds: number = 50,
    rng: () => number
  ): { result: ConsensusResult; totalRounds: number; allByzantineDetected: number[] } {
    let totalRounds = 0;
    let result: ConsensusResult;
    const allByzantineDetected: number[] = [];
    
    for (let r = 0; r < maxRounds; r++) {
      result = this.round(trueValue, startTick + r, rng);
      totalRounds++;
      
      for (const id of result.byzantineDetected) {
        if (!allByzantineDetected.includes(id)) {
          allByzantineDetected.push(id);
        }
      }
      
      // Check if all byzantine nodes are excluded
      const byzantineNodes = this.nodes.filter(n => n.isByzantine);
      const allExcluded = byzantineNodes.every(n => n.excluded);
      
      if (allExcluded) {
        return { result, totalRounds, allByzantineDetected };
      }
    }
    
    return { result: result!, totalRounds, allByzantineDetected };
  }

  getNodes(): Node[] {
    return this.nodes;
  }

  getLeaderId(): number {
    return this.currentLeader;
  }
}
