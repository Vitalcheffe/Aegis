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
  submittedAt: string; // ISO 8601
}

export interface DemoRequestSubmission {
  id: string;
  referenceId: string; // ADS-DR-XXXXXX
  fullName: string;
  email: string;
  organization: string;
  jobTitle: string;
  country: string;
  classificationLevel: string;
  interestArea: string;
  message: string;
  submittedAt: string; // ISO 8601
}

type Submission = ContactSubmission | DemoRequestSubmission;

class FormStore {
  private contactSubmissions: ContactSubmission[] = [];
  private demoRequestSubmissions: DemoRequestSubmission[] = [];
  private counter = 0;

  /** Generate a 6-char uppercase alphanumeric ID */
  private generateId(): string {
    this.counter += 1;
    const base = Date.now().toString(36).toUpperCase();
    const seq = this.counter.toString(36).toUpperCase().padStart(3, "0");
    return (base + seq).slice(-6).padStart(6, "0");
  }

  /** Generate reference ID in format ADS-DR-XXXXXX */
  generateReferenceId(): string {
    return `ADS-DR-${this.generateId()}`;
  }

  addContactSubmission(data: Omit<ContactSubmission, "id" | "submittedAt">): ContactSubmission {
    const submission: ContactSubmission = {
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
      ...data,
    };
    this.contactSubmissions.push(submission);
    return submission;
  }

  addDemoRequestSubmission(
    data: Omit<DemoRequestSubmission, "id" | "referenceId" | "submittedAt">
  ): DemoRequestSubmission {
    const submission: DemoRequestSubmission = {
      id: crypto.randomUUID(),
      referenceId: this.generateReferenceId(),
      submittedAt: new Date().toISOString(),
      ...data,
    };
    this.demoRequestSubmissions.push(submission);
    return submission;
  }

  getContactSubmissions(): ContactSubmission[] {
    return [...this.contactSubmissions];
  }

  getDemoRequestSubmissions(): DemoRequestSubmission[] {
    return [...this.demoRequestSubmissions];
  }

  getAllSubmissions(): Submission[] {
    return [...this.contactSubmissions, ...this.demoRequestSubmissions];
  }
}

/** Singleton — shared across all API route invocations in the same process */
export const formStore = new FormStore();
