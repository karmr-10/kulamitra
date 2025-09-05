
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const splashSteps = [
  {
    image: "https://picsum.photos/id/1018/1200/800",
    hint: "community gathering",
    title: "Connect with Your Community",
    description: "Kulamitra helps you stay connected with the Arya Vyshya community, bringing traditions and people closer.",
  },
  {
    image: "https://picsum.photos/id/1043/1200/800",
    hint: "festival event",
    title: "Never Miss an Event",
    description: "Get updates on community events, festivals, and meetings. RSVP and be a part of every celebration.",
  },
  {
    image: "https://picsum.photos/id/10/1200/800",
    hint: "family hands",
    title: "Support & Grow Together",
    description: "Participate in volunteer activities, donate to causes, and join ChitFunds to support the community's growth.",
  },
];

export function SplashScreen() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (step < splashSteps.length - 1) {
      setStep(step + 1);
    } else {
      router.push("/login");
    }
  };

  const handleSkip = () => {
    router.push("/login");
  };

  const currentStep = splashSteps[step];
  const isLastStep = step === splashSteps.length - 1;

  return (
    <div className="relative flex h-screen w-full flex-col">
      <div className="absolute inset-0">
        <Image
          src={currentStep.image}
          alt={currentStep.title}
          fill
          data-ai-hint={currentStep.hint}
          className="object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      </div>

      <div className="relative z-10 mt-auto flex flex-col items-center justify-end p-8 text-center text-white md:p-12">
        <div className="max-w-xl">
          <h1 className="font-headline text-4xl font-bold leading-tight md:text-5xl">
            {currentStep.title}
          </h1>
          <p className="mt-4 font-body text-lg text-white/90">
            {currentStep.description}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 p-8 pt-4 md:p-12 md:pt-6">
        <div className="flex items-center gap-3">
          {splashSteps.map((_, index) => (
            <div
              key={index}
              onClick={() => setStep(index)}
              className={cn(
                "h-2 w-2 cursor-pointer rounded-full bg-white/50 transition-all duration-300",
                { "w-6 bg-primary": step === index }
              )}
            />
          ))}
        </div>

        <div className="flex w-full max-w-xs items-center gap-4">
          <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white" onClick={handleSkip}>
            Skip
          </Button>
          <Button
            size="lg"
            className="flex-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleNext}
          >
            {isLastStep ? "Get Started" : "Next"}
            {isLastStep ? <Check className="ml-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
