import { describe, it, expect } from 'vitest'
import { minCostPath } from './solution'

describe('minCostPath', () => {
  it('computes path with negative weights correctly', () => {
    const edges = [
      [0, 1, 1],
      [1, 2, -1],
      [2, 3, 2],
      [0, 3, 4]
    ]
    expect(minCostPath(4, edges, 0, 3)).toBe(2)
  })

  it('returns null when no path exists', () => {
    expect(minCostPath(3, [[0, 1, 2]], 1, 2)).toBe(null)
  })

  it('handles zero-weight edges', () => {
    const edges = [
      [0, 1, 0],
      [1, 2, 0]
    ]
    expect(minCostPath(3, edges, 0, 2)).toBe(0)
  })

  it('returns 0 when start and end are the same', () => {
    expect(minCostPath(1, [], 0, 0)).toBe(0)
  })

  it('handles cycles with positive cost', () => {
    const edges = [
      [0, 1, 3],
      [1, 2, 4],
      [2, 3, -2],
      [3, 4, -2],
      [4, 1, 1]
    ]
    expect(minCostPath(5, edges, 0, 4)).toBe(3)
  })
})