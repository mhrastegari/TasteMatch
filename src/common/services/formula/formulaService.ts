import type { IWeightedRating } from '@models/recommender';

/** Σ values */
function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0);
}

/** Σ values ÷ n */
function average(values: number[]) {
  return sum(values) / values.length;
}

/** a = rating − average */
function deviation(rating: number, mean: number) {
  return rating - mean;
}

/** a × b */
function product(a: number, b: number) {
  return a * b;
}

/** a² */
function square(value: number) {
  return value * value;
}

/** √Σ a², from the already added-up squares. */
function size(sumOfSquares: number) {
  return Math.sqrt(sumOfSquares);
}

/**
 * sim = Σ a × b ÷ (√Σ a² × √Σ b²), from −1 to 1.
 *
 * Rounded to 2 decimals so the prediction can be checked by hand from the
 * numbers on screen. Counts as 0 when a person's ratings never vary.
 */
function pearson(sumOfProducts: number, sizeA: number, sizeB: number) {
  return Math.round((sumOfProducts / (sizeA * sizeB)) * 100) / 100 || 0;
}

/** |sim| */
function weight(similarity: number) {
  return Math.abs(similarity);
}

/** r̃ui = Σ sim(u,v) × r(v,i) ÷ Σ |sim(u,v)|, over the neighbours. */
function predictedRating(neighbours: IWeightedRating[]) {
  const numerator = sum(neighbours.map((n) => product(n.similarity, n.rating)));
  const denominator = sum(neighbours.map((n) => weight(n.similarity)));
  return { numerator, denominator, score: numerator / denominator };
}

export const formulaService = {
  sum,
  average,
  deviation,
  product,
  square,
  size,
  pearson,
  weight,
  predictedRating,
};
