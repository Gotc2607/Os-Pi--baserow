export function buildFilterChain(filters, fields) {
  if (!filters || filters.length === 0) {
    return () => true
  }
}
