function applyFilter(filter, row) {
  const value = row[filter.field]

  switch (filter.type) {
    case 'equal':
      return (
        value !== null &&
        value !== undefined &&
        String(value) === String(filter.value)
      )
    case 'contains':
      if (value === null || value === undefined) {
        return false
      }
      return String(value)
        .toLowerCase()
        .includes(String(filter.value).toLowerCase())
    case 'not_empty':
      return value !== null && value !== undefined && value !== ''
    default:
      return true
  }
}

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
    if (useOr) {
      return validFilters.some((f) => applyFilter(f, row))
    }
    return validFilters.every((f) => applyFilter(f, row))
  }
}
