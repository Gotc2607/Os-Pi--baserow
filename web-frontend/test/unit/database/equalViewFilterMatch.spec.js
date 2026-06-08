import { EqualViewFilterType } from '../../../modules/database/viewFilters.js'

const equalFilter = new EqualViewFilterType({ app: { $registry: null } })
const field = { type: 'text' }

const equalMatches = (rowValue, filterValue) =>
  equalFilter.matches(rowValue, filterValue, field, null)

describe('EqualViewFilterType.matches - Testes de Caixa-Preta e Caixa-Branca', () => {
  describe('Caixa-Preta: Particionamento de Equivalencia (EP)', () => {
    test('EP-01: valor igual ao filtro retorna true', () => {
      expect(equalMatches('Joao', 'Joao')).toBe(true)
    })

    test('EP-02: valor diferente do filtro retorna false', () => {
      expect(equalMatches('Maria', 'Joao')).toBe(false)
    })

    test('EP-03: filtro vazio retorna null para nao aplicar filtro', () => {
      expect(equalMatches('Joao', '')).toBe(null)
    })

    test('EP-04: valor null com filtro preenchido retorna false', () => {
      expect(equalMatches(null, 'Joao')).toBe(false)
    })
  })

  describe('Caixa-Preta: Analise de Valor Limite (BVA)', () => {
    test('BVA-01: menor texto valido com 1 caractere retorna true', () => {
      expect(equalMatches('a', 'a')).toBe(true)
    })

    test('BVA-02: valor vazio contra filtro de 1 caractere retorna false', () => {
      expect(equalMatches('', 'a')).toBe(false)
    })

    test('BVA-03: espacos nas bordas e maiusculas sao normalizados na comparacao', () => {
      expect(equalMatches('  Joao  ', 'joao')).toBe(true)
    })
  })

  describe('Caixa-Branca: Cobertura de Branches e MC/DC', () => {
    test('MC/DC [M1]: C1=false, C2=false, comparacao final verdadeira', () => {
      expect(equalMatches('abc', 'abc')).toBe(true)
    })

    test('MC/DC [M2]: C1=true (rowValue null) -> Branch verdadeiro (converte para string vazia)', () => {
      expect(equalMatches(null, 'abc')).toBe(false)
    })

    test('MC/DC [M3]: C2=true (filterVal vazio) -> Branch verdadeiro (retorna null)', () => {
      expect(equalMatches('abc', '')).toBe(null)
    })

    test('MC/DC [M4]: C3=false (valores normalizados diferentes) -> retorna false', () => {
      expect(equalMatches('abc', 'xyz')).toBe(false)
    })
  })
})
