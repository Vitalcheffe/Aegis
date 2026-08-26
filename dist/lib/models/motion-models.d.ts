/**
 * Motion Models — ALL 9-state (homogeneous for IMM compatibility)
 *
 * Four motion models, all using the same 9-state vector:
 *   x = [x, y, z, vx, vy, vz, ax, ay, az]
 *
 * 1. CV (Constant Velocity): acceleration = 0, velocity random walk
 * 2. CA (Constant Acceleration): acceleration random walk (default in ukf.ts)
 * 3. CT (Coordinated Turn): acceleration derived from turn rate
 * 4. Singer: acceleration decays exponentially (a' = a*exp(-dt/τ))
 *
 * By using homogeneous dimensions, the IMM mixing is numerically stable.
 */
export type MotionModel = 'CV' | 'CA' | 'CT' | 'Singer';
export declare const STATE_DIM = 9;
export declare const stateNames: string[];
export declare function cvTransition(x: number[], dt: number): number[];
export declare function cvMeasurement(x: number[]): number[];
export declare function cvDefaultQ(dt: number): number[][];
export declare function caTransition(x: number[], dt: number): number[];
export declare function caMeasurement(x: number[]): number[];
export declare function caDefaultQ(dt: number): number[][];
export declare function ctTransition(x: number[], dt: number): number[];
export declare function ctMeasurement(x: number[]): number[];
export declare function ctDefaultQ(dt: number): number[][];
export declare function singerTransition(x: number[], dt: number): number[];
export declare function singerMeasurement(x: number[]): number[];
export declare function singerDefaultQ(dt: number): number[][];
export declare function defaultR(): number[][];
export interface MotionModelSpec {
    name: MotionModel;
    transition: (x: number[], dt: number) => number[];
    measurement: (x: number[]) => number[];
    defaultQ: (dt: number) => number[][];
    defaultR: () => number[][];
}
export declare const motionModels: Record<MotionModel, MotionModelSpec>;
export declare function initialState(): {
    x: number[];
    P: number[][];
};
