export function highlightSearchTerm(text, term, options = {}) {
  const flags = options.caseSensitive ? 'g' : 'gi'
  const regex = new RegExp(term, flags)
  return text.replace(regex, (match) => `<mark>${match}</mark>`)
}