import { clsx } from 'clsx';
import type { ReactNode } from 'react';

type FormulaTone =
  'result' | 'similarity' | 'rating' | 'product' | 'sizeA' | 'sizeB';

interface IFormulaPartProps {
  tone: FormulaTone;
  children: ReactNode;
}

/** One coloured part of a formula. It keeps its colour from symbols to numbers. */
export function FormulaPart({ tone, children }: IFormulaPartProps) {
  return (
    <span
      className={clsx(
        'rounded px-1 whitespace-nowrap tabular-nums ring-1 ring-inset',
        {
          'bg-chart-5/15 ring-chart-5/60': tone === 'result',
          'bg-chart-1/15 ring-chart-1/60': tone === 'similarity',
          'bg-star/15 ring-star/60': tone === 'rating',
          'bg-chart-7/15 ring-chart-7/60': tone === 'product',
          'bg-chart-6/15 ring-chart-6/60': tone === 'sizeA',
          'bg-chart-2/15 ring-chart-2/60': tone === 'sizeB',
        }
      )}
    >
      {children}
    </span>
  );
}
