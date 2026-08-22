"use strict";
/**
 * In-memory store for form submissions.
 * Data is lost on server restart — suitable for demo / development only.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formStore = void 0;
class FormStore {
    constructor() {
        this.contactSubmissions = [];
        this.demoRequestSubmissions = [];
        this.counter = 0;
    }
    /** Generate a 6-char uppercase alphanumeric ID */
    generateId() {
        this.counter += 1;
        const base = Date.now().toString(36).toUpperCase();
        const seq = this.counter.toString(36).toUpperCase().padStart(3, "0");
        return (base + seq).slice(-6).padStart(6, "0");
    }
    /** Generate reference ID in format ADS-DR-XXXXXX */
    generateReferenceId() {
        return `ADS-DR-${this.generateId()}`;
    }
    addContactSubmission(data) {
        const submission = {
            id: crypto.randomUUID(),
            submittedAt: new Date().toISOString(),
            ...data,
        };
        this.contactSubmissions.push(submission);
        return submission;
    }
    addDemoRequestSubmission(data) {
        const submission = {
            id: crypto.randomUUID(),
            referenceId: this.generateReferenceId(),
            submittedAt: new Date().toISOString(),
            ...data,
        };
        this.demoRequestSubmissions.push(submission);
        return submission;
    }
    getContactSubmissions() {
        return [...this.contactSubmissions];
    }
    getDemoRequestSubmissions() {
        return [...this.demoRequestSubmissions];
    }
    getAllSubmissions() {
        return [...this.contactSubmissions, ...this.demoRequestSubmissions];
    }
}
/** Singleton — shared across all API route invocations in the same process */
exports.formStore = new FormStore();
