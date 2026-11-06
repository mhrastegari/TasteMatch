import { Formula } from './Formula';
import { FormulaPart } from './FormulaPart';
import { Fraction } from './Fraction';
import { SquareRoot } from './SquareRoot';

/** sim = Σ a × b ÷ (√Σ a² × √Σ b²), in symbols. */
export function PearsonFormula() {
  return (
    <Formula noWrap>
      <FormulaPart tone="similarity">
        sim<sub>uv</sub>
      </FormulaPart>{' '}
      =
      <Fraction
        top={<FormulaPart tone="product">Σ a × b</FormulaPart>}
        bottom={
          <>
            <FormulaPart tone="sizeA">
              <SquareRoot>Σ a²</SquareRoot>
            </FormulaPart>{' '}
            ×{' '}
            <FormulaPart tone="sizeB">
              <SquareRoot>Σ b²</SquareRoot>
            </FormulaPart>
          </>
        }
      />
    </Formula>
  );
}
