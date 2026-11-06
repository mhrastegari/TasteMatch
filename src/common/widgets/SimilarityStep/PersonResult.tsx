import { formatSigned } from '@components/Formula';
import type { IPerson } from '@models/recommender';
import { users } from '@shared/dataset';
import { clsx } from 'clsx';

interface IPersonResultProps {
  person: IPerson;
  selected: boolean;
  onSelect: () => void;
}

export function PersonResult({ person, selected, onSelect }: IPersonResultProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={clsx(
        'flex items-center justify-between gap-1 rounded-lg bg-muted/60 px-2 py-1 text-xs font-medium transition-colors outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring',
        {
          'ring-2 ring-primary ring-inset': selected,
          'text-muted-foreground': !person.used,
        }
      )}
    >
      <span>{users[person.id]}</span>
      <span className="font-math text-sm tabular-nums">
        {formatSigned(person.similarity)}
      </span>
      <span>
        {person.rating ? `★${person.rating}` : '–'}
        {person.used ? ' ✓' : ''}
      </span>
    </button>
  );
}
