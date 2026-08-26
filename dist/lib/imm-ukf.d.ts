/**
 * IMM-UKF with homogeneous 9-state models (CV, CA, CT, Singer)
 * All models share the same state dimension → no cross-dimension projection needed.
 */
import { MotionModel } from './models/motion-models';
interface ModelDef {
    name: MotionModel;
    transition: (x: number[], dt: number) => number[];
    measurement: (x: number[]) => number[];
    Q: (dt: number) => number[][];
    R: number[][];
}
export interface IMMResult {
    x: number[];
    P: number[][];
    modelProbs: Record<string, number>;
}
export declare class IMMUKF {
    private models;
    private probs;
    private tpm;
    constructor(models: ModelDef[], initialProbs?: number[], tpm?: number[][]);
    private defaultTPM;
    step(z: number[], dt: number): IMMResult;
    getProbs(): Record<string, number>;
}
export declare function createStandardIMM(): IMMUKF;
export {};
