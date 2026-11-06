import {
  Equals,
  Formula,
  FormulaPart,
  formatNumber,
  Fraction,
  PredictionFormula,
} from '@components/Formula';
import type { IPerson } from '@models/recommender';
import { RECOMMEND_FROM } from '@services/recommender';
import { users } from '@shared/dataset';
import { StepNote, StepPanel, StepResult } from '@widgets/StepPanel';

interface IPredictionStepProps {
  name: string;
  filmTitle: string;
  neighbours: IPerson[];
  numerator: number;
  denominator: number;
  average: number;
  score: number;
  shown: boolean;
}

export function PredictionStep({
  name,
  filmTitle,
  neighbours,
  numerator,
  denominator,
  average,
  score,
  shown,
}: IPredictionStepProps) {
  const neighbourNames = neighbours.map((p) => users[p.id]).join(', ');

  return (
    <StepPanel number={3} title="Prediction" shown={shown}>
      <div className="grid gap-3 lg:grid-cols-2 columns:grid-cols-1">
        <PredictionFormula />
        {neighbours.length ? (
          <Formula small>
            <Equals>
              <Fraction
                top={neighbours.map((p, i) => (
                  <span key={p.id} className="inline-block px-0.5 whitespace-nowrap">
                    {i > 0 && '+ '}
                    <FormulaPart tone="similarity">
                      {formatNumber(p.similarity)}
                    </FormulaPart>{' '}
                    × <FormulaPart tone="rating">{p.rating}</FormulaPart>
                  </span>
                ))}
                bottom={neighbours.map((p, i) => (
                  <span key={p.id} className="inline-block px-0.5 whitespace-nowrap">
                    {i > 0 && '+ '}|
                    <FormulaPart tone="similarity">
                      {formatNumber(p.similarity)}
                    </FormulaPart>
                    |
                  </span>
                ))}
              />
            </Equals>
            {neighbours.length > 1 && (
              <Equals>
                <Fraction
                  top={neighbours
                    .map((p) => formatNumber(p.weightedRating))
                    .join(' + ')}
                  bottom={neighbours.map((p) => formatNumber(p.weight)).join(' + ')}
                />
              </Equals>
            )}
            <Equals>
              <Fraction
                top={formatNumber(numerator)}
                bottom={formatNumber(denominator)}
              />
            </Equals>
            <Equals>
              <FormulaPart tone="result">{formatNumber(score)}</FormulaPart>
            </Equals>
          </Formula>
        ) : (
          <StepNote>
            With no neighbours the formula has nothing to add up, so we fall back on{' '}
            {name}’s average: {formatNumber(average)}.
          </StepNote>
        )}
        <div className="space-y-1.5">
          <StepNote>
            N = the ✓ people{' '}
            {neighbours.length ? ` (${neighbourNames})` : ' (nobody)'}.
          </StepNote>
          <StepNote>
            i = {filmTitle}, u = {name}
          </StepNote>
          <StepNote>r = their ★ rating.</StepNote>
        </div>
      </div>
      <StepResult>
        Rounded: <strong>{score.toFixed(1)} ★</strong>. Recommended from{' '}
        {RECOMMEND_FROM} ★.
      </StepResult>
    </StepPanel>
  );
}
