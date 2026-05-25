import { TestApp } from '@baserow/test/helpers/testApp'
import { firstBy } from 'thenby'

const rows = [
  { id: 1, field: 120 },
  { id: 2, field: 60 },
  { id: 3, field: null },
  { id: 4, field: 86400 },
  { id: 5, field: 3600 },
  { id: 6, field: 7200.123 },
  { id: 7, field: 1.12 },
]

describe('DurationFieldType.getSort()', () => {
  let testApp = null
  let durationFieldType = null

  beforeEach(() => {
    testApp = new TestApp()
    durationFieldType = testApp._app.$registry.get('field', 'duration')
  })

  afterEach(async () => {
    await testApp.afterEach()
  })

  function sortFieldValues(direction) {
    const sort = durationFieldType.getSort('field', direction, {})

    return [...rows].sort(firstBy().thenBy(sort)).map((row) => row.field)
  }

  test('allows duration fields to be sorted in views', () => {
    expect(durationFieldType.getCanSortInView({})).toBe(true)
  })

  test.each([
    ['ASC', [null, 1.12, 60, 120, 3600, 7200.123, 86400]],
    ['DESC', [86400, 7200.123, 3600, 120, 60, 1.12, null]],
  ])('sorts duration values in %s order', (direction, expectedValues) => {
    const sortedValues = sortFieldValues(direction)

    expect(sortedValues).toEqual(expectedValues)
  })
})
