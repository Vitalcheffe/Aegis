// Spectral fusion — full covariance with power iteration
// TODO: power iteration converges slowly on rank-deficient R

// Types

export interface SensorReading {
  sensorId: number;
  value: number;
  variance: number;
  distanceBin: number;
}

export interface FusionResult {
  fusedValue: number;
  fusedVariance: number;
  weights: number[];
  method: 'spectral' | 'weighted_average';
}

// Power Iteration for principal eigenvector

export function powerIteration(
  matrix: number[][],
  iterations: number = 100,
  tolerance: number = 1e-8
): { eigenvalue: number; eigenvector: number[] } {
  const n = matrix.length;
  
  // Start with uniform vector
  let v = new Array(n).fill(1 / Math.sqrt(n));
  
  let eigenvalue = 0;
  for (let iter = 0; iter < iterations; iter++) {
    // Multiply: w = matrix * v
    const w = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        w[i] += matrix[i][j] * v[j];
      }
    }
    
    // Compute norm
    const norm = Math.sqrt(w.reduce((s, x) => s + x * x, 0));
    if (norm < 1e-15) break;
    
    // Normalize
    const newV = w.map(x => x / norm);
    
    // Eigenvalue estimate: Rayleigh quotient
    let newEigenvalue = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        newEigenvalue += newV[i] * matrix[i][j] * newV[j];
      }
    }
    
    // Convergence check
    if (Math.abs(newEigenvalue - eigenvalue) < tolerance) {
      return { eigenvalue: newEigenvalue, eigenvector: newV };
    }
    
    eigenvalue = newEigenvalue;
    v = newV;
  }
  
  return { eigenvalue, eigenvector: v };
}

// Spectral Fusion

export class SpectralFusion {
  private nSensors: number;
  private nBins: number;
  private reliabilityMatrix: number[][];  // [sensor][bin] = reliability (0-1)
  private spectralWeights: number[][];
  private baselineWeights: number[][];

  constructor(nSensors: number = 5, nBins: number = 6) {
    this.nSensors = nSensors;
    this.nBins = nBins;
    
    // Initialize reliability matrix (sensors × distance bins)
    // Default: all sensors equally reliable at all distances
    this.reliabilityMatrix = [];
    for (let s = 0; s < nSensors; s++) {
      this.reliabilityMatrix.push(new Array(nBins).fill(1.0 / nSensors));
    }
    
    this.spectralWeights = this.computeSpectralWeights();
    this.baselineWeights = this.computeBaselineWeights();
  }

  // Set sensor reliability for a specific distance bin.
// reliability ∈ [0, 1] where 1 = perfectly reliable, 0 = useless.
  setReliability(sensorId: number, binId: number, reliability: number): void {
    this.reliabilityMatrix[sensorId][binId] = reliability;
    this.spectralWeights = this.computeSpectralWeights();
    this.baselineWeights = this.computeBaselineWeights();
  }

  // Set correlated degradation (e.g., cloud cover degrades optical + IR together).
  setCorrelatedDegradation(sensorIds: number[], binId: number, factor: number): void {
    for (const s of sensorIds) {
      this.reliabilityMatrix[s][binId] *= factor;
    }
    this.spectralWeights = this.computeSpectralWeights();
    this.baselineWeights = this.computeBaselineWeights();
  }

  // Compute spectral weights via power iteration on reliability matrix.
// The principal eigenvector captures the correlation structure.
// Sensors that are correlated (both degrade together) get DOWN-weighted
// more than independent sensors, because they provide less independent
// information.
  private computeSpectralWeights(): number[][] {
    // Build sensor × sensor correlation matrix
    // High off-diagonal = sensors are correlated → less independent info
    const corrMatrix: number[][] = [];
    for (let i = 0; i < this.nSensors; i++) {
      const row: number[] = [];
      for (let j = 0; j < this.nSensors; j++) {
        // Correlation = sum over bins of (reliability_i * reliability_j)
        // When both are high → high correlation → less independent info
        let corr = 0;
        for (let b = 0; b < this.nBins; b++) {
          corr += this.reliabilityMatrix[i][b] * this.reliabilityMatrix[j][b];
        }
        // Penalize correlation: diagonal stays, off-diagonal reduces weight
        if (i === j) {
          row.push(corr);  // self-reliance
        } else {
          // Anti-correlation penalty: more correlation → less weight
          row.push(-corr * 0.5);  // negative = penalize correlation
        }
      }
      corrMatrix.push(row);
    }
    
    // Principal eigenvector via power iteration
    const { eigenvalue, eigenvector } = powerIteration(corrMatrix);
    
    // Weights per bin: eigenvector weighted by per-bin reliability
    // Take absolute value (eigenvector can be negative)
    const absEigen = eigenvector.map(v => Math.abs(v));
    const eigenSum = absEigen.reduce((a, b) => a + b, 0) || 1;
    const normalizedEigen = absEigen.map(v => v / eigenSum);
    
    const weights: number[][] = [];
    for (let b = 0; b < this.nBins; b++) {
      const binWeights: number[] = [];
      for (let s = 0; s < this.nSensors; s++) {
        // Weight = eigenvector (independence score) × reliability
        binWeights.push(normalizedEigen[s] * this.reliabilityMatrix[s][b]);
      }
      // Normalize
      const sum = binWeights.reduce((a, b) => a + b, 0);
      if (sum > 0) {
        for (let s = 0; s < this.nSensors; s++) {
          binWeights[s] /= sum;
        }
      }
      weights.push(binWeights);
    }
    
    return weights;
  }

