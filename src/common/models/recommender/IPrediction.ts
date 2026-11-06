import type { IPerson } from './IPerson';

export interface IPrediction {
  people: IPerson[];
  /** Σ sim × rating, over the neighbours. */
  numerator: number;
  /** Σ |sim|, over the neighbours; 0 when there are none. */
  denominator: number;
  /** The user's average, used only when there are no neighbours. */
  average: number;
  score: number;
}
