/**
 * Performance Benchmarks for UKF and IMM
 *
 * Measures actual execution time using performance.now()
 * with warmup cycles and 1000-iteration averages.
 */
export declare function runPerformanceBenchmarks(): {
    timestamp: string;
    machine: string;
    runtime: string;
    warmup: number;
    iterations: number;
    results: {
        gate: string;
        name: string;
        avgMs: number;
        threshold: number;
        pass: boolean;
    }[];
};
