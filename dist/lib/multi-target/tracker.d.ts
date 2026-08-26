/**
 * Multi-Target Tracker with GNN (Global Nearest Neighbor) Association
 *
 * Tracks multiple targets simultaneously using:
 *   - UKF per target for state estimation
 *   - Mahalanobis distance for measurement-to-track association
 *   - Greedy sorted assignment (cost matrix sorted, lowest cost first)
 *   - Track birth: 2 consecutive unassociated measurements → new track
 *   - Track death: 8 steps without association → track deleted
 *
 * Reference: Bar-Shalom et al. (2001), Chapter 6 (Data Association)
 */
import { State } from '../ukf';
export interface Track {
    id: number;
    state: State;
    lastAssociatedStep: number;
    birthStep: number;
    age: number;
    unassociatedCount: number;
    confirmed: boolean;
    pendingMeasurements: number[][];
    alive: boolean;
}
export interface AssociationResult {
    assignments: Array<{
        trackId: number;
        measurement: number[];
        distance: number;
    }>;
    unassignedMeasurements: number[][];
    unassignedTracks: number[];
}
export interface TrackerResult {
    tracks: Track[];
    assignments: AssociationResult;
    idSwitches: number;
}
export declare class MultiTargetTracker {
    private tracks;
    private nextId;
    private idSwitches;
    private birthThreshold;
    private deathThreshold;
    private dt;
    private Q;
    private R;
    constructor(dt?: number, Q?: number[][], R?: number[][]);
    /**
     * Process a set of measurements for the current step.
     * Returns assignment results and updated tracks.
     */
    step(measurements: number[][], currentStep: number): TrackerResult;
    /**
     * GNN association using Mahalanobis distance.
     * Greedy: sort all (track, measurement) pairs by distance, assign lowest first.
     */
    private associate;
    /**
     * Compute Mahalanobis distance between track state and measurement.
     * d² = (z - h(x̂))ᵀ S⁻¹ (z - h(x̂))
     * where S = H P Hᵀ + R (approximated by position diagonal + R)
     */
    private mahalanobisDistance;
    /**
     * Handle unassigned measurement — potentially start a new track.
     * Birth: 2 consecutive unassociated measurements in same region → new track.
     */
    private handleUnassignedMeasurement;
    /**
     * Predict-only step (no measurement update).
     * Uses the UKF predict step with a dummy measurement that's far away
     * (so the gate rejects it and only prediction happens).
     */
    private predictOnly;
    /**
     * Get all alive, confirmed tracks.
     */
    getActiveTracks(): Track[];
    /**
     * Get track by ID.
     */
    getTrack(id: number): Track | undefined;
    /**
     * Get total ID switches (tracks that switched their associated true target).
     */
    getIdSwitches(): number;
}
