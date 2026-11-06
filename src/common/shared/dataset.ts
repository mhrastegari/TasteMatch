import type { IMovie } from '@models/recommender';

export const users = ['Alice', 'Bob', 'Carol', 'David', 'Emma'];

export const movies: IMovie[] = [
  { title: 'The Matrix', emoji: '🕶️' },
  { title: 'Inception', emoji: '🌀' },
  { title: 'Interstellar', emoji: '🪐' },
  { title: 'The Dark Knight', emoji: '🦇' },
  { title: 'Titanic', emoji: '🚢' },
  { title: 'The Notebook', emoji: '💌' },
  { title: 'La La Land', emoji: '🎹' },
  { title: 'Toy Story', emoji: '🤠' },
  { title: 'Finding Nemo', emoji: '🐠' },
  { title: 'Up', emoji: '🎈' },
];

// ratings[user][movie]: 1–5 stars, 0 = not rated.
// prettier-ignore
export const ratings = [
  //Mat Inc Int DK  Tit Not LaL Toy Nem Up
  [5,  4,  0,  5,  1,  0,  2,  4,  3,  0], // Alice
  [5,  5,  5,  4,  2,  1,  0,  3,  0,  3], // Bob
  [1,  2,  2,  0,  5,  5,  4,  0,  3,  4], // Carol
  [4,  0,  4,  5,  0,  2,  1,  3,  4,  0], // David
  [2,  1,  0,  2,  4,  5,  5,  4,  0,  5], // Emma
];
