"use server";

import { generateCommunitySummary, GenerateCommunitySummaryInput } from "@/ai/flows/generate-community-summary";
import { z } from "zod";

const formSchema = z.object({
  events: z.string().min(10, {
    message: "Events summary must be at least 10 characters.",
  }),
  announcements: z.string().min(10, {
    message: "Announcements summary must be at least 10 characters.",
  }),
  otherActivities: z.string().min(10, {
    message: "Other activities summary must be at least 10 characters.",
  }),
});

export type FormState = {
  message: string;
  summary?: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function onGenerate(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = formSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message);
    return {
      message: "Invalid form data",
      issues,
      fields: {
        events: parsed.error.formErrors.fieldErrors.events?.join(", ") || "",
        announcements: parsed.error.formErrors.fieldErrors.announcements?.join(", ") || "",
        otherActivities: parsed.error.formErrors.fieldErrors.otherActivities?.join(", ") || "",
      }
    };
  }

  try {
    const input: GenerateCommunitySummaryInput = parsed.data;
    const result = await generateCommunitySummary(input);
    return { message: "Summary generated successfully.", summary: result.summary };
  } catch (e) {
    const error = e as Error;
    return { message: