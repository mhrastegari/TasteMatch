import type { IMovie } from '@models/recommender';
import { RECOMMEND_FROM } from '@services/recommender';
import { clsx } from 'clsx';

interface IAnswerBarProps {
  name: string;
  film: IMovie;
  score: number;
  /** The real rating, 0 when the cell is a gap. */
  actual: number;
  best: IMovie;
}

/** Always two lines tall, whichever cell is selected, so the layout stays put. */
export function AnswerBar({ name, film, score, actual, best }: IAnswerBarProps) {
  const recommended = score >= RECOMMEND_FROM;
  const verdict = recommended ? 'Recommended' : 'Not recommended';

  return (
    <section className="grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 rounded-xl bg-primary/10 px-3 py-1.5 sm:px-4">
      <div className="min-w-0 space-y-2">
        <p className="truncate font-semibold">
          {name} → {film.emoji} {film.title}
        </p>
        <p className="flex min-w-0 items-center gap-2 text-xs">
          <span
            className={clsx('shrink-0 rounded-full px-2 py-px font-medium', {
              'bg-star/20': actual,
              'bg-chart-3/25': !actual && recommended,
              'bg-muted': !actual && !recommended,
            })}
          >
            {actual ? `Real rating: ${actual} ★` : verdict}
          </span>
          <span className="truncate text-muted-foreground">
            Best pick: {best.emoji} {best.title}
          </span>
        </p>
      </div>
      <p className="text-3xl leading-none font-bold tabular-nums">
        {score.toFixed(1)} <span className="text-2xl text-star">★</span>
      </p>
    </section>
  );
}
