/**
 * IMM-UKF with homogeneous 9-state models (CV, CA, CT, Singer)
 * All models share the same state dimension → no cross-dimension projection needed.
 */

import {
  cvTransition, cvMeasurement, cvDefaultQ,
  caTransition, caMeasurement, caDefaultQ,
  ctTransition, ctMeasurement, ctDefaultQ,
  singerTransition, singerMeasurement, singerDefaultQ,
  defaultR, initialState, MotionModel,
} from './models/motion-models';

// Matrix helpers
function zeros(r: number, c = r) { return Array.from({length:r}, () => new Array(c).fill(0)); }
function identity(n: number) { const M = zeros(n,n); for (let i=0;i<n;i++) M[i][i]=1; return M; }
function matadd(A:number[][],B:number[][]) { return A.map((r,i)=>r.map((v,j)=>v+B[i][j])); }
function matsub(A:number[][],B:number[][]) { return A.map((r,i)=>r.map((v,j)=>v-B[i][j])); }
function matscale(A:number[][],s:number) { return A.map(r=>r.map(v=>v*s)); }
function matmul(A:number[][],B:number[][]) { const r=A.length,k=A[0].length,c=B[0].length; const C=zeros(r,c); for(let i=0;i<r;i++)for(let j=0;j<c;j++){let s=0;for(let m=0;m<k;m++)s+=A[i][m]*B[m][j];C[i][j]=s;} return C; }
function transpose(A:number[][]) { const r=A.length,c=A[0].length; const T=zeros(c,r); for(let i=0;i<r;i++)for(let j=0;j<c;j++)T[j][i]=A[i][j]; return T; }
function matvec(A:number[][],v:number[]) { const r=A.length,c=A[0].length; const o=new Array(r).fill(0); for(let i=0;i<r;i++){let s=0;for(let j=0;j<c;j++)s+=A[i][j]*v[j];o[i]=s;} return o; }
function vecadd(a:number[],b:number[]) { return a.map((x,i)=>x+b[i]); }
function vecsub(a:number[],b:number[]) { return a.map((x,i)=>x-b[i]); }
function outer(a:number[],b:number[]) { const r=a.length,c=b.length; const M=zeros(r,c); for(let i=0;i<r;i++)for(let j=0;j<c;j++)M[i][j]=a[i]*b[j]; return M; }
function cholesky(A:number[][]) { const n=A.length; const L=zeros(n,n); for(let i=0;i<n;i++){for(let j=0;j<=i;j++){let s=A[i][j];for(let k=0;k<j;k++)s-=L[i][k]*L[j][k];if(i===j)L[i][j]=Math.sqrt(Math.max(s,1e-10));else L[i][j]=s/L[j][j];}} return L; }

const ALPHA=1e-3,BETA=2,KAPPA=0;
function computeLambda(L:number){return ALPHA*ALPHA*(L+KAPPA)-L;}

interface ModelDef { name: MotionModel; transition: (x:number[],dt:number)=>number[]; measurement:(x:number[])=>number[]; Q:(dt:number)=>number[][]; R:number[][]; }

interface UKFResult { x:number[]; P:number[][]; likelihood:number; }

