export function formatNumber(value: number) {
  return value.toFixed(2).replace('-', '−');
}

export function formatSigned(value: number) {
  return `${value < 0 ? '−' : '+'}${Math.abs(value).toFixed(2)}`;
}
