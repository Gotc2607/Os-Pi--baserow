export function highlightSearchTerm(text, term) {
  const regex = new RegExp(term, 'gi')
  return text.replace(regex, (match) => `<mark>${match}</mark>`)
}