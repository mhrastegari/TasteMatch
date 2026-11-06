import {
  Equals,
  Formula,
  FormulaPart,
  formatNumber,
  formatSigned,
  Fraction,
  PearsonFormula,
  SquareRoot,
} from '@components/Formula';
import type { IPerson } from '@models/recommender';
import { users } from '@shared/dataset';
import { StepNote, StepPanel } from '@widgets/StepPanel';
import { PersonResult } from './PersonResult';

interface ISimilarityStepProps {
  name: string;
  people: IPerson[];
  compared: IPerson;
  onCompare: (person: number) => void;
  shown: boolean;
}

export function SimilarityStep({
  name,
  people,
  compared,
  onCompare,
  shown,
}: ISimilarityStepProps) {
  const other = users[compared.id];
  const top = <FormulaPart tone="product">{formatNumber(compared.top)}</FormulaPart>;

  return (
    <StepPanel number={2} title={`Similarity of ${name} and ${other}`} shown={shown}>
      <div className="grid gap-2 lg:grid-cols-[2fr_3fr] columns:grid-cols-1">
        <PearsonFormula />
        <Formula small>
          <Equals>
            <Fraction
              top={top}
              bottom={
                <>
                  <FormulaPart tone="sizeA">
                    <SquareRoot>{formatNumber(compared.squaresA)}</SquareRoot>
                  </FormulaPart>{' '}
                  ×{' '}
                  <FormulaPart tone="sizeB">
                    <SquareRoot>{formatNumber(compared.squaresB)}</SquareRoot>
                  </FormulaPart>
                </>
              }
            />
          </Equals>
          <Equals>
            <Fraction
              top={top}
              bottom={
                <>
                  <FormulaPart tone="sizeA">
                    {formatNumber(compared.sizeA)}
                  </FormulaPart>{' '}
                  ×{' '}
                  <FormulaPart tone="sizeB">
                    {formatNumber(compared.sizeB)}
                  </FormulaPart>
                </>
              }
            />
          </Equals>
          <Equals>
            <FormulaPart tone="similarity">
              {formatSigned(compared.similarity)}
            </FormulaPart>
          </Equals>
        </Formula>
      </div>
      <StepNote>Totals from step 1. Everyone compared with {name}:</StepNote>
      <div className="grid grid-cols-2 gap-1 md:grid-cols-4 columns:grid-cols-2">
        {people.map((p) => (
          <PersonResult
            key={p.id}
            person={p}
            selected={p.id === compared.id}
            onSelect={() => onCompare(p.id)}
          />
        ))}
      </div>
      <StepNote>★ = their rating of this movie.</StepNote>
      <StepNote>✓ = used in step 3.</StepNote>
    </StepPanel>
  );
}
