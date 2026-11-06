import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface IStepPanelProps {
  number: number;
  title: string;
  /** Smaller screens show one step at a time; large screens show all three. */
  shown: boolean;
  children: ReactNode;
}

export function StepPanel({ number, title, shown, children }: IStepPanelProps) {
  return (
    <section
      className={clsx('min-w-0 flex-col rounded-xl border bg-card p-2 columns:p-3', {
        flex: shown,
        'hidden columns:flex': !shown,
      })}
    >
      <h2 className="mb-1.5 hidden items-center gap-2 text-sm font-semibold columns:flex">
        <span className="grid size-5 place-items-center rounded-full bg-primary text-xs text-primary-foreground">
          {number}
        </span>
        {title}
      </h2>
      <div className="flex flex-1 flex-col gap-2">{children}</div>
    </section>
  );
}
