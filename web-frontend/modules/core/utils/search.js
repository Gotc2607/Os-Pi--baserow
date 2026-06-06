export function highlightSearchTerm(text, term, options = {}) {
  if (!text || !term) return text || ''
  
  const tag = options.tag || 'mark'
  const flags = options.caseSensitive ? 'g' : 'gi'
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') 
  const regex = new RegExp(escaped, flags)
  
  return text.replace(regex, (match) => `<${tag}>${match}</${tag}>`)
}