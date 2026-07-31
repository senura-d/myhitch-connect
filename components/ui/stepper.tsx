import { IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface StepperStep {
  id: string;
  label: string;
  description?: string;
}

export function Stepper({
  steps,
  currentStep,
  onStepClick,
  className,
}: {
  steps: StepperStep[];
  currentStep: number;
  onStepClick?: (index: number) => void;
  className?: string;
}) {
  return (
    <nav aria-label="Progress" className={cn("w-full", className)}>
      <ol className="flex flex-col gap-3 md:flex-row md:items-start md:gap-0">
        {steps.map((step, index) => {
          const state = index < currentStep ? "complete" : index === currentStep ? "current" : "upcoming";
          const clickable = !!onStepClick && state !== "upcoming";
          return (
            <li key={step.id} className="flex flex-1 items-start md:flex-col">
              <div className="flex items-center gap-2 md:w-full">
                <button
                  type="button"
                  disabled={!clickable}
                  onClick={() => onStepClick?.(index)}
                  aria-current={state === "current" ? "step" : undefined}
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                    state === "complete" && "border-primary bg-primary text-primary-foreground",
                    state === "current" && "border-primary text-primary",
                    state === "upcoming" && "border-border text-muted-foreground",
                    clickable && "cursor-pointer"
                  )}
                >
                  {state === "complete" ? <IconCheck className="size-4" /> : index + 1}
                </button>
                <div className="min-w-0 md:hidden">
                  <p
                    className={cn(
                      "truncate text-sm font-medium",
                      state === "upcoming" ? "text-muted-foreground" : "text-foreground"
                    )}
                  >
                    {step.label}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "hidden h-px flex-1 md:block",
                      state === "complete" ? "bg-primary" : "bg-border"
                    )}
                  />
                )}
              </div>
              <div className="mt-1.5 hidden min-w-0 md:block">
                <p
                  className={cn(
                    "truncate text-sm font-medium",
                    state === "upcoming" ? "text-muted-foreground" : "text-foreground"
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="truncate text-xs text-muted-foreground">{step.description}</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
