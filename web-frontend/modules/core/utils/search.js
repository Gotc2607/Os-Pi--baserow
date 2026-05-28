export function highlightSearchTerm(text, term) {
  return text.replace(term, `<mark>${term}</mark>`)
}