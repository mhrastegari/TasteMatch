/** Fixed-height title bar, so nothing below it moves when the content changes. */
export function AppHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2.5">
      <img
        src="./favicon.svg"
        alt=""
        width={32}
        height={32}
        className="size-8 shrink-0"
      />
      <div className="min-w-0 leading-tight">
        <h1 className="truncate text-base font-bold sm:text-lg">TasteMatch</h1>
        <p className="truncate text-xs text-muted-foreground">
          <span className="sm:hidden">Pearson similarity · sample ratings</span>
          <span className="hidden sm:inline">
            5 users, 10 movies, Pearson similarity. Click any cell. (Sample ratings)
          </span>
        </p>
      </div>
    </header>
  );
}
