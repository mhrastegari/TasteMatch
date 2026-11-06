/** The sum sign over the neighbours: Σ with v ∈ N (i above, u below) under it. */
export function NeighbourSum() {
  return (
    <span className="inline-flex items-end">
      <span className="text-[1.25em] leading-none">Σ</span>
      <span className="inline-flex items-center text-[0.72em] leading-none">
        v∈N
        <span className="inline-flex flex-col text-[0.85em] leading-[0.95]">
          <span>i</span>
          <span>u</span>
        </span>
      </span>
    </span>
  );
}
