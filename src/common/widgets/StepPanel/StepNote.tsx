import type { ReactNode } from 'react';

interface IStepNoteProps {
  children: ReactNode;
}

/** A short explanation of the symbols in a step. */
export function StepNote({ children }: IStepNoteProps) {
  return <p className="text-xs text-muted-foreground">{children}</p>;
}
