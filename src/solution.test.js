import { describe, it, expect } from 'vitest';
import { minTotalPenalty } from './solution';

describe('minTotalPenalty', () => {
  it('handles no tasks', () => {
    expect(minTotalPenalty([])).toBe(0);
  });

  it('handles single task on time', () => {
    expect(minTotalPenalty([{ deadline: 1, duration: 1, penalty: 10 }])).toBe(0);
  });

  it('penalty if cannot meet deadline', () => {
    expect(minTotalPenalty([{ deadline: 1, duration: 2, penalty: 10 }])).toBe(10);
  });

  it('complex scheduling', () => {
    const tasks = [
      { deadline: 4, duration: 3, penalty: 70 },
      { deadline: 2, duration: 1, penalty: 60 },
      { deadline: 4, duration: 2, penalty: 50 },
      { deadline: 3, duration: 1, penalty: 40 },
    ];
    expect(minTotalPenalty(tasks)).toBe(70);
  });
  it('tricky', () => {
    const tasks = [
      { deadline: 4, duration: 3, penalty: 100 },
      { deadline: 1, duration: 1, penalty: 10 }, 
      { deadline: 2, duration: 1, penalty: 10 }, 
    ];
    expect(minTotalPenalty(tasks)).toBe(10);
  });

  it('breaks greedy approach', () => {
    const tasks = [
      { deadline: 4, duration: 3, penalty: 100 },
      { deadline: 2, duration: 2, penalty: 10 },
      { deadline: 2, duration: 1, penalty: 8 },
    ];
    expect(minTotalPenalty(tasks)).toBe(10);
  });

}); 