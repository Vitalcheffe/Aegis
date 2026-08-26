/**
 * Unified Performance Benchmark — A12, A13, A14 in ONE harness
 *
 * Same methodology for all three: warmup 100, measure 1000, performance.now().
 * Pre-allocated buffers, pre-computed sigma point weights.
 * Breakdown by phase for A14 (predict, GNN associate, update).
 */
export declare function runUnifiedBenchmarks(): {
    timestamp: string;
    machine: string;
    runtime: string;
    warmup: number;
    iterations: number;
    a12: {
        with_allocation: number;
        amortized: number;
        threshold: number;
        pass: boolean;
    };
    a13: {
        with_constructor: number;
        amortized: number;
        threshold: number;
        pass: boolean;
    };
    a14: {
        total: number;
        per_target: number;
        threshold: number;
        pass: boolean;
    };
    cross_check: {
        fifty_times_a12: number;
        a14_total: number;
        ratio: number;
        consistent: boolean;
    };
};
