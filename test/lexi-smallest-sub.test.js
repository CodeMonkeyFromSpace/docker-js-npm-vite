import { smallestStringWithCost as ImplA } from '../src/lexi-smallest-sub.js';

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

runTests(ImplA, 'Implementation A');
// runTests(ImplB, 'Implementation B');
