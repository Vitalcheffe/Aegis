import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { formStore } from "@/lib/form-store";

const contactSchema = z.object({
  name: z.string().min(1, "Full name is required").max(200),
  email: z.string().email("A valid email address is required").max(200),
  organization: z.string().max(200).optional().default(""),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(1, "Message is required").max(5000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

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

    const submission = formStore.addContactSubmission(result.data);

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for contacting Aegis Defense Systems. Our team will review your inquiry and respond within 24-48 business hours.",
        id: submission.id,
      },
      { status: 201 }
    );
  } catch (error) {
    // Handle JSON parse errors or unexpected failures
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, message: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    console.error("[API /contact] Unexpected error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