function ukfPredictUpdate(state:{x:number[];P:number[][]}, z:number[], dt:number, model:ModelDef): UKFResult {
  const x=state.x, P=state.P, L=x.length, m=z.length;
  const lambda=computeLambda(L);
  const scaledP=matscale(P,L+lambda);
  const sqrtP=cholesky(scaledP);
  const points=[x.slice()];
  for(let i=0;i<L;i++){const off=new Array(L).fill(0);for(let j=0;j<L;j++)off[j]=sqrtP[j][i];points.push(vecadd(x,off));}
  for(let i=0;i<L;i++){const off=new Array(L).fill(0);for(let j=0;j<L;j++)off[j]=sqrtP[j][i];points.push(vecsub(x,off));}
  const Wm=new Array(2*L+1).fill(0), Wc=new Array(2*L+1).fill(0);
  Wm[0]=lambda/(L+lambda); Wc[0]=Wm[0]+(1-ALPHA*ALPHA+BETA);
  const w=1/(2*(L+lambda));
  for(let i=1;i<=2*L;i++){Wm[i]=w;Wc[i]=w;}

  // Predict
  const propPts=points.map(p=>model.transition(p,dt));
  const x_pred=new Array(L).fill(0);
  for(let i=0;i<propPts.length;i++)for(let j=0;j<L;j++)x_pred[j]+=Wm[i]*propPts[i][j];
  const P_pred=zeros(L,L);
  for(let i=0;i<propPts.length;i++){const d=vecsub(propPts[i],x_pred);const od=outer(d,d);for(let r=0;r<L;r++)for(let c=0;c<L;c++)P_pred[r][c]+=Wc[i]*od[r][c];}
  const Q=model.Q(dt);
  const P_Q=matadd(P_pred,Q);

  // Update
  const {points:upPts}=(()=>{ const sP=matscale(P_Q,L+lambda); const sR=cholesky(sP); const pts=[x_pred.slice()]; for(let i=0;i<L;i++){const off=new Array(L).fill(0);for(let j=0;j<L;j++)off[j]=sR[j][i];pts.push(vecadd(x_pred,off));} for(let i=0;i<L;i++){const off=new Array(L).fill(0);for(let j=0;j<L;j++)off[j]=sR[j][i];pts.push(vecsub(x_pred,off));} return {points:pts}; })();
  const propMeas=upPts.map(p=>model.measurement(p));
  const z_pred=new Array(m).fill(0);
  for(let i=0;i<propMeas.length;i++)for(let j=0;j<m;j++)z_pred[j]+=Wm[i]*propMeas[i][j];
  const S=zeros(m,m);
  for(let i=0;i<propMeas.length;i++){const d=vecsub(propMeas[i],z_pred);const od=outer(d,d);for(let r=0;r<m;r++)for(let c=0;c<m;c++)S[r][c]+=Wc[i]*od[r][c];}
  for(let r=0;r<m;r++)for(let c=0;c<m;c++)S[r][c]+=model.R[r][c];
  const Pxz=zeros(L,m);
  for(let i=0;i<upPts.length;i++){const sd=vecsub(upPts[i],x_pred);const md=vecsub(propMeas[i],z_pred);const od=outer(sd,md);for(let r=0;r<L;r++)for(let c=0;c<m;c++)Pxz[r][c]+=Wc[i]*od[r][c];}
  // Invert S (3x3)
  const [[a,b,c],[d,e,f],[g,h,i]]=S;
  const A=e*i-f*h,Bn=-(d*i-f*g),Cn=d*h-e*g;
  const det=a*A+b*Bn+c*Cn;
  const invDet=1/det;
  const Sinv=[[A*invDet,Bn*invDet,Cn*invDet],[(-(b*i-c*h))*invDet,(a*i-c*g)*invDet,(-(a*h-b*g))*invDet],[(b*f-c*e)*invDet,(-(a*f-c*d))*invDet,(a*e-b*d)*invDet]];
  const K=matmul(Pxz,Sinv);
  const innov=vecsub(z,z_pred);
  const Kinnov=matvec(K,innov);
  const x_new=vecadd(x_pred,Kinnov);
  const KSt=matmul(K,transpose(S));
  const KSKt=matmul(KSt,transpose(K));
  const P_new=matsub(P_Q,KSKt);
  // Likelihood
  let detS=1;for(let r=0;r<m;r++)detS*=S[r][r];
  const innovSinv=matvec(Sinv,innov);
  let quadForm=0;for(let r=0;r<m;r++)quadForm+=innov[r]*innovSinv[r];
  const likelihood=Math.exp(-0.5*m*Math.log(2*Math.PI)-0.5*Math.log(Math.abs(detS))-0.5*quadForm);
  return {x:x_new,P:P_new,likelihood};
}

export interface IMMResult { x:number[]; P:number[][]; modelProbs:Record<string,number>; }

export class IMMUKF {
  private models: {name:MotionModel; transition:(x:number[],dt:number)=>number[]; measurement:(x:number[])=>number[]; Q:(dt:number)=>number[][]; R:number[][]; x:number[]; P:number[][]}[];
  private probs: number[];
  private tpm: number[][];

  constructor(models: ModelDef[], initialProbs?: number[], tpm?: number[][]) {
    const init = initialState();
    this.models = models.map(m => ({...m, x: init.x.slice(), P: init.P.map(r=>r.slice())}));
    const n = models.length;
    this.probs = initialProbs || new Array(n).fill(1/n);
    this.tpm = tpm || this.defaultTPM(n);
  }

