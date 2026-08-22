// Type declarations for bun test globals + Node.js globals
declare function describe(name: string, fn: () => void): void;
declare function test(name: string, fn: () => void | Promise<void>): void;
declare function expect<T>(actual: T): { toBe(expected: T): void; toBeCloseTo(expected: number, precision?: number): void; toBeGreaterThan(expected: number): void; toBeGreaterThanOrEqual(expected: number): void; toBeLessThan(expected: number): void; toBeLessThanOrEqual(expected: number): void; toEqual(expected: any): void; toBeDefined(): void; toContain(expected: any): void; toBeTruthy(): void; toBeFalsy(): void; not: any; };
declare const Bun: { version: string };
declare const performance: { now(): number };
declare function require(id: string): any; 
declare namespace require { export const main: any; }
declare const process: { platform: string; arch: string; env: Record<string, string | undefined> };
declare const console: { log(...args: any[]): void; error(...args: any[]): void; warn(...args: any[]): void; info(...args: any[]): void; };
declare const module: { exports: any; require(id: string): any; main: any; };
declare const __dirname: string;
declare const __filename: string;
declare function setTimeout(fn: () => void, ms: number): any;
declare const crypto: { randomUUID(): string; };

declare module 'fs' {
  export function readFileSync(path: string, encoding?: string): string | Buffer;
  export function writeFileSync(path: string, data: string | Buffer): void;
  export function existsSync(path: string): boolean;
  export function mkdirSync(path: string, options?: any): void;
}
