import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface IFormulaProps {
  /** For the person cards, which sit several to a row. */
  small?: boolean;
  /** Keep the line whole: a fraction narrows instead of dropping below it. */
  noWrap?: boolean;
  children: ReactNode;
}

/** A line of maths. */
export function Formula({ small, noWrap, children }: IFormulaProps) {
  return (
    <div
      className={clsx('flex items-center gap-y-1 font-math', {
        'flex-wrap': !noWrap,
        'gap-x-1.5 text-[clamp(1rem,2.4dvh,1.3rem)]': !small,
        'gap-x-1 text-[clamp(0.8125rem,1.9dvh,1.05rem)]': small,
      })}
    >
      {children}
    </div>
  );
}