  private defaultTPM(n: number): number[][] {
    const tpm = zeros(n, n);
    for (let i = 0; i < n; i++) { for (let j = 0; j < n; j++) { tpm[i][j] = i === j ? 0.9 : 0.1/(n-1); } }
    return tpm;
  }

  step(z: number[], dt: number): IMMResult {
    const n = this.models.length;

    // Step 1: Mixing (homogeneous dimensions — no projection needed!)
    const c = new Array(n).fill(0);
    const mixingProbs = zeros(n, n);
    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n; i++) { mixingProbs[i][j] = this.tpm[i][j] * this.probs[i]; c[j] += mixingProbs[i][j]; }
    }
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) mixingProbs[i][j] /= c[j];

    const mixedStates: {x:number[];P:number[][]}[] = [];
    for (let j = 0; j < n; j++) {
      const xMixed = new Array(9).fill(0);
      for (let i = 0; i < n; i++) for (let k = 0; k < 9; k++) xMixed[k] += mixingProbs[i][j] * this.models[i].x[k];
      let PMixed = zeros(9, 9);
      for (let i = 0; i < n; i++) {
        const d = vecsub(this.models[i].x, xMixed);
        PMixed = matadd(PMixed, matscale(matadd(this.models[i].P, outer(d, d)), mixingProbs[i][j]));
      }
      mixedStates.push({x: xMixed, P: PMixed});
    }

    // Step 2: Filter each model
    const results: UKFResult[] = [];
    for (let j = 0; j < n; j++) {
      const model = this.models[j];
      const state = {x: mixedStates[j].x.slice(), P: mixedStates[j].P.map(r=>r.slice())};
      const result = ukfPredictUpdate(state, z, dt, model);
      this.models[j].x = result.x;
      this.models[j].P = result.P;
      results.push(result);
    }

    // Step 3: Probability update
    const likelihoods = results.map(r => Math.max(r.likelihood, 1e-300));
    let totalLik = 0;
    for (let j = 0; j < n; j++) totalLik += c[j] * likelihoods[j];
    this.probs = new Array(n).fill(0);
    for (let j = 0; j < n; j++) this.probs[j] = (c[j] * likelihoods[j]) / Math.max(totalLik, 1e-300);

    // Step 4: Combination
    const xCombined = new Array(9).fill(0);
    for (let j = 0; j < n; j++) for (let k = 0; k < 9; k++) xCombined[k] += this.probs[j] * this.models[j].x[k];
    let PCombined = zeros(9, 9);
    for (let j = 0; j < n; j++) {
      const d = vecsub(this.models[j].x, xCombined);
      PCombined = matadd(PCombined, matscale(matadd(this.models[j].P, outer(d, d)), this.probs[j]));
    }

    const modelProbs: Record<string, number> = {};
    for (let j = 0; j < n; j++) modelProbs[this.models[j].name] = this.probs[j];

    return { x: xCombined, P: PCombined, modelProbs };
  }

  getProbs(): Record<string, number> {
    const probs: Record<string, number> = {};
    for (let j = 0; j < this.models.length; j++) probs[this.models[j].name] = this.probs[j];
    return probs;
  }
}

export function createStandardIMM(): IMMUKF {
  const R = defaultR();
  const models: ModelDef[] = [
    { name: 'CV', transition: cvTransition, measurement: cvMeasurement, Q: cvDefaultQ, R },
    { name: 'CA', transition: caTransition, measurement: caMeasurement, Q: caDefaultQ, R },
    { name: 'CT', transition: ctTransition, measurement: ctMeasurement, Q: ctDefaultQ, R },
    { name: 'Singer', transition: singerTransition, measurement: singerMeasurement, Q: singerDefaultQ, R },
  ];
  const tpm = [
    [0.90, 0.05, 0.03, 0.02],
    [0.05, 0.90, 0.03, 0.02],
    [0.03, 0.03, 0.90, 0.04],
    [0.02, 0.02, 0.04, 0.92],
  ];
  return new IMMUKF(models, [0.25, 0.25, 0.25, 0.25], tpm);
}
