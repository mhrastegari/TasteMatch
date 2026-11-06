import type { ReactNode } from 'react';

interface IStepResultProps {
  children: ReactNode;
}

/** A step's conclusion, pinned to the bottom of its panel. */
export function StepResult({ children }: IStepResultProps) {
  return (
    <p className="mt-auto rounded-lg bg-primary/10 px-3 py-1.5 text-sm">
      {children}
    </p>
  );
}
