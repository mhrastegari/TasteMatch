import { clsx } from 'clsx';

const steps = ['Compare', 'Similarity', 'Prediction'];

interface IStepTabsProps {
  step: number;
  onChange: (step: number) => void;
}

/** Picks the visible step on screens too small to show all three. */
export function StepTabs({ step, onChange }: IStepTabsProps) {
  return (
    <div className="grid shrink-0 grid-cols-3 gap-1 rounded-xl bg-muted p-1 columns:hidden">
      {steps.map((label, i) => (
        <button
          key={label}
          type="button"
          data-step
          onClick={() => onChange(i)}
          aria-pressed={step === i}
          className={clsx(
            'h-9 rounded-lg text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring',
            {
              'bg-card text-foreground shadow-sm': step === i,
              'text-muted-foreground': step !== i,
            }
          )}
        >
          {i + 1}. {label}
        </button>
      ))}
    </div>
  );
}
