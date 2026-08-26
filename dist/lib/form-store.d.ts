/**
 * In-memory store for form submissions.
 * Data is lost on server restart — suitable for demo / development only.
 */
export interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    organization: string;
    subject: string;
    message: string;
    submittedAt: string;
}
export interface DemoRequestSubmission {
    id: string;
    referenceId: string;
    fullName: string;
    email: string;
    organization: string;
    jobTitle: string;
    country: string;
    classificationLevel: string;
    interestArea: string;
    message: string;
    submittedAt: string;
}
type Submission = ContactSubmission | DemoRequestSubmission;
declare class FormStore {
    private contactSubmissions;
    private demoRequestSubmissions;
    private counter;
    /** Generate a 6-char uppercase alphanumeric ID */
    private generateId;
    /** Generate reference ID in format ADS-DR-XXXXXX */
    generateReferenceId(): string;
    addContactSubmission(data: Omit<ContactSubmission, "id" | "submittedAt">): ContactSubmission;
    addDemoRequestSubmission(data: Omit<DemoRequestSubmission, "id" | "referenceId" | "submittedAt">): DemoRequestSubmission;
    getContactSubmissions(): ContactSubmission[];
    getDemoRequestSubmissions(): DemoRequestSubmission[];
    getAllSubmissions(): Submission[];
}
/** Singleton — shared across all API route invocations in the same process */
export declare const formStore: FormStore;
export {};
