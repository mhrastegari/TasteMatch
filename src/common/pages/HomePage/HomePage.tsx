import { AnswerBar } from '@widgets/AnswerBar';
import { AppHeader } from '@widgets/AppHeader';
import { ComparisonStep } from '@widgets/ComparisonStep';
import { PredictionStep } from '@widgets/PredictionStep';
import { RatingTable } from '@widgets/RatingTable';
import { SimilarityStep } from '@widgets/SimilarityStep';
import { StepTabs } from '@widgets/StepTabs';
import { useRecommender } from './useRecommender';

export function HomePage() {
  const rec = useRecommender();
  const { people, numerator, denominator, average, score } = rec.prediction;

  return (
    <main className="mx-auto flex min-h-dvh max-w-6xl flex-col gap-2 ps-[calc(0.5rem+var(--spacing-safe-s))] pe-[calc(0.5rem+var(--spacing-safe-e))] pt-[calc(0.25rem+var(--spacing-safe-t))] pb-[calc(0.5rem+var(--spacing-safe-b))] sm:ps-[calc(1.5rem+var(--spacing-safe-s))] sm:pe-[calc(1.5rem+var(--spacing-safe-e))]">
      <AppHeader />

      <RatingTable
        user={rec.user}
        movie={rec.movie}
        score={score}
        voters={rec.neighbours.map((p) => p.id)}
        onSelect={rec.select}
      />

      <AnswerBar
        name={rec.name}
        film={rec.film}
        score={score}
        actual={rec.actual}
        best={rec.best}
      />

      <StepTabs step={rec.step} onChange={rec.setStep} />

      {/* Everything above has a fixed height; this area takes the rest. */}
      <div className="grid flex-1 grid-cols-1 gap-2 columns:grid-cols-3">
        <ComparisonStep
          name={rec.name}
          people={people}
          compared={rec.compared}
          onCompare={rec.compare}
          shown={rec.step === 0}
        />
        <SimilarityStep
          name={rec.name}
          people={people}
          compared={rec.compared}
          onCompare={rec.compare}
          shown={rec.step === 1}
        />
        <PredictionStep
          name={rec.name}
          filmTitle={rec.film.title}
          neighbours={rec.neighbours}
          numerator={numerator}
          denominator={denominator}
          average={average}
          score={score}
          shown={rec.step === 2}
        />
      </div>
    </main>
  );
}
