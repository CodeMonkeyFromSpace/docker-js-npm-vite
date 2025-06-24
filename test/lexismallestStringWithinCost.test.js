/*
We have a string of length S and an array of integers of length S, and an integer C.
The goal is to remove characters from S to make it be as soon in a dictionary as possible. The soonest possible is the empty string. Obviously, that would be the answer every time if we could just remove all the chars we want. But the catch is that every time we remove a character from the string, it "costs" the value of the integer at the corresponding index of the input array. The total cost cannot be more than the input integer C. So we have to find the alphabetically smallest string by removing characters from S, but not exceeding cost C.

Assume that the string can only contain zero or more chars in the range a-z.
*/

import { lexismallestStringWithinCost as ImplA } from '../src/lexismallestStringWithinCost.js';
import { lexismallestStringWithinCost as ImplB } from '../src/lexismallestStringWithinCost-stub.js';

const testCases = [
  {
    input: ["dacb", [1, 3, 10, 2], 4],
    expected: "ac",
    description: 'example case',
  },
  {
    input: ["dacb", [1, 3, 10, 2], 0],
    expected: "dacb",
    description: 'no removals allowed (k=0)',
  },
  {
    input: ["dcba", [1, 2, 3, 4], 10],
    expected: "",
    description: 'enough budget to remove all',
  },
  {
    input: ["cbacdcbc", [5,1,2,3,4,5,6,7], 6],
    expected: "acdcbc",
    description: 'partial removals with limited budget',
  },
  {
    input: ["a", [1], 1],
    expected: "",
    description: 'single character string removed',
  },
  {
    input: ["abc", [5, 5, 5], 2],
    expected: "abc",
    description: 'budget smaller than smallest removal cost',
  },
  {
    input: ["bcda", [0, 0, 0, 0], 1],
    expected: "",
    description: 'removal costs zero',
  },
  {
    input: ["", [], 1],
    expected: "",
    description: 'empty string input',
  },
  {
    input: ["bcda", [0, 0, 0, 0], 1],
    expected: "",
    description: 'removal costs zero',
  },
  {
    input: ["adbc", [25, 4, 4, -5], 1],
    expected: "ab",
    description: 'negative costs',
  },
  {
    input: ["abcd", [25, -5, 4, 4], 1],
    expected: "abcd",
    description: 'negative costs but not best result',
  },
  {
    input: ["cab", [10, 1, 1], 2],
    expected: "c",
    description: 'high initial cost',
  },
  {
    input: ["dxaayzbc", [25, 4, 4, -5, 1, 1, 1, 1], 3],
    expected: "da",
    description: 'dxaayzbc',
  },
  {
    input: ["zazazz", [11, -1, 3, -3, -4, 1], 3],
    expected: "z",
    description: 'zazazz',
  }
];

function runTests(impl, name) {
  describe(`${name}`, () => {
    testCases.forEach(({ input, expected, description }) => {
      test(description, () => {
        expect(impl(...input)).toBe(expected);
      });
    });
  });
}

runTests(ImplA, '(golden) Implementation A');
runTests(ImplB, '("stub") Implementation B');
