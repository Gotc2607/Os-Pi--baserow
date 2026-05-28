import { highlightSearchTerm } from '@baserow/modules/core/utils/search'

describe('highlightSearchTerm', () => {
  // Substitui ocorrência simples
  test('substitui uma ocorrência simples por <mark>', () => {
    const result = highlightSearchTerm('Olá Baserow', 'Baserow')
    expect(result).toBe('Olá <mark>Baserow</mark>')
  })

  // Substitui múltiplas ocorrências
  test('substitui TODAS as ocorrências', () => {
    const result = highlightSearchTerm('oi oi oi', 'oi')
    expect(result).toBe('<mark>oi</mark> <mark>oi</mark> <mark>oi</mark>') // [cite: 421, 422, 423, 424]
  })

  // Ignorar maiúsculas e minúsculas
  test('é case-insensitive por padrão', () => {
    const result = highlightSearchTerm('Baserow baserow BASEROW', 'baserow')
    expect(result).toBe('<mark>Baserow</mark> <mark>baserow</mark> <mark>BASEROW</mark>') // [cite: 426, 427, 428, 429, 430]
  })
})