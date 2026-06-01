export function highlightSearchTerm(text, term, options = {}) {
  if (!text || !term) return text || ''
  
  const tag = options.tag || 'mark'
  const flags = options.caseSensitive ? 'g' : 'gi'
  const regex = new RegExp(term, flags)
  return text.replace(regex, (match) => `<${tag}>${match}</${tag}>`)
}