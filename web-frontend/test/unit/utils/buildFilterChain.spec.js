import { buildFilterChain } from '@baserow/modules/core/utils/filterChain'

const FIELDS = [
  { id: 'nome', name: 'Nome', type: 'text' },
  { id: 'idade', name: 'Idade', type: 'number' },
  { id: 'ativo', name: 'Ativo', type: 'boolean' },
]

describe('buildFilterChain', () => {
  test('[C1] filtros vazios retorna funcao que sempre retorna true', () => {
    const fn = buildFilterChain([], FIELDS)
    expect(typeof fn).toBe('function')
    expect(fn({ nome: 'qualquer' })).toBe(true)
  })

  test('[C1] null retorna funcao que sempre retorna true', () => {
    const fn = buildFilterChain(null, FIELDS)
    expect(fn({})).toBe(true)
  })

  test('[C2] filtro equal: linha que bate com o valor retorna true', () => {
    const filters = [
      { field: 'nome', type: 'equal', value: 'Joao', operator: 'AND' },
    ]
    const fn = buildFilterChain(filters, FIELDS)
    expect(fn({ nome: 'Joao', idade: 30 })).toBe(true)
  })

  test('[C2] filtro equal: linha que NAO bate retorna false', () => {
    const filters = [
      { field: 'nome', type: 'equal', value: 'Joao', operator: 'AND' },
    ]
    const fn = buildFilterChain(filters, FIELDS)
    expect(fn({ nome: 'Maria', idade: 25 })).toBe(false)
  })

  test('[C3] AND: ambos satisfeitos retorna true', () => {
    const filters = [
      { field: 'nome', type: 'equal', value: 'Joao', operator: 'AND' },
      { field: 'idade', type: 'equal', value: '30', operator: 'AND' },
    ]
    const fn = buildFilterChain(filters, FIELDS)
    expect(fn({ nome: 'Joao', idade: '30' })).toBe(true)
  })

  test('[C3] AND: so um satisfeito retorna false', () => {
    const filters = [
      { field: 'nome', type: 'equal', value: 'Joao', operator: 'AND' },
      { field: 'idade', type: 'equal', value: '30', operator: 'AND' },
    ]
    const fn = buildFilterChain(filters, FIELDS)
    expect(fn({ nome: 'Joao', idade: '25' })).toBe(false)
  })

  test('[C4] OR: apenas o primeiro satisfeito retorna true', () => {
    const filters = [
      { field: 'nome', type: 'equal', value: 'Joao', operator: 'OR' },
      { field: 'idade', type: 'equal', value: '99', operator: 'OR' },
    ]
    const fn = buildFilterChain(filters, FIELDS)
    expect(fn({ nome: 'Joao', idade: '25' })).toBe(true)
  })

  test('[C4] OR: nenhum satisfeito retorna false', () => {
    const filters = [
      { field: 'nome', type: 'equal', value: 'Joao', operator: 'OR' },
      { field: 'idade', type: 'equal', value: '99', operator: 'OR' },
    ]
    const fn = buildFilterChain(filters, FIELDS)
    expect(fn({ nome: 'Maria', idade: '25' })).toBe(false)
  })

  test('[C5] filtro com field inexistente e ignorado (como se nao estivesse)', () => {
    const filters = [
      { field: 'inexistente', type: 'equal', value: 'x', operator: 'AND' },
    ]
    const fn = buildFilterChain(filters, FIELDS)
    expect(fn({ nome: 'Qualquer' })).toBe(true)
  })
})
