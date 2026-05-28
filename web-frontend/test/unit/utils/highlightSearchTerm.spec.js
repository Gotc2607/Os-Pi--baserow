import { highlightSearchTerm } from '@baserow/modules/core/utils/search'

describe('highlightSearchTerm', () => {
  // Substitui ocorrência simples
  test('substitui uma ocorrência simples por <mark>', () => {
    const result = highlightSearchTerm('Olá Baserow', 'Baserow')
    expect(result).toBe('Olá <mark>Baserow</mark>')
  })
})