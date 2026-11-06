import type { ReactNode } from 'react';

interface IFractionProps {
  top: ReactNode;
  bottom: ReactNode;
}

/** A fraction with a real bar. */
export function Fraction({ top, bottom }: IFractionProps) {
  return (
    <span className="inline-flex max-w-full min-w-0 flex-col items-center text-center leading-normal">
      <span className="px-0.5 pb-0.5">{top}</span>
      <span className="w-full border-t border-foreground/70 px-0.5 pt-0.5">
        {bottom}
      </span>
    </span>
  );
}
