import type { IPrediction } from '@models/recommender';
import { formulaService } from '@services/formula';
import { ratings, users } from '@shared/dataset';

const { average, deviation, product, sum, square, size, pearson, predictedRating } =
  formulaService;

/** Predictions of at least this many stars count as a recommendation. */
export const RECOMMEND_FROM = 3.5;

/** Runs every Pearson formula for two users, on the movies both of them rated. */
function compareUsers(ratingsA: number[], ratingsB: number[]) {
  const shared = ratingsA.flatMap((r, i) => (r > 0 && ratingsB[i] > 0 ? [i] : []));
  const meanA = average(shared.map((i) => ratingsA[i]));
  const meanB = average(shared.map((i) => ratingsB[i]));

  const terms = shared.map((movie) => {
    const a = deviation(ratingsA[movie], meanA);
    const b = deviation(ratingsB[movie], meanB);
    return {
      movie,
      ratingA: ratingsA[movie],
      ratingB: ratingsB[movie],
      a,
      b,
      product: product(a, b),
      aSquared: square(a),
      bSquared: square(b),
    };
  });

  const top = sum(terms.map((t) => t.product));
  const squaresA = sum(terms.map((t) => t.aSquared));
  const squaresB = sum(terms.map((t) => t.bSquared));
  const sizeA = size(squaresA);
  const sizeB = size(squaresB);

  return {
    top,
    squaresA,
    squaresB,
    sizeA,
    sizeB,
    meanA,
    meanB,
    terms,
    similarity: pearson(top, sizeA, sizeB),
  };
}

/**
 * Predicts a rating from the neighbours: the users similar to this user who
 * rated the movie. The user's own rating of the movie is hidden, so rated cells
 * can be checked against the real answer.
 */
function predict(user: number, movie: number): IPrediction {
  const own = ratings[user].map((r, i) => (i === movie ? 0 : r));
  const mean = average(own.filter((r) => r > 0));

  const people = users
    .map((_, id) => {
      const rating = ratings[id][movie];
      const match = compareUsers(own, ratings[id]);
      return {
        id,
        ...match,
        rating,
        weightedRating: product(match.similarity, rating),
        weight: formulaService.weight(match.similarity),
        used: match.similarity > 0 && rating > 0,
      };
    })
    .filter((p) => p.id !== user)
    .sort((a, b) => b.similarity - a.similarity);

  const neighbours = people.filter((p) => p.used);
  const { numerator, denominator, score } = predictedRating(neighbours);

  return {
    people,
    numerator,
    denominator,
    average: mean,
    score: denominator ? score : mean,
  };
}

/** The unrated movie with the highest prediction. */
function bestPick(user: number) {
  const gaps = ratings[user].flatMap((r, movie) => (r === 0 ? [movie] : []));
  return gaps.reduce((best, movie) =>
    predict(user, movie).score > predict(user, best).score ? movie : best
  );
}

export const recommenderService = { predict, bestPick };
