export function buildFilterChain(filters, fields) {
  if (!filters || filters.length === 0) {
    return () => true
  }

  const fieldIds = new Set(fields.map((f) => f.id))
  const validFilters = filters.filter((f) => fieldIds.has(f.field))

  if (validFilters.length === 0) {
    return () => true
  }

  const useOr = validFilters.some((f) => f.operator === 'OR')

  return (row) => {
    const matches = validFilters.map((filter) => {
      const value = row[filter.field]

      if (filter.type === 'equal') {
        return (
          value !== null &&
          value !== undefined &&
          String(value) === String(filter.value)
        )
      }

      if (filter.type === 'contains') {
        if (value === null || value === undefined) {
          return false
        }
        return String(value)
          .toLowerCase()
          .includes(String(filter.value).toLowerCase())
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
