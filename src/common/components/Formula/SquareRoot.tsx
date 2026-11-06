import type { ReactNode } from 'react';

interface ISquareRootProps {
  children: ReactNode;
}

/** A square root whose bar covers everything under it. */
export function SquareRoot({ children }: ISquareRootProps) {
  return (
    <span className="inline-flex">
      √<span className="border-t border-current">{children}</span>
    </span>
  );
}
