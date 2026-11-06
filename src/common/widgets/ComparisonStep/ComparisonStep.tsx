import { FormulaPart, formatNumber, formatSigned } from '@components/Formula';
import type { IPerson } from '@models/recommender';
import { movies, users } from '@shared/dataset';
import { StepPanel } from '@widgets/StepPanel';
import { clsx } from 'clsx';

// A cell fills its grid track and centres its content, so a row's spare height
// reads as padding.
const cell = 'grid place-items-center';

// Each column keeps the colour of its part of the formula in step 2.
const bandA = `${cell} bg-chart-6/10`;
const bandB = `${cell} bg-chart-2/10`;
const bandProduct = `${cell} bg-chart-7/10`;
const totalA = `${cell} rounded-b-md bg-chart-6/25 font-semibold`;
const totalB = `${cell} rounded-b-md bg-chart-2/25 font-semibold`;
const totalProduct = `${cell} rounded-b-md bg-chart-7/25 font-semibold`;

interface IComparisonStepProps {
  name: string;
  people: IPerson[];
  compared: IPerson;
  onCompare: (person: number) => void;
  shown: boolean;
}

/** Every number behind one comparison, from the ratings up to the totals. */
export function ComparisonStep({
  name,
  people,
  compared,
  onCompare,
  shown,
}: IComparisonStepProps) {
  const other = users[compared.id];
  const { terms, meanA, meanB } = compared;
  const count = terms.length;

  return (
    <StepPanel number={1} title={`Compare ${name} with ${other}`} shown={shown}>
      <div className="grid flex-1 grid-rows-[auto_1fr] gap-2 lg:grid-cols-[1fr_3fr] lg:grid-rows-1 columns:grid-cols-1 columns:grid-rows-[auto_1fr]">
        <div className="space-y-2">
          <div
            className="flex items-center gap-1.5 lg:flex-wrap columns:flex-nowrap"
            role="group"
            aria-label={`Compare ${name} with`}
          >
            <span className="shrink-0 text-xs font-medium text-muted-foreground">
              {name} vs
            </span>
            {people.map((p) => (
              <button
                key={p.id}
                type="button"
                data-person
                onClick={() => onCompare(p.id)}
                aria-pressed={p.id === compared.id}
                className={clsx(
                  'h-7 min-w-0 flex-1 rounded-full text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  {
                    'bg-primary text-primary-foreground': p.id === compared.id,
                    'bg-muted text-muted-foreground hover:text-foreground':
                      p.id !== compared.id,
                  }
                )}
              >
                {users[p.id]}
              </button>
            ))}
          </div>
          <div className="space-y-1 text-xs">
            <p>
              <FormulaPart tone="sizeA">a</FormulaPart> = {name} −{' '}
              <strong className="tabular-nums">{formatNumber(meanA)}</strong>{' '}
              <span className="text-muted-foreground">
                ({terms.map((t) => t.ratingA).join('+')}) ÷ {count} shared movies
              </span>
            </p>
            <p>
              <FormulaPart tone="sizeB">b</FormulaPart> = {other} −{' '}
              <strong className="tabular-nums">{formatNumber(meanB)}</strong>{' '}
              <span className="text-muted-foreground">
                ({terms.map((t) => t.ratingB).join('+')}) ÷ {count} shared movies
              </span>
            </p>
          </div>
        </div>
        {/* A grid, not table layout: rows stretch into spare height, so they get
            roomier on tall screens and can never cause scrolling. */}
        <table
          className="grid grid-cols-[auto_repeat(7,minmax(0,1fr))] gap-x-0.5 text-center font-math text-[clamp(0.75rem,1.8dvh,1rem)] leading-tight tabular-nums"
          style={{ maxHeight: `${(count + 2) * 2}rem` }}
        >
          <thead className="contents font-sans text-xs">
            <tr className="contents">
              <th aria-label="Movie" />
              <th className={clsx(cell, 'font-medium text-muted-foreground')}>
                {name}
              </th>
              <th className={clsx(cell, 'font-medium text-muted-foreground')}>
                {other}
              </th>
              <th className={clsx(bandA, 'rounded-t-md font-semibold')}>a</th>
              <th className={clsx(bandB, 'rounded-t-md font-semibold')}>b</th>
              <th className={clsx(bandProduct, 'rounded-t-md font-semibold')}>
                a × b
              </th>
              <th className={clsx(bandA, 'rounded-t-md font-semibold')}>a²</th>
              <th className={clsx(bandB, 'rounded-t-md font-semibold')}>b²</th>
            </tr>
          </thead>
          <tbody className="contents">
            {terms.map((t) => (
              <tr key={t.movie} className="contents">
                <th scope="row" className={clsx(cell, 'pe-1 font-normal')}>
                  <span role="img" aria-label={movies[t.movie].title}>
                    {movies[t.movie].emoji}
                  </span>
                </th>
                <td className={cell}>{t.ratingA}</td>
                <td className={cell}>{t.ratingB}</td>
                <td className={bandA}>{formatSigned(t.a)}</td>
                <td className={bandB}>{formatSigned(t.b)}</td>
                <td className={bandProduct}>{formatSigned(t.product)}</td>
                <td className={bandA}>{formatNumber(t.aSquared)}</td>
                <td className={bandB}>{formatNumber(t.bSquared)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="contents">
            <tr className="contents">
              <th
                colSpan={5}
                className="col-span-5 grid items-center justify-end pe-1.5 font-sans text-xs font-medium"
              >
                Add them up (Σ)
              </th>
              <td className={totalProduct}>{formatNumber(compared.top)}</td>
              <td className={totalA}>{formatNumber(compared.squaresA)}</td>
              <td className={totalB}>{formatNumber(compared.squaresB)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </StepPanel>
  );
}
