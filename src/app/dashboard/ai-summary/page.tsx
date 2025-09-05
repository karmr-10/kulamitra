import { AiSummaryForm } from "@/components/dashboard/ai-summary-form";
import { Bot } from "lucide-react";

export default function AiSummaryPage() {
  return (
    <div>
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Bot className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            AI Community Summary Generator
          </h1>
          <p className="text-muted-foreground">
            Provide summaries of recent activities to generate a concise update for the community.
          </p>
        </div>
      </div>
      <div className="mt-8