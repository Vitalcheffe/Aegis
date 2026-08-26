/**
 * Byzantine Fault Tolerant Consensus — Simplified PBFT
 *
 * 10 nodes, 3 Byzantine (that send random/wrong values).
 * Protocol: pre-prepare → prepare → commit
 *
 * Leader broadcasts a proposed value (pre-prepare).
 * Each node sends its measurement to all others (prepare phase).
 * If ≥ 2f+1 nodes agree (7 out of 10, f=3), consensus is reached.
 * Byzantine nodes are detected via 3σ cross-validation: if a node's
 * value deviates from the median by > 3σ for 3 consecutive rounds,
 * it is flagged and excluded for 100 ticks.
 *
 * Leader rotation: deterministic, every 100 ticks.
 *
 * References:
 *   Castro, M., & Liskov, B. (1999). "Practical Byzantine Fault
 *   Tolerance." OSDI '99.
 */
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
export declare class BFTConsensus {
    private nodes;
    private f;
    private n;
    private leaderRotationInterval;
    private exclusionDuration;
    private currentLeader;
    private tick;
    constructor(n?: number, byzantineIndices?: number[]);
    /**
     * Run one consensus round with the given true value.
     * Byzantine nodes send random values.
     */
    round(trueValue: number, tick: number, rng: () => number): ConsensusResult;
    /**
     * Run multiple rounds until consensus converges.
     */
    runUntilConvergence(trueValue: number, startTick: number, maxRounds: number, rng: () => number): {
        result: ConsensusResult;
        totalRounds: number;
        allByzantineDetected: number[];
    };
    getNodes(): Node[];
    getLeaderId(): number;
}
