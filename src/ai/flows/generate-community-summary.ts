'use server';

/**
 * @fileOverview Generates a summary of recent community activities using AI.
 *
 * - generateCommunitySummary - A function that generates the summary.
 * - GenerateCommunitySummaryInput - The input type for the generateCommunitySummary function.
 * - GenerateCommunitySummaryOutput - The return type for the generateCommunitySummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCommunitySummaryInputSchema = z.object({
  events: z.string().describe('A summary of recent community events.'),
  announcements: z.string().describe('A summary of recent community announcements.'),
  otherActivities: z.string().describe('A summary of other community activities.'),
});
export type GenerateCommunitySummaryInput = z.infer<typeof GenerateCommunitySummaryInputSchema>;

const GenerateCommunitySummaryOutputSchema = z.object({
  summary: z.string().describe('A concise AI-generated summary of recent community activities.'),
});
export type GenerateCommunitySummaryOutput = z.infer<typeof GenerateCommunitySummaryOutputSchema>;

export async function generateCommunitySummary(
  input: GenerateCommunitySummaryInput
): Promise<GenerateCommunitySummaryOutput> {
  return generateCommunitySummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCommunitySummaryPrompt',
  input: {schema: GenerateCommunitySummaryInputSchema},
  output: {schema: GenerateCommunitySummaryOutputSchema},
  prompt: `You are an AI assistant tasked with summarizing recent community activities.

  Here's a summary of recent community events: {{{events}}}
  Here's a summary of recent community announcements: {{{announcements}}}
  Here's a summary of other recent community activities: {{{otherActivities}}}

  Please provide a concise and informative summary of these activities for community members who may have missed them.`,
});

const generateCommunitySummaryFlow = ai.defineFlow(
  {
    name: 'generateCommunitySummaryFlow',
    inputSchema: GenerateCommunitySummaryInputSchema,
    outputSchema: GenerateCommunitySummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
