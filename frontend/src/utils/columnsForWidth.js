// How many cards fit in one row for a given window width.
export function columnsForWidth(width) {
  if (width < 560) return 1
  if (width < 860) return 2
  if (width < 1100) return 3
  return 4
}
