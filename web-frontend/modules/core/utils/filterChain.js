export function buildFilterChain(filters, fields) {
  if (!filters || filters.length === 0) {
    return () => true
  }

  return (row) => {
    return filters.every((filter) => {
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
  }
}
