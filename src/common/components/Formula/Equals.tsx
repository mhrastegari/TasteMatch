import type { ReactNode } from 'react';

interface IEqualsProps {
  children: ReactNode;
}

/** An equals sign that stays with what follows it when a formula wraps. */
export function Equals({ children }: IEqualsProps) {
  return (
    <span className="inline-flex min-w-0 items-center gap-1.5">= {children}</span>
  );
}
