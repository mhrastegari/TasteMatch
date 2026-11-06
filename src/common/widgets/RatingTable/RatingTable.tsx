import { movies, ratings, users } from '@shared/dataset';
import { clsx } from 'clsx';

// One tint per star value (index = stars), so taste groups show at a glance.
const heat = [
  '',
  'bg-primary/10',
  'bg-primary/15',
  'bg-primary/25',
  'bg-primary/35',
  'bg-primary/50',
];

interface IRatingTableProps {
  user: number;
  movie: number;
  score: number;
  /** The users whose ratings of the selected movie feed the prediction. */
  voters: number[];
  onSelect: (user: number, movie: number) => void;
}

// Cells grow with the screen height, up to the 44px touch size. They can stay
// smaller on short screens because everything has to fit without scrolling.
export function RatingTable({
  user,
  movie,
  score,
  voters,
  onSelect,
}: IRatingTableProps) {
  return (
    <div className="shrink-0 rounded-xl border bg-card p-1 sm:p-1.5">
      <table className="w-full table-fixed border-separate border-spacing-0.5 text-sm sm:border-spacing-1">
        <thead>
          <tr>
            <th className="w-11 sm:w-20" />
            {movies.map((m, i) => (
              <th key={m.title} className="align-bottom font-normal">
                <span
                  className={clsx('block rounded-md text-base leading-7', {
                    'bg-primary/20': i === movie,
                  })}
                  aria-hidden
                >
                  {m.emoji}
                </span>
                <span
                  className={clsx('hidden text-[0.7rem] leading-tight sm:block', {
                    'text-foreground': i === movie,
                    'text-muted-foreground': i !== movie,
                  })}
                >
                  {m.title}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((u, id) => (
            <tr key={u}>
              <th
                scope="row"
                className={clsx('ps-1 text-start text-xs font-semibold sm:text-sm', {
                  'text-primary': id === user,
                  'text-muted-foreground': id !== user,
                })}
              >
                {u}
              </th>
              {movies.map((m, i) => {
                const r = ratings[id][i];
                const selected = id === user && i === movie;
                return (
                  <td key={m.title} className="p-0">
                    <button
                      type="button"
                      onClick={() => onSelect(id, i)}
                      aria-label={`${u}, ${m.title}: ${r ? `${r} stars` : 'not rated'}`}
                      className={clsx(
                        'h-[clamp(1.6rem,calc(1.6rem+(100dvh-40rem)*0.09),2.75rem)] w-full rounded-md font-semibold tabular-nums transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        !selected && heat[r],
                        {
                          'bg-primary text-primary-foreground': selected,
                          'font-normal text-muted-foreground/60 hover:bg-muted':
                            !selected && !r,
                          'ring-2 ring-star ring-inset':
                            i === movie && voters.includes(id),
                        }
                      )}
                    >
                      {r || (selected ? score.toFixed(1) : '·')}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
