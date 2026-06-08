import { EqualViewFilterType } from '../../../modules/database/viewFilters.js'

const equalFilter = new EqualViewFilterType({ app: { $registry: null } })
const field = { type: 'text' }

const equalMatches = (rowValue, filterValue) =>
  equalFilter.matches(rowValue, filterValue, field, null)

describe('EqualViewFilterType.matches - Testes de Caixa-Preta e Caixa-Branca', () => {
  describe('C1: valores iguais e diferentes', () => {
    test('C1-01: valor igual ao filtro retorna true', () => {
      expect(equalMatches('Joao', 'Joao')).toBe(true)
    })

    test('C1-02: valor diferente do filtro retorna false', () => {
      expect(equalMatches('Maria', 'Joao')).toBe(false)
    })
  })

  describe('C2: filtro vazio', () => {
    test('C2-01: filtro vazio retorna null para nao aplicar filtro', () => {
      expect(equalMatches('Joao', '')).toBe(null)
    })
  })

  describe('C3: rowValue null', () => {
    test('C3-01: rowValue null com filtro preenchido retorna false', () => {
      expect(equalMatches(null, 'Joao')).toBe(false)
    })
  })

  describe('C4: valores limite', () => {
    test('C4-01: menor texto valido com 1 caractere retorna true', () => {
      expect(equalMatches('a', 'a')).toBe(true)
    })

    test('C4-02: valor vazio contra filtro de 1 caractere retorna false', () => {
      expect(equalMatches('', 'a')).toBe(false)
    })
  })
})
