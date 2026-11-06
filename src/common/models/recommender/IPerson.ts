import type { IPearsonTerm } from './IPearsonTerm';
import type { IWeightedRating } from './IWeightedRating';

/** Another user, compared with the user we are predicting for. */
export interface IPerson extends IWeightedRating {
  id: number;
  /** sim × rating: what this person adds to the top of the prediction. */
  weightedRating: number;
  /** |sim|: what this person adds to the bottom of the prediction. */
  weight: number;
  /** Σ a × b: the sum of the terms' products. */
  top: number;
  /** Σ a² and Σ b². */
  squaresA: number;
  squaresB: number;
  /** √Σ a² and √Σ b². */
  sizeA: number;
  sizeB: number;
  /** The two users' averages on the movies they both rated. */
  meanA: number;
  meanB: number;
  terms: IPearsonTerm[];
  /** In the neighbourhood N: similar to the user, and rated the movie. */
  used: boolean;
}
