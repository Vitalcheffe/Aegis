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

import { ukfStep, initialState, defaultProcessNoise, defaultMeasurementNoise, State } from '../ukf';

// ============================================================================
// Types
// ============================================================================

export interface Track {
  id: number;
  state: State;
  lastAssociatedStep: number;
  birthStep: number;
  age: number;
  unassociatedCount: number;  // consecutive steps without association
  confirmed: boolean;  // true after 2 consecutive associations
  pendingMeasurements: number[][];  // measurements awaiting confirmation
  alive: boolean;
}

export interface AssociationResult {
  assignments: Array<{ trackId: number; measurement: number[]; distance: number }>;
  unassignedMeasurements: number[][];
  unassignedTracks: number[];  // track IDs with no measurement this step
}

export interface TrackerResult {
  tracks: Track[];
  assignments: AssociationResult;
  idSwitches: number;
}

// ============================================================================
// Tracker
// ============================================================================

export class MultiTargetTracker {
  private tracks: Map<number, Track> = new Map();
  private nextId: number = 1;
  private idSwitches: number = 0;
  private birthThreshold: number = 2;  // consecutive unassociated measurements
  private deathThreshold: number = 8;   // steps without association
  private dt: number;
  private Q: number[][];
  private R: number[][];

  constructor(dt: number = 0.1, Q?: number[][], R?: number[][]) {
    this.dt = dt;
    this.Q = Q || defaultProcessNoise(dt);
    this.R = R || defaultMeasurementNoise();
  }

  /**
   * Process a set of measurements for the current step.
   * Returns assignment results and updated tracks.
   */
  step(measurements: number[][], currentStep: number): TrackerResult {
    // 1. Predict all alive tracks forward (predict-only, no measurement update)
    for (const track of this.tracks.values()) {
      if (track.alive) {
        track.state = this.predictOnly(track.state);
        track.age++;
      }
    }

    // 2. Compute association cost matrix (Mahalanobis distance)
    const aliveTracks = Array.from(this.tracks.values()).filter(t => t.alive);
    const assignment = this.associate(aliveTracks, measurements, currentStep);

    // 3. Update matched tracks
    for (const a of assignment.assignments) {
      const track = this.tracks.get(a.trackId);
      if (track) {
        track.state = ukfStep(track.state, a.measurement, this.dt, this.Q, this.R);
        track.lastAssociatedStep = currentStep;
        track.unassociatedCount = 0;
        if (!track.confirmed && track.pendingMeasurements.length >= 1) {
          track.confirmed = true;
        }
      }
    }

    // 4. Handle unassigned tracks (increment unassociated count)
    for (const trackId of assignment.unassignedTracks) {
      const track = this.tracks.get(trackId);
      if (track) {
        track.unassociatedCount++;
        // Predict only (no measurement update)
        track.state = this.predictOnly(track.state);
        if (track.unassociatedCount >= this.deathThreshold) {
          track.alive = false;
        }
      }
    }

    // 5. Handle unassigned measurements (potential new tracks)
    for (const meas of assignment.unassignedMeasurements) {
      this.handleUnassignedMeasurement(meas, currentStep);
    }

    // 6. Clean up dead tracks (but keep pending tracks for birth)
    for (const [id, track] of this.tracks) {
      if (track.alive === false && track.pendingMeasurements.length === 0) {
        // Dead track with no pending measurements — delete
        this.tracks.delete(id);
      } else if (track.alive === false && track.pendingMeasurements.length > 0) {
        // Pending track — check if it's too old (stale pending)
        if (currentStep - track.birthStep > 5) {
          this.tracks.delete(id);  // stale pending, never confirmed
        }
      }
    }

    return {
      tracks: Array.from(this.tracks.values()),
      assignments: assignment,
      idSwitches: this.idSwitches,
    };
  }

  /**
   * GNN association using Mahalanobis distance.
   * Greedy: sort all (track, measurement) pairs by distance, assign lowest first.
   */
  private associate(tracks: Track[], measurements: number[][], currentStep: number): AssociationResult {
    const assignments: Array<{ trackId: number; measurement: number[]; distance: number }> = [];
    const assignedTracks = new Set<number>();
    const assignedMeasurements = new Set<number>();

    // Compute all pairwise distances
    const pairs: Array<{ trackIdx: number; measIdx: number; distance: number }> = [];
    for (let ti = 0; ti < tracks.length; ti++) {
      const track = tracks[ti];
      for (let mi = 0; mi < measurements.length; mi++) {
        const dist = this.mahalanobisDistance(track.state, measurements[mi]);
        pairs.push({ trackIdx: ti, measIdx: mi, distance: dist });
      }
    }

    // Sort by distance (lowest first = greedy GNN)
    pairs.sort((a, b) => a.distance - b.distance);

    // Assign greedily
    for (const pair of pairs) {
      if (assignedTracks.has(pair.trackIdx) || assignedMeasurements.has(pair.measIdx)) continue;
      
      // Gate: only assign if within reasonable Mahalanobis distance
      // χ²(3, 95%) = 7.815
      if (pair.distance > 20.0) continue;  // generous gate for tracking

      assignedTracks.add(pair.trackIdx);
      assignedMeasurements.add(pair.measIdx);
      assignments.push({
        trackId: tracks[pair.trackIdx].id,
        measurement: measurements[pair.measIdx],
        distance: pair.distance,
      });
    }

    // Unassigned measurements
    const unassignedMeasurements = measurements.filter((_, mi) => !assignedMeasurements.has(mi));

    // Unassigned tracks
    const unassignedTracks = tracks
      .filter((_, ti) => !assignedTracks.has(ti))
      .map(t => t.id);

    return { assignments, unassignedMeasurements, unassignedTracks };
  }

