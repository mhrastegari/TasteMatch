/** One movie both users rated, and how it adds to Σ a × b. */
export interface IPearsonTerm {
  movie: number;
  ratingA: number;
  ratingB: number;
  /** ratingA minus user A's average on the shared movies. */
  a: number;
  /** ratingB minus user B's average on the shared movies. */
  b: number;
  product: number;
  aSquared: number;
  bSquared: number;
}
