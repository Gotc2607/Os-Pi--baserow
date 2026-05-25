export function buildFilterChain(filters, fields) {
  if (!filters || filters.length === 0) {
    return () => true
  }

  const useOr = filters.some((f) => f.operator === 'OR')

  return (row) => {
    const matches = filters.map((filter) => {
      const value = row[filter.field]

      if (filter.type === 'equal') {
        return (
          value !== null &&
          value !== undefined &&
          String(value) === String(filter.value)
        )
      }

      return true
    })

    if (useOr) {
      return matches.some((m) => m)
    } else {
      return matches.every((m) => m)
    }
  }
}
