export function highlightSearchTerm(text, term) {
  const regex = new RegExp(term, 'g')
  return text.replace(regex, `<mark>${term}</mark>`)
}