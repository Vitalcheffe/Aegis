import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { formStore } from "@/lib/form-store";

const classificationLevels = ["unclassified", "cui", "secret", "top-secret"] as const;
const interestAreas = ["products", "solutions", "integration", "partnership"] as const;

const demoRequestSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(200),
  email: z.string().email("A valid email address is required").max(200),
  organization: z.string().min(1, "Organization is required").max(200),
  jobTitle: z.string().min(1, "Job title is required").max(200),
  country: z.string().min(1, "Country is required").max(200),
  classificationLevel: z.enum(classificationLevels, {
    message: "A valid classification level is required",
  }),
  interestArea: z.enum(interestAreas, {
    message: "A valid interest area is required",
  }),
  message: z.string().max(5000).optional().default(""),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = demoRequestSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: fieldErrors },
        { status: 400 }
      );
    }

    const submission = formStore.addDemoRequestSubmission(result.data);

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for your interest in Aegis Defense Systems. Your demo request has been received and will be reviewed by our team. A representative will contact you within 2-3 business days to discuss scheduling and access requirements.",
        referenceId: submission.referenceId,
        id: submission.id,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, message: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    console.error("[API /demo-request] Unexpected error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
