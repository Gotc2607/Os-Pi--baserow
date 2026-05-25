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
})
