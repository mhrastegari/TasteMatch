import { Formula } from './Formula';
import { FormulaPart } from './FormulaPart';
import { Fraction } from './Fraction';
import { NeighbourSum } from './NeighbourSum';

/** r̃ui = Σ sim(u,v) × r(v,i) ÷ Σ |sim(u,v)|, in symbols. */
export function PredictionFormula() {
  return (
    <Formula noWrap>
      <FormulaPart tone="result">
        r̃<sub>ui</sub>
      </FormulaPart>{' '}
      =
      <Fraction
        top={
          <>
            <NeighbourSum />{' '}
            <FormulaPart tone="similarity">
              sim<sub>uv</sub>
            </FormulaPart>{' '}
            ×{' '}
            <FormulaPart tone="rating">
              r<sub>vi</sub>
            </FormulaPart>
          </>
        }
        bottom={
          <>
            <NeighbourSum /> |
            <FormulaPart tone="similarity">
              sim<sub>uv</sub>
            </FormulaPart>
            |
          </>
        }
      />
    </Formula>
  );
}