  /**
   * Compute Mahalanobis distance between track state and measurement.
   * d² = (z - h(x̂))ᵀ S⁻¹ (z - h(x̂))
   * where S = H P Hᵀ + R (approximated by position diagonal + R)
   */
  private mahalanobisDistance(state: State, measurement: number[]): number {
    const innov = [
      measurement[0] - state.x[0],
      measurement[1] - state.x[1],
      measurement[2] - state.x[2],
    ];

    // Approximate S = diag(P_pos) + R
    const S = [
      [state.P[0][0] + this.R[0][0], 0, 0],
      [0, state.P[1][1] + this.R[1][1], 0],
      [0, 0, state.P[2][2] + this.R[2][2]],
    ];

    // d² = νᵀ S⁻¹ ν
    const det = S[0][0] * S[1][1] * S[2][2];
    const d2 = (innov[0] * innov[0] / S[0][0]) +
               (innov[1] * innov[1] / S[1][1]) +
               (innov[2] * innov[2] / S[2][2]);

    return d2;
  }

  /**
   * Handle unassigned measurement — potentially start a new track.
   * Birth: 2 consecutive unassociated measurements in same region → new track.
   */
  private handleUnassignedMeasurement(measurement: number[], currentStep: number): void {
    // Check if this measurement is close to any pending birth
    let found = false;
    for (const track of this.tracks.values()) {
      if (!track.alive && track.pendingMeasurements.length > 0) {
        const last = track.pendingMeasurements[track.pendingMeasurements.length - 1];
        const dist = Math.sqrt(
          (measurement[0] - last[0])**2 +
          (measurement[1] - last[1])**2 +
          (measurement[2] - last[2])**2
        );
        if (dist < 5.0) {  // within 5m of last unassigned measurement
          track.pendingMeasurements.push(measurement);
          if (track.pendingMeasurements.length >= this.birthThreshold) {
            // Birth confirmed — activate track
            track.alive = true;
            track.confirmed = true;
            track.birthStep = currentStep;
            track.lastAssociatedStep = currentStep;
            // Initialize state from average of pending measurements
            const avg = [0, 0, 0];
            for (const m of track.pendingMeasurements) {
              avg[0] += m[0]; avg[1] += m[1]; avg[2] += m[2];
            }
            track.state.x[0] = avg[0] / track.pendingMeasurements.length;
            track.state.x[1] = avg[1] / track.pendingMeasurements.length;
            track.state.x[2] = avg[2] / track.pendingMeasurements.length;
            track.pendingMeasurements = [];
          }
          found = true;
          break;
        }
      }
    }

    if (!found) {
      // Create a pending track (not yet alive)
      const id = this.nextId++;
      this.tracks.set(id, {
        id,
        state: initialState(),
        lastAssociatedStep: currentStep,
        birthStep: currentStep,
        age: 0,
        unassociatedCount: 0,
        confirmed: false,
        pendingMeasurements: [measurement],
        alive: false,
      });
    }
  }

  /**
   * Predict-only step (no measurement update).
   * Uses the UKF predict step with a dummy measurement that's far away
   * (so the gate rejects it and only prediction happens).
   */
  private predictOnly(state: State): State {
    // Simple prediction: advance state using CA model, inflate covariance
    const dt = this.dt;
    const newState = { x: state.x.slice(), P: state.P.map(r => r.slice()) };
    
    // CA transition: x' = x + v*dt + 0.5*a*dt²
    for (let i = 0; i < 3; i++) {
      newState.x[i] = state.x[i] + state.x[3+i] * dt + 0.5 * state.x[6+i] * dt * dt;
      newState.x[3+i] = state.x[3+i] + state.x[6+i] * dt;
    }
    
    // Inflate covariance (add Q)
    const Q = this.Q;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        newState.P[i][j] += Q[i][j];
      }
    }
    
    return newState;
  }

  /**
   * Get all alive, confirmed tracks.
   */
  getActiveTracks(): Track[] {
    return Array.from(this.tracks.values()).filter(t => t.alive && t.confirmed);
  }

  /**
   * Get track by ID.
   */
  getTrack(id: number): Track | undefined {
    return this.tracks.get(id);
  }

  /**
   * Get total ID switches (tracks that switched their associated true target).
   */
  getIdSwitches(): number {
    return this.idSwitches;
  }
}
