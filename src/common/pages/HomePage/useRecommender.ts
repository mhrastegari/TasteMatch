import { recommenderService } from '@services/recommender';
import { movies, ratings, users } from '@shared/dataset';
import { useState } from 'react';

export function useRecommender() {
  const [user, setUser] = useState(0);
  const [movie, setMovie] = useState(2);
  const [step, setStep] = useState(0);
  const [comparedId, setComparedId] = useState<number | null>(null);

  const prediction = recommenderService.predict(user, movie);

  // The person whose working is shown; the closest match by default.
  const compared =
    prediction.people.find((p) => p.id === comparedId) ?? prediction.people[0];

  function select(nextUser: number, nextMovie: number) {
    setUser(nextUser);
    setMovie(nextMovie);
  }

  return {
    user,
    movie,
    step,
    setStep,
    select,
    prediction,
    compared,
    compare: setComparedId,
    name: users[user],
    film: movies[movie],
    actual: ratings[user][movie],
    best: movies[recommenderService.bestPick(user)],
    neighbours: prediction.people.filter((p) => p.used),
  };
}