  // Baseline: inverse-variance weighted average (ignores correlation).
  private computeBaselineWeights(): number[][] {
    const weights: number[][] = [];
    for (let b = 0; b < this.nBins; b++) {
      const binWeights: number[] = [];
      for (let s = 0; s < this.nSensors; s++) {
        // Weight = 1 / variance = reliability (simplified)
        binWeights.push(this.reliabilityMatrix[s][b]);
      }
      const sum = binWeights.reduce((a, b) => a + b, 0);
      if (sum > 0) {
        for (let s = 0; s < this.nSensors; s++) {
          binWeights[s] /= sum;
        }
      }
      weights.push(binWeights);
    }
    return weights;
  }

  // Fuse sensor readings using spectral weights.
// Explicitly accounts for correlated noise: when sensors are correlated,
// their combined variance is inflated, and the spectral method down-weights
// them more aggressively than the baseline (which assumes independence).
  fuseSpectral(readings: SensorReading[]): FusionResult {
    const binId = readings[0].distanceBin;
    
    // Build effective covariance matrix accounting for correlations
    // If sensors i and j are correlated (both degraded together), their
    // effective covariance = σ_i * σ_j * ρ_ij (ρ > 0)
    // The optimal fusion under correlated noise uses:
    //   w = Σ⁻¹ 1 / (1ᵀ Σ⁻¹ 1)
    // where Σ is the full covariance matrix.
    
    const n = readings.length;
    const covMatrix: number[][] = [];
    for (let i = 0; i < n; i++) {
      const row: number[] = [];
      for (let j = 0; j < n; j++) {
        if (i === j) {
          // Diagonal: sensor variance
          row.push(readings[i].variance);
        } else {
          // Off-diagonal: covariance from correlation
          // Detect correlation: if both sensors have similar (low) reliability,
          // they're likely correlated (both degraded by same factor like cloud)
          const ri = this.reliabilityMatrix[readings[i].sensorId]?.[binId] ?? 1;
          const rj = this.reliabilityMatrix[readings[j].sensorId]?.[binId] ?? 1;
          // Correlation coefficient: high when both reliability values are similar
          // AND both are below 1 (degraded together)
          const bothDegraded = (1 - ri) * (1 - rj);  // 0 if either is perfect, >0 if both degraded
          const corrCoeff = bothDegraded * 0.8;  // up to 0.8 correlation
          const cov = Math.sqrt(readings[i].variance * readings[j].variance) * corrCoeff;
          row.push(cov);
        }
      }
      covMatrix.push(row);
    }
    
    // Optimal weights: w = Σ⁻¹ 1 / (1ᵀ Σ⁻¹ 1)
    // Compute Σ⁻¹ 1 (inverse of covariance times ones vector)
    const ones = new Array(n).fill(1);
    const invCovOnes = this.solveLinearSystem(covMatrix, ones);
    
    // Normalize: w_i = (Σ⁻¹ 1)_i / sum(Σ⁻¹ 1)
    const sumInv = invCovOnes.reduce((a, b) => a + b, 0);
    const weights = invCovOnes.map(v => sumInv > 0 ? v / sumInv : 1 / n);
    
    let fusedValue = 0;
    let fusedVariance = 0;
    
    for (let i = 0; i < n; i++) {
      fusedValue += weights[i] * readings[i].value;
      for (let j = 0; j < n; j++) {
        fusedVariance += weights[i] * weights[j] * covMatrix[i][j];
      }
    }
    
    return {
      fusedValue,
      fusedVariance,
      weights,
      method: 'spectral',
    };
  }
  
  // Solve Ax = b using Gaussian elimination (for small matrices).
  private solveLinearSystem(A: number[][], b: number[]): number[] {
    const n = A.length;
    // Augmented matrix
    const aug: number[][] = A.map((row, i) => [...row, b[i]]);
    
    // Forward elimination with partial pivoting
    for (let i = 0; i < n; i++) {
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(aug[k][i]) > Math.abs(aug[maxRow][i])) maxRow = k;
      }
      [aug[i], aug[maxRow]] = [aug[maxRow], aug[i]];
      
      const pivot = aug[i][i];
      if (Math.abs(pivot) < 1e-15) {
        // Singular — return uniform weights
        return new Array(n).fill(1 / n);
      }
      
      for (let k = i + 1; k < n; k++) {
        const factor = aug[k][i] / pivot;
        for (let j = i; j <= n; j++) {
          aug[k][j] -= factor * aug[i][j];
        }
      }
    }
    
    // Back substitution
    const x = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      let sum = aug[i][n];
      for (let j = i + 1; j < n; j++) {
        sum -= aug[i][j] * x[j];
      }
      x[i] = sum / aug[i][i];
    }
    
    return x;
  }

  // Fuse sensor readings using baseline (inverse-variance) weights.
  fuseBaseline(readings: SensorReading[]): FusionResult {
    const binId = readings[0].distanceBin;
    const weights = this.baselineWeights[binId] || new Array(this.nSensors).fill(1 / this.nSensors);
    
    let fusedValue = 0;
    let fusedVariance = 0;
    
    for (const r of readings) {
      const w = weights[r.sensorId] || 0;
      fusedValue += w * r.value;
      fusedVariance += w * w * r.variance;
    }
    
    return {
      fusedValue,
      fusedVariance,
      weights,
      method: 'weighted_average',
    };
  }

  getWeights(): { spectral: number[][]; baseline: number[][] } {
    return { spectral: this.spectralWeights, baseline: this.baselineWeights };
  }
}
